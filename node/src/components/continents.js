import React, { Component } from 'react';
import continents from '../data/continents.json';

export default class Continents extends Component {
  render() {
    const children = [
    ];
    if (this.props.display && continents[this.props.display]) {
      children.push(<div>{ this.props.display } </div>);
      const displayInfo = continents[this.props.display];
      if (displayInfo && displayInfo["otherRaces"]) {
        children.push(<div>{ continents[this.props.display]["otherRaces"] } </div>);
      }
    }

    return (
      <div className="continents">
      { children }
      </div>
    );
  }
}
