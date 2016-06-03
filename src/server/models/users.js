'use strict';

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema = mongoose.Schema;

var User = new Schema({
    domain: String,
    domainId: String,
    displayName: String,
    clicks: Number,
    polls: []
});

User.plugin(findOrCreate);
module.exports = mongoose.model('User', User);