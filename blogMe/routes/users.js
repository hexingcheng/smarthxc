const router = require('koa-router')();
var co = require('co');
var mongoose = require('mongoose');
var session = require('koa-session');
const conf = require('../conf/conf.js');
var userModel = require('../db/models/user.js');
var util = require('../util/utils.js')
var sessionModel = require('../db/models/session.js');
router.get('/', function *(next) {
  this.body = 'this a users response!';
});
router.post('/login',login);
router.post('/rigester',rigester);
router.post('/changePwd',changePwd)
function *login(next){
	let name = this.query.name;
	let tel = this.query.tel;
	if(!name){
		this.body = util.formatRes('0','姓名字段必须','{}');
		return;
	}
	if(!tel){
		this.body = util.formatRes('0','手机号字段必须','{}');
		return;
	}
	let loginData = {
		name:name,
		tel:tel
	}
	let selectData = yield userModel.findOne(loginData);
	if(!selectData){
		this.body = util.formatRes('0','账号或密码错误','{}');
		return yield next;
	}	
	if(selectData.name==loginData.name&&selectData.tel == loginData.tel){
		//登陆成功 数据库存ssession
		let sData = {
			sid:selectData._id,
			sName:selectData.name
		}
		loginData._id = selectData._id;
		let aSession = new sessionModel(sData);
		var ifHasSeesion = yield sessionModel.findOne(sData);
		if(!ifHasSeesion){
			yield aSession.save();
		}
		this.cookies.set('_id',selectData._id,{
			signed:false
		});
		this.body = util.formatRes('1','登陆成功',JSON.stringify(loginData));
	}
};
function *rigester(next){
	let name = this.query.name;
	let tel = this.query.tel;
	let email = this.query.email;
	if(!name){
		this.body = util.formatRes('0','姓名字段必须','{}');
		return;
	}else{
		yield checkRigester.call(this);
		if(this.rigester){
			return yield next;
		}
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
function *checkRigester(){
	let name = this.query.name;
	let cName = yield userModel.findOne({name:name})
	if(!cName){
		this.rigester = false
	}else{
		this.rigester = true
		this.body = util.formatRes('0','已注册','{}');
	}
}
module.exports = router;
