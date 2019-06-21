// TODO exponential decay

const delay = t => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export const requestor = ({ loginAuthUrl = '/', httpRedirectCodes = [] } = {}) => (
  path,
  options = {},
  ignoreEmptyData = false,
  returnStatusCode = false
) => {
  let tempHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const nextOptions = Object.assign(
    {
      credentials: 'same-origin',
      headers: tempHeader,
    },
    options
  );
  return fetch(path, nextOptions).then(response => {
    if (httpRedirectCodes.indexOf(response.status) !== -1) {
      // redirect code
      window.location.href = loginAuthUrl;
      return delay(2000).then(() => {
        throw new Error(`Login Fail, please jump to ${loginAuthUrl}`);
      });
    }
    return response.text().then(txt => {
      let err = undefined;
      if (response.status === 302) {
        window.location.reload();
        return null;
      } else if (response.status === 404) {
        if (ignoreEmptyData) {
          return null;
        }
        err = new Error(txt || 'resource can not be found');
        err.status = response.status;
      } else if (response.status === 409) {
        // special for Data Nexus
        try {
          return JSON.parse(txt);
        } catch (e) {
          err = new Error(
            `Fail to parse response to json. Response text is ${txt}. Request path is ${path}, request options is ${JSON.stringify(
              options,
              null,
              5
            )}`
          );
          err.status = -1;
        }
      } else if (response.status < 200 || response.status >= 400) {
        err = new Error(txt || 'inner server error');
        err.status = response.status;
      } else if (response.status === 204) {
        // delete
        return null;
      } else {
        if (txt === null || txt === '' || txt === 'Hello World!') {
          return null;
        }
        try {
          return JSON.parse(txt);
        } catch (e) {
          err = new Error(
            `Fail to parse response to json. Response text is ${txt}. Request path is ${path}, request options is ${JSON.stringify(
              options,
              null,
              5
            )}`
          );
          err.status = -1;
        }
      }
      if (err) {
        throw err;
      }
    });
  });
};

// TODO cache
export const requestCacher = request => {
  const requestCaches = {};

  // only cache get request by url
  const cacheRequest = url => {
    if (requestCaches[url]) {
      return Promise.resolve(requestCaches[url]);
    }
    return request(url).then(data => {
      requestCaches[url] = data;
      return data;
    });
  };

  return cacheRequest;
};
