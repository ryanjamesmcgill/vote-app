'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: String,
    options: [{Option: String,
                Votes: Number}]
});

module.exports = mongoose.model('Poll', Poll);