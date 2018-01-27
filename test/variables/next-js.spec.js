const setupEnv = require('./setupEnv');
const getVariables = require('../../src/variables');
const defaultOptions = require('../../src/api/defaultOptions');

const envWithData = setupEnv({
  data: 'with',
});

const envWithoutData = setupEnv({
  data: 'without',
});

const setNextJsData = () => {
  global.__NEXT_DATA__ = {
    props: {
      env: envWithData,
    },
  };
};

const unSetNextJsData = () => {
  global.__NEXT_DATA__ = null;
};

describe('returns on client-side', () => {
  
  describe('with Next.js', () => {
    
    describe('valid env object with data from server call', () => {
      it('with default option', () => {
        setNextJsData();
        expect(getVariables({}, defaultOptions)).toEqual(envWithData);
      });
      it('with useServerProps true option and good data', () => {
        setNextJsData();
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: true,
        })).toEqual(envWithData);
      });
    });
    
    describe('invalid env object with data from server call', () => {
      it('with useServerProps true option and missing data', () => {
        unSetNextJsData();
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: true,
        })).toEqual(envWithoutData);
      });
    });
    
  });

});
