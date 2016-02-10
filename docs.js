
var koa = require('koa');
var route = require('koa-route');
var app = module.exports = koa();
var fs = require('fs');
var _ = require('lodash');

var indexTemplate = fs.readFileSync('./build/public/docs/index.html');


app.use(route.get("/", index));
app.use(route.get("/user/:name", user));

function *index() {
 	this.body = _.template(indexTemplate)({});
 };
 
 function *user(name) {
 	//this.body = `The name of the user is ${name}`;
 };