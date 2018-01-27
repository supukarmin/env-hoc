const base = require('../base');
const parseDntValue = require('./parseDntValue');

const getFromRequest = (variables, args, options) => {
  if (args.req.headers && args.req.headers['dnt']) {
    variables.doNotTrack = parseDntValue(args.req.headers['dnt']);
  } else if (args.req.headers && args.req.headers['x-do-not-track']) {
    variables.doNotTrack = parseDntValue(args.req.headers['x-do-not-track']);
  }
};

const getFromWindow = (variables, args, options) => {
  if (window.navigator && window.navigator.doNotTrack !== undefined) {
    variables.doNotTrack = parseDntValue(window.navigator.doNotTrack);
  } else if (window.navigator && window.navigator.msDoNotTrack !== undefined) {
    variables.doNotTrack = parseDntValue(window.navigator.msDoNotTrack);
  } else if (window.doNotTrack !== undefined) {
    variables.doNotTrack = parseDntValue(window.doNotTrack);
  }
};

module.exports = (args, options) => {
  return base([ 'doNotTrack' ], args, options, {
    getFromRequest,
    getFromWindow,
  });
};
