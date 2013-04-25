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
        prediction = predictions[i];
        $("#predictions").append('<li><div>');

        var minutes = prediction.minutes;
        if (minutes == 0) {
            $("#predictions").append(prediction.is_departing ? "Departing" : "Arriving");
        }
        else {
            $("#predictions").append(minutes + " min");
        }

        $("#predictions").append('</div><div style="font-size:24px">' + prediction.route_id + '</div></li>');
    }
}

$(document).ready(function() {
    $.getJSON(predictionsURL, handlePredictions);
});

