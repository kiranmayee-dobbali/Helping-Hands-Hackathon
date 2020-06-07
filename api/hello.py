from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dbpassword@localhost:5432/communityproject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "True"
db = SQLAlchemy(app)

userstable = db.Table('users', db.metadata, autoload=True, autoload_with=db.engine)
"""
class Database():
    sa_url ='postgresql://postgres:123456@localhost:5432/communityproject'l
    engine = SQLAlchemy.create_engine(sa_url,db.get_options(sa_url, echo=False))

    def __init__(self):
        self.connection = self.engine.connect()
        print("DB Instance created")

    def fetchByQyery(self, query):
        fetchQuery = self.connection.execute(f"SELECT * FROM {query}")

        for data in fetchQuery.fetchall():
            print(data)
            
            
            
                

        
"""

#database changed
@app.route('/hello', methods=['POST', 'GET'])
def hello_world():
    if request.method == "POST":
        login_data = request.json
        print("email", login_data['email'])
        print("password", login_data['password'])
        print("data base is")
        results = db.session.query(userstable).all()
        all_data = {}
        for r in results:
            all_data[r.emailid] = r.password
        print("all data",all_data.keys())
        if login_data['email'] in all_data.keys():
            if all_data[login_data['email']] == login_data['password']:
                #decrypt
                print( login_data['password'] )
                return "Valid"
            else:
                return "Invalid"
        else:
            print("no")
            return "Invalid"
