var menuURL = '/menu.json';

var menuCache = {};

function getMenu() {
    $.getJSON(menuURL, function(data) {
        if (jQuery.isEmptyObject(data)) {
            $("#menupanel").slideUp("slow");
            return;
        }

        $("#menupanel").slideDown("slow");

        var elem = '';
        for (var type in data) {
            elem += ('<li><span class="foodtype">' + type + '</span> ' + data[type] + '</li>');
        }
        $("#menu").html(elem);

        /* Search for images */
        for (var type in data) {
            var query = data[type];
            if (menuCache[query]) {
                document.getElementById("menu").innerHTML += menuCache[query];
            } else {
                /* Note: DO NOT COPY THIS LINE AND USE IT IN OTHER CODE. IT USES MY PERSONAL GOOGLE API KEY. ~kyc */
                $.getScript("https://www.googleapis.com/customsearch/v1?key=AIzaSyAngKp74bHK-MZDJZ0E153KVTF0NuzBSrE&cx=013902053734636094783:5ckniww7ndi&q=" + encodeURIComponent(query) + "&callback=menuHandler&searchType=image");
            }
        }
    });
};

function menuHandler(response) {
    query = response.queries.request[0].searchTerms;
    menuCache[query] = "<img src=" + response.items[0].link + " alt='' width=150 style='padding:3px;'>";
    document.getElementById("menu").innerHTML += menuCache[query];
}
