// Server side code

var dateformat = require('../public/javascripts/dateformat.js');
var request = require('request');
var fs = require('fs');

var menuURL = 'http://www.cafebonappetit.com/menu/your-cafe/mit/cafes/details/401/next';
var newsFile = 'public/news.dat';

function getItems(req, res) {
    request(menuURL, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({});
            return;
        };

        now = new Date();
        var menu = '';

        var time = now.getHours() + ":" + now.getMinutes();
        if (time > "20:30" || time < "12:00") {
            res.json({});
            return;
        }

        var date = dateformat.dateFormat(now, 'dddd, mmmm dS, yyyy');
        var dateIndex = body.indexOf(date);
        if (dateIndex == -1) {
            res.json({});
            return;
        }
        var dinnerIndex = body.indexOf('Dinner', dateIndex);
        if (dinnerIndex == -1) {
            res.json({});
            return;
        }

        var comfortsIndex = body.indexOf('<strong>comforts</strong>', dinnerIndex);
        var grillIndex = body.indexOf('<strong>smokehouse grill</strong>', dinnerIndex);
        var stirfryIndex = body.indexOf('<strong>action</strong>', dinnerIndex);

        var comforts = body.substring(comfortsIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
        var grill = body.substring(grillIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
        var stirfry = body.substring(stirfryIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];

        res.json({'Comfort': comforts, 'Grill': grill, 'Stir Fry': stirfry});
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

exports.getItems = getItems;
exports.getNews = getNews;

