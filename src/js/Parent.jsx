import React from 'react';
import Child from './Child';

export default class Parent extends React.Component {
  render() {
    return (
      <div className="holder">
      <div>This is the class: Parent</div>
      <span>---</span>
        <span className="partial">This is an inner span in the parent.</span>
        <div></div>
        <span>---</span><Child name="Joe"/>
        <div>...</div>
      </div>
    )
  }
}