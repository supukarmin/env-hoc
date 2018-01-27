const setupEnv = require('./setupEnv');
const getVariables = require('../../src/variables');
const defaultOptions = require('../../src/api/defaultOptions');

const envWithData = setupEnv({
  data: 'with',
});

const envWithoutData = setupEnv({
  data: 'without',
});

const setAfterJsData = () => {
  global.__AFTER__ = {
    env: envWithData,
  };
};

const unSetAfterJsData = () => {
  global.__AFTER__ = null;
};

describe('returns on client-side', () => {

  describe('with After.js', () => {

    describe('valid env object with data from server call', () => {
      it('with default option', () => {
        setAfterJsData();
        expect(getVariables({}, defaultOptions)).toEqual(envWithData);
      });
      it('with useServerProps true option and good data', () => {
        setAfterJsData();
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: true,
        })).toEqual(envWithData);
      });
    });

    describe('invalid env object with data from server call', () => {
      it('with useServerProps true option and missing data', () => {
        unSetAfterJsData();
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: true,
        })).toEqual(envWithoutData);
      });
    });

  });

});
