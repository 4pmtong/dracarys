import React from 'react';
import { Button, Icon } from 'antd';

import dayjs from 'dayjs';
import './index.scss';

export default class EventCard extends React.Component {
  getEventMonth(timestamp) {
    const eventTime = new Date(timestamp*1000);
    const numMonth = eventTime.getMonth();
    const enMonth = this.monthNumberToString(numMonth);

    return enMonth;
  }

  getEventDate(timestamp) {
    const eventTime = new Date(timestamp*1000);
    const day = eventTime.getDate();

    return day;
  }

  monthNumberToString(num) {
    const enMonthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Spt','Oct','Nov','Dec'];

    return enMonthArray[num];
  }

  render() {
    const { event, onEdit, state } = this.props;
    const allMembers = event.num_of_registered + event.num_of_in_queue;
    const leftMembers = event.quota - event.num_of_registered;

    return (
      <div className='event-card'>
        <div className='event-img'>
          <img className='image' src={event.image_url} alt="event"/>

          <div className='event-keyword'>{event.keyword}</div>
        </div>

        <div className='event-info'>
          <div className='info-box'>
            <div className='time'>
              <p className='month'>{this.getEventMonth(event.event_start_time)}</p>
              <p className='day'>{this.getEventDate(event.event_start_time)}</p>
            </div>
            <div className='detail'>
              <h5 className='event-name'>{event.name}</h5>
              <p className='event-time'>
                {`${dayjs(event.event_start_time).format('ddd, MMM DD')}`}
              </p>
              <p className='event-venue'>
                {event.venue}
              </p>

              <p className='event-apply-info'>
                {`${allMembers} Sailor${allMembers > 1 ? 's' : ''} are interested`}
              </p>
              <p className='event-queue-info'>
                {`${leftMembers > 0 ? leftMembers : 0} Spot${leftMembers > 1 ? 's' : ''} left!`}
              </p>
              <p className='event-lucky-info'>
                {`${event.lucky_quota} Lucky Draw Chance${event.lucky_quota > 1 ? 's' : ''} 🎉`}
              </p>
            </div>
          </div>

          <a
            className='event-button'
            href={`/event?eid=${event.eid}`}
            target='_blank'
            rel="noopener noreferrer"
          >
            <Button type="primary" block className='click-button'>
              {this.props.button}
            </Button>
          </a>
        </div>

        <div className='action-list'>
          {onEdit && <div className='icon edit' onClick={() => { onEdit(event) }}><Icon type="form" /></div>}
          {/* {onDelete && <div className='icon delete' onClick={() => { onDelete(event) }}><Icon type="delete" /></div>} */}
        </div>

        {
          !!state &&
          <div className='event-state' style={{borderBottom: `8px solid ${state.color}`}}>
            <span className='state-tip'>{state.value}</span>
          </div>
        }
      </div>
    );
  }
}
