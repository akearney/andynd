import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import WorldMap from './components/world_map.js';
import Calendar from './components/calendar.js';
import Map from './components/map.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">World Globe</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/map">Map</Link>
          </header>
          <Route exact path="/" component={WorldMap}/>
          <Route path="/calendar" component={Calendar}/>
          <Route path="/map" component={Map}/>
        </div>
      </Router>
    );
  }
}

export default App;
