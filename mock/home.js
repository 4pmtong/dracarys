import mockjs from 'mockjs';

export default {
  // Home:  api/getEvents
  'GET /api/events': {
    code: 200,
    message: '',
    data: [{
      eid: '',
      name: 'eventName',
      image_url: '',
      abstract: '',
      intro: '',
      start_time: '',
      apply_time: '',
      quota: 30,
      lucky_quota: 5,
      num_of_register: 33,
      num_of_in_queue: 10,
      venue: 'Singapore Zoo',
      contact: '',
      contact_email: '',
      event_state: 1
    }]
  },
}
