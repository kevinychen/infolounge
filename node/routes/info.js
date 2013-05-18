var dateformat = require('../public/javascripts/dateformat.js');
var request = require('request');
var fs = require('fs');

var menuURL = 'http://www.cafebonappetit.com/menu/your-cafe/mit/cafes/details/401/next';
var newsFile = 'public/news.dat';

var weatherURL = 'http://forecast.weather.gov/MapClick.php?x=226&y=165&site=aly&zmx=1&zmy=1&map_x=225.5&map_y=165.13333129882812';
var newsFile = 'public/news.dat';

function getItems(req, res) {
    request(menuURL, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({});
            return;
        };

        now = new Date();
        var date = dateformat.dateFormat(now, 'dddd, mmmm dS, yyyy');
        var dateIndex = body.indexOf(date);
        if (dateIndex == -1) {
            res.json({});
            return;
        }
        var endIndex = body.indexOf('No items exist on this day.', dateIndex); // always at end
        var today = body.substring(dateIndex, endIndex);

        var breakfastIndex = today.indexOf('Breakfast');
        var brunchIndex = today.indexOf('Brunch');
        var dinnerIndex = today.indexOf('Dinner');

        var time = dateformat.dateFormat(now, 'HH:mm');
        if (time > '08:00' && time < '10:15' && breakfastIndex != -1) {
            var foodIndex = today.indexOf('<strong>breakfast</strong>', breakfastIndex);
            var breakfast = today.substring(foodIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
            res.json({'Breakfast': breakfast});
        } else if (time > '09:45' && time < '13:15' && brunchIndex != -1) {
            var comfortsIndex = today.indexOf('<strong>comforts</strong>', brunchIndex);
            var comforts = today.substring(comfortsIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
            res.json({'Brunch': comforts});
        } else if (time > '15:15' && time < '20:45' && dinnerIndex != -1) {
            var comfortsIndex = today.indexOf('<strong>comforts</strong>', dinnerIndex);
            var grillIndex = today.indexOf('<strong>smokehouse grill</strong>', dinnerIndex);
            var stirfryIndex = today.indexOf('<strong>action</strong>', dinnerIndex);

            var comforts = today.substring(comfortsIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
            var grill = today.substring(grillIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
            var stirfry = today.substring(stirfryIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];

            res.json({'Comfort': comforts, 'Grill': grill, 'Stir Fry': stirfry});
        } else {
            res.json({});
        }
    });
};



function getWeatherAlert(req, res) {
    request(weatherURL, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({'buggy'});
            return;
        };

        var dateIndex = 1;

        var endIndex = body.indexOf('<h1>7-DAY FORECAST</h1>', dateIndex); // always at end
        var today = body.substring(dateIndex, endIndex);

        if (breakfastIndex != -1) {
            var foodIndex = today.indexOf('Freeze Warning', dateIndex);
            var breakfast = today.substring(foodIndex + 1).match(/Severe/g)[0];
            res.json({'ATTENTION:': breakfast});
        } else {
            res.json({'BETA TESTING ALERTS': 'Do not panic'});
        }
    });
};



function getNews(req, res) {
    if (fs.existsSync(newsFile)) {
        data = fs.readFileSync(newsFile, 'utf8').split('\n');
        code = dateformat.dateFormat('m/dd');
        for (var i = 0; i < data.length; i += 2) {
            if (code == data[i]) {
                res.json({'news': data[i + 1]});
                return;
            }
        }
    }
    res.json({});
    return;
};

function getImg(req, res) {
    var imgurl = req.query.imgurl;
    request(imgurl, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({});
            return;
        };
        var imageLink = body.match(new RegExp('<img class="large media-slideshow-image"[^>]+'));
        if (imageLink == null) {
            res.json({});
            return;
        }
        var realurl = imageLink[0].match(/src="[^"]+/)[0].substring(5); // trim to only url
        res.json({'imgurl': realurl});
    });
};

exports.getItems = getItems;
exports.getWeatherAlert = getWeatherAlert;
exports.getNews = getNews;
exports.getImg = getImg;
