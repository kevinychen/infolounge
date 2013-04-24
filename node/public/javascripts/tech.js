var stopId = 51; // Next House stop ID

var predictionsURL = "http://proximobus.appspot.com/agencies/mit/stops/" + stopId + "/predictions.json";

function handlePredictions(data) {
    $("#predictions").html('');

    var predictions = data.items;

    if (predictions.length == 0) {
        $("#predictions").html('<li><div class="none">Try walking</div></li>');
        return;
    }

    for (var i = 0; i < 2; i++) {
        var elem = $('<li><div class="route"></div><div class="time"></div><div class="run"></div></li>');
        prediction = predictions[i];

        $(elem).find('.route').text(routeNames[prediction.route_id]);

        $(elem).find('.run').text(runNames[prediction.run_id]);

        var minutes = prediction.minutes;
        var timeCaption;
        if (minutes == 0) {
            timeCaption = prediction.is_departing ? "Departing" : "Arriving";
        }
        else {
            timeCaption = minutes+" min";
        }

        $(elem).find('.time').text(timeCaption);

        $("#predictions").append(elem);
    }
}

$(document).ready(function() {
    $.getJSON(predictionsURL, handlePredictions);
});

