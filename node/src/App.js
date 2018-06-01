import React, { Component } from 'react';
import './App.css';

import GlobalMap from './components/global_map';
import Continents from './components/continents';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onContinent(cont) {
    this.setState({
      'continent': cont
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to DnD</h1>
        </header>
        <div className="flexContainer">
          <GlobalMap onContinent={ this.onContinent.bind(this) }/>
          <Continents display={ this.state.continent } />
        </div>
      </div>
    );
  }
}

export default App;
