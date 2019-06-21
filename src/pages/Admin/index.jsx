import React from 'react';
import axios from 'axios';
import { Icon } from 'antd';
import router from 'umi/router';

import EventCard from '../../components/EventCard';

import './index.scss';

const eventStates = {
  '1': {
    value: 'FUTURE',
    color: '#6236FF',
  },
  '2': {
    value: 'ONGOING',
    color: '#32C5FF'
  },
  '3': {
    value: 'EXPIRED',
    color: '#EE4D2D'
  },
};
export default class MyEventsPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      allEvents: []
    }
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents() {
    axios.get('/api/events')
      .then((response) => {
        // handle success
        console.log(response);
        if (response && response.data && response.data.code === 200) {
          this.setState({
            allEvents: response.data.data
          })
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }

  goEditPage(event) {
    window.location.href=`/events/form?eid=${event.eid}`
  }

  getEventState(event) {
    return eventStates[event.event_state];
  }

  render() {
    return (
      <div className='admin-content'>
        <h2 className='admin-title'>Admin</h2>

        <div className='admin-add-event'>
          <Icon className='add-icon' type="plus" onClick={() => { router.push('/events/form'); }} />
          <span onClick={() => { router.push('/events/form'); }}>Create an Event</span>
        </div>

        <div className='event-list'>
          {
            this.state.allEvents.map((event, key) => {
              return (
                <EventCard
                  key={key}
                  event={event}
                  button='View Event'
                  state={this.getEventState(event)}
                  onEdit={() => this.goEditPage(event)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
