from flask import Flask
from flask import Flask, request, render_template
import json
import random

app = Flask(__name__, static_url_path='/static')

usr_obj = {}

data = [[[760, 801, 848, 895, 965], [733, 853, 939, 980, 1080], [714, 762, 817, 870, 918], [724, 802, 806, 871, 950]],
		[[12, 20, 34, 10, 23], [34, 24, 12, 45, 34], [13, 46, 2, 3, 6], [33, 43, 10, 19, 18]],
        [[67, 45, 78, 67, 68], [95, 54, 45, 68, 78], [13, 46, 2, 3, 6], [33, 43, 10, 19, 18]]]

@app.route('/user')
def users():
	usr_obj["uid"] = request.args.get('id')
	usr_obj["box"] = {}
	usr_obj["box"]["data"] = data[random.randint(0, 2)]

	usr_obj["box"]["outlier_data"] = [
										[0, 644],
										[4, 718],
										[4, 951],
										[4, 969]
									]
	return json.dumps(usr_obj)


@app.route('/')
def index():
	return app.send_static_file('index.html')	

if __name__ == '__main__':
    app.run(debug=True)