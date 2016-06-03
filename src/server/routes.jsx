var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Application = require(__dirname + '/../client/app/components/application');

var routes = function(app, passport){
    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    app.route('/')
        .get(isLoggedIn, function(req, res){
            var InitialState = {greeting: 'greetings from server mwahahahahah!', authenticated: true, user: req.user.toObject()};
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

    app.route('/login')
        .get(function(req, res){
        var message = 'You need to login';
        var InitialState = {greeting: message, authenticated: false};
        var ReactString = ReactDOMServer.renderToString(<Application initialState={InitialState}/>);
        res.render(__dirname+'/../client/public/index.hbs',
            {ReactString: ReactString,
                InitialState: JSON.stringify(InitialState),
                BundlePath: '/js/bundle.js'});
    });

    app.route('/logout')
        .get(function(req, res){
            req.logout();
            res.redirect('/');
        });

    app.route('/auth/facebook')
        .get(passport.authenticate('facebook'));

    app.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook',
                {
                    successRedirect: '/',
                    failureRedirect: '/login'
                })
        );

    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));

    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter',
                {
                    successRedirect: '/',
                    failureRedirect: '/login'
                })
        );

    app.route('/auth/google')
        .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


    app.route('/auth/google/callback')
        .get(passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
                res.redirect('/');
            });

};

module.exports = routes;