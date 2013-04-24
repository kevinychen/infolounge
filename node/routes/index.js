
/*
 * GET home page.
 */

var menu = require('../public/javascripts/menu.js');

exports.index = function(req, res){
    menu.getMenu(function(menuHTML) {
        res.render('index', { title: 'Express' , page: req.params.num, menu: menuHTML});
    });
};

exports.legacy = function(req, res){
  res.render('legacy', {});
};
