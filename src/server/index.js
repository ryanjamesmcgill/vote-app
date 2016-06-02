'use strict';

require("babel-register");
var app = require('./server');

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on port '+port+'...');
});