import React, { PropTypes, Component } from 'react';

export default class FontIcon extends Component {
  static propTypes = {
    icon: PropTypes.object.isRequired
  };

  render() {
    const icon = this.props.icon;
    var iconClass = `fa ${icon.name}`;
    if (icon.size) {
      iconClass += ` ${icon.size}`;
    }
    return (
        <i className={iconClass} title={icon.hoverText} />
    );
  }
}
