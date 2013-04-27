var imgURL = '/img.json';

function getImg() {
    tweetfeed = $("#tweet_feed").html();
    match = tweetfeed.match(/pic\.twitter([^<]+)/);
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
        $("#img").html("<img src='" + data.imgurl + "' alt='Image Not Found'/>");
    });
};

