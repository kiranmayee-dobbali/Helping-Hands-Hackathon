from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base

from modules import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dbpassword@localhost:5432/communityproject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "True"
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)
User = Base.classes.users

@app.route('/resetpassword', methods=['POST', 'GET'])
def reset_password():
    if request.method == "POST":
        data = request.json
        print(data)


        # select pwd for the given email id
        current_pwd = db.session.query(User.password).filter(User.emailid == data['email']).scalar()
        print("curr pwd", current_pwd)
        if(current_pwd==None):
            return "Invalid email"
        if(current_pwd!=data['currentpassword']):
            return "Invalid current password"



        # select user id for the given email id
        user_id = db.session.query(User.user_id).filter(User.emailid == data['email']).scalar()
        # print("user id", user_id)
        # update password field


        user_record = db.session.query(User).get(user_id)
        print("user rec",user_record)
        user_record.password = data['newpassword']
        db.session.commit()

        return "Valid"