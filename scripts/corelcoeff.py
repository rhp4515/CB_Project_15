import pg8000
import sys, traceback
import AnalysisUtils
import pandas as pd
#from sklearn.utils import check_arrays
#from sklearn.utils.validation import check_array as check_arrays
from sklearn.metrics import mean_absolute_error
import numpy as np
import scipy as sp
from scipy.stats import pearsonr
from scipy.stats import spearmanr

try:
    conn = pg8000.connect(user="postgres", password="forgotpassword", database="cb15rna", host="cb15rna.ciacashmbpf0.us-east-1.rds.amazonaws.com")
    cur = conn.cursor()
    cur.execute("select f.tpm,t.exp_frac from truth as t join sailfish as f on (t.tid=f.tid)")
    metrics = cur.fetchall()
    
    cur.execute("select t.tid,f.tpm,t.exp_frac from truth as t join sailfish as f on (t.tid=f.tid)")
    metrics_corcof = cur.fetchall()
    cur.close()

    conn.close()
    
    exp_frac = []
    tpm = []
    for metric in metrics:
        exp_frac.append(metric[0])
        tpm.append(metric[1])
    metrics1 = sp.array(exp_frac)
    y_actual = metrics1

    metrics2 = sp.array(tpm)
        y_hat=metrics2

    l = min(len(metrics1), len(metrics2))
    print 'rsem results'
    pearson = pearsonr(metrics1[:l], metrics2[:l])
    print 'pearson:'
    print pearson

    spearman = spearmanr(metrics1,metrics2)
    print 'spearman:'
    print spearman

    mae = mean_absolute_error(metrics1, metrics2)
    print 'mae:'
    print mae
        
    expfract = []
    tpmt = []
    tidt = []
    for yui in metrics_corcof:
        tidt.append(yui[0])
        tpmt.append(yui[1])
        expfract.append(yui[2])
        
    s1 = sp.array(expfract)
    s2 = sp.array(tpmt)
    index1 = sp.array(tidt)

    offset = 0.01
    DF = {'one' : pd.Series(s1, index=index1),'two' : pd.Series(s2, index=index1)}
    ouput = (2.0 * np.log(DF['one'] + offset).cov(np.log(DF['two'] + offset))) / (np.log(DF['one'] + offset).var() + np.log(DF['two'] + offset).var())
    print 'proportionality correlation'
    print ouput
    

    '''
    TP = 0
    FP = 0
    TN = 0
    FN = 0
    
    for i in range(len(y_hat)): 
        if y_actual[i]==y_hat[i]:
           TP += 1
    for i in range(len(y_hat)): 
        if y_actual!=y_hat[i]:
           FP += 1
    for i in range(len(y_hat)): 
        if y_actual[i]==y_hat[i]==0:
           TN += 1
    for i in range(len(y_hat)): 
        if y_actual[i]==0 and y_actual!=y_hat[i]:
           FN += 1
    
    print TP
    print FP
    '''


except:
    traceback.print_exc()