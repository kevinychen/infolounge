var weatherURL = '/alerts.json';

function getAlerts() {
    $.getJSON(weatherURL, function(data) {
        if (jQuery.isEmptyObject(data)) {
            $("#alertspanel").slideUp("slow");
            return;
        }

        $("#alertspanel").slideDown("slow");

        var elem = 'blah';
        for (var type in data) {
            elem += ('<li><span class="foodtype">' + type + '</span> ' + data[type] + '</li>');
        }
        $("#alerts").html(elem);
    });
};
