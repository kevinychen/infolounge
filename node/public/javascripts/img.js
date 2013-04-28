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


        // will tidy up later ._.

        $("#imgpanel").slideDown("slow");
        img = "url('"+data.imgurl+"')" ;
        $("#twitimg").css({"background": img});
        $("#twitimg").css({"background-position": "50% 50%"});
        $("#twitimg").css({"-webkit-background-size": "cover"});
        $("#twitimg").css({"-moz-background-size": "cover"});
        $("#twitimg").css({"-o-background-size": "cover"});
        $("#twitimg").css({"background-size": "cover"});
        $("#twitimg").css({"background-repeat": "no-repeat"});

        //$("#img").html("<img src='" + data.imgurl + "' alt='Image Not Found'/>");
    });
};

