import React, { Component } from 'react';
import calendar from '../data/calendar.json';
import './calendar.css';

export default class Calendar extends Component {
  render() {
    const months = [];
    const numDaysInWeek = calendar['weekdays'].length;
    for (let i = 0; i < calendar['months'].length; i++) {
      const month = calendar['months'][i];
      const weeks = []
      const weekdayHeader = [];
      for (let j = 0; j < numDaysInWeek; j++) {
        const name = calendar['weekdays'][j]['name'];
        weekdayHeader.push(<th key={ name }>{ name }</th>);
      }

      let currentWeek = [];
      for (let k = 0; k < month['days']; k++) {
        if (calendar['current']['month'] === month['name'] &&
            calendar['current']['day'] === k + 1) {
          currentWeek.push(<td title="Today" className="day today" key={k}>{ k + 1 }</td>);
        } else {
          currentWeek.push(<td className="day" key={k}>{ k + 1 }</td>);
        }
        if ((k + 1) % numDaysInWeek === 0) {
          if (currentWeek.length) {
            const key = `week${ k / numDaysInWeek }`;
            weeks.push(
              <tr key={ key }>
                {currentWeek}
              </tr>);
          }
          currentWeek = [];
        }
      }
      const classes = `month ${month['name']}`;
      months.push(
        <div key={ month['name'] } className={ classes }>
          <div className="monthHeader">{ month['name'] }</div>
          <table>
            <thead>
              <tr>
                { weekdayHeader }
              </tr>
            </thead>
            <tbody>
              { weeks }
            </tbody>
          </table>
        </div>);
    }

    return (
      <div className="calendar">
        { months }
      </div>
    );
  }
}
