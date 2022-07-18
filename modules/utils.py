from flask import jsonify, make_response
import jwt
import datetime

def json_response(status, message, data={}):
    if not message:
        return "Missing Message"

    jsonResponse = {
        'status' : status,
        'message' : message,
    }

    if data:
        jsonResponse['data'] = data

    return make_response(jsonify(jsonResponse), status)

def db_data_2_dict(descriptions, db_data):
    output = [];
    for db_row in db_data:
        obj = {}
        for i in range(len(db_row)):
            obj[descriptions[i][0]] = db_row[i]
        output.append(obj)

    if len(output) == 1:
        return output[0]
    return output

def get_token_data(request, secret):
    token = request.headers.get('authorization')
    return jwt.decode(token, secret, algorithms=['HS256'])

def value2db(value):
    return str(int(float(value)*100))

def db2value(db_value):
    return float(format(int(db_value)/100, '.2f'))

# Array to string
def a2s(arr, sep=","):
    return sep.join(arr)

def get_last_date_of_month(month):
    # The year could be hardcoded, but whatever...
    year = int(datetime.datetime.now().strftime('%Y'))
    return (datetime.date(year, month+1, 1) - datetime.timedelta(days=1)).strftime('%Y-%m-%d')

def month_range(month):
    year = int(datetime.datetime.now().strftime('%Y'))
    first_day = datetime.date(year, month, 1).strftime('%Y-%m-%d')
    last_day = get_last_date_of_month(month)
    return (first_day, last_day)

# yyyy-mm-dd to Date Obj
def dt_str2date(dt_str):
    year,month,day = dt_str.split('-')
    return datetime.date(int(year),int(month),int(day))

def dt_add_n_months(dt, n_months):
    year,month,day = dt.strftime('%Y-%m-%d').split('-')
    try:
        new_date = datetime.date(int(year)+int(n_months/12), int(month)+(n_months%12), int(day))
    except Exception as e:
        new_date = datetime.date(int(year)+int(n_months/12), int(month)+(n_months%12), 28)
    return new_date