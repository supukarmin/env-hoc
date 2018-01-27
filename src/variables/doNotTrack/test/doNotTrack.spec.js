const defaultOptions = require('../../../api/defaultOptions');
const getDoNotTrack = require('../index');

const createRequest = (header, value) => {
  const args = {
    req: {
      headers: {},
    },
  };
  args.req.headers[header] = value;
  return args;
};

const createEnv = (value) => {
  return {
    doNotTrack: value,
  };
};

describe('returns on sever-side doNotTrack', () => {

  describe('true', () => {
    it('with dnt-header', () => {
      expect(getDoNotTrack(createRequest('dnt', '1'), defaultOptions)).toEqual(createEnv(true));
    });
    it('with x-do-not-track-header', () => {
      expect(getDoNotTrack(createRequest('x-do-not-track', '1'), defaultOptions)).toEqual(createEnv(true));
    });
  });

  describe('false', () => {
    it('with dnt-header', () => {
      expect(getDoNotTrack(createRequest('dnt', '0'), defaultOptions)).toEqual(createEnv(false));
    });
    it('with x-do-not-track-header', () => {
      expect(getDoNotTrack(createRequest('x-do-not-track', '0'), defaultOptions)).toEqual(createEnv(false));
    });
  });

  describe('null', () => {
    it('without headers', () => {
      expect(getDoNotTrack(createRequest('', ''), defaultOptions)).toEqual(createEnv(null));
    });
    it('with invalid headers', () => {
      expect(getDoNotTrack(createRequest('dnt', '1337'), defaultOptions)).toEqual(createEnv(null));
    });
  });

});

describe('returns on client-side doNotTrack', () => {

  describe('true', () => {
    it('with window.navigator.doNotTrack', () => {
      global.navigator.doNotTrack = 'yes';
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(true));
      global.navigator.doNotTrack = undefined;
    });
    it('with window.navigator.msDoNotTrack', () => {
      global.navigator.msDoNotTrack = '1';
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(true));
      global.navigator.msDoNotTrack = undefined;
    });
    it('with window.doNotTrack', () => {
      global.doNotTrack = 1;
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(true));
      global.doNotTrack = undefined;
    });
  });

  describe('false', () => {
    it('with window.navigator.doNotTrack', () => {
      global.navigator.doNotTrack = 'no';
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(false));
      global.navigator.doNotTrack = undefined;
    });
    it('with window.navigator.msDoNotTrack', () => {
      global.navigator.msDoNotTrack = '0';
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(false));
      global.navigator.msDoNotTrack = undefined;
    });
    it('with window.doNotTrack', () => {
      global.doNotTrack = 0;
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(false));
      global.doNotTrack = undefined;
    });
  });

  describe('null', () => {
    it('with invalid navigator property', () => {
      global.navigator.doNotTrack = '1337';
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(null));
      global.navigator.doNotTrack = undefined;
    });
    it('without navigator property', () => {
      expect(getDoNotTrack({}, defaultOptions)).toEqual(createEnv(null));
    });
  });

});

