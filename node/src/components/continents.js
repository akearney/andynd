import React, { Component } from 'react';
import continents from '../data/continents.json';
import './continents.css';

export default class Continents extends Component {
  render() {
    const children = [
    ];
    if (this.props.display && continents[this.props.display]) {
      children.push(<div>{ this.props.display } </div>);
      const displayInfo = continents[this.props.display];
      if (displayInfo) {
        if (displayInfo['creatorRace']) {
          children.push(<div>Creator Race: { continents[this.props.display]['creatorRace'] } </div>);
        }
        if (displayInfo["otherRaces"]) {
          children.push(<div>Other Main Races: { continents[this.props.display]["otherRaces"] } </div>);
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
