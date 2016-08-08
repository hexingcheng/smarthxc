var session = require('koa-session');
var util = require('../util/utils.js')
function *check(next){
	if(this.cookies.get('_id')==this.session._id){
		console.log('login');
		yield next;
	}else{
		this.body=util.formatRes('0','未登录','{}');
	}
}
module.exports = check;