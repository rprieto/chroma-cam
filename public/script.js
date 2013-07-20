var isPlaying = false;
var isBackgroundVideo = true;

function draw() {
    if (window.requestAnimationFrame) window.requestAnimationFrame(draw);
    else if (window.msRequestAnimationFrame) window.msRequestAnimationFrame(draw);
    else if (window.mozRequestAnimationFrame) window.mozRequestAnimationFrame(draw);
    else if (window.webkitRequestAnimationFrame) window.webkitRequestAnimationFrame(draw);
    else setTimeout(draw, 16.7);
    DrawVideoOnCanvas();
}


function DrawVideoOnCanvas() {
    var webcam = $('#webcam');
    var object = document.getElementById("webcam")

    var backgroundObject;
    if (isBackgroundVideo) {
        backgroundObject = document.getElementById("videoBackgrounddata");
    }
    else {
        backgroundObject = document.getElementById("imageBackgrounddata");
    }
    var width = webcam.width() * 3;
    var height = webcam.height() * 3;
    var canvas = document.getElementById("videoscreen");
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.drawImage(backgroundObject, 0, 0, width, height);
        var imgBackgroundData = context.getImageData(0, 0, width, height);
        
        context.drawImage(object, 0, 0, width, height);
        var imgDataNormal = context.getImageData(0, 0, width, height);
        
        var imgData = context.createImageData(width, height);
        removeColor(imgData, imgDataNormal, imgBackgroundData, 25, 90, 60);
        context.putImageData(imgData, 0, 0);
    }
}

function loadBackground(e) {
    var type = $(e.currentTarget).data('type');
    var file = $(e.currentTarget).data('file');
    if (type === 'video') {
        loadBackgroundVideo(file);
    } else {
        loadBackgroundPhoto(file);
    }
    document.getElementById("videoBackgrounddata").play();
}

function loadBackgroundVideo(file) {
    isBackgroundVideo = true;
    document.getElementById("videoBackgrounddata").style.display = "inline";
    document.getElementById("imageBackgrounddata").style.display = "none";
    document.getElementById("videoBackgrounddata").src = file;
    document.getElementById("videoBackgrounddata").loop = true
    if (isPlaying) {
        document.getElementById("videoBackgrounddata").play();
    }
}

function loadBackgroundPhoto(file) {
    isBackgroundVideo = false;
    document.getElementById("videoBackgrounddata").style.display = "none";
    document.getElementById("imageBackgrounddata").style.display = "inline";
    document.getElementById("imageBackgrounddata").src = file;
}
