var Child = require('./Child.jsx');
var Parent = require('./Parent.jsx');

var App = {};
console.log(React);
React.render(
             <Parent />,
              document.getElementById('app')
              );


/**
 * @param  {string}
 * @param  {object}
 * @param  {int}
 * @param  {float}
 * @return {array}
 */
var myJSDocFunction1 = function(test1, test2, test3, test4){
  return test1;
};

var myFatArrowFunction = function(){
  return (()=>{console.log("Fat Arrow")});
};

myFatArrowFunction();

module.exports = App;