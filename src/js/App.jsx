import ReactDOM from 'react-dom';
import React from 'react';
import TableList from './TableList';

export default class App extends React.Component {
  render () {
    const vehicles = [
      {
        "id": 100,
        "policyId": 1,
        "type": "automobile",
        "color": "blue",
        "make": "Honda",
        "model": "Civic",
        "year": 1996,
        "vIN": "9",
        "plate": "4CAR400",
        "state": "CA"
      },
      {
        "id": 101,
        "policyId": 1,
        "type": "automobile",
        "color": "red",
        "make": "Honda",
        "model": "Accord",
        "year": 1997,
        "vIN": "11",
        "plate": "4FUD450",
        "state": "CA"
      }
    ];
    const vehicleMetaData = {
      "caption": "Select Vehicles from Policy",
      "rowKeyId": "id",
      "tableClass": "vehicles",
      "cells": [
        {
          "name": "",
          "field": "",
          "columnClass": ""
        },
        {
          "name": "Year",
          "field": "year",
          "columnClass": ""
        },
        {
          "name": "Make",
          "field": "make",
          "columnClass": ""
        },
        {
          "name": "Model",
          "field": "model",
          "columnClass": ""
        },
        {
          "name": "License #",
          "field": "plate",
          "columnClass": ""
        },
        {
          "name": "State",
          "field": "state",
          "columnClass": ""
        },
        {
          "name": "",
          "field": "",
          "columnClass": ""
        },
        {
          "name": "",
          "field": "",
          "columnClass": "editing"
        }
      ]
    };

    return (
        <TableList tableData={vehicles} metaData={vehicleMetaData}/>
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
