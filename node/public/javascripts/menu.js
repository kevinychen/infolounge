var menuURL = '/menu.json';

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
    });
};

