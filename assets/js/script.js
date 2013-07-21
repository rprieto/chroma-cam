var chroma = require('./chroma');
var blend  = null;

window.ChromaCam = {};

window.ChromaCam.start = function() {
    openWebcam();
    setupVideoProcessing();
};

window.ChromaCam.loadBackground = function(e) {
    // var type = $(e.currentTarget).data('type');
    // var file = $(e.currentTarget).data('file');
    var type = e.currentTarget.getAttribute('data-type');
    var file = e.currentTarget.getAttribute('data-file');
    if (type === 'video') {
        loadBackgroundVideo(file);
    } else {
        loadBackgroundPhoto(file);
    }
};

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
    
    var chroma = seriously.effect('chroma');
    chroma.source = '#webcam';
    chroma.weight = 1.32;
    chroma.balance = 0;
    chroma.screen = 'rgb(77, 239, 41)';
    chroma.clipWhite = 0.85;
    chroma.clipBlack = 0.5125;

    blend = seriously.effect('blend');
    blend.top = chroma;
    blend.bottom = document.querySelector('#backgroundVideo');

    var target = seriously.target('#output');
    target.source = blend;
    
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
