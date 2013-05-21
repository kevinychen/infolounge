navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {video: true};

function successCallback(localMediaStream) {
    $("#webcampanel").slideDown("slow");
    window.stream = localMediaStream; // stream available to console
    var video = document.querySelector("video");
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
}

function errorCallback(error){
    $("#webcampanel").slideUp("slow");
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
