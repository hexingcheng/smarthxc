var router = require('koa-router')();
var util = require('../util/utils.js')
router.get('/', function *(next) {
  yield this.sendFile('../public/admin/index.html');
});
router.post('/login',adminLogin);
function *adminLogin(next){ 
	var param = this.query;
	console.log(param)
	this.body = util.formatRes('1','登录成功','{}')
}
module.exports = router;