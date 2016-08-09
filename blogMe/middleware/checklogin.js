var session = require('koa-session');
var util = require('../util/utils.js');
var sessionModel = require('../db/models/session.js');
var mongoose = require('mongoose');
function *check(next){
	if(this.path.indexOf('/users')!=-1||this.path.indexOf('/admin')!=-1){
		console.log('不检验登录')
		yield next;
	}else{
		let cookie = this.cookies.get('_id');	
		if(!cookie){
			this.body=util.formatRes('0','未登录','{}');
			yield next;
		}
		let sObj = yield sessionModel.findOne({sid:cookie});
		if(sObj){
			yield next;
		}else{
			this.body=util.formatRes('0','未登录','{}');
		}
	}
}
module.exports = check;