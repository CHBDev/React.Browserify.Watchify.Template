import React from 'react';

export default class Child extends React.Component {
  render() {
    return (
        <span>
        <span className="box">This is the child class with the <i>property.name</i>: <b>{this.props.name}</b>.</span>
      </span>
    )
  }
}