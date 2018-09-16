from flask import Flask, render_template, Response, request
import json
import requests 
import ast

app = Flask(__name__)


@app.route('/username', methods=['POST'])
def update_username():

    username = (request.form)['username']
    return Response(status=200)

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/check_state', methods=['POST'])
def check_state():
	user = request.form['user_id']
	print(user)
	r = requests.post('http://52.186.120.229/device_state', data={'user_id':user})
	json_acceptable_string = r.content.replace("'", "\"")
	d = json.loads(json_acceptable_string)
	print(d['status'])

	while d['status'] == 'auth_wait':
		

	

	print(dir(r))
	return Response(status=200)
	



if __name__ == "__main__":
	app.run()


#  curl -X POST http://52.186.120.229/begin_login --data user_id=mokai
#curl -X POST http://52.186.120.229/device_state --data user_id=mokai
