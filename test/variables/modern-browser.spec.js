const setupEnv = require('./setupEnv');
const getVariables = require('../../src/variables');
const defaultOptions = require('../../src/api/defaultOptions');
const warnMessage = require('../../src/utils/warnMessage');

const envWithData = setupEnv({
  mockConsoleWarn: true,
  data: 'with',
});

const envWithoutData = setupEnv({
  mockConsoleWarn: true,
  data: 'without',
});

describe('returns on client-side', () => {

  describe('env object with data from window', () => {
    it('with default options', () => {
      expect(getVariables({}, defaultOptions)).toEqual(envWithData);
    });
    it('with debug option true', () => {
      expect(getVariables({}, {
        ...defaultOptions,
        debug: true,
      })).toEqual(envWithData);
      expect(global.console.warn).toHaveBeenCalledWith(warnMessage('userAgent'), {
        client: envWithData.userAgent,
        server: null
      });
    });
  });

  describe('null', () => {
    describe('without server-rendering with useServerProps option', () => {
      it('true', () => {
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: true,
        })).toEqual(envWithoutData);
      });
      it('userAgent, other data must be good', () => {
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: {
            userAgent: true,
          },
        })).toEqual({
          ...envWithData,
          userAgent: null,
        });
      });
      it('language, languages also bad, other data must be good', () => {
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: {
            language: true,
          },
        })).toEqual({
          ...envWithData,
          languages: null,
          language: null,
        });
      });
      it('languages, language also bad, other data must be good', () => {
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: {
            languages: true,
          },
        })).toEqual({
          ...envWithData,
          languages: null,
          language: null,
        });
      });
      it('cookies, other data must be good', () => {
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: {
            cookies: true,
          },
        })).toEqual({
          ...envWithData,
          cookies: {},
        });
      });
      it('ipAddress, other data must be good', () => {
        expect(getVariables({}, {
          ...defaultOptions,
          useServerProps: {
            ipAddress: true,
          },
        })).toEqual({
          ...envWithData,
          ipAddress: null,
        });
      });
    });
  });

});

