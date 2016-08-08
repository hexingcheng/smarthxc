const router = require('koa-router')();
var co = require('co');
var mongoose = require('mongoose');
var session = require('koa-session');
const conf = require('../conf/conf.js');
// var connect = require('../db/connect.js');
var userModel = require('../db/models/user.js');
var util = require('../util/utils.js')
router.get('/', function *(next) {
  this.body = 'this a users response!';
});
router.post('/login',login);
router.post('/rigester',rigester);
router.post('/changePwd',changePwd)
function *login(){
	var _this = this;
	var name = this.query.name;
	var tel = this.query.tel;
	if(!name){
		this.body = util.formatRes('0','姓名字段必须','{}');
		return;
	}
	if(!tel){
		this.body = util.formatRes('0','手机号字段必须','{}');
		return;
	}
	var loginData = {
		name:name,
		tel:tel
	}
	yield result = userModel.findOne(loginData,function(err,result){
		if(err){
			_this.body = util.formatRes('0','查询数据库失败','{}');
			return;
		}
		if(!result){
			_this.body = util.formatRes('0','账号或密码错误','{}');
			return;
		}	
		if(result.name==loginData.name&&result.tel == loginData.tel){
			loginData._id = result._id;
			_this.session._id = result._id;
			_this.cookies.set('_id',result._id,{
				signed:false
			});
			_this.body = util.formatRes('1','登陆成功',JSON.stringify(loginData));
		}
		
	});
	
};
function *rigester(){
	let name = this.query.name;
	let tel = this.query.tel;
	let email = this.query.email;
	if(!name){
		this.body = util.formatRes('0','姓名字段必须','{}');
		return;
	}
	if(!tel){
		this.body = util.formatRes('0','手机号码字段必须','{}');
		return;
	}
	if(!email){
		this.body = util.formatRes('0','邮箱字段必须','{}')
		return;
	}

	let userData = {
		name:name,
		tel:tel,
		email:email
	}
	let aUser = new userModel(userData);
	yield aUser.save(); 
	userData._id = aUser._id
	this.body = util.formatRes('1','注册成功',JSON.stringify(userData));
}
function *changePwd(){

}
function *check(next){
	

}
module.exports = router;
