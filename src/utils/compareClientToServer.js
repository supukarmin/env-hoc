const warnMessage = require('./warnMessage');

module.exports = (key, data, compareFunction, options) => {
  if (options.debug) {
    /* istanbul ignore next */
    if (!compareFunction(data.client, data.server)) {
      console.warn(warnMessage(key), data);
    }
  }
};
