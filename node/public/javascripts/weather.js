$(function() {
				
			$.simpleWeather({

				
				zipcode: '02139',
				unit: 'f',

				success: function(weather) {
                    html = '<table>';
					html += '<tr><td><img width="135px" src="images/weather/'+weather.code+'.png"></td>';
                    html += '<td><span class="small">temp | feel</span><br/><span class="big_bold">'+weather.temp+'&deg;'+weather.units.temp+' | ' + weather.wind.chill + '&deg;' + weather.units.temp + '</span><br/><br/><span class="medium">' + weather.currently + '</span></td><td></td>';

                    html += '<td><img width="135px" src="images/weather/' + weather.todayCode + '.png">';
                    html += '<td><span class="medium">Today</span><br/><br/><span class="big">' + weather.high + '&deg;' + weather.units.temp + ' | ' + weather.low + '&deg;' + weather.units.temp + '</span><br/><br/><span class="medium">' + weather.forecast + '</span></td></tr>';
                    html += '</table>';

					$("#weather").html(html);
				},
				error: function(error) {
					$("#weather").html('<p>'+error+'</p>');
				}
			});
		});
