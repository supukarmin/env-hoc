const cookie = require('cookie');
const base = require('../base');
const compareFunction = require('./compareFunction');

const getFromRequest = (variables, args, options) => {
  if (args.req.headers && args.req.headers.cookie) {
    variables.cookies = cookie.parse(args.req.headers.cookie, options.cookieParser);
  }
};

const getFromWindow = (variables, args, options) => {
  if (typeof document.cookie === 'string') {
    variables.cookies = cookie.parse(document.cookie, options.cookieParser);
  }
};

module.exports = (args, options) => {
  return base([ 'cookies' ], args, options, {
    getFromRequest,
    getFromWindow,
    defaultValue: {},
    compareFunction,
  });
};
