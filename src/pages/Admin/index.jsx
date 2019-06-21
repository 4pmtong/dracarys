import React from 'react';
import axios from 'axios';
import { Icon } from 'antd';

import EventCard from '../../components/EventCard';

import './index.scss';

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
            allEvents: response.data.data,
            sortEvents: this.getSortEvents(response.data.data)
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

  render() {
    return (
      <div className='admin-content'>
        <h2 className='admin-title'>Admin</h2>

        <div className='admin-add-event'>
          <Icon type="plus" />
          Create an Event
        </div>

        <div className='event-list'>
          {
            this.state.allEvents.map((event, key) => {
              return (
                <EventCard
                  key={key}
                  event={event}
                  button='View Event'
                  state={event.option}
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
