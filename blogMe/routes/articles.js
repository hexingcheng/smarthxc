var router = require('koa-router')();
var util = require('../util/utils.js')
router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});
router.get('/articlesList',getArticleList);
router.post('/add',addArticle);
router.post('/info/:id',getArticleList);
router.post('/edit/:id',editArticle);
router.post('/delete/:id',deleteArticle);
function *addArticle(){

}
function *getArticleList(){
	this.body = util.formatRes('1','请求成功','{}');
}
function *getArticleInfo(){

}
function *editArticle(){

}
function *deleteArticle(){

}
module.exports = router;