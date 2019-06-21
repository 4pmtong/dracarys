import React from 'react';

import './index.scss';
import EventCard from '../../../../components/EventCard';

export default class EventBox extends React.Component{
  render() {
    return (
      <div className='event-box'>
        <div className='event-date'>
          {this.props.eventDate}
        </div>

        <div className='event-list'>
          {this.props.events.map((event, key) => {
            return (
              <EventCard key={key} event={event}/>
            );
          })}
        </div>
      </div>
    );
  }
}
