const compareClientToServer = require('../utils/compareClientToServer');
const checkIfUseServerProps = require('../utils/checkIfUseServerProps');
const getInitialServerProp = require('../utils/getInitialServerProp');

module.exports = (keys, args, options, variableData) => {
  /* istanbul ignore next */
  const data = {
    getFromRequest: () => {},
    getFromWindow: () => {},
    defaultValue: null,
    compareFunction: (c, s) => c === s,
    ...variableData,
  };
  let variables = {};
  //set default to null
  keys.forEach(key => variables[key] = data.defaultValue);
  //is server
  if (args.req) {
    data.getFromRequest(variables, args, options);
  } else {
    //is client
    /* istanbul ignore next */
    if (typeof window !== 'undefined') {
      if (!checkIfUseServerProps(options, keys)) {
        data.getFromWindow(variables, args, options);
        compareClientToServer(keys[0], {
          client: variables[keys[0]],
          server: getInitialServerProp(keys[0], data.defaultValue),
        }, (c, s) => data.compareFunction(c, s), options);
      } else {
        const propsFromServer = {};
        keys.forEach(key => propsFromServer[key] = getInitialServerProp(key, data.defaultValue));
        variables = {
          ...variables,
          ...propsFromServer,
        };
      }
    }
  }
  return variables;
};
