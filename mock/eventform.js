import mockjs from 'mockjs';

export default {
  // Event detail
  'GET api/event/id': {
    code: 200,
    message: '',
    data: {
      eid: '',
      name: 'eventName',
      abstract: '',
      intro: '',
      event_start_time: '',
      apply_start_time: '',
      apply_end_time: '',
      quota: 30,
      lucky_quota: 5,
      num_of_register: 33,
      num_of_in_queue: 10,
      venue: 'Singapore Zoo',
      contact: '',
      contact_email: '',
      image_url: '',
      event_state: ''
    }
  },

  'POST api/events': {
    code: 200,
    message: '',
    data: {
      //eid: '',
      name: 'eventName',
      abstract: '',
      intro: '',
      event_start_time: '',
      apply_start_time: '',
      apply_end_time: '',
      quota: 30,
      lucky_quota: 5,
      //num_of_register: 33,
      //num_of_in_queue: 10,
      venue: 'Singapore Zoo',
      contact: '',
      contact_email: '',
      image_url: '',
      //uid: '',
      //event_state: 1
    }
  },

  'PUT api/event/123': {
    code: 200,
    message: '',
    data: {
      eid: '',
      name: 'eventName',
      abstract: '',
      intro: '',
      event_start_time: '',
      apply_start_time: '',
      apply_end_time: '',
      quota: 30,
      lucky_quota: 5,
      num_of_register: 33,
      num_of_in_queue: 10,
      venue: 'Singapore Zoo',
      contact: '',
      contact_email: '',
      image_url: '',

      uid: '',
      event_state: 1
    }
  },

  'DELETE api/event/123': {
    code: 200,
    message: '',
    data: {}
  }
}
