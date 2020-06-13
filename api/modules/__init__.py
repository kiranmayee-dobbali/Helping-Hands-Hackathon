from flask import Flask

app = Flask(__name__)

from modules import hello
from modules import Register
from modules import askhelp