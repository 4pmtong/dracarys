import React from 'react';
import './index.scss';
import Store from '../../../API/httpCall';
import getQueryVariable from '../../logic/urllogic.js';

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
    return (
      <div>
        <Row>
          <Col span={12} className="image-wrapper">
            <img className='image' src={event.image_url} alt="event"/>
          </Col>
          <Col span={12} className="image-wrapper">
            <div className="event-view-card-info">
              Test
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
