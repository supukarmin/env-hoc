const defaultOptions = require('./api/defaultOptions');
const getWrapper = require('./api/getWrapper');

module.exports = (firstFunctionCallParam) => {
  const typeOfFunctionCallParam = typeof firstFunctionCallParam;
  if (typeOfFunctionCallParam === 'function') {
    //env-hoc used without options, firstFunctionCallParam = component
    return getWrapper(firstFunctionCallParam, defaultOptions);
  } /* istanbul ignore next */ else if (typeOfFunctionCallParam === 'object') {
    //env-hoc used with options
    let options = {};
    options = {
      ...defaultOptions,
      ...firstFunctionCallParam,
    };
    return (WrappedComponent) => getWrapper(WrappedComponent, options);
  }
};
