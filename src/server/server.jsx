
'use strict';

var express = require('express');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Application = require(__dirname + '/../client/app/components/application');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/../client/public'));

app.get('/', function(req, res){
    var InitialState = {greeting: 'greetings from server mwahahahahah!'};
    var ReactString = ReactDOMServer.renderToString(<Application initialState={InitialState}/>);
    res.render(__dirname+'/../client/public/index.hbs',
        {ReactString: ReactString,
        InitialState: JSON.stringify(InitialState),
        BundlePath: '/js/bundle.js'});
});

app.get('/message/:m', function(req, res){
    var message = req.params.m;
    var InitialState = {greeting: message};
    var ReactString = ReactDOMServer.renderToString(<Application initialState={InitialState}/>);
    res.render(__dirname+'/../client/public/index.hbs',
        {ReactString: ReactString,
        InitialState: JSON.stringify(InitialState),
        BundlePath: '/js/bundle.js'});
});

module.exports = app;
