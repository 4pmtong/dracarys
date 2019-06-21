import React from 'react';
import './index.scss';
import Store from '../../../API/httpCall';
import getQueryVariable from '../../logic/urllogic.js';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';

import EventUserList from './components/EventUserList';

import {
  Alert,
  Row,
  Col,
  Button,
  InputNumber,
  notification,
} from 'antd';
import { thisExpression } from '@babel/types';

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
    button: {
      value: 'Join',
      bgColor: '#02B2A9',
      disabled: false,
    },
    statusOn: false,
    pax: 1,
    loaded: false,
  }

  componentDidMount() {
    const eid = getQueryVariable('eid');
    if(eid) {
      // TODO: UID TO cookie
      Store.getEventDetailByUid(eid, 1).then((data) => {
        if(!data.message) {
          this.setState({
            event: data.data,
            eid: eid,
            button: this.getButtonState(data.data),
            loaded: true,
          })
        } else {
          openNotificationWithIcon('error', `Failed to fetch event ${eid}`, data.message);
        }
      }).catch(err => {
        openNotificationWithIcon('error', `Failed to fetch event ${eid}`, err);
      })
    }
  }

  // TODO: UID TO cookie
  joinEvent() {
    Store.joinEventByUid(this.state.event, this.state.eid, 1).then((data) => {
      if(!data.message) {
        console.log(data.data)
        this.setState({
          event: data.data,
          button: this.getButtonState(data.data),
        })
      } else {
        openNotificationWithIcon('error', `Failed to fetch event ${this.state.eid}`, data.message);
      }
    }).catch(err => {
      openNotificationWithIcon('error', `Failed to fetch event ${this.state.eid}`, err);
    });
  }

  cancelEvent() {
    // TODO: uid
    Store.deleteEventByUid(this.state.event, this.state.eid, 1).then((data) => {
      if(!data.message) {
        console.log(data.data)
        this.setState({
          event: data.data,
          button: this.getButtonState(data.data),
        })
      } else {
        openNotificationWithIcon('error', `Failed to fetch event ${this.state.eid}`, data.message);
      }
    }).catch(err => {
      openNotificationWithIcon('error', `Failed to fetch event ${this.state.eid}`, err);
    });
  }

  getButtonState(event) {
    const button = {
      value: 'Join',
      bgColor: '#02B2A9',
      disabled: false,
    };

    switch (event.option) {
      case 1:
        button.disabled = true;
        button.value = 'Regisration Unavailable';
        button.bgColor = '#ddd';
        break;
      case 3:
        break;
      case 4:
        button.value = 'Queue';
        button.bgColor = '#F7B500';
        break;
      case 5:
        button.value = 'Cancel';
        button.bgColor = '#EE4D2D';
        break;
      case 6:
        button.value = 'Cancel';
        button.bgColor = '#EE4D2D';
        break;
      default:
        button.disabled = false;
        button.value = 'Join';
        button.bgColor = '#02B2A9';
    }

    return button;
  }

  render() {
    const { event } = this.state;
    const event_start_date_time = event.event_start_time && moment.unix(event.event_start_time);
    const event_end_date_time = event.event_end_time && moment.unix(event.event_end_time);
    const apply_start_date_time = event.apply_start_time && moment.unix(event.apply_start_time);
    const apply_end_date_time = event.apply_end_time && moment.unix(event.apply_end_time);
    const allMembers = event.num_of_registered + event.num_of_in_queue;
    const leftMembers = event.quota - event.num_of_registered;

    return this.state.loaded && (
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
                  <div className="event-location">
                    {event.venue || 'XXX'}
                  </div>
                  <div className="wrap-details">
                    <div className="event-details">
                      {allMembers || 'xx'} Sailor{allMembers > 1 && 's'} are going
                    </div>
                    <div className="event-details-red">
                      {`${leftMembers > 0 ? leftMembers : 0}`} Spot{leftMembers > 1 && 's'} left!
                    </div>
                    {event.lucky_quota && (
                      <div className="event-details">
                        {event.lucky_quota} Lucky Draw Chance{event.lucky_quota > 1 && 's'} 🎉
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="blackFont">
                {(() => {
                  const today = moment(new Date());
                  console.log(apply_start_date_time, today)
                  if (apply_end_date_time && apply_end_date_time.diff(today) < 0) {
                    return (
                      <React.Fragment>
                        Application <b>ended on <u>{apply_end_date_time && apply_end_date_time.format('DD/MM/YYYY hh:mm A') || 'xx/xx/xxxx xx:xx'}</u></b>
                      </React.Fragment>
                    )
                  } else if(apply_start_date_time && apply_start_date_time.diff(today) < 0) {
                    return (
                      <React.Fragment>
                        Application <b>before <u>{apply_end_date_time && apply_end_date_time.format('DD/MM/YYYY hh:mm A') || 'xx/xx/xxxx xx:xx'}</u></b>
                      </React.Fragment>
                    )
                  } else if(apply_start_date_time) {
                    return (
                      <React.Fragment>
                        Application will <b>start at <u>{apply_start_date_time && apply_start_date_time.format('DD/MM/YYYY hh:mm A') || 'xx/xx/xxxx xx:xx'}</u></b>
                      </React.Fragment>
                    )
                  }
                  return null;
                })()}
              </Row>
              {
                event.quota > 1 && (
                  <Row style={{ alignItems: 'center', display: 'flex', marginTop: 5 }}>
                    Pax ( including yourself - Max {event.quota} )
                    <div style={{ width: 5 }} />
                    <InputNumber disabled={this.state.button.disabled} defaultValue={this.state.pax} value={this.state.pax} onChange={(value) => {
                      if(value > 0 && value <= event.quota) {
                        this.setState({
                          pax: value,
                        });
                      }
                    }} />
                  </Row>
                )
              }
              <Row className="blackFont">
                {this.state.statusOn && (
                  <Alert closable className="alert" message={(() => {
                    switch(event.option) {
                      case 1:
                        return 'Event is not available for registration.';
                      case 5:
                        return 'You have successfully joined the event';
                      case 6:
                        return 'You are in the waiting list. We will notify you through email when there is slot.';
                      default:
                        return '';
                    }
                  })()} type={(() => {
                    switch(event.option) {
                      case 1:
                        return 'info';
                      case 5:
                        return 'success';
                      case 6:
                        return 'warning';
                      default:
                        return '';
                    }
                  })()} showIcon />
                )}
                <Button
                  className="submit"
                  type="primary"
                  block
                  disabled={this.state.button.disabled}
                  style={{
                    color: '#fff',
                    backgroundColor: this.state.button.bgColor,
                    border: `1px solid ${this.state.button.bgColor}`
                  }}
                  onClick={() => {
                    if (this.state.event.option === 1) return;

                    if (this.state.event.option === 3 || this.state.event.option === 4) {
                      this.joinEvent();
                    } else if (this.state.event.option === 5 || this.state.event.option === 6) {
                      this.cancelEvent();
                    }
                  }}
                >
                  {this.state.button.value}
                </Button>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingLeft: '10%', paddingRight: '10%', width: '100%' }}>
            <div className="event-sub-card-left-info">
              <div className="event-sub-card-header">
                About the Event
              </div>
              <div className="event-sub-card-pic">
                Host: {event.contact || 'xxx'} | E-mail: {event.contact_email || 'xxx@xxx.com'}
              </div>
              <div className="gutter" />
              {(() => {
                const shaf = sanitizeHtml(event.intro || 'Nothing to Preview', {
                  allowedTags: [
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'blockquote',
                    'p',
                    'a',
                    'ul',
                    'ol',
                    'nl',
                    'li',
                    'b',
                    'i',
                    'strong',
                    'span',
                    'em',
                    'strike',
                    'code',
                    'hr',
                    'br',
                    'div',
                    'table',
                    'thead',
                    'caption',
                    'tbody',
                    'tr',
                    'th',
                    'td',
                    'pre',
                    'font',
                    'font face',
                    'col',
                    'colgroup',

                  ],
                  allowedAttributes: {
                    font: ['color'],
                    div: ['style'],
                    img: ['src'],
                    a: ['href', 'target'],
                    span: ['style'],
                    table: ['style'],
                    col: ['width', 'height'],
                    td: ['style'],
                  },
                });
                return <div style={{whiteSpace: 'pre-line', textAlign: 'justify'}} dangerouslySetInnerHTML={{ __html: shaf }} />;
              })()}
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
