import React, { Component } from 'react';
import Modal from 'react-modal';
import calendar from '../data/calendar.json';
import logs from '../data/session_logs.json';
import './calendar.css';

Modal.setAppElement('#root');

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      currentLog: ''
    };
  }

  handleClick(e) {
    const month = e.target.getAttribute('month');
    const day = e.target.getAttribute('day');
    if (month && day && logs[month][day]) {
      this.setState({
        modalOpen: true,
        currentMonth: month,
        currentDay: day,
        currentLog: logs[month][day]
      });
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

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
        let dayClass = 'day';
        if (calendar['current']['month'] === month['name'] &&
            calendar['current']['day'] === k + 1) {
          dayClass += ' today';
        }
        if (logs[month['name']] && logs[month['name']][k + 1 + '']) {
          dayClass += ' hasLog';
        }
        currentWeek.push(<td month={ month['name'] } day={ k + 1 }
                         className={ dayClass } key={k}>{ k + 1 }</td>);
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
      <div>
        <div className="calendar" onClick={ this.handleClick.bind(this) }>
          { months }
        </div>
        <Modal isOpen={ this.state.modalOpen }
            onRequestClose={ this.closeModal.bind(this) }>
          <div className="logContent">
            <h3>{ this.state.currentMonth } { this.state.currentDay }</h3>
            <button className="close" onClick={ this.closeModal.bind(this) }>X</button>
            <div className="log" dangerouslySetInnerHTML={{ __html: this.state.currentLog }}>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
