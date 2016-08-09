var mongoose = require('mongoose');
var session = mongoose.Schema({
    sid: String,
    sName: String
});
var sessionModel = mongoose.model('session', session);
module.exports = sessionModel;