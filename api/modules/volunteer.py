from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base

from modules import app

from datetime import date

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dbpassword@localhost:5432/communityproject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "True"
db = SQLAlchemy(app)

# poststable = db.Table('posts', db.metadata, autoload=True, autoload_with=db.engine)

Base = automap_base()
Base.prepare(db.engine, reflect=True)
Post = Base.classes.posts
User = Base.classes.users


@app.route('/volunteering', methods=['POST', 'GET'])
def volunteering():
    if request.method == "POST":
        data =  request.get_json(force=True)
        print("post data", data)
        print("volunteer user email:", data['emailid'])
        print("post id", data['post_id'])
        #get volunteer id using username

        volunteer_id = db.session.query(User.user_id).filter(User.emailid == data['emailid']).scalar()
        print("volunteer id", volunteer_id)

        post_record = db.session.query(Post).get(data['post_id'])
        post_record.volunteer_id = volunteer_id
        db.session.commit()

        return "Valid"
