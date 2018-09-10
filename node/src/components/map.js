import React, { Component } from 'react';
import { Map as Leaflet, TileLayer  } from 'react-leaflet'

import './map.css';

export default class Map extends Component {
  state = {
    lat: 0,
    lng: 0,
    zoom: 1
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Leaflet center={ position } zoom={ this.state.zoom }>
        <TileLayer noWrap={ true } maxZoom={ 4 } url="/tiles/map_{z}_{x}_{y}.jpeg" />
      </Leaflet>
    );
  }
}
