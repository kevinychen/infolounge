var predictionsTEK = "http://proximobus.appspot.com/agencies/mit/stops/51/predictions.json";
	// tech shuttle and saferide cambridge, at tang/westgate

var predictionsSFBOS = "http://proximobus.appspot.com/agencies/mit/stops/62/predictions.json";
	// saferide boston, at audrey/vassar sts

var predictionsCT2N = "http://proximobus.appspot.com/agencies/mbta/stops/21772/predictions.json";
	// crosstown 2, to sullivan sq via kendall sq, at amesbury/vassar sts

var predictionsCT2S = "http://proximobus.appspot.com/agencies/mbta/stops/22173/predictions.json";
	// crosstown 2, to ruggles st/northereastern university via fenway, at amesbury st/memorial dr

var elem = '';
var tone = 0;

function handlePredictions2(data) {
    var predictions = data.items;

    if (predictions.length == 0) {
        elem = '';
        return;
    }

    for (var i = 0; i < 2; i++) {
        prediction = predictions[i];

	if (i == 0) {
            elem = '<li><span class="tech-minutes2">';
	} else {
	    elem += '<li><span class="tech-minutes2">';}

        var minutes = prediction.minutes;
        if (minutes == 0) {
            elem += (prediction.is_departing ? "Arrv</span>&nbsp;<span class='tech-route2'>" : "Arrv</span>&nbsp;<span class='tech-route2'>");
        } else {
            elem += (minutes + '</span>&nbsp;<span class="tech-route2">m ');
        }

        var route = '';
        if (prediction.route_id == 'tech') {
            route = 'Tech Shuttle';
        } else if (prediction.route_id == 'saferidecambwest') {
            route = 'Saferide Cambridge';
        } else if (prediction.route_id == 'saferidecamball') {
            route = 'Saferide Cambridge';
        } else if (prediction.route_id == 'traderjwf') {
            route = 'Central/Kendall Sqs';
        } else {
            route = prediction.route_id;
        }
        elem += ('&nbsp;-&nbsp;&nbsp;' + route + '</span></li>');
    }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}

function handlePredictions(data) {
    var predictions = data.items;

    for (var i = 0; i < 1; i++) {
        prediction = predictions[i];
        elem += '<li><span class="tech-minutes">';

        var minutes = prediction.minutes;
        if (minutes == 0) {
            elem += (prediction.is_departing ? "Arrv</span>&nbsp;<span class='tech-route'>" : "Arrv</span>&nbsp;<span class='tech-route'>");
        } else {
            elem += (minutes + '</span>&nbsp;<span class="tech-route">m ');
        }

        var route = '';
        if (prediction.route_id == 'saferidebostonall') {
            route = 'ZBT/Packard\'s Corner';
        } else if (prediction.route_id == 'saferidebostonw') {
            route = 'ZBT/Packard\'s Corner';
        } else if (prediction.route_id == '747' && tone == 0) {
            route = 'CT2, Fenway/Northeastern';
	    tone = 1;
        } else if (prediction.route_id == '747' && tone == 1) {
            route = 'CT2, Kendall/Sullivan Sqs';
        } else {
            route = prediction.route_id;
        }
        elem += ('&nbsp;-&nbsp;&nbsp;' + route + '</span></li>');
    }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}


function getPredictions() {
    $.getJSON(predictionsTEK, handlePredictions2);
    $.getJSON(predictionsSFBOS, handlePredictions);
    $.getJSON(predictionsCT2N, handlePredictions);
    $.getJSON(predictionsCT2S, handlePredictions);
};

if (elem.length == 0) {
    $("#techpanel").slideUp("slow");
}
