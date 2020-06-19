from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from modules import app
from sqlalchemy.ext.automap import automap_base


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dbpassword@localhost:5432/communityproject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "True"
db = SQLAlchemy(app)

# User = db.Table('users', db.metadata, autoload=True, autoload_with=db.engine)


Base = automap_base()
Base.prepare(db.engine, reflect=True)
Post = Base.classes.posts
User = Base.classes.users

#database changed
@app.route('/hello', methods=['POST', 'GET'])
def hello_world():
    if request.method == "POST":
        login_data = request.json
        print("login",login_data)
        print("email", login_data['email'])
        print("password", login_data['password'])
        print("data base is")
        print("PSOT CLASS",Post)



        # select user id for the given email id
        user_id = db.session.query(User.user_id).filter(User.emailid == login_data['email']).scalar()
        print("user id", user_id)

        user_password = db.session.query(User.password).filter(User.emailid == login_data['email']).scalar()
        print("user pwwd", user_password)

        if(user_password == login_data['password']):
            ##decrpt password
            return jsonify({'status': "Valid", "login_user_id":user_id })
        else:
            return jsonify({'status': "Invalid", "login_user_id":"null"})



        # results = db.session.query(userstable).all()
        # all_data = {}
        # for r in results:
        #     all_data[r.emailid] = r.password
        # print("all data",all_data.keys())
        # if login_data['email'] in all_data.keys():
        #     if all_data[login_data['email']] == login_data['password']:
        #         #decrypt
        #         print( login_data['password'] )
        #         return "Valid"
        #     else:
        #         return "Invalid"
        # else:
        #     print("no")
        #     return "Invalid"
