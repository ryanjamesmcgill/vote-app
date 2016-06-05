var React = require('react');
var ReactDOMServer = require('react-dom/server');
var path = require('path');

var routes = function(app, passport){
    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            var output = {err: 'user is not authenticated'};
            res.send(output);
        }
    }

    app.route('/api/login')
        .get(isLoggedIn, function(req, res){
            var output = {user: req.user.toObject()};
            res.send(output);
        });
    app.route('/api/logout')
        .get(function(req,res){
            req.logout();
            res.send({user: null});
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

    //catch all route for frontend, react-routes will handle from here
    app.use(function(req, res){
            //res.sendFile(path.resolve('src/client/public/index.html'));
            res.render(path.resolve('src/client/public/index.hbs'))
        });
};

module.exports = routes;