import ReactDOM from 'react-dom';
import React from 'react';
import Parent from './Parent';

export default class App extends React.Component {
  render () {
    return (
        <Parent />
    );
  }
}

console.log(React);
ReactDOM.render(<App />, window.document.getElementById('app'));

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
