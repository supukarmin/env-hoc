const MockExpressRequest = require('mock-express-request');

module.exports = (options) => {
  const req = new MockExpressRequest();
  if (options.data === 'with') {
    req.headers = {
      ...req.headers,
      'true-client-ip': options.proxyIpAddress ? options.proxyIpAddress : null,
      'user-agent': global.navigator.userAgent,
      cookie: global.document.cookie,
    };
    req.connection.remoteAddress = options.ipAddress ? options.ipAddress : null;
  } else if (options.data === 'without') {
    delete req.headers['accept-language'];
    delete req.headers['true-client-ip'];
    delete req.headers['user-agent'];
    delete req.headers['cookie'];
  } else if (options.data === 'bad') {
    req.headers = {
      ...req.headers,
      'accept-language': '____1337',
    };
    delete req.headers['true-client-ip'];
    delete req.headers['user-agent'];
    delete req.headers['cookie'];
  } else if (options.data === 'partially-bad') {
    req.headers = {
      ...req.headers,
      'accept-language': '____1337data',
    };
    delete req.headers['true-client-ip'];
    delete req.headers['user-agent'];
    delete req.headers['cookie'];
  }
  return req;
};
