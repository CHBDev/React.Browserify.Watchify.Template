(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Child = require('./Child.jsx');
var Parent = require('./Parent.jsx');

var App = {};
console.log(React);
React.render(React.createElement(Parent, null), document.getElementById('app'));

/**
 * @param  {string}
 * @param  {object}
 * @param  {int}
 * @param  {float}
 * @return {array}
 */
var myJSDocFunction1 = function myJSDocFunction1(test1, test2, test3, test4) {
  return test1;
};

var myFatArrowFunction = function myFatArrowFunction() {
  return function () {
    console.log("Fat Arrow");
  };
};

myFatArrowFunction();

module.exports = App;

},{"./Child.jsx":2,"./Parent.jsx":3}],2:[function(require,module,exports){
"use strict";

var Child = React.createClass({
  displayName: "Child",

  render: function render() {
    return React.createElement(
      "span",
      null,
      React.createElement(
        "span",
        { className: "box" },
        "This is the child class with the ",
        React.createElement(
          "i",
          null,
          "property.name"
        ),
        ": ",
        React.createElement(
          "b",
          null,
          this.props.name
        ),
        "."
      )
    );
  }
});

module.exports = Child;

},{}],3:[function(require,module,exports){
"use strict";

var Child = require('./Child.jsx');

var Parent = React.createClass({
  displayName: "Parent",

  render: function render() {

    return React.createElement(
      "div",
      { className: "holder" },
      React.createElement(
        "div",
        null,
        "This is the class: Parent"
      ),
      React.createElement(
        "span",
        null,
        "---"
      ),
      React.createElement(
        "span",
        { className: "partial" },
        "This is an inner span in the parent."
      ),
      React.createElement("div", null),
      React.createElement(
        "span",
        null,
        "---"
      ),
      React.createElement(Child, { name: "Joe" }),
      React.createElement(
        "div",
        null,
        "..."
      )
    );
  }
});

module.exports = Parent;

},{"./Child.jsx":2}]},{},[1]);
