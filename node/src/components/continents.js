import React, { Component } from 'react';
import continents from '../data/continents.json';
import './continents.css';

export default class Continents extends Component {
  render() {
    const children = [
    ];
    if (this.props.display && continents[this.props.display]) {
      children.push(<h2 key="continent">{ this.props.display } </h2>);
      const displayInfo = continents[this.props.display];
      if (displayInfo) {
        if (displayInfo['creatorRace']) {
          children.push(
            <div key="creatorRace">
              <h3 className="header">Creator Race:</h3>
              <div className="body"> { continents[this.props.display]['creatorRace'] } </div>
            </div>);
        }
        if (displayInfo['otherRaces']) {
          children.push(
            <div key="otherRaces">
              <h3 className="header">Other Main Races:</h3>
              <div className="body"> { continents[this.props.display]['otherRaces'] } </div>
            </div>);
        }
      }
    }

    return (
      <div className="continents">
        { children }
      </div>
    );
  }
}
