var router = require('koa-router')();
var util = require('../util/utils.js');
var adminModel = require('../db/models/admin.js');
var mongoose = require('mongoose')
router.post('/login', adminLogin);

function* adminLogin(next) {
    let param = this.request.body;
    let email = param.email;
    let password = param.password;
    let loginData = {
        email: email,
        pwd: password
    }
    console.log(loginData)
    let result = yield adminModel.findOne(loginData);
    if (result && result.email == email && result.pwd == password) {
        //跳转页面
        this.body = util.formatRes('1', 'success', '{}')
    } else {
        this.body = util.formatRes('0', 'error', '{}')
    }
}
module.exports = router;