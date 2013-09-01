var dateformat = require('../public/javascripts/dateformat.js');
var request = require('request');
var fs = require('fs');

var menuURL = 'http://www.cafebonappetit.com/menu/your-cafe/mit/cafes/details/401/next';
var newsFile = 'public/news.dat';

//var weatherURL = 'http://forecast.weather.gov/MapClick.php?x=226&y=165&site=aly&zmx=1&zmy=1&map_x=225.5&map_y=165.13333129882812';
var alertURL = 'http://emergency.mit.net';

function getMenu(req, res) {
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
        var endIndex = body.indexOf('The Story Behind Your Food', dateIndex); // always at end
        var today = body.substring(dateIndex, endIndex);

        var breakfastIndex = today.indexOf('Breakfast');
        var brunchIndex = today.indexOf('Brunch');
        var dinnerIndex = today.indexOf('Dinner');

        var time = dateformat.dateFormat(now, 'HH:mm');
        if (time > '08:00' && time < '10:15' && breakfastIndex != -1) {
            var foodIndex = today.indexOf('<td colspan="3">breakfast</td>', breakfastIndex);
            var breakfast = today.substring(foodIndex + 1).match(/<div class="eni-menu-item-name">[^<>]+/g)[0].substring(34);
            res.json({'Breakfast': breakfast});
        } else if (time > '09:45' && time < '13:15' && brunchIndex != -1) {
            var comfortsIndex = today.indexOf('<td colspan="3">comforts</td>', brunchIndex);
            var comforts = today.substring(comfortsIndex + 1).match(/<div class="eni-menu-item-name">[^<>]+/g)[0].substring(34);
            res.json({'Brunch': comforts});
        } else if (time > '15:15' && time < '20:45' && dinnerIndex != -1) {
            var comfortsIndex = today.indexOf('<td colspan="3">comforts</td>', dinnerIndex);
            var grillIndex = today.indexOf('<td colspan="3">smokehouse grill</td>', dinnerIndex);
            var stirfryIndex = today.indexOf('<td colspan="3">action</td>', dinnerIndex);

            var comforts = today.substring(comfortsIndex + 1).match(/<div class="eni-menu-item-name">[^<>]+/g)[0].substring(34);
            var grill = today.substring(grillIndex + 1).match(/<div class="eni-menu-item-name">[^<>]+/g)[0].substring(34);
            var stirfry = today.substring(stirfryIndex + 1).match(/<div class="eni-menu-item-name">[^<>]+/g)[0].substring(34);

            res.json({'Comfort': comforts, 'Grill': grill, 'Stir Fry': stirfry});
        } else {
            res.json({});
        }
    });
};



function getAlert(req, res) {
    request(alertURL, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({});
            return;
        };

        var now = new Date();

        var startIndex = body.indexOf('<div id="contentannouncebox">');
        var data = body.substring(startIndex, body.indexOf('</div>', startIndex));
        var alertsStr = data.match(/[^<>]{9,9999}/g); // ignore html tags
        var alerts = {};
        for (i = alertsStr.length; --i >= 0; ) {
            if (now.getTime() - new Date(alertsStr[i]).getTime() < 1000 * 60 * 60 * 10 /* 10 hours */) {
                alerts[alertsStr[i]] = alertsStr[i + 1];
            }
            if (Object.keys(alerts).length >= 1) {
                break;
            }
        }
        res.json(alerts);
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

exports.getMenu = getMenu;
exports.getAlert = getAlert;
exports.getNews = getNews;
exports.getImg = getImg;
