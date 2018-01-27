const navigatorLanguages = require('navigator-languages');
const base = require('../base');
const parseAcceptLanguageHeader = require('./parseAcceptLanguageHeader');
const compareFunction = require('./compareFunction');

const getFromRequest = (variables, args, options) => {
  if (args.req.headers && args.req.headers['accept-language']) {
    const parsedLanguageHeader = parseAcceptLanguageHeader(args.req.headers['accept-language']);
    if (parsedLanguageHeader.length) {
      variables.languages = parsedLanguageHeader;
      variables.language = variables.languages[0];
    }
  }
};

const getFromWindow = (variables, args, options) => {
  const languages = navigatorLanguages();
  if (languages) {
    variables.languages = languages;
    variables.language = languages[0];
  }
};

module.exports = (args, options) => {
  return base([ 'language', 'languages' ], args, options, {
    getFromRequest,
    getFromWindow,
    compareFunction,
  });
};
