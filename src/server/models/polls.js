'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var Poll = new Schema({
    question: String,
    options: [{option: String,
                votes: Number}]
});
Poll.plugin(random);

module.exports = mongoose.model('Poll', Poll);