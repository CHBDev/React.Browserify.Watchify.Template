import React, { PropTypes, Component } from 'react';
import FontIcon from './FontIcon';

export default class ViewSwitchControl extends Component {
  static propTypes = {
    changeView: PropTypes.func.isRequired,
    currentView: PropTypes.number.isRequired
  };

  onListView = () => {
    this.props.changeView(0);
  };

  onGridView = () => {
    this.props.changeView(1);
  };

  render() {
    const listSelected = this.props.currentView == 0 ? "selected" : "";
    const gridSelected = this.props.currentView == 1 ? "selected" : "";
    return (
        <div className="view-switcher">
          <button onClick={this.onListView} className={listSelected}>
            <FontIcon icon={{ name: "fa-bars", size: "fa-lg" }}/>
          </button>
          <button onClick={this.onGridView} className={gridSelected}>
            <FontIcon icon={{ name: "fa-th-large", size: "fa-lg" }}/>
          </button>
        </div>
    );
  }
}
