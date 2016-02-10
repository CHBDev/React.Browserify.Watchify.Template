import React, { PropTypes } from 'react';
import InputBase from './InputBase';

export default class CheckBox extends InputBase {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func
  };

  render() {
    const metaData = this.props.metaData,
        data = this.props.data,
        labelHtml = this.getLabelHtml();
    return (
        this.renderWrapper([
          <input id={metaData.id} name={metaData.id} type="checkbox"
                 defaultChecked={data[metaData.id]}
                 className={this.getInputClass()}
                 onChange={this.props.onChange}/>,
          labelHtml
        ])
    );
  }
}
