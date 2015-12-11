type = ['','info','success','warning','danger'];
    	

demo = {
    initBoxPlot: function(box_data) {
      //var obs_data = JSON.parse(box_data)
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
          // Create the chart
          $('#chartHours').highcharts('StockChart', {
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
    initSyncChart: function () {
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

