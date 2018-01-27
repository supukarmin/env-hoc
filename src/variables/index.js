const getCookies = require('./cookies');
const getUserAgent = require('./userAgent');
const getLanguages = require('./languages');
const getIpAddress = require('./ipAddress');
const getDoNotTrack = require('./doNotTrack');

module.exports = (args, options) => ({
  ...getUserAgent(args, options),
  ...getLanguages(args, options),
  ...getCookies(args, options),
  ...getIpAddress(args, options),
  ...getDoNotTrack(args, options),
});
