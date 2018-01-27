const base = require('../base');

const getFromRequest = (variables, args, options) => {
  if (args.req.headers && args.req.headers['user-agent']) {
    variables.userAgent = args.req.headers['user-agent'];
  }
};

const getFromWindow = (variables, args, options) => {
  if (window.navigator && window.navigator.userAgent) {
    variables.userAgent = window.navigator.userAgent;
  }
};

module.exports = (args, options) => {
  return base([ 'userAgent' ], args, options, {
    getFromRequest,
    getFromWindow,
  });
};
