import React, { Component } from 'react';
import './App.css';

import GlobalMap from './components/global_map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to DnD</h1>
        </header>
        <GlobalMap />
      </div>
    );
  }
}

export default App;
