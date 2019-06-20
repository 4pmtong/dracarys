import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api2/users': { users: ['a', 'b'] },

  // GET POST 可省略
  '/api2/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api2/users/create': (req, res) => { res.end('OK'); },

  // 使用 mockjs 等三方库
  'GET /api2/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),

  // {
  //   code: 200,
  //   data: ''
  //   message: ''
  // }
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

//   // Event detail
//   'GET api/event/id': {
//     code: 200,
//     message: '',
//     data: {
//       eid: '',
//       name: 'eventName',
//       abstract: '',
//       intro: '',
//       event_start_time: '',
//       apply_start_time: '',
//       apply_end_time: '',
//       quota: 30,
//       lucky_quota: 5,
//       num_of_register: 33,
//       num_of_in_queue: 10,
//       venue: 'Singapore Zoo',
//       contact: '',
//       contact_email: '',
//       image_url: '',
//       event_state: ''
//     }
//   },

//   'GET api/status/user/123/event/123': {
//     code: 200,
//     message: '',
//     data: {
//       eid: '',
//       uid: '',
//       event_state: 1,
//       // 1 -> 未开始 grey join
//       // 2 -> 已开放
//       // 3 -> 已结束  grey ended
//       state: 1,
//       // 1 -> color: grey  button: join 可加入
//       // 2 -> color: green button: join 可排队
//       // 3 -> color: green button: queue 已加入

//       // 4 -> color: red   button: cancel 正在排队
//       // 5 -> color: grey  button: ended 落选
//     }
//   },

//   'POST api/apply/event/user/123/event/123': {
//     code: 200,
//     message: '',
//     data: {
//       eid: '',
//       uid: '',
//       event_state: 1,
//       // 1 -> 未开始 grey join
//       // 2 -> 已开放
//       // 3 -> 已结束  grey ended
//       state: 1,


//       // 1 -> color: grey  button: join 可加入
//       // 2 -> color: green button: join 可排队
//       // 3 -> color: green button: queue 已加入

//       // 4 -> color: red   button: cancel 正在排队
//       // 5 -> color: grey  button: ended 落选
//     }
//   },

//   // user event
//   'GET api/user/123/events': {
//     data: [{
//       eid: '',
//       name: 'eventName',
//       abstract: '',
//       intro: '',
//       event_start_time: '',
//       apply_start_time: '',
//       apply_end_time: '',
//       quota: 30,
//       lucky_quota: 5,
//       num_of_register: 33,
//       num_of_in_queue: 10,
//       venue: 'Singapore Zoo',
//       contact: '',
//       contact_email: '',
//       image_url: '',

//       uid: '',
//       event_state: 1,
//       // 1 -> 未开始 grey join
//       // 2 -> 已开放
//       // 3 -> 已结束  grey ended
//       state: 1,
//     }]
//   },

//   'GET api/admin/123/events': {
//     code: 200,
//     message: '',
//     data: [{
//       eid: '',
//       name: 'eventName',
//       abstract: '',
//       intro: '',
//       event_start_time: '',
//       apply_start_time: '',
//       apply_end_time: '',
//       quota: 30,
//       lucky_quota: 5,
//       num_of_register: 33,
//       num_of_in_queue: 10,
//       venue: 'Singapore Zoo',
//       contact: '',
//       contact_email: '',
//       image_url: '',

//       uid: '',
//       event_state: 1
//     }]
//   },

//   'POST api/admin/123/event': {
//     code: 200,
//     message: '',
//     data: {
//       eid: '',
//       name: 'eventName',
//       abstract: '',
//       intro: '',
//       event_start_time: '',
//       apply_start_time: '',
//       apply_end_time: '',
//       quota: 30,
//       lucky_quota: 5,
//       num_of_register: 33,
//       num_of_in_queue: 10,
//       venue: 'Singapore Zoo',
//       contact: '',
//       contact_email: '',
//       image_url: '',

//       uid: '',
//       event_state: 1
//     }
//   },

//   'DELETE api/admin/123/event/123': {
//     code: 200,
//     message: '',
//     data: {}
//   }
}
