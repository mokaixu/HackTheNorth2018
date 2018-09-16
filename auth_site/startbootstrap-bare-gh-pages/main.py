from flask import Flask, render_template, Response, request
import json
import requests 
import ast
import time

app = Flask(__name__)


# @app.route('/username', methods=['POST'])
# def update_username():

#     username = (request.form)['username']
#     return Response(status=200)

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
	status = d['status']
	print(d['status'])
	timeout = time.time() + 60
	test = 10
	while status == 'auth_wait' or status == 'none' or time.time() > timeout:
		
		r = requests.post('http://52.186.120.229/device_state', data={'user_id':user})
		json_acceptable_string = r.content.replace("'", "\"")
		d = json.loads(json_acceptable_string)
		status = d['status']
		print(status)
		print(time.time())
		time.sleep(0.5)
		# test -=1
		# if test == 0:
		# 	status = 'auth_success'
		# 	break

	if status == 'auth_fail':
		return Response(json.dumps({
        'status': 400
    }), mimetype='application/json') 

	elif status == 'auth_wait':
		return Response(json.dumps({
        'status': 504
    }), mimetype='application/json') 

	else:
		return Response(json.dumps({
        'status': 200
    }), mimetype='application/json', status=200) 
	



if __name__ == "__main__":
	app.run()


#  curl -X POST http://52.186.120.229/begin_login --data user_id=mokai
#curl -X POST http://52.186.120.229/device_state --data user_id=mokai
