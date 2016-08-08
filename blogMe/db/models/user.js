var mongoose = require('mongoose');
var users = mongoose.Schema({
    name: String,
    tel: String,
    email:String
});
var user = mongoose.model('users', users);
module.exports = user;