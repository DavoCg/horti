var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

var server = app.listen(6789, function () {
    console.log('server listening');
});
