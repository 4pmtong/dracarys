import React from 'react';
import './index.scss';
import Store from '../../../API/httpCall';
import getQueryVariable from '../../logic/urllogic.js';
import moment from 'moment';

import EventUserList from './components/EventUserList';

import {
  Row,
  Col,
  notification,
} from 'antd';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

class EventPage extends React.Component {
  state = {
    eid: -1,
    event: {},
  }

  componentDidMount() {
    const eid = getQueryVariable('eid');
    if(eid) {
      Store.getEventDetail(eid).then((data) => {
        if(!data.message) {
          console.log(data.data)
          this.setState({
            event: data.data,
            eid: eid,
          })
        } else {
          openNotificationWithIcon('error', `Failed to fetch event ${eid}`, data.message);
        }
      }).catch(err => {
        openNotificationWithIcon('error', `Failed to fetch event ${eid}`, err);
      })
    }
  }

  render() {
    const { event } = this.state;
    const event_start_date_time = event.event_start_time && moment.unix(event.event_start_time);
    const event_end_date_time = event.event_end_time && moment.unix(event.event_end_time);
    const apply_end_date_time = event.apply_end_time && moment.unix(event.apply_end_time);
    return (
      <div>
        <Row gutter={12}>
          <Col span={12}>
            <img className='image' src={event.image_url || 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg'} alt="event"/>
          </Col>
          <Col span={12}>
            <div className="event-view-card-info">
              <Row justify="space-between">
                <Col span={3}>
                  <div className="big-month">
                    {event_start_date_time && event_start_date_time.format('MMMM').substring(0,3).toUpperCase() || 'XXX'}
                  </div>
                  <div className="big-date">
                    {event_start_date_time && event_start_date_time.format('DD') || 'XX'}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="big-header">
                    {event.name || 'XXX'}
                  </div>
                  <div className="event-date">
                    {(() => {
                      if(!event_start_date_time || !event_end_date_time) {
                        if(event_start_date_time) {
                          return event_start_date_time.format('dddd, MMMM DD, hh:mm A')
                        }
                        if(event_end_date_time) {
                          return `Ends: ${event_end_date_time.format('dddd, MMMM DD, hh:mm A')}`
                        }
                        return '-';
                      }
                      if(event_start_date_time.isSame(event_end_date_time, 'day')) {
                        return `${event_start_date_time.format('dddd, MMMM DD, hh:mm A')}-${event_end_date_time.format('hh:mm A')}`
                      }
                      return (
                        <React.Fragment>
                          {event_start_date_time.format('dddd, MMMM DD, hh:mm A')} to
                          <br />
                          {event_end_date_time.format('dddd, MMMM DD, hh:mm A')}
                        </React.Fragment>
                      );
                    })()}
                  </div>
                  <div className="event-details">
                    {event.num_of_registered || 'xx'} Sailor{event.num_of_registered && event.num_of_registered > 1 && 's'} are going
                  </div>
                  <div className="event-details-red">
                    {event.event_availability || 'xx'} Spot{event.event_availability && event.event_availability > 1 && 's'} left!
                  </div>
                  {event.lucky_quota && (
                    <div className="event-details">
                      {event.lucky_quota} Lucky Draw Chance{event.lucky_quota && event.lucky_quota > 1 && 's'}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="blackFont">
                Application <b>before <u>{apply_end_date_time && apply_end_date_time.format('DD/MM/YYYY hh:mm A') || 'xx/xx/xxxx xx:xx'}</u></b>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default function() {
  return (
    <>
      <EventPage />
      <EventUserList />
    </>
  )
}
