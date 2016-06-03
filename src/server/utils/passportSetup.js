var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
                domain: 'facebook',
                domainId: String(profile.id)
            };
            var userUpdate = {
                displayName: String(profile.displayName)
            };
            User.findOrCreate(userSearch, userUpdate, function(err, user){
                if (err) return done(err);
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
                domain: 'twitter',
                domainId: String(profile.id)
            };
            var userUpdate = {
                displayName: String(profile.displayName)
            };
            User.findOrCreate(userSearch, userUpdate, function(err, user){
                if (err) return done(err);
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
                domain: 'google',
                domainId: String(profile.id)
            };
            var userUpdate = {
                displayName: String(profile.displayName)
            };
            User.findOrCreate(userSearch, userUpdate, function(err, user){
                if (err) return done(err);
                return done(null, user);
            });
        }
    ));


    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
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