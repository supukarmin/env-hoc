const defaultOptions = require('./api/defaultOptions');
const getWrapper = require('./api/getWrapper');

//@todo rewrite tests, move them into src, after upgrading babel / jest coverage isn't anymore 100 %

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
