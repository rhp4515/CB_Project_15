type = ['','info','success','warning','danger'];

dashboard_containers = ['kallisto_gcVsTpm', 'kallisto_lenVsTpm', 'rsem_gcVsTpm', 'rsem_lenVsTpm', 'sailfish_gcVsTpm', 'sailfish_lenVsTpm'];
corr_containers = ['kallisto_expFracVsTpm', 'rsem_expFracVsTpm', 'sailfish_expFracVsTpm'];

function onPointMouseOver(chartId, tid, plotType) {
    switch(plotType) {
        case 0:
        containers = dashboard_containers;
        break;
        case 1:
        containers = corr_containers;
        break;
        default:
        alert("Can't find graph containers");
    }
    for (var c = 0; c < containers.length; c++) {
        if(containers[c] == chartId) {
            continue;
        }
        var chart = $('#'+containers[c]).highcharts();
        for (var i = 0; i < chart.series[0].data.length; i++) {
            if (tid == chart.series[0].data[i].id) {
                chart.series[0].data[i].setState('select');
            }
            else {
                chart.series[0].data[i].setState();
            }
        }
    }
}

function onPointMouseOut(plotType) {
    switch(plotType) {
        case 0:
        containers = dashboard_containers;
        break;
        case 1:
        containers = corr_containers;
        break;
        default:
        alert("Can't find graph containers");
    }
    for (var c = 0; c < containers.length; c++) {
        var chart = $('#'+containers[c]).highcharts();
        for (var i = 0; i < chart.series[0].data.length; i++) {
            chart.series[0].data[i].setState();
        }
    }
}

chart = {
    initScatterPlotForGcVsTpm: function(id, title, data) {
      // alert(id);
        $("#"+id).highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: title
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'GC Content'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'TPM'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            enabled:false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                point: {
                    events: {
                        click: function (e) {
                            window.open("http://www.ensembl.org/Homo_sapiens/Transcript/Summary?t="+this.id,"_blank")
                        },
                        mouseOver: function (e) {
                            onPointMouseOver(id, this.id, 0);
                        },
                        mouseOut: function (e) {
                            onPointMouseOut(0);
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '{point.id}',
                    pointFormat: '<b>{point.id}</b><br>TPM: {point.y}, GC: {point.x}'
                }
            }
        },
        credits: {
                    enabled: false
        },
        series: [{
            name: 'GC vs TPM',
            color: 'rgba(119, 152, 191, .5)',
            data: data}]
    });
    },
    initScatterPlotForLenVsTpm: function(id,title, data) {
      // alert(id);
        $("#"+id).highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: title
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Length'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'TPM'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            enabled:false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                point: {
                    events: {
                        click: function (e) {
                            window.open("http://www.ensembl.org/Homo_sapiens/Transcript/Summary?t="+this.id,"_blank")
                        },
                        mouseOver: function (e) {
                            onPointMouseOver(id, this.id, 0);
                        },
                        mouseOut: function (e) {
                            onPointMouseOut(0);
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '{point.id}',
                    pointFormat: '<b>{point.id}</b><br>TPM: {point.y}, Read Length: {point.x}'
                }
            }
        },
        credits: {
                    enabled: false
        },
        series: [{
            name: 'Length vs TPM',
            color: 'rgba(223, 83, 83, .5)',
            data: data }]
    });
    },
    initScatterPlotForExpFracVsTpm: function(id, title, data) {
      // alert(id);
        $("#"+id).highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: title
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Normalized Expected Fraction'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Normalized TPM'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            enabled:false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                point: {
                    events: {
                        click: function (e) {
                            window.open("http://www.ensembl.org/Homo_sapiens/Transcript/Summary?t="+this.id,"_blank")
                        },
                        mouseOver: function (e) {
                            onPointMouseOver(id, this.id, 1);
                        },
                        mouseOut: function (e) {
                            onPointMouseOut(1);
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '{point.id}',
                    pointFormat: '<b>{point.id}</b><br>TPM: {point.y}, Truth: {point.x}'
                }
            }
        },
        credits: {
                    enabled: false
        },
        series: [{
            name: 'Truth TPM vs TPM',
            color: 'rgba(119, 152, 191, .5)',
            data: data}]
    });
    },
    initSparkline: function(sparkline_data) {
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
          // Create the chart
          $('#chartPreferences').highcharts('StockChart', {
              rangeSelector : {
                  selected : 1
              },

              title : {
                  text : 'AAPL Stock Price'
              },

              series : [{
                  name : 'AAPL',
                  data : data,
                  tooltip: {
                      valueDecimals: 2
                  }
              }]
          });
      });
    },
    initSyncChart: function (data) {
        document.getElementById('syncCharts').innerHTML='';
        for (var key in data){
            console.log(JSON.stringify(data[key]));
            var experiment = data[key];
            var series = []
            for (var tid in experiment) {
                tids = experiment[tid]
                for (i in tids) {
                  date = new Date(Date.parse(tids[i][0]));
                  tids[i][0] = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                  console.log(tids[i][0]);
                }
                series.push({
                    name:tid,
                    data: tids
                });
            }  
            $('<div class="chart">')
                .appendTo('#syncCharts')
                .highcharts({
                    chart: {
                        spacingLeft: 10,
                        spacingRight: 50,
                        marginLeft: 100, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x',
                        type: 'spline'
                    },
                    title: {
                        text: "Experiment #"+key,
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'TPM'
                        },
                        min: 0
                    },
                    plotOptions: {
                      spline: {
                            marker: {
                                enabled: true
                            },
                            point: {
                                events: {
                                    click: function (e) {
                                        window.open("http://www.ensembl.org/Homo_sapiens/Transcript/Summary?t="+this.series.name,"_blank")
                                    }
                                }
                            }
                        }
                    },
                    series: series
                }
            );
        }
    }    
}

