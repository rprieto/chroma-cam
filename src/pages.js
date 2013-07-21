var fs = require('fs');
var wrench = require('wrench');
var videoThumb = require('video-thumb');

var attribution = [
    'http://www.flickr.com/photos/ehole/',
    'http://www.flickr.com/photos/patrick_nouhailler/',
    'http://www.flickr.com/photos/aigle_dore/',
    'http://www.flickr.com/photos/natalialopes/',
    'http://www.flickr.com/photos/macorig/',
    'http://www.flickr.com/photos/grantzprice/',
    'http://www.flickr.com/photos/9678460@N07/'
];

var DATA_FOLDER = __dirname + '/../data';

wrench.readdirSyncRecursive(DATA_FOLDER + '/videos').forEach(function(path) {
    var thumbnail = DATA_FOLDER + '/videos/' + path + '.png';
    if (!fs.existsSync(thumbnail)) {
        videoThumb.extract(DATA_FOLDER + '/videos/' + path, DATA_FOLDER + '/videos/' + path + '.png', '00:00:01', '200x200', function() {
        });
    }
});

function isVideo(path) { return path.match(/\.mp4$/); }
var videos = wrench.readdirSyncRecursive(DATA_FOLDER + '/videos').filter(isVideo).map(function(path) {
    return {
        url: '/videos/' + path,
        thumbnail: '/videos/' + path + '.png'
    };
});

var photos = wrench.readdirSyncRecursive(DATA_FOLDER + '/photos').map(function(path) {
    return {
        url: '/photos/' + path
    };
});

exports.indexPage = function(req, res) {

    res.render('index', {
        videos: videos,
        photos: photos,
        attribution: attribution,
    });

};
