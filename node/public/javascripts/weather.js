function getWeather() {
    $.simpleWeather({
        zipcode: '02139',
        unit: 'f',
        success: function(weather) {
            html = '<div class="row">';
            html += '<div class="large-4 columns"><img src="images/weather/' + weather.code + '.png"></div>';
            html += '<div class="large-8 columns">';
            html += '<span class="medium">Now</span><br/>';
            html += '<span class="big_bold">' + weather.temp + '&deg;F / ' + ((weather.temp-32)*(5/9)).toFixed() + '&deg;C</span><br/>';
            html += '<span class="medium">Feel ' + weather.wind.chill + '&deg;F / ' + ((weather.wind.chill-32)*(5/9)).toFixed() + '&deg;C</span><br/>';
            html += '</div></div>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
};
