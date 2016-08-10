var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
var session = require('koa-session');
var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles.js');
var admin = require('./routes/admin.js')
var check = require('./middleware/checklogin.js')
require('./db/connect.js')
// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(session(app));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
// app.use(check)
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());
koa.use('/articles', articles.routes(), articles.allowedMethods());
koa.use('/admin', admin.routes(), admin.allowedMethods());
// mount root routes  
app.use(koa.routes());

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});
module.exports = app;
