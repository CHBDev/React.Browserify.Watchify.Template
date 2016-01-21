var e = module.exports;
var fs = require('fs');
var _ = require('lodash');
var home = fs.readFileSync('./build/public/index.html');
var docs = fs.readFileSync('./build/public/docs/index.html');

e.index = function *(next){
  console.log("Index Generator Fired");
  this.status = 200;
  this.body = _.template(home)({});
  
};

e.test = function *(){
  this.status = 200;
  this.body = "<h1>Hello World Test Page!</h1>";
};

e.docs = function *(){
  this.status = 200;
  this.body = _.template(docs)({});
}

// e.default = function*(next){
//   //this.body = "<h1>Hello World Test Page!</h1>";
//   this.body = _.template(docs)({});
// };