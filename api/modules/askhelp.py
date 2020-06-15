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


# con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
# cur = con.cursor()

@app.route('/askhelp', methods=['POST', 'GET'])
def ask_help():
    if request.method == "POST":
        # insert into the table
        posts_data = request.json
        print("post data", posts_data)
        print("user email:", posts_data['email'])
        print("post title", posts_data['title'])
        print("post description", posts_data['postDescription'])

        post_description = posts_data['postDescription']
        post_title = posts_data['title']
        post_deadline = posts_data['selectedDate']

        # select user id for the given email id
        user_id = db.session.query(User.user_id).filter(User.emailid == posts_data['email']).scalar()
        print("user id", user_id)

        print("user class",User)
        new_volunteer_id = 0
        post_date = date.today()
        # Insert into posts(title, post description) where userid = user_id
        new_post_record = Post(post_user_id =user_id,post=post_description,status="New",volunteer_id=new_volunteer_id,post_time=post_date,deadline=post_deadline,post_title=post_title)
        db.session.add(new_post_record)
        db.session.commit()
        # cur.execute(
        #     "INSERT INTO posts VALUES (DEFAULT,'" + user_id + "', '" + post_description + "', '" + "New" + "', '" + new_volunteer_id + "', '" + post_date + "', '" + post_date + "', '" + post_title+ "');")
        # cur.close()
        # con.commit()
        # con.close()

        results = db.session.query(Post).all()

        for r in results:
            print(r.post)

    return "Valid"
