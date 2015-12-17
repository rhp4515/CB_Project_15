# Combine Labs - RNA sequencing UI Tool
A web application for visualizing RNA sequencing results from the following tools/experiments
* Kallisto
* Sailfish
* RSEM

# Tech Stack
* Python
* Flash Web Framework
* Scikit-Learn Library
* PostgreSQL Database
* Bootstrap UI
* Highcharts
* Bootstrap Data Tables


## Getting Started
##### Python Installation
https://www.python.org/downloads/
##### Flask Installation
http://flask.pocoo.org/docs/0.10/installation/
##### scikit-learn Installation
http://scikit-learn.org/stable/install.html
##### PostgreSQL Installation
http://www.postgresql.org/download/
##### pg8000 python-postgreSQL driver
https://pypi.python.org/pypi/pg8000

###### Use the `cb_psql_cmds.txt` file to create database tables and import the experiment.
###### The code should be modified to point to the local database. This code change should be done in corecoeff.py and server.py.
###### Use the files in the `scripts/` folder to convert, compute and store the results into the database. 
* `fasta_parser.py`
* `corelcoeff.py`

##### Then start the server using
`python server.py` and visit http://localhost:5000 to visualize the dashboard 









