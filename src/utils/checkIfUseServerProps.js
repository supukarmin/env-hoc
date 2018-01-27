module.exports = (options, keys) => {
  if (options.useServerProps === true) {
    return true;
  } else if (options.useServerProps !== null && typeof options.useServerProps === 'object') {
    return !!keys.map(key => options.useServerProps[key]).filter(key => key).length;
  }
};
