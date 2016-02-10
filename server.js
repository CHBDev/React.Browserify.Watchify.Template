var koa = require('koa');
var koaRoute = require('koa-route');
var koaServe = require('koa-static');
var koaMount = require('koa-mount');
var koaLogger = require('koa-logger');

var api = require('./api.js');

var server = koa();

var docsApp = require('./docs.js');

server.use(koaLogger());
server.use(koaMount('/', koaServe('./build/public')));

//server.use(koaMount('/docs', koaServe('./build/public/docs')));
//server.use(koaMount('/docs', docsApp) )

//server.use(koaRoute.get('/', api.index));
server.use(koaRoute.get('/docs', api.docs));
server.use(koaRoute.get('/test', api.test));


var port = process.env.PORT || 8080;
server.listen(port);
console.log("KOA Server Listening on port: " + port);

module.exports = server;