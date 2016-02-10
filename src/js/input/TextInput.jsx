import React, { PropTypes } from 'react';
import InputBase from './InputBase';

export default class TextInput extends InputBase {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func
  };

  render() {
    const metaData = this.props.metaData,
      data = this.props.data,
      value = data[metaData.id],
      inputClass = this.getInputClass(),
      labelHtml = this.getLabelHtml();

    return (
      this.renderWrapper([
        labelHtml,
        <input id={metaData.id} name={metaData.id} className={inputClass}
               value={value} type="text" onChange={this.props.onChange}/>
      ])
    );
  }
}
