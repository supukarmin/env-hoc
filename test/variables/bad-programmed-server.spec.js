const setupEnv = require('./setupEnv');
const setupRequest = require('./setupRequest');
const getVariables = require('../../src/variables');
const defaultOptions = require('../../src/api/defaultOptions');

const envWithoutData = setupEnv({
  data: 'without',
});

const requestWithoutData = setupRequest({
  data: 'without',
});

const requestBadData = setupRequest({
  data: 'bad',
});

const requestPartiallyBadData = setupRequest({
  data: 'partially-bad',
});

describe('returns on server-side', () => {

  describe('null', () => {
    it('with default options and missing headers', () => {
      expect(getVariables({ req: requestWithoutData }, defaultOptions)).toEqual(envWithoutData);
    });
    it('with default options and malformed headers', () => {
      expect(getVariables({ req: requestBadData }, defaultOptions)).toEqual(envWithoutData);
    });
    it('with default options and partially malformed headers', () => {
      expect(getVariables({ req: requestPartiallyBadData }, defaultOptions)).toEqual(envWithoutData);
    });
  });

});

