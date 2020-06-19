from flask import Flask

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

from modules import hello
from modules import Register
from modules import askhelp
from modules import Feeddata
from modules import volunteer
from modules import resetpwd