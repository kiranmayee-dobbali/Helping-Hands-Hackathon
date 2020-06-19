# -*- coding: utf-8 -*-
"""
Created on Tue Jun  2 17:50:33 2020

@author: bhanu
"""
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import psycopg2
import re
import hashlib,datetime
#from flask_mysqldb import MySQL
from modules import app



app.config['JSON_SORT_KEYS'] = False





@app.route('/registration', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    print('in register')
    msg = ''
    # Check if "username", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST':
        if 'fname' in request.form and 'lname' in request.form and 'bday' in request.form and 'gender' in request.form and 'phone' in request.form and 'email' in request.form and 'passwrd' in request.form and 'loc' in request.form:
            # Create variables for easy access
            fname = request.form['fname']
            lname = request.form['lname']
            bday = request.form['bday']
            gender = request.form['gender']
            phone = request.form['phone']
            email = request.form['email']
            passwrd = request.form['passwrd']
            loc = request.form['loc']
            cntry = request.form['country']
            stat = request.form['state']
            # Check if account exists using MySQL
            con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
            cur = con.cursor()
            cur.execute('SELECT COUNT(*) FROM Users WHERE EmailId = %s',(email,))
            account = cur.fetchone()
            # If account exists show error and validation checks
            if account == 0:
                msg = 'Account already exists!'
            elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                msg = 'Invalid email address!'
            elif not re.match(r'[A-Za-z]+', fname):
                msg = 'First Name must contain only characters!'
            elif not re.match(r'[A-Za-z]+', lname):
                msg = 'Last Name must contain only characters!'
            elif not re.match(r'[0-9]+', phone):
                msg = 'Phone must contain only numbers!'
            elif not fname or not lname or not email or not passwrd or not phone or not gender or not bday or not loc:
                msg = 'Please fill out the form!'
            else:
                # Account doesnt exists and the form data is valid, now insert new account into accounts table
                sql = """INSERT INTO Users VALUES(DEFAULT, %s);"""
                #cur.execute('INSERT INTO Users VALUES (DEFAULT,'+ fname +', ' + lname +', '+ bday +', '+ gender + ', '+ email + ', '+ phone + ', '+ loc +', '+ 'crypt('+passwrd+ ', gen_salt("bf"))' + ');')
                t_hashed = hashlib.sha256(passwrd.encode())
                t_password = t_hashed.hexdigest()

                date_time_obj = datetime.datetime.strptime(bday, '%Y-%m-%d')

                print(len(t_password))

                gender = 'M' if gender == 'Male' else 'F'



                #cur.execute(sql, (fname, lname, date_time_obj.date(), gender, email, int(phone), loc, t_password))
                cur.execute("INSERT INTO Users VALUES (DEFAULT,'"+ fname +"', '" + lname +"', '"+ bday +"', '"+ gender + "', '"+ email + "', '"+ phone + "', '"+ loc +"', '" +passwrd  +"', '" +cntry  +"', '" +stat  + "');")
                cur.close()
                con.commit()
                con.close()
                msg = 'Success'
        else:
            # Form is empty... (no POST data)
            msg = 'Please fill out the form!'
        # Show registration form with message (if any)
        print(msg)
    return msg

@app.route('/Mytasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'POST':
        if 'id' in request.form:
            user_id = request.form['id']
            con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
            cur = con.cursor()

            cur.execute("SELECT POST_TITLE, DEADLINE, STATUS, POST_ID, CASE WHEN ( CHOICE = 'E' OR CHOICE = 'B') THEN U.EMAILID END, CASE WHEN ( CHOICE = 'P' OR CHOICE = 'B') THEN U.PHONENUMBER END, POST FROM Posts, USERS U WHERE Volunteer_id ="+user_id+" and POST_USER_ID = U.USER_ID AND  STATUS = 'P' ;")

            tuples = cur.fetchall()
            cur.close()
            con.commit()
            con.close()
            all_posts=[]
            
            for user in tuples:
                all_posts.append({'title':user[0], 'status':user[2],'deadline':str(user[1]).replace('00:00:00 GMT',''), 'Id':user[3], 'phone':user[5], 'email':user[4],'post':user[6] })
            
            for t in tuples:
                print(t)
            
            return jsonify(all_posts)
        else:
            print('Error')

@app.route('/Myposts', methods=['GET', 'POST'])
def posts():
    if request.method == 'POST':
        if 'id' in request.form:
            user_id = request.form['id']
            con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
            cur = con.cursor()
            cur.execute("SELECT POST_TITLE, DEADLINE, STATUS, POST_ID, POST  FROM Posts WHERE post_user_id ="+user_id+" and (STATUS = 'P' or STATUS = 'N') ;")
            tuples = cur.fetchall()
            cur.close()
            con.commit()
            con.close()
            
            all_posts = [{'title':user[0], 'status':user[2],'deadline':str(user[1]).replace('00:00:00 GMT',''), 'Id':user[3], 'post':user[4]  } for user in tuples]
            
            for t in tuples:
                print(t)
            
            return jsonify(all_posts)
        else:
            print('Error')

@app.route('/MyTaskStatus', methods=['GET', 'POST'])
def UpdateStatus():
    if request.method == 'POST':
        if 'status' in request.form and 'id' in request.form:
            #print('In if')
            stats = request.form['status']
            rowid = request.form['id']
            print(stats,rowid)
            con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
            cur = con.cursor()
            cur.execute("UPDATE POSTS SET status ='" + stats + "' WHERE POST_ID = "+ rowid + ";")
            cur.close()
            con.commit()
            con.close()
    return 'Success'

@app.route('/Profile', methods=['GET', 'POST'])
def showProfile():
    if request.method == 'POST':
        if 'id' in request.form:
            user_id = request.form['id']
            print(user_id)
            con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
            cur = con.cursor()
            cur.execute("SELECT firstname,lastname,birthday,emailid,phonenumber,location,country,state from USERS WHERE USER_ID ="+ user_id+" ;")
            tuples = cur.fetchall()
            cur.close()
            con.commit()
            con.close()
            user_info = {'fname':tuples[0][0],'lname':tuples[0][1],'bday':tuples[0][2].strftime('%Y-%m-%d'),'email':tuples[0][3],'phone':str(tuples[0][4]),'loc':tuples[0][5],'country':tuples[0][6],'region':tuples[0][7]}
            print(user_info)
    
    return jsonify(user_info)

@app.route('/ProfileUpdate', methods=['GET', 'POST'])
def updateProfile():
    if request.method == 'POST':
        if 'id' in request.form and 'fname' in request.form and 'lname' in request.form and 'bday' in request.form and 'phone' in request.form and 'email' in request.form and 'loc' in request.form and 'country' in request.form and 'state' in request.form:
            # Create variables for easy access
            user_id = request.form['id']
            fname = request.form['fname']
            lname = request.form['lname']
            bday = request.form['bday']
            phone = request.form['phone']
            email = request.form['email']
            loc = request.form['loc']
            cntry = request.form['country']
            stat = request.form['state']
            
            con = psycopg2.connect(dbname="communityproject", user="postgres", password="dbpassword")
            cur = con.cursor()
            cur.execute("UPDATE USERS SET firstname ='" + fname +"', lastname ='"+lname+"' ,birthday ='"+bday +"' , phonenumber='"+phone+"' ,location='"+loc+"' , country='"+cntry+"' , state='"+ stat+"' WHERE USER_ID = "+ user_id + ";")
            print(cur)
            cur.close()
            con.commit()
            con.close()
        return 'Success'
    
    


# if __name__ == '__main__':
#     # This is used when running locally only. When deploying to Google App
#     # Engine, a webserver process such as Gunicorn will serve the app. This
#     # can be configured by adding an `entrypoint` to app.yaml.
#     app.run()
