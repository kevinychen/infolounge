
var dateformat = require('./dateformat.js');
var request = require('request');

function getMenu(callback) {
    request('http://www.cafebonappetit.com/menu/your-cafe/mit/cafes/details/401/next', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                now = new Date();
                var menu = '<li><span style="font-size:44px">Today for dinner:</span></li><br/>';

                var time = now.getHours() + ":" + now.getMinutes();
                if (time > "20:30" || time < "12:00") {
                    callback(undefined);
                    return;
                }

                var date = dateformat.dateFormat(now, 'dddd, mmmm dS, yyyy');
                var dateIndex = body.indexOf(date);
                if (dateIndex == -1) {
                    callback(undefined);
                    return;
                }
                var dinnerIndex = body.indexOf('Dinner', dateIndex);
                if (dinnerIndex == -1) {
                    callback(undefined);
                    return;
                }

                var comfortsIndex = body.indexOf('<strong>comforts</strong>', dinnerIndex);
                var grillIndex = body.indexOf('<strong>smokehouse grill</strong>', dinnerIndex);
                var stirfryIndex = body.indexOf('<strong>action</strong>', dinnerIndex);

                var comforts = body.substring(comfortsIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
                var grill = body.substring(grillIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];
                var stirfry = body.substring(stirfryIndex + 1).match(/<strong>[^<>]*<\/strong>/g)[0];

                menu += '<li><span class="menu_item">Comforts:</span> ' + comforts + '</li>';
                menu += '<li><span class="menu_item">Grill:</span> ' + grill + '</li>';
                menu += '<li><span class="menu_item">Stir Fry:</span> ' + stirfry + '</li>';
                callback(menu);
            }
    })
}

exports.getMenu = getMenu;

