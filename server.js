var express = require('express');
var browserify = require('browserify-middleware');

var app = express();

app.use('/js', browserify('./assets/js'));
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
