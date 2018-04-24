const React = require('react');
const getWrapper = require('../getWrapper');
const defaultOptions = require('../defaultOptions');

class WrappedComponent extends React.Component {
  static async getInitialProps() {
    return {};
  }
  render() {
    return React.createElement('div', {}, {});
  }
}

describe('getWrapper', () => {
  describe('returns a function', () => {
    it('without getInitialProps', () => {
      expect(typeof getWrapper(() => {}, defaultOptions)).toBe('function');
    });
    it('with getInitialProps', () => {
      expect(typeof getWrapper(WrappedComponent, defaultOptions)).toBe('function');
    });
  });
  describe('getInitialProps returns a Promise', () => {
    it('without args', async () => {
      expect(typeof await getWrapper(() => {}, defaultOptions).getInitialProps()).toBe('object');
    });
    it('with args, but without req', async () => {
      expect(typeof await getWrapper(() => {}, defaultOptions).getInitialProps({})).toBe('object');
    });
    it('with args with req', async () => {
      expect(typeof await getWrapper(() => {}, defaultOptions).getInitialProps({ req: {} })).toBe('object');
    });
  });
  describe('getInitialProps calls getInitialProps from wrapped component', () => {
    it('without args', async () => {
      expect(typeof await getWrapper(WrappedComponent, defaultOptions).getInitialProps({})).toBe('object');
    });
  });
  /*describe('renderring wrapper returns WrappedComponent', () => {
    it('without args', async () => {
      const wrapper = React.createElement(getWrapper(WrappedComponent, defaultOptions), {}, null);
      expect(wrapper.render()).toBe('function');
    });
  });*/
});
