var mongoose = require('mongoose');
var conf = require('../conf/conf.js');
var user = require('./models/user.js')
mongoose.connect('mongodb://'+conf.db_conf.host+'/'+conf.db_conf.db_name);
mongoose.Promise = global.Promise;
module.exports = user;
