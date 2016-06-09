import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import reactRoutes from '../client/app/routes.jsx';
var path = require('path');
var _  = require('lodash');
var Poll = require('./models/polls');
var User = require('./models/users');


var routes = function(app, passport){
    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            var output = {err: 'user is not authenticated'};
            res.status(401).send(output);
        }
    }
/*
 *
 *
 *
 * API routes
 *
 *
 */
    app.route('/api/create')
        .post(isLoggedIn, function(req, res){
            console.log(req.user.id, req.user._id);
            if(_.hasIn(req,'body.question') && _.hasIn(req,'body.options')){
                var newPoll = new Poll();
                var optionsArray = [];
                _.forEach(req.body.options, function(option){
                    optionsArray.push({option:option, votes: 0});
                });
                newPoll.question = req.body.question;
                newPoll.options = optionsArray;
                newPoll.save(function (err) {
                    if (err) return console.error(err);
                    req.user.polls.push(newPoll.id);
                    req.user.save(function(err){
                        if(err) return console.error(err);
                        return res.send({poll: newPoll, user: req.user});
                    });
                });
            } else {
                //invalid body
                res.status(400).send({err: 'invalid body in post, did you include a question and options?'});
            }

        });

    app.route('/api/poll/:id')
        .get(function(req,res){
            var id = req.params.id;
            if(id === 'random'){
                Poll.findOneRandom(function(err, poll){
                    if(err) return res.status(400).send({err:err.message});
                    if(!poll) return res.send({err:"empty poll database"});
                    var newPoll = {
                        _id: poll._id,
                        question: poll.question,
                        options: poll.options
                    };
                    res.send(newPoll);
                });
            } else {
                Poll.findById(id, function (err, poll) {
                    if (err) return res.status(400).send({err: err.message});
                    if (!poll) return res.status(400).send({err: 'poll not found'});
                    var newPoll = {
                        _id: poll._id,
                        question: poll.question,
                        options: poll.options
                    };
                    res.send(newPoll);
                });
            }
        })
        .post(function(req, res){
            /*@:id -> id of poll you are voting on
            * @body.option_id -> id of option you want to vote for
            * @body.option_id -> 'new', then a new option will be created
            * @body.option_text -> string of text if you are requesting a new option
             */
            if(!_.hasIn(req, 'body.option_id')){
                res.status(400).send({err: 'invalid body, did not find body.option_id'});
                return console.error('invalid body in post to /api/poll/:id',req);
            }
            var poll_id = req.params.id;
            var option_id = req.body.option_id;
            Poll.findById(poll_id, function (err, poll) {
                if (err) return res.status(400).send({err: err.message});
                var voted_option = null;

                if(option_id === 'new'){
                    //voting for new option
                    if (!req.isAuthenticated()){
                        res.status(401).send({err: 'you must be authenticated to add an option!'});
                        return console.error('unauthenticated request to add option to poll',req);
                    }
                    if(!_.hasIn(req, 'body.option_text')){
                        res.status(400).send({err: 'new option was requested, but could not find body.option_text'});
                        return console.error('invalid body in post to /api/poll/:id',req);
                    }
                    var option_text = req.body.option_text;
                    var new_option = {
                        option: option_text,
                        votes: 1
                    };
                    poll.options.push(new_option);

                } else {
                    //voting for an existing option
                    _.forEach(poll.options, function(option){
                        if(option._id.toString() === option_id){
                            voted_option = option;
                            option.votes += 1;
                        }
                    });

                    //didn't find the option id provided
                    if(voted_option === null){
                        res.status(400).send({err: 'did not find id matching body.option_id'});
                        return console.error('invalid body in post to /api/poll/:id',req);
                    }
                }

                poll.save(function(err){
                    if (err) return console.error(err);
                    res.send(poll);
                });
            });
        });

    app.route('/api/login')
        .get(isLoggedIn, function(req, res){
            var output = {user: req.user.toObject()};
            if(_.hasIn(output,'user.local')) {
                output.user.local.password = '********'; //don't send password to client
            }
            res.send(output);
        })
        .post(passport.authenticate('local-login'),
        function(req, res){
            //successfully signed up, if authentication failed client will get 401 error
            var output = {user: req.user.toObject()};
            output.user.local.password = '********'; //don't send password to client
            res.send(output);
        });

    app.route('/api/logout')
        .get(function(req,res){
            req.logout();
            res.redirect('/');
        });

    app.route('/api/signup')
        .post(passport.authenticate('local-signup'),
        function(req, res){
            //successfully signed up, if authentication failed client will get 404 error
            var output = {user: req.user.toObject()};
            output.user.local.password = '********'; //don't send password to client
            res.send(output);
        });


/*
*
*
*
* Authorization routes
*
*
 */
    app.route('/auth/facebook')
        .get(passport.authenticate('facebook'));

    app.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook',
                {
                    successRedirect: '/create',
                    failureRedirect: '/login'
                })
        );

    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));

    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter',
                {
                    successRedirect: '/create',
                    failureRedirect: '/login'
                })
        );

    app.route('/auth/google')
        .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


    app.route('/auth/google/callback')
        .get(passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
                res.redirect('/create');
            });
/*
 *
 *
 *
 * catch all route for frontend, react-routes will handle from here
 *
 *
 */
    app.use((req, res) => {
        match({ routes: reactRoutes, location: req.url }, (err, redirect, props) => {
            // in here we can make some decisions all at once
            if (err) {
                // there was an error somewhere during route matching
                res.status(500).send(err.message)
            } else if (redirect) {
                // we haven't talked about `onEnter` hooks on routes, but before a
                // route is entered, it can redirect. Here we handle on the server.
                res.redirect(redirect.pathname + redirect.search)
            } else if (props) {
                // if we got props then we matched a route and can render
                const ReactMarkup = renderToString(<RouterContext {...props}/>)
                var authenticated = false;
                if(req.user) authenticated = true;
                res.render(path.resolve('src/client/public/index.hbs'),{ReactMarkup:ReactMarkup,__AUTHENTICATED__:authenticated});
            } else {
                // no errors, no redirect, we just didn't match anything
                res.status(404).send('Not Found')
            }
        });
    });
/*
    app.use(function(req, res){
        var authenticated = false;
        if(req.user) authenticated = true;
        res.render(path.resolve('src/client/public/index.hbs'),{__AUTHENTICATED__:authenticated});
    });
    */

};

module.exports = routes;