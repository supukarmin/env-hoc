module.exports = (value) => {
  if (value === 1 || value === '1' || value === 'yes') {
    return true;
  } else if (value === 0 || value === '0' || value === 'no') {
    return false;
  }
  return null;
};
