var chroma = null;
var blend  = null;
var target = null;

window.ChromaCam = {};

window.ChromaCam.start = function() {
    openWebcam();
    setupVideoProcessing();
};

window.ChromaCam.loadBackground = function(e) {
    var type = e.currentTarget.getAttribute('data-type');
    var file = e.currentTarget.getAttribute('data-file');
    if (type === 'video') {
        loadBackgroundVideo(file);
    } else {
        loadBackgroundPhoto(file);
    }
};

window.ChromaCam.calibrate = function(e) {
    e.preventDefault();
    
    target.source = '#webcam';
    
    setTimeout(function() {
    
        var webcam = document.getElementById('output');
        var canvas = document.createElement('canvas');
        canvas.width  = webcam.width;
        canvas.height = webcam.height;
        var context = canvas.getContext('2d');
        context.drawImage(webcam, 0, 0);
    
        var colorThief = new ColorThief();
        var dominant = colorThief.getColor(canvas);
        var rgb = 'rgb(' + dominant[0] + ',' + dominant[1] + ',' + dominant[2] + ')';
        chroma.screen = rgb;
        $('.icon-sign-blank.calibrated').css('color', rgb);
        
        target.source = blend;
        
    }, 500);
}

function openWebcam() {
    navigator.webkitGetUserMedia({video: true, audio: false}, function(localMediaStream) {
        var video = document.querySelector('#webcam');
        video.src = window.URL.createObjectURL(localMediaStream);
    }, function() {
        alert('Could not access webcam');
    });
}

function setupVideoProcessing() {
    var seriously = new Seriously();
    
    chroma = seriously.effect('chroma');
    chroma.source = '#webcam';
    chroma.weight = 1.32;
    chroma.balance = 0;
    chroma.screen = 'rgb(0, 0, 0)';
    chroma.clipWhite = 0.85;
    chroma.clipBlack = 0.5125;

    blend = seriously.effect('blend');
    blend.top = chroma;
    blend.bottom = document.querySelector('#backgroundVideo');

    target = seriously.target('#output');
    target.source = '#webcam';
    
    seriously.go();
}

function loadBackgroundVideo(file) {
    var current = document.querySelector('#backgroundVideo');
    current.src = file;
    current.loop = true;
    current.play();
    if (blend) {
        blend.bottom = current;
    }
}

function loadBackgroundPhoto(file) {
    var current = document.querySelector('#backgroundPhoto');
    current.src = file;
    if (blend) {
        blend.bottom = current;
    }
}
