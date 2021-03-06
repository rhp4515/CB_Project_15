from flask import Flask
from flask import Flask, request, render_template
import json
import random
import pg8000
import sys, traceback

app = Flask(__name__, static_url_path='/static')

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
		cur.execute("select t.tid, t.length, t.tpm, g.gc from "+table_name+ " t, gc_content g where t.tid=g.tid order by tid limit 100 offset "+offset)
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
		# print "length of gcTPM", len(gcTPM)
		# print "length of lenTPM", len(lenTPM)
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
		# print tids_dict
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
	if len(tids) == 0:
		return json.dumps({})
	try:
		conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
		cur = conn.cursor()
		cur.execute("select time, tid, tpm*1000000, attempt from differential where tid in ("+','.join("'"+tid+"'" for tid in tids)+") order by tid,attempt,time")
		data = cur.fetchall()
		cur.close()
		conn.close()
		data_dict = {}
		for d in data:
 			d[0] = str(d[0])
 			if d[3] not in data_dict.keys():
				data_dict[d[3]] = {}
			if d[1] not in data_dict[d[3]].keys():
				data_dict[d[3]][d[1]] = [[d[0],d[2]]]  
			else:
				data_dict[d[3]][d[1]].append([d[0],d[2]])
		# print json.dumps(data_dict)
		return json.dumps(data_dict)
	except:  
		traceback.print_exc()
	return json.dumps(tids)

@app.route('/coefficients')
def coefficient():
	try:
		conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
		cur = conn.cursor()
		cur.execute("select experiment,pearsoncoeff,spearmancoeff,proportionality_correlation,mae,tp,fp from summary")
		data = cur.fetchall()
		cur.close()
		conn.close()
		return json.dumps(data)
	except:  
		traceback.print_exc()
	return json.dumps(tids)

def construct_query(table_name, start, length, direction, col):
	exp_dict = {
		"kallisto": ['tid', 'length', 'eff_length', 'est_count', 'tpm'],
		"rsem": ['tid', 'gene_id', 'length', 'eff_length', 'est_count', 'tpm', 'fpkm', 'isopct'],
		"sailfish": ['tid', 'length', 'tpm', 'num_reads']
	}
	col_names = ', '.join(exp_dict[table_name])
	# print col_names
	query = "select " + col_names +" from "+table_name+" where tid ilike %s order by "+ exp_dict[table_name][int(col)]+" "+direction+" limit "+length+" offset "+start
	# print query
	return query

def get_table_data(exp_name, start, length, direction, col, query):
	try:
		conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
		
		cur = conn.cursor()
		qstr = construct_query(exp_name, start, length, direction, col)
		format_qstr = '%'+query+'%'
		cur.execute(qstr, (format_qstr,))
		data = cur.fetchall()
		cur.close()

		cur = conn.cursor()
		cur.execute('select count(*) from '+exp_name)
		count = cur.fetchall()
		cur.close()

		cur = conn.cursor()
		cur.execute('select count(*) from '+exp_name+' where tid ilike %s',(format_qstr,))
		filteredCount = cur.fetchall()
		cur.close()
		
		conn.close()
		dataList = list(data)
		return {'recordsTotal':count[0][0],'recordsFiltered':filteredCount[0][0],'data':dataList}
	except:  
		traceback.print_exc()

@app.route('/table')
def load_table():
	start = request.args.get('start')
	length = request.args.get('length')
	direction = request.args.get('order[0][dir]')
	col = request.args.get('order[0][column]')
	query = request.args.get('search[value]')
	exp_name = request.args.get('exp_name')
	
	data = get_table_data(exp_name, start, length, direction, col, query)

	return json.dumps(data)

@app.route('/')
def index():
	return app.send_static_file('index.html')	

if __name__ == '__main__':
    app.run(debug=True)