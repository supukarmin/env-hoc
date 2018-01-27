module.exports = (c, s) => {
  if (s !== null) {
    for (const clientKey in c) {
      if (c[clientKey] !== s[clientKey]) {
        return false;
      }
    }
  }
  return true;
};
