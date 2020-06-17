from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base

from modules import app
from flask import jsonify

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:@localhost:5432/communityproject'
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
        print("email", data['email'])
        # print("email", data['email'])

        # get all posts from Post table
        all_posts = db.session.query(Post).all()
        post_data = []
        for r in all_posts:
            print(r.deadline)
            post_data.append(
                {"post_id": r.post_id, "title": r.post_title, "description": r.post, "post_user_id": r.post_user_id,
                 "deadline": r.deadline})   

        print(post_data)
        print("data", jsonify({'posts': post_data}))
        return jsonify({'posts': post_data})
        # return in json array format
