import React from 'react';
import axios from 'axios';

import './index.scss';
// import { formatMessage } from 'umi-plugin-locale';
import EventBox from './components/EventBox';

export default class HomePage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      allEvents: [],
      sortEvents: {},
    }
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getSortEvents(allEvents) {
    const sortEvents = {};
    allEvents.map((event) => {
      const eventDate = new Date(event.event_start_time*1000);
      const year = eventDate.getFullYear();
      const numMonth = eventDate.getMonth();
      const enMonth = this.monthNumberToString(numMonth);
      const key = `${enMonth} ${year}`;

      !sortEvents[key] && (sortEvents[key] = []);
      sortEvents[key].push(event);

      return event;
    });

    return sortEvents;
  }

  monthNumberToString(num) {
    const enMonthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Spt','Oct','Nov','Dec'];

    return enMonthArray[num];
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

  render() {
    return (
      <div className='home-content'>
        {
          Object.keys(this.state.sortEvents).map(eventDate => {
            return (
              <EventBox
                key={eventDate}
                eventDate={eventDate}
                events={this.state.sortEvents[eventDate]}
              />
            );
          })
        }
      </div>
    );
  }
}
