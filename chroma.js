var oggSupported = false;
var webmSupported = false;
var mp4Supported = false;
var isPlaying = false;
var videoExt = "";
var isBackgroundVideo = true;

function draw() {
    if (window.requestAnimationFrame) window.requestAnimationFrame(draw);
    // IE implementation
    else if (window.msRequestAnimationFrame) window.msRequestAnimationFrame(draw);
    // Firefox implementation
    else if (window.mozRequestAnimationFrame) window.mozRequestAnimationFrame(draw);
    // Chrome implementation
    else if (window.webkitRequestAnimationFrame) window.webkitRequestAnimationFrame(draw);
    // Other browsers that do not yet support feature
    else setTimeout(draw, 16.7);
    DrawVideoOnCanvas();
}


function Play() {
    if (!isPlaying) {
        document.getElementById("videodata").play();
        document.getElementById("videoBackgrounddata").play();
        document.getElementById("PlayPause").value = "Pause";
        isPlaying = true;               
    }
    else {
        document.getElementById("videodata").pause();
        document.getElementById("videoBackgrounddata").pause();
        document.getElementById("PlayPause").value = "Play";
        isPlaying = false;                
    }
    draw();
}

function DrawVideoOnCanvas() {
    var object = document.getElementById("videodata")

    var backgroundObject;
    if (isBackgroundVideo) {
        backgroundObject = document.getElementById("videoBackgrounddata");
    }
    else {
        backgroundObject = document.getElementById("imageBackgrounddata");
    }
    var width = object.width;
    var height = object.height;
    var canvas = document.getElementById("videoscreen");
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.drawImage(backgroundObject, 0, 0, width, height);
        var imgBackgroundData = context.getImageData(0, 0, width, height);
        context.drawImage(object, 0, 0, width, height);
        imgDataNormal = context.getImageData(0, 0, width, height);
        var imgData = context.createImageData(width, height);

        for (i = 0; i < imgData.width * imgData.height * 4; i += 4) {
            var r = imgDataNormal.data[i + 0];
            var g = imgDataNormal.data[i + 1];
            var b = imgDataNormal.data[i + 2];
            var a = imgDataNormal.data[i + 3];
            // compare rgb levels for green and set alphachannel to 0;
            selectedR = 25;
            selectedG = 90
            selectedB = 60;
            if (r <= selectedR && b <= selectedB && g >= selectedG) {
                a = 0;
            }
            if (a != 0) {
                imgData.data[i + 0] = r;
                imgData.data[i + 1] = g;
                imgData.data[i + 2] = b;
                imgData.data[i + 3] = a;
            }
        }

        for (var y = 0; y < imgData.height; y++) {
            for (var x = 0; x < imgData.width; x++) {
                var r = imgData.data[((imgData.width * y) + x) * 4];
                var g = imgData.data[((imgData.width * y) + x) * 4 + 1];
                var b = imgData.data[((imgData.width * y) + x) * 4 + 2];
                var a = imgData.data[((imgData.width * y) + x) * 4 + 3];
                if (imgData.data[((imgData.width * y) + x) * 4 + 3] != 0) {
                    offsetYup = y - 1;
                    offsetYdown = y + 1;
                    offsetXleft = x - 1;
                    offsetxRight = x + 1;
                    var change=false;
                    if(offsetYup>0)
                    {
                        if(imgData.data[((imgData.width * (y-1) ) + (x)) * 4 + 3]==0)
                        {
                            change=true;
                        }
                    }
                    if (offsetYdown < imgData.height)
                    {
                        if (imgData.data[((imgData.width * (y + 1)) + (x)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                    if (offsetXleft > -1) {
                        if (imgData.data[((imgData.width * y) + (x -1)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                    if (offsetxRight < imgData.width) {
                        if (imgData.data[((imgData.width * y) + (x + 1)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                    if (change) {
                        var gray = (imgData.data[((imgData.width * y) + x) * 4 + 0] * .393) + (imgData.data[((imgData.width * y) + x) * 4 + 1] * .769) + (imgData.data[((imgData.width * y) + x) * 4 + 2] * .189);                                
                        imgData.data[((imgData.width * y) + x) * 4] = (gray * 0.2) + (imgBackgroundData.data[((imgData.width * y) + x) * 4] *0.9);
                        imgData.data[((imgData.width * y) + x) * 4 + 1] = (gray * 0.2) + (imgBackgroundData.data[((imgData.width * y) + x) * 4 + 1]*0.9);
                        imgData.data[((imgData.width * y) + x) * 4 + 2] = (gray * 0.2) + (imgBackgroundData.data[((imgData.width * y) + x) * 4 + 2] * 0.9);
                        imgData.data[((imgData.width * y) + x) * 4 + 3] = 255;
                    }
                }
                
            }
        }

        for (i = 0; i < imgData.width * imgData.height * 4; i += 4) {
            var r = imgData.data[i + 0];
            var g = imgData.data[i + 1];
            var b = imgData.data[i + 2];
            var a = imgData.data[i + 3];                
            if (a == 0) {
                    imgData.data[i + 0] = imgBackgroundData.data[i + 0];
                    imgData.data[i + 1] = imgBackgroundData.data[i + 1];
                    imgData.data[i + 2] = imgBackgroundData.data[i + 2];
                    imgData.data[i + 3] = imgBackgroundData.data[i + 3];
            }                   
        }
        context.putImageData(imgData, 0, 0);
      
    }
}      

function SupportedVideoFormat() {
    var video = document.createElement("video"); 
    if (video.canPlayType('video/ogg; codecs="theora, vorbis"')) {
        // it can play (maybe)!
        oggSupported = true;
    }
    if (video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) {
        // it can play (maybe)!
        mp4Supported = true;
    }
    if (video.canPlayType('video/webm; codecs="vp8, vorbis"')) {
        // it can play (maybe)!
        webmSupported = true;
    }
}

function StartBackground() {
    SupportedVideoFormat();
    if (oggSupported) {
        videoExt = ".ogv";
    }
    if (webmSupported) {
        videoExt = ".webm"
    }
    if (mp4Supported) {
        videoExt = ".mp4";
    }
    loadBackgroundVideo();
}

function loadBackgroundVideo() {
    var value = "";
    var radioObj = document.getElementsByName("background");
    if (!radioObj)
        return "";
    var radioLength = radioObj.length;
    if (radioLength == undefined)
        if (radioObj.checked)
            value= radioObj.value;
        else
            value= "";
    for (var i = 0; i < radioLength; i++) {
        if (radioObj[i].checked) {
            value= radioObj[i].value;
        }
    }

    //
    var backgroundType= value.split("/");
    if (backgroundType[0] == "videos") {
        isBackgroundVideo = true;
        var backgroundFileName = value + videoExt;
        document.getElementById("backgroundvideo").style.display = "inline";
        document.getElementById("backgroundimage").style.display = "none";
        document.getElementById("videoBackgrounddata").src = backgroundFileName;
        document.getElementById("videoBackgrounddata").loop = true
        if (isPlaying)
            document.getElementById("videoBackgrounddata").play();
    }
    else {
        isBackgroundVideo = false;
        document.getElementById("backgroundvideo").style.display = "none";
        document.getElementById("backgroundimage").style.display = "inline";
        document.getElementById("imageBackgrounddata").src = value;
    }
}
