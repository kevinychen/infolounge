$(function() {
				
			$.simpleWeather({

				
				zipcode: '02139',
				unit: 'f',

				success: function(weather) {
                    html = '<table>';
					html += '<tr><td><img width="135px" src="images/weather/'+weather.code+'.png"></td></tr>';
                    html += '<tr><td><span style="font-size:48px;">Now</span><br/><br/>temp | feel<br/><span style="font-size:60px;">'+weather.temp+'&deg;'+weather.units.temp+' | ' + weather.wind.chill + '&deg;' + weather.units.temp + '</span><br/><br/><span style="font-size:36px;">' + weather.currently + '</span></td></tr>';

                    html += '<tr><td><img width="135" src="images/weather/' + weather.todayCode + '.png"></tr>';
                    html += '<tr><td><span style="font-size:36px;">Today</span><br/><br/><span style="font-size:48px;">' + weather.high + '&deg;' + weather.units.temp + ' | ' + weather.low + '&deg;' + weather.units.temp + '</span><br/><br/><span style="font-size:32px;">' + weather.forecast + '</span></td></tr>';
                    html += '</table>';

					$("#weather").html(html);
				},
				error: function(error) {
					$("#weather").html('<p>'+error+'</p>');
				}
			});
		});
