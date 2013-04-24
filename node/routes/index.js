
/*
 * GET home page.
 */

var menu = require('../public/javascripts/menu.js');
var news = require('../public/javascripts/news.js');

exports.index = function(req, res){
    menu.getMenu(function(menuHTML) {
        res.render('index', { title: 'Express' , page: req.params.num, menu: menuHTML, news: news.getNews() });
    });
};

exports.legacy = function(req, res){
  res.render('legacy', {});
};
