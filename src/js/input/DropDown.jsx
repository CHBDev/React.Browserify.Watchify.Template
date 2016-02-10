import React, { PropTypes } from 'react';
import InputBase from './InputBase';

export default class DropDown extends InputBase {
  static propTypes = {
    data: PropTypes.object.isRequired,
    contextData: PropTypes.array.isRequired,
    onChange: PropTypes.func
  };

  render() {
    const metaData = this.props.metaData,
      data = this.props.data,
      defaultValue = data[metaData.id],
      typeList = this.props.contextData,
      inputClass = this.getInputClass(),
      labelHtml = this.getLabelHtml();
    return (
      this.renderWrapper([
        labelHtml,
        <select onChange={this.props.onChange} name={metaData.id} defaultValue={defaultValue} className={inputClass}>
          {typeList.map((option, index) => {
              return <option key={index} value={option.id}>{option.displayString}</option>
          })}
        </select>

      ])
    );
  }
}
