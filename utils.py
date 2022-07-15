from flask import jsonify, make_response

def json_response(status, message, data={}):
    jsonResponse = {
        'message' : message,
        'data' : data
    }
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