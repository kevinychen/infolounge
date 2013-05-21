var imgURL = '/img.json';

function getImg() {
    tweetfeed = $("#tweet_feed").html();
    match = tweetfeed.match(/t.co\/[^"]+/);
    if (match == null) {
        $("#imgpanel").slideUp("slow");
        return;
    }
    imgurl = 'http://' + match[0];
    $.getJSON(imgURL + '?imgurl=' + encodeURIComponent(imgurl), function(data) {
        if (jQuery.isEmptyObject(data)) {
            $("#imgpanel").slideUp("slow");
            return;
        }

        $("#imgpanel").slideDown("slow");
        $("#twitimg").css({
            "background": "url('" + data.imgurl + "')", 
            "background-position": "50% 50%",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-repeat": "no-repeat",
        });
    });
};

