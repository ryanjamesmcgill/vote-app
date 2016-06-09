var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');


var passportSetup = function(passport){

    // Configure facebook strategy
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        },
        function(accessToken, refreshToken, profile, done) {
            var userSearch = {
                "facebook.id": String(profile.id)
            };
            var userUpdate = {
                "facebook.displayName": String(profile.displayName)
            };
            User.findOrCreate(userSearch, userUpdate, function(err, user){
                if (err) throw err;
                return done(null, user);
            });
        }
    ));

    // Configure twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL
        },
        function(token, tokenSecret, profile, done) {
            console.log('in twitter callback');
            var userSearch = {
                "twitter.id": String(profile.id)
            };
            var userUpdate = {
                "twitter.displayName": String(profile.displayName)
            };
            User.findOrCreate(userSearch, userUpdate, function(err, user){
                if (err) throw err;
                return done(null, user);
            });
        }
    ));

    // Configure google+ strategy
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        function(token, tokenSecret, profile, done) {
            console.log('in google callback');
            var userSearch = {
                "google.id": String(profile.id)
            };
            var userUpdate = {
                "google.displayName": String(profile.displayName)
            };
            User.findOrCreate(userSearch, userUpdate, function(err, user){
                if (err) throw err;
                return done(null, user);
            });
        }
    ));

    // Configure local-signup strategy
    passport.use('local-signup', new LocalStrategy(
        function(username, password, done) {
            User.findOne({'local.username': username}, function (err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false); //username already exists
                } else {
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function (err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

    // Configure local-login strategy
    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
            User.findOne({ 'local.username' :  username }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err) return done(err);
                if (!user) return done(null, false, {message:"We couldn't find that username.."}); //no username found
                if (!user.validPassword(password)) return done(null, false, {message:"Incorrect password.."}); //wrong password
                return done(null, user);
            });
        })
    );

    // Serialize functions for sessions
    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        User.findById(id, function(err, user){
            if (err) {return cb(err);}
            cb(null, user);
        });
    });
};


module.exports = passportSetup;