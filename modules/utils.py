from flask import jsonify, make_response
import jwt

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

def dbDatatoDict(descriptions, db_data):
    output = [];
    for db_row in db_data:
        obj = {}
        for i in range(len(db_row)):
            obj[descriptions[i][0]] = db_row[i]
        output.append(obj)

    if len(output) == 1:
        return output[0]
    return output

def getTokenData(request, secret):
    token = request.headers.get('authorization')
    return jwt.decode(token, secret, algorithms=['HS256'])

def value2db(value):
    return str(int(float(value)*100))

def db2value(db_value):
    return float(format(int(db_value)/100, '.2f'))

# Array to string
def a2s(arr, sep=","):
    return sep.join(arr)