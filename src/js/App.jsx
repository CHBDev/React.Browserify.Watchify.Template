import ReactDOM from 'react-dom';
import React, { PropTypes, Component } from 'react';

export default class App extends Component {

  getChildContext() {
    return {
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  onAddNewThing = (evt, theNewThing) => {
  };

  onCancelNewVehicle = (evt) => {
    this.setState({newVehicle: null})
  };

  onChangeView = (viewIndex) => {
    this.setState({ displayView: viewIndex });
  };

  isVehicleExpanded = (expandId) => {
    return expandId == this.state.expandedVehicle;
  };

  render () {
    const _selectedView = this.props.views[this.state.displayView];
        
    return (
        <div className="app-pane">
          <div className="app-header">
          STUFF
          </div>
        </div>
    );
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'));
