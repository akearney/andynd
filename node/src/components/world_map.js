import React, { Component } from 'react';
import './world_map.css';

import GlobalMap from './global_map';
import Continents from './continents';

export default class WorldMap extends Component {
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
      <div className="flexContainer">
        <GlobalMap onContinent={ this.onContinent.bind(this) }/>
        <Continents display={ this.state.continent } />
      </div>
    );
  }
}
