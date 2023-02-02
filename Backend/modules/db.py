import psycopg2

def connect(config):
    return psycopg2.connect(
        "dbname=%s user=%s password=%s" % 
        (config['db']['database'],
        config['db']['user'],
        config['db']['password'])
    )

# Array to string
def a2s(arr, sep=","):
    return sep.join(arr)

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


def fetch(conn, table, filters='', columns='*'):
    cur = conn.cursor()
    sql = "SELECT %s FROM %s" % (a2s(columns), table)

    if filter:
        sql + filters

    try:
        db_data = cur.execute(sql)
    except Exception as e:
        'todo'
    return 'todo'

def insert(conn, table, columns, values):
    cur = conn.cursor()
    sql = "INSERT INTO %s (%s) VALUES " % (table, a2s(columns))

    cur.close()
    return 'todo'

def update():
    return 'todo'

def delete():
    return 'todo'
