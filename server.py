from flask import Flask
from flask import Flask, request, render_template
import json
import random
import pg8000
import sys, traceback

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

def get_corr_metrics(table_name, offset):
	try:
		conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
		cur = conn.cursor()
		cur.execute("select t.tid, t.exp_frac, g.tpm_norm from "+table_name+ " g, truth t where t.tid=g.tid order by t.tid limit 100 offset "+offset)
		metrics = cur.fetchall()
		cur.close()
		conn.close()
		metricDict = {}
		corr_list = []
		for metric in metrics:
			corr = {'id':metric[0],'x':metric[1], 'y': metric[2]}
			corr_list.append(corr)

		metricDict['corr'] = corr_list
		return metricDict
	except:  
		traceback.print_exc()


def get_metrics(table_name, offset):
	try:
		conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
		cur = conn.cursor()
		cur.execute("select t.tid, t.length, t.tpm, g.gc from "+table_name+ " t, gc_content g where t.tid=g.tid and t.tpm > 0 order by tid limit 100 offset "+offset)
		metrics = cur.fetchall()
		cur.close()
		conn.close()
		metricDict = {}
		gcTPM = []
		lenTPM = []
		for metric in metrics:
			gc = {'id':metric[0],'x':metric[3], 'y': metric[2]}
			length = {'id':metric[0],'x': metric[1],'y':metric[2]}
			gcTPM.append(gc)
			lenTPM.append(length)
			
		metricDict['gcTPM'] = gcTPM
		metricDict['lenTPM'] = lenTPM	
		return metricDict
	except:  
		traceback.print_exc()

@app.route('/tids')
def fetch_tids():
	try:
		conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
		cur = conn.cursor()
		cur.execute("select distinct tid from differential order by tid")
		tids = cur.fetchall()
		cur.close()
		conn.close()
		tids_dict ={}
		tids_dict['tids'] = [tid[0] for tid in tids]
		print tids_dict
		return json.dumps(tids_dict)
	except:  
		traceback.print_exc()

@app.route('/metrics')
def metrics():
	offset = request.args.get('offset')
	metrics = {}

	metrics['kallisto_corr'] = get_corr_metrics('kallisto', offset)
	metrics['rsem_corr'] = get_corr_metrics('rsem', offset)
	metrics['sailfish_corr'] = get_corr_metrics('sailfish', offset)
	metrics['kallisto'] = get_metrics('kallisto', offset)
	metrics['rsem'] = get_metrics('rsem', offset)
	metrics['sailfish'] = get_metrics('sailfish', offset)

	return json.dumps(metrics)

@app.route('/sync')
def sync():
	tids = request.args.getlist('tid')
	return json.dumps(tids)


@app.route('/')
def index():
	return app.send_static_file('index.html')	

if __name__ == '__main__':
    app.run(debug=True)