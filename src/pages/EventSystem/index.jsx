import React from 'react';
import axios from 'axios';

import './index.scss';
// import { formatMessage } from 'umi-plugin-locale';
import EventCard from '../../components/EventCard';

export default class HomePage extends React.Component{
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

  render() {
    return (
      <div className='normal'>
        <EventCard />
      </div>
    );
  }
}
