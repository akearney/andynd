import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import WorldMap from './components/world_map.js';
import Calendar from './components/calendar.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to DnD</h1>
            <Link to="/">World Globe</Link>
            <Link to="/calendar">Calendar</Link>
          </header>
          <Route exact path="/" component={WorldMap}/>
          <Route path="/calendar" component={Calendar}/>
        </div>
      </Router>
    );
  }
}

export default App;
