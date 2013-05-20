var alertsURL = '/alerts.json';

function getAlerts() {
    $.getJSON(alertsURL, function(data) {
        if (jQuery.isEmptyObject(data)) {
            $("#alertspanel").slideUp("slow");
            return;
        }

        $("#alertspanel").slideDown("slow");

        var elem = '';
        for (var type in data) {
            elem += ('<li><span class="foodtype">' + type + '</span> ' + data[type] + '</li>');
        }
        $("#alerts").html(elem);
    });
};
