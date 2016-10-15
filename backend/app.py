import requests
import json
from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__,static_url_path='')
app.debug = True

@app.route('/')
def index():
    return render_template('index.html');

if __name__ == '__main__':
    app.run()#host='0.0.0.0')
