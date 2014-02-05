var stopId = 51; // Next House stop ID

var predictionsURL = "http://proximobus.appspot.com/agencies/mit/stops/" + stopId + "/predictions.json";

function handlePredictions(data) {
    var predictions = data.items;

    if (predictions.length == 0) {
        $("#techpanel").slideUp("slow");
        return;
    }

    var elem = '';
    for (var i = 0; i < 2; i++) {
        prediction = predictions[i];
        elem += '<li><span class="tech-minutes">';

        var minutes = prediction.minutes;
        if (minutes == 0) {
            elem += (prediction.is_departing ? "Departing" : "Arriving");
        } else {
            elem += (minutes + " min");
        }

        var route = '';
        if (prediction.route_id == 'tech') {
            route = 'Tech to Kendall Sq';
        } else if (prediction.route_id == 'saferidecambwest') {
            route = 'Saferide to Central Sq';
        } else if (prediction.route_id == 'saferidecamball') {
            route = 'Saferide to Central Sq';
        } else if (prediction.route_id == 'traderjwf') {
            route = 'Saferide to Trader Joes/Central Sq';
        } else {
            route = prediction.route_id;
        }
        elem += ('</span>&nbsp;&nbsp;<span class="tech-route"><br/>' + route + '</span></li>');
    }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}

function getPredictions() {
    $.getJSON(predictionsURL, handlePredictions);
};

