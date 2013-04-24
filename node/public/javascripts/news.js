var dateformat = require('./dateformat.js');
var newsdata = require('./newsdata.js');
data = newsdata.news

function getNews() {
    code = dateformat.dateFormat('m/dd');
    for (var i = 0; i < data.length; i += 2) {
        if (code == data[i]) {
            return data[i + 1];
        }
    }
    return 'No news today. :(';
}

exports.getNews = getNews;

