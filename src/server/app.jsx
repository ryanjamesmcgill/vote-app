
'use strict';
require('dotenv').config();
var express = require('express');
var passport = require('passport');
var passportSetup = require('./utils/passportSetup');
var routes = require('./routes');
var mongoose = require('mongoose');
var compression = require('compression');



//configure passport strategy and serializations
passportSetup(passport);

//create new express application
var app = express();

//connect to database
mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('[vote-app] connected to database');
    //configure view engine to render handlebars templates
    app.set('view engine', 'hbs');

    // Use application-level middleware for common functionality, including
    // logging, parsing, and session handling.
    app.use(require('morgan')('dev'));
    app.use(require('cookie-parser')());
    app.use(compression());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'vote for me', resave: false, saveUninitialized: false }));
    app.use(express.static(__dirname + '/../client/public'));


    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());

    routes(app, passport);

    //start listening for requests
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log('listening on port '+port+'...');
    });
});

module.exports = app;
