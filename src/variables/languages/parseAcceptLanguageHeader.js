const formatBcp47 = require('format-bcp-47');

module.exports = (header) => {
  return header
    .split(',')
    .map(field => {
      const splitField = field.split(';');
      return { tag: splitField[0], quality: splitField[1] ? splitField[1] : 1 };
    })
    .sort((a, b) => a.quality > b.quality)
    .map(a => formatBcp47(a.tag))
    .filter(a => a);
};
