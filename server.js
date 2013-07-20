var path = require('path');
var express = require('express');
var browserify = require('browserify-middleware');
var stylus = require('stylus');

var app = express();

app.use('/js', browserify(path.join(__dirname, 'assets/js')));

app.use(stylus.middleware({
    compress: true,
    src:  path.join(__dirname, 'assets'),
    dest: path.join(__dirname, 'builtAssets')
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'builtAssets')));

app.listen(process.env.PORT || 3000);
