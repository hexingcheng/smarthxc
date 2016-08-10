var mongoose = require('mongoose');
var admin = mongoose.Schema({
    email: String,
    pwd: String
});
var adminModel = mongoose.model('admin', admin);
module.exports = adminModel;