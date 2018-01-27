const requestIp = require('request-ip');
const base = require('../base');

const getFromRequest = (variables, args, options) => {
  if (options.trustProxy) {
    variables.ipAddress = requestIp.getClientIp(args.req);
  } else {
    //@todo works in args.requestIp@2.0.2, but we should update the package and add a trustProxy: false option
    variables.ipAddress = requestIp.getClientIp({ ...args.req, headers: null });
  }
};

/* istanbul ignore next */
const getFromWindow = () => {};

module.exports = (args, options) => {
  return base([ 'ipAddress' ], args, {
    ...options,
    useServerProps: {
      ipAddress: true,
    },
  }, {
    getFromRequest,
    getFromWindow,
  });
};
