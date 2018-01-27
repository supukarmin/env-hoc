const setupEnv = require('./setupEnv');
const setupRequest = require('./setupRequest');
const getVariables = require('../../src/variables');
const defaultOptions = require('../../src/api/defaultOptions');

const envWithData = setupEnv({
  data: 'with',
  ipAddress: '1.3.3.7',
});

const requestWithData = setupRequest({
  data: 'with',
  proxyIpAddress: '1.3.3.7',
  ipAddress: '1.3.3.7',
});

describe('returns on server-side', () => {

  describe('env object with data from request', () => {
    it('with default options', () => {
      expect(getVariables({ req: requestWithData }, defaultOptions)).toEqual(envWithData);
    });
    it('with debug option true', () => {
      expect(getVariables({ req: requestWithData }, {
        ...defaultOptions,
        debug: true,
      })).toEqual(envWithData);
    });
    it('with trustProxy option false', () => {
      expect(getVariables({ req: requestWithData }, {
        ...defaultOptions,
        trustProxy: false,
      })).toEqual(envWithData);
    });
  });

});

