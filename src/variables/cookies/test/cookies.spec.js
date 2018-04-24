const defaultOptions = require('../../../api/defaultOptions');
const getCookies = require('../index');
const createRequest = require('../../../../test/utils/createRequest');
const createEnv = require('../../../../test/utils/setupCreateEnv')('cookies');
const eraseCookie = require('../../../../test/utils/eraseCookie');

describe('returns on sever-side cookies', () => {

  describe('{ foo: bar }', () => {
    it('with cookie-header', () => {
      expect(getCookies(createRequest('cookie', 'foo=bar'), defaultOptions)).toEqual(createEnv({ foo: 'bar' }));
    });
  });

  describe('{}', () => {
    it('with cookie-header', () => {
      expect(getCookies(createRequest('cookie', ''), defaultOptions)).toEqual(createEnv({}));
    });
  });

  describe('null', () => {
    it('without headers', () => {
      expect(getCookies(createRequest('', ''), defaultOptions)).toEqual(createEnv({}));
    });
    it('with invalid headers', () => {
      expect(getCookies(createRequest('cookie', '1337'), defaultOptions)).toEqual(createEnv({}));
    });
  });

});

describe('returns on client-side cookies', () => {

  describe('{ foo: bar }', () => {
    it('with window.document.cookie', () => {
      global.document.cookie = 'foo=bar';
      expect(getCookies({}, defaultOptions)).toEqual(createEnv({ foo: 'bar' }));
      eraseCookie('foo');
    });
  });

  describe('{}', () => {
    it('with window.document.cookie', () => {
      expect(getCookies({}, defaultOptions)).toEqual(createEnv({}));
    });
  });

  describe('null', () => {
    it('with invalid document property', () => {
      global.document.cookie = '1337';
      expect(getCookies({}, defaultOptions)).toEqual(createEnv({}));
      eraseCookie('foo');
    });
    it('without document property', () => {
      expect(getCookies({}, defaultOptions)).toEqual(createEnv({}));
    });
  });

});

