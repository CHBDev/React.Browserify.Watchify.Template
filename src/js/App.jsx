import ReactDOM from 'react-dom';
import React, { PropTypes, Component } from 'react';

export default class App extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  static childContextTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount(){}
  }

  onChangeView = (viewIndex) => {
    
  };

  render () {
    const _selectedView = this.props.views[this.state.displayView];
    
    return (
        <div className="app-pane">
          <div className="app-header">
          </div>
        </div>
    );
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'));
