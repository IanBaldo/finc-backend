from flask import Flask, request
import psycopg2
import jwt
import datetime
import hashlib
import json
import modules.utils as utils
from functools import wraps

app = Flask(__name__)

config_file = open('./config.json')
config = json.load(config_file)

app.config['SECRET_KEY'] = config['secret_key']

conn = psycopg2.connect(
    "dbname=%s user=%s password=%s" % 
    (config['db']['database'],
    config['db']['user'],
    config['db']['password'])
)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('authorization')

        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return utils.json_response(401, "Token Required!")
        
        return f(*args, **kwargs)
    return decorated

###########  PUBLIC   ###########

### LOGIN
@app.route('/login', methods=['POST'])
def login():
    post_data = request.json
    get_user_by_username_sql = "Select * from users where name = %s"
    cur = conn.cursor()
    cur.execute(get_user_by_username_sql, (post_data['username'],))
    db_user = utils.db_data_2_dict(cur.description, cur.fetchall())
    pw_hash = hashlib.sha256(post_data['password'].encode(encoding = 'UTF-8', errors = 'strict'))
    if db_user['pass'] != pw_hash.hexdigest():
        return utils.json_response(401, 'Authentication failed')

    # CREATE JWT TOKEN
    token = jwt.encode(
        {
            'user_id' : db_user['id'],
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        app.config['SECRET_KEY']
    )

    data = {
        'message' : 'Login Sucessful!',
        'token' : token
    }
    return utils.json_response(200, 'Login OK!', data)

###########  CARDS  ###########
@app.route('/cards/list')
@token_required
def listCards():
    cur = conn.cursor()
    cur.execute("""
    SELECT 
        c.name as card,
        c.credit_limit::float/100 as limit,
        b.name as bank,
        coalesce(sum(e.value)::float/100,0) as bill 
    FROM
        cards c 
        JOIN banks b on c.id_bank = b.id
        LEFT JOIN (
            SELECT id, id_card, value
            FROM expenses  
            WHERE
                "date" between %s and %s
                AND
                id_card is NOT NULL
                AND
                dt_deleted is NULL
        ) as e
            on c.id = e.id_card 
    GROUP BY
        c.name,
        c.credit_limit,
        b.name""", 
        utils.month_range(datetime.datetime.now().strftime('%m'))
    )
    
    card_list = cur.fetchall()
    return utils.json_response(200, "Success", utils.db_data_2_dict(cur.description, card_list))

@app.route('/cards/add', methods=['POST'])
@token_required
def addCards():
    cur = conn.cursor()
    insert_card_sql = "INSERT INTO cards (name, credit_limit, id_bank, id_user) VALUES (%s, %s, %s, %s)"
    try:
        card = request.json
    except:
        return utils.json_response(400, "Data missing!")

    token_data = utils.get_token_data(request, app.config['SECRET_KEY'])

    try:
        cur.execute(insert_card_sql, (card['name'], card['credit_limit'], card['id_bank'], token_data['user_id']))
        conn.commit()
    except Exception as err:
        print (err)
        return utils.json_response(400, 'Something went wrong')

    return utils.json_response(201, 'Card Created!')

@app.route('/cards/details/<card_id>')
@token_required
def cardDetails(card_id):
    cur = conn.cursor()
    card_details_sql = """
    SELECT
        id,
        name,
        value::float/100 as value,
        date
    FROM expenses
    WHERE
        id_card = %s
        AND
        dt_deleted is NULL
        AND
        date >= %s
        AND
        id_user = %s"""

    token_data = utils.get_token_data(request, app.config['SECRET_KEY'])
    first_day_of_current_month = utils.month_range(datetime.datetime.now().strftime('%m'))[0]
    try:
        cur.execute(card_details_sql, (card_id, first_day_of_current_month, token_data['user_id']))
    except Exception as err:
        print (err)
        return utils.json_response(400, 'Something went wrong')

    card_details = cur.fetchall()
    return utils.json_response(200, "Success", utils.db_data_2_dict(cur.description, card_details))

###########  EXPENSES  ###########
@app.route('/expenses/card/add', methods=['POST'])
@token_required
def addCardExpense():
    try:
        expense = request.json
    except Exception as e:
        print(e)
        return utils.json_response(400, "Data missing!")

    columns = ['name','value','date','is_recurrent','id_card','id_user']

    if 'id_tag' in expense:
        columns.append('id_tag')

    insert_expense_sql = "INSERT INTO expenses (%s) VALUES (" % utils.a2s(columns)
    for i in range(len(columns)):
        insert_expense_sql += '%s,'

    # Remove last ',' and add ')'
    insert_expense_sql = insert_expense_sql[:len(insert_expense_sql)-1] + ')'

    token_data = utils.get_token_data(request, app.config['SECRET_KEY'])

    cur = conn.cursor()
    card_installments = int(expense['installments'])
    for month_delta in range(card_installments):
        # Add 1 month to each date (but the first)
        dt = utils.dt_add_n_months(datetime.datetime.now(), month_delta).strftime('%Y-%m-%d')

        name = expense['name']
        if card_installments > 1:
            name = name + (" %s/%s" % (month_delta+1,card_installments))

        values = (name, utils.value2db(expense['value']), dt, expense['is_recurrent'], expense['id_card'], token_data['user_id'])
        
        # Improvement: Is there a way to test this only once? (line 110)
        if 'id_tag' in expense:
            values += (expense['id_tag'],)

        try:
            cur.execute(insert_expense_sql, values)
        except Exception as e:
            print(e)
            return utils.json_response(400, 'Something went wrong')

    conn.commit()
    return utils.json_response(201, 'Expense Created!')

@app.route('/expenses/fixed/add', methods=['POST'])
@token_required
def addFixedExpense():
    try:
        expense = request.json
    except Exception as e:
        print(e)
        return utils.json_response(400, "Data missing!")

    token_data = utils.get_token_data(request, app.config['SECRET_KEY'])
    insert_fixed_expense_sql = "INSERT INTO expenses (name,value,is_recurrent,id_user) VALUES (%s,%s,%s,%s)"
    values = (expense['name'], utils.value2db(expense['value']), expense['is_recurrent'], token_data['user_id'])

    cur = conn.cursor()
    try:
        cur.execute(insert_fixed_expense_sql, values)
    except Exception as e:
        print(e)
        return utils.json_response(400, 'Something went wrong')
    
    conn.commit()
    return utils.json_response(201, 'Expense Created!')

@app.route('/expenses/fixed')
@token_required
def listFixedExpense():

    token_data = utils.get_token_data(request, app.config['SECRET_KEY'])
    list_fixed_expenses_sql = """
    SELECT
        id,
        name,
        date,
        value::float/100 as value,
        dt_created
    FROM expenses
    WHERE
        is_recurrent = true
        AND
        id_card is NULL
        AND
        dt_deleted is NULL
        AND id_user = %s"""

    cur = conn.cursor()
    try:
        cur.execute(list_fixed_expenses_sql, (token_data['user_id'],))
    except Exception as e:
        print(e)
        return utils.json_response(400, 'Something went wrong')
    
    fixedExpensesList = cur.fetchall()
    return utils.json_response(200, "Success", utils.db_data_2_dict(cur.description, fixedExpensesList))

if __name__ == '__main__':
    app.run(debug=True)



