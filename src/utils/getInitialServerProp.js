module.exports = (key) => {
  if (window &&
    window.__NEXT_DATA__ &&
    window.__NEXT_DATA__.props &&
    window.__NEXT_DATA__.props.env &&
    window.__NEXT_DATA__.props.env[key]) {
    return window.__NEXT_DATA__.props.env[key];
  } else if (window &&
    window.__AFTER__ &&
    window.__AFTER__.env &&
    window.__AFTER__.env[key]) {
    return window.__AFTER__.env[key];
  }
  return null;
};
