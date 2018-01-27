//works here without any problems, because we have only arrays containing short simple strings, nothing special
module.exports = (a1, a2) => {
  return JSON.stringify(a1) === JSON.stringify(a2);
};
