Highcharts.setOptions({
	global: {
		useUTC: false
	}
});

function drawSitePercentage($container, options) {
	var url = '/fund/get_site_percentage.json?site='+options;
	$.get(url, {}, function(response){
		dataArr = response;

		if(dataArr!=null && dataArr!=''){
			var temp=dataArr[0][1];
			for(var i=0;i<dataArr.length;i++){
				if(temp>dataArr[i][1]){
					temp=dataArr[i][1];
				}
			}
		}else{
			var temp=0;
		}
	
		var $chart = $('<div></div>').addClass('chart-area');
		$chart.appendTo($container).highcharts({
			chart: {
				type: 'line',
				height: 100
			},
			title: {
				text: ''
			},
			xAxis: {
				type: 'datetime',
				title: {
					text: ''
				},
				labels: {
					formatter: function(){return Highcharts.dateFormat('%m/%d', this.value);}
				},
				tickColor: 'transparent',
				lineColor: '#eee',
				gridLineWidth: 1,
				gridLineDashStyle: 'dot',
				showFirstLabel: true,
				showLastLabel: true
			},
			yAxis: {
				title: {
					text: ''//'贷款总数'
						//align: 'high',
						//rotation: 0
				},
				labels: {
					format: '{value}%',
					style: {
						//color: '#ff7237'
					}
				},
				min: temp,
				gridLineDashStyle: 'dot'
					//max: parseInt(dataArr.count.max) + 10,
					//gridLineColor: 'transparent'
			},
			
			tooltip: {
				formatter: function() {
					var s;
					if (this.point.name) { // the pie chart
						s = ''+   this.point.name +': '+ this.y +' fruits';
					} else {
						s = ''+ Highcharts.dateFormat('%m/%d', this.x) +': '+ this.y+'%';
					}
					return s;
				}
			},
			legend: {
				enabled: false,
				//layout: 'vertical',
				align: 'center',
				verticalAlign: 'top',
				floating: true,
				borderWidth: 0
			},
			
			series: [
			         {
			        	 name: '贷款总数',
			        	 data: dataArr, 
			        	 color: '#ee6343',
			        	 marker: {
			        		 radius: 7,
			        		 lineWidth: 3,
			        		 lineColor: '#fff',
			        		 fillColor: '#ee6343'
			        	 }
			         }]
		});
	});
	
}

function drawInterestTrend($container, options) {
	
	var url = '/fund/get_Interest_trend.json?type='+options;
	
	$.get(url, {}, function(response){
		dataArr = response;

		var temp=dataArr[0][1];
		for(var i=0;i<dataArr.length;i++){
			if(temp>dataArr[i][1]){
				temp=dataArr[i][1];
			}
		}
		
    var $chart = $('<div></div>').addClass('chart-area');
    $chart.appendTo($container).highcharts({
            chart: {
              type: 'line',
              height: 200
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: ''
                },
                labels: {
                	formatter: function(){return Highcharts.dateFormat('%m/%d', this.value);}
                },
                tickColor: 'transparent',
                y: 15,
                lineColor: '#eee',
                gridLineWidth: 1,
                gridLineDashStyle: 'dot',
                showFirstLabel: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: ''//'贷款总数'
                    //align: 'high',
                    //rotation: 0
                },
                labels: {
                    format: '{value}%',
                    style: {
                      //color: '#ff7237'
                    }
                },
                min: temp,
                gridLineDashStyle: 'dot'
                //max: parseInt(dataArr.count.max) + 10,
                //gridLineColor: 'transparent'
            },

            tooltip: {
                formatter: function() {
                    var s;
                    if (this.point.name) { // the pie chart
                        s = ''+   this.point.name +': '+ this.y +' fruits';
                    } else {
                        s = ''+ Highcharts.dateFormat('%m/%d', this.x) +': '+ this.y+'%';
                    }
                    return s;
                }
            },
            legend: {
                enabled: false,
                //layout: 'vertical',
                align: 'center',
                verticalAlign: 'top',
                floating: true,
                borderWidth: 0
            },
            
            series: [
            {
                name: '贷款总数',
//                data: dataArr.interest, 
                data: dataArr, 
                color: '#ee6343',
                marker: {
                		radius: 7,
                        lineWidth: 3,
                        lineColor: '#fff',
                        fillColor: '#ee6343'
                }
            }]
        });
	});

}

function drawScaleTrend($container, options) {
	
	var url = '/fund/get_Scale_trend.json?type='+options;
	$.get(url, {}, function(response){
		dataArr = response;
		
//	dataArr = {
//	        amount: [
//	         [1398154050000, 50000],
//	         [1398154060000, 50000],
//	         [1398154070000, 53000],
//	         [1398154080000, 60000],
//	         [1398154090000, 65000],
//	         [1398154100000, 66000],
//	         [1398154110000, 70000],
//	         [1398154120000, 75000]
//	        ]
//	     };
    var $chart = $('<div></div>').addClass('chart-area');
    $chart.appendTo($container).highcharts({
            chart: {
              height: 100
              
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: ''
                    //align: 'high',
                    //rotation: 0
                },
                labels: {
                        formatter: function(){ return Highcharts.dateFormat('%m/%d', this.value);}
                },
                tickColor: 'transparent',
                lineColor: '#eee',
                gridLineWidth: 1,
                gridLineDashStyle: 'dot',
                showFirstLabel: true,
                showLastLabel: true
            },
            yAxis: [{
                title: {
                    text: ''//'贷款总金额'
                    //align: 'high',
                    //rotation: 0
                },
                labels: {
                    //enabled: false
                    //format: '{value}万'
                },
                min: 50000,
                gridLineDashStyle: 'dot'
                //max: 7000,
                //max: parseInt(parseInt(dataArr.amount.max)/10000*1.25),
                //opposite: true,
                //gridLineColor: 'transparent'
            }],
            tooltip: {
                formatter: function() {
                    var s;
                    if (this.point.name) { // the pie chart
                        s = ''+
                            this.point.name +': '+ this.y +' fruits';
                    } else {
                        s = ''+  Highcharts.dateFormat('%m/%d', this.x)   +': '+ this.y;
                    }
                    return s;
                }
            },
            legend: {
                enabled: false,
                //layout: 'vertical',
                align: 'center',
                verticalAlign: 'top',
                floating: true,
                borderWidth: 0
            },
            
            series: [{
                type: 'column',
                name: '贷款总金额',
                color: '#f1bd80',
                //yAxis: 1,
                data: dataArr
            }]
        });
	});

}

//用户收益率趋势
function drawProfitTrend($container, options) {
	var url = '/user/profit_trend.json?type=week';
	
	$.get(url, {}, function(response){
		dataArr = response;		
		options = options || {};

		var temp=dataArr[0][1];
		if(dataArr!=null && dataArr!=''){
			for(var i=0;i<dataArr.length;i++){
				if(temp>dataArr[i][1]){
					temp=dataArr[i][1];
				}
			}
		}else{
			 temp=0;
		}
		
		alert(temp);
		var $chart = $('<div></div>').addClass('chart-area');
		$chart.appendTo($container).highcharts({
            chart: {
              type: 'line',
              height: 200
/*              backgroundColor: "transparent",
              height: options.height || 100,
              spacingTop: 0,
              spacingBottom: 5,
              spacingLeft: 2*/
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: ''
                    //align: 'high',
                    //rotation: 0
                },
                labels: {
                	
                    formatter: function(){return Highcharts.dateFormat('%m/%d', this.value);},
                    //y:0,
                    style: {color: '#acacac'}
                },
                y: 15,
                tickColor: 'transparent',
                lineColor: '#eee',
                gridLineWidth: 1,
                gridLineDashStyle: 'dot',
                showFirstLabel: true,
                showLastLabel: true
//                showFirstLabel: false,
//                showLastLabel: false,

            },
            yAxis: [{
                title: {
                    text: ''//'贷款总数'
                    //align: 'high',
                    //rotation: 0
                },
                labels: {
                    enabled: false,
                    formatter: function() {return this.y;},
                    style: {
                      color: '#ff7237'
                    }
                },
                min: temp,
                gridLineDashStyle: 'dot',
                //max: parseInt(dataArr.count.max) + 10,
                gridLineColor: 'transparent'
            }],
            tooltip: {
                formatter: function(){
                  var s = ""; 
                  s += '日期：' + Highcharts.dateFormat('%m/%d', this.x);
                  s += '，收益：' + this.y;
                  return s;
                }
            },
            legend: {
                enabled: false,
                align: 'center',
                verticalAlign: 'top',
                floating: true,
                borderWidth: 0
            },
            
            series: [
            {
                name: '贷款总数',
                data: dataArr,
                color: '#eee',
                marker: {
                        lineWidth: 1,
                        lineColor: '#fa0',
                        fillColor: '#fa0'
                }
            }]
        });
    });
    
}
