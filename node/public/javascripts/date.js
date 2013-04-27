
function getDate() {
    var now = new Date();
    var elem = dateFormat(now, 'ddd, mmm d');
    var becky = new Date("September 4, 1993 00:00:00");
    elem += '<div class="subdate">becky is ' + ((now - becky) / 1000 / 60 / 60 / 24 / 365.25).toFixed(8) + ' years old</div>';
    $("#date").html(elem);
}

