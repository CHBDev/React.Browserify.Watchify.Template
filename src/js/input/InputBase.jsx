import React, { PropTypes, Component } from 'react';

export default class InputBase extends Component {
  static propTypes = {
    metaData: PropTypes.object.isRequired,
    errors: PropTypes.array
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  renderWrapper(...body) {
    const metaData = this.props.metaData;
    var questionClass = "form-question";
    if (metaData.questionClass) {
      questionClass += ` ${metaData.questionClass}`;
    }
    return (
      <div className={questionClass} onClick={this.stopPropagation}>
        {body}
      </div>
    );
  }

  getLabelHtml () {
    const metaData = this.props.metaData;
    if (metaData.label) {
      return <label htmlFor={metaData.id}>{metaData.label}</label>;
    }
    return null;
  }

  getInputClass() {
    const metaData = this.props.metaData;
    var inputClass = "input";
    if (metaData.inputClass) {
      inputClass += ` ${metaData.inputClass}`;
    }
    if (this.props.errors && this.props.errors.includes(metaData.id)) {
      inputClass += " error";
    }
    return inputClass;
  }
}
