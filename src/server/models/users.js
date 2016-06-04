'use strict';

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    local            : {
        username     : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        displayName  : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String
    },
    google           : {
        id           : String,
        token        : String,
        displayName  : String
    },
    polls: []

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// method for social authentication
userSchema.plugin(findOrCreate);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);