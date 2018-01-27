const setupEnv = require('./setupEnv');
const getVariables = require('../../src/variables');
const defaultOptions = require('../../src/api/defaultOptions');

const testingEnvMissingData = setupEnv({
  data: 'missing',
});

describe('returns on client-side', () => {

  describe('null', () => {
    describe('with missing window properties', () => {
      it('with default options', () => {
        expect(getVariables({}, defaultOptions)).toEqual(testingEnvMissingData);
      });
    });
  });

});
