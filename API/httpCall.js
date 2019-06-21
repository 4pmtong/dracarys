import { requestor } from './request';

const request = requestor({
  loginAuthUrl: '/',
});

const networkErrorType = api => (...args) =>
  api(...args).catch(err => {
    const newErr = err;
    newErr.type = 'network error';
    throw newErr;
  });

export default {
  // init
  getEventDetail: networkErrorType((eventId) => request(`/api/event/${encodeURIComponent(eventId)}`)),
  createEvent: networkErrorType((body) => request(`/api/events`, {
    method: 'POST',
    body: JSON.stringify(body),
  })),
  updateEvent: networkErrorType((eventId, body) => request(`/api/event/${encodeURIComponent(eventId)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })),
  deleteEvent: networkErrorType((eventId, body) => request(`/api/event/${encodeURIComponent(eventId)}`, {
    method: 'DELETE',
  })),
  getEventDetailByUid: networkErrorType((eid, uid) => request(`/api/registry/user/${encodeURIComponent(uid)}/event/${encodeURIComponent(eid)}`)),
};
