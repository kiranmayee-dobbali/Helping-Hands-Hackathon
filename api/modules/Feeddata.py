from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base

from modules import app
from flask import jsonify

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dbpassword@localhost:5432/communityproject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "True"
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)
Post = Base.classes.posts
User = Base.classes.users


@app.route('/feeddata', methods=['POST', 'GET'])
def feed_data():
    # get loggedin user id and his location
    # get user ids from the same location of loggedin user
    # get posts from post table with obtained user ids
    # send them to react
    if request.method == "POST":
        data = request.get_json(force=True)
        print("login user id", data['login_user_id'])
        # print("email", data['email'])

        # get location for the given user login id
        location_state = db.session.query(User.state).filter(User.user_id == data['login_user_id']).scalar()
        print("location_state id", location_state)

        all_user_ids = db.session.query(User.user_id).filter(User.state == location_state).all()
        print("all user id from same location",all_user_ids)
        post_data = []


        all_users = db.session.query(User.user_id,User.firstname).filter(User.state == location_state).all()
        print("all users from same location",all_users)
        for user_id,user_name in all_users:
            result = db.session.query(Post).filter(Post.post_user_id == user_id).filter(Post.status=='N').all()
            for r in result:
                post_data.append(
                    {"post_id": r.post_id, "title": r.post_title, "description": r.post, "post_user_id": r.post_user_id,
                     "deadline":  str(r.deadline).replace('00:00:00 GMT',''),"user_name":user_name})

        print(post_data)
        print("data", jsonify({'posts': post_data}))
        return jsonify({'posts': post_data})
        # return in json array format
