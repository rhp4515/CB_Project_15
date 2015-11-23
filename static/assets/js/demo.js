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
  	}

    
}

