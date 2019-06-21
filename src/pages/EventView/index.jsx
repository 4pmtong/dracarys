import React from 'react';
import './index.scss';
import Store from '../../../API/httpCall';
import getQueryVariable from '../../logic/urllogic.js';
import moment from 'moment';

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
    const event_start_date_time = event.event_start_time && moment(event.event_start_time) || new moment(1561124772);
    const event_end_date_time = event.event_end_time && moment(event.event_end_time);
    return (
      <div>
        <Row gutter={12}>
          <Col span={12} className="image-wrapper">
            <img className='image' src={event.image_url || 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg'} alt="event"/>
          </Col>
          <Col span={12} className="image-wrapper">
            <div className="event-view-card-info">
              <Row>
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
                      console.log(event_start_date_time, event_end_date_time)
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
                </Col>
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
    <EventPage />
  )
}
