import React, { PropTypes } from 'react';
import InputBase from './InputBase';

export default class TypeListRadioGroup extends InputBase {
  static propTypes = {
    data: PropTypes.object.isRequired,
    contextData: PropTypes.array
  };

  render() {
    const metaData = this.props.metaData,
        data = this.props.data,
        typeList = this.props.contextData;

    return (
      this.renderWrapper(
        <fieldset>{metaData.label}
          {typeList.map(typeListType => {
            const inputId = `typeListType${typeListType.id}`;
            return (
                <span key={typeListType.id} className="radio-group">
                    <input id={inputId} name={metaData.id} type="radio" value={typeListType.id}
                           checked={data[metaData.id] == typeListType.id}
                           onChange={this.props.onChange}/>
                    <label htmlFor={inputId}>{typeListType.displayString}</label>
                </span>
            );
          })}
        </fieldset>
      )
    );
  }
}
