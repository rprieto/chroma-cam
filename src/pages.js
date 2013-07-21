
var attribution = [
    'http://www.flickr.com/photos/ehole/',
    'http://www.flickr.com/photos/patrick_nouhailler/',
    'http://www.flickr.com/photos/aigle_dore/',
    'http://www.flickr.com/photos/natalialopes/',
    'http://www.flickr.com/photos/macorig/',
    'http://www.flickr.com/photos/grantzprice/',
    'http://www.flickr.com/photos/9678460@N07/'
];

var videos = [
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
    { url: '', thumbnail: 'http://placekitten.com/200/200' },
]

var photos = [
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
    { url: 'http://placekitten.com/200/200' },
];

exports.indexPage = function(req, res) {

    res.render('index', {
        videos: videos,
        photos: photos,
        attribution: attribution,
    });

};
