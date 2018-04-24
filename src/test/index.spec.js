const index = require('../index');

describe('index', () => {
  describe('returns NextEnvWrapper', () => {
    it('when called without options', () => {
      expect(typeof index(() => {}).getInitialProps === 'function').toEqual(true);
    });
    it('when called with options', () => {
      expect(typeof index({ trustProxy: false })(() => {}).getInitialProps === 'function').toEqual(true);
    });
  });
});
