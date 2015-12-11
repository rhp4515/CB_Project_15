type = ['','info','success','warning','danger'];
    	

demo = {
    initBoxPlot: function(box_data) {
      //var obs_data = JSON.parse(box_data)
      $('#chartHours').highcharts({
          chart: {
              type: 'boxplot'
          },
          title: {
              text: 'Highcharts Box Plot Example'
          },
          legend: {
              enabled: true
          },
          xAxis: {
              categories: ['1', '2', '3', '4', '5'],
              title: {
                  text: 'Experiment No.'
              }
          },
          yAxis: {
              title: {
                  text: 'Observations'
              },
              plotLines: [{
                  value: 932,
                  color: 'red',
                  width: 1,
                  label: {
                      text: 'Theoretical mean: 932',
                      align: 'center',
                      style: {
                          color: 'gray'
                      }
                  }
              }]
          },
          series: [{
              name: 'Observations',
              data: box_data.data,
              tooltip: {
                  headerFormat: '<em>Experiment No {point.key}</em><br/>'
              }
          }, {
              name: 'Outlier',
              color: Highcharts.getOptions().colors[0],
              type: 'scatter',
              data: box_data.outlier_data,
              marker: {
                  fillColor: 'white',
                  lineWidth: 1,
                  lineColor: Highcharts.getOptions().colors[0]
              },
              tooltip: {
                  pointFormat: 'Observation: {point.y}'
              }
          }]

      });

      $('#chartHours1').highcharts({
          chart: {
              type: 'boxplot'
          },
          title: {
              text: 'Highcharts Box Plot Example'
          },
          legend: {
              enabled: true
          },
          xAxis: {
              categories: ['1', '2', '3', '4', '5'],
              title: {
                  text: 'Experiment No.'
              }
          },
          yAxis: {
              title: {
                  text: 'Observations'
              },
              plotLines: [{
                  value: 932,
                  color: 'red',
                  width: 1,
                  label: {
                      text: 'Theoretical mean: 932',
                      align: 'center',
                      style: {
                          color: 'gray'
                      }
                  }
              }]
          },
          series: [{
              name: 'Observations',
              data: box_data.data,
              tooltip: {
                  headerFormat: '<em>Experiment No {point.key}</em><br/>'
              }
          }, {
              name: 'Outlier',
              color: Highcharts.getOptions().colors[0],
              type: 'scatter',
              data: box_data.outlier_data,
              marker: {
                  fillColor: 'white',
                  lineWidth: 1,
                  lineColor: Highcharts.getOptions().colors[0]
              },
              tooltip: {
                  pointFormat: 'Observation: {point.y}'
              }
          }]

      });
      
    },

    initSparkline: function(sparkline_data) {
        $('#chartPreferences').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Average fruit consumption during one week'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Fruit units'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    });
    $('#chartPreferences1').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Average fruit consumption during one week'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Fruit units'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    });
    },
  	showNotification: function(from, align){
      	color = Math.floor((Math.random() * 4) + 1);
      	
      	$.notify({
          	icon: "pe-7s-gift",
          	message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
          	
          },{
              type: type[color],
              timer: 4000,
              placement: {
                  from: from,
                  align: align
              }
          });
  	},
    syncChart: function () {

    /**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    $('#syncCharts').bind('mousemove touchmove', function (e) {
        var chart,
            point,
            i;

        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            chart = Highcharts.charts[i];
            e = chart.pointer.normalize(e); // Find coordinates within the chart
            point = chart.series[0].searchPoint(e, true); // Get the hovered point

            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(e, point); // Show the crosshair
            }
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }

    // Get the data. The contents of the data file can be viewed at
    // https://github.com/highslide-software/highcharts.com/blob/master/samples/data/activity.json
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=activity.json&callback=?', function (activity) {
        $.each(activity.datasets, function (i, dataset) {

            // Add X values
            dataset.data = Highcharts.map(dataset.data, function (val, j) {
                return [activity.xData[j], val];
            });

            $('<div class="chart">')
                .appendTo('#syncCharts')
                .highcharts({
                    chart: {
                        marginLeft: 40, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x'
                    },
                    title: {
                        text: dataset.name,
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
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: '{value} km'
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '18px'
                        },
                        valueDecimals: dataset.valueDecimals
                    },
                    series: [{
                        data: dataset.data,
                        name: dataset.name,
                        type: dataset.type,
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
                            valueSuffix: ' ' + dataset.unit
                        }
                    }]
                });
        });
    });
}

    
}

