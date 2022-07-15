from ctypes import util
from flask import Flask, request
import psycopg2
import jwt
import datetime
import hashlib
import json
import utils
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
            jwt_data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return utils.json_response(401, "Token Required!")
        
        return f(*args, **kwargs)
    return decorated

###########  PUBLIC   ###########

### LOGIN
@app.route('/login', methods=['POST'])
def login():
    postData = request.json
    get_user_by_username_sql = "Select * from usuarios where nome = %s"
    cur = conn.cursor()
    cur.execute(get_user_by_username_sql, (postData['username'],))
    db_user = utils.dbDatatoDict(cur.description, cur.fetchall())
    pw_hash = hashlib.sha256(postData['password'].encode(encoding = 'UTF-8', errors = 'strict'))
    if db_user['senha'] != pw_hash.hexdigest():
        return utils.json_response(401, 'Authentication failed')

    # CREATE JWT TOKEN
    token = jwt.encode({ 'user_id': db_user['id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2) }, app.config['SECRET_KEY'])

    data = {
        'message' : 'Login Sucessful!',
        'token' : token
    }
    return utils.json_response(200, 'Login OK!', data)

###########  CARTÕES  ###########
@app.route('/cards/list')
@token_required
def listCards():
    cur = conn.cursor()
    cur.execute("select * from cartoes")
    cardList = cur.fetchall()
    return utils.json_response(200, "Success", utils.dbDatatoDict(cur.description, cardList))

@app.route('/cards/add', methods=['POST'])
@token_required
def addCards():
    cur = conn.cursor()
    sql = "INSERT INTO cartoes (nome, limite, id_banco) VALUES (%)"
    # cur.execute(sql, data)
    # cardList = cur.fetchall()
    # return json.dumps(dbDatatoDict(cur.description, cardList))
    card = request.json
    return "Hello"



if __name__ == '__main__':
    app.run(debug=True)



