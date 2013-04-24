var fs = require('fs');
var dateformat = require('./dateformat.js');

var newsFile = 'public/news.dat';

function getNews() {
    console.log(process.cwd());
    if (fs.existsSync(newsFile)) {
        data = fs.readFileSync(newsFile, 'utf8').split('\n');
        code = dateformat.dateFormat('m/dd');
        for (var i = 0; i < data.length; i += 2) {
            if (code == data[i]) {
                return data[i + 1];
            }
        }
    }
    return 'No news today. :(';
}

exports.getNews = getNews;

