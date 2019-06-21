import React from 'react';
import axios from 'axios';

import EventCard from '../../components/EventCard';

import './index.scss';

export default class MyEventsPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: 'Dracarys',
        uid: '9527'
      },
      allEvents: []
    }
  }

  componentDidMount() {
    this.getMyAllEvents();
  }

  getMyAllEvents() {
    axios.get(`/api/user/${this.state.user.uid}/events`)
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

  render() {
    return (
      <div className='my-event-content'>
        <h2 className='my-event-title'>My Events</h2>

        <div className='my-event-list'>
          {
            this.state.allEvents.map((event, key) => {
              return (
                <EventCard
                  key={key}
                  event={event}
                  button='View Event'
                  state={event.option}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
