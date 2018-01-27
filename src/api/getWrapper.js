const React = require('react');
const getVariables = require('../variables');

module.exports = (WrappedComponent, options) => class NextEnvWrapper extends React.Component {
  static async getInitialProps(args = {}) {
    let newProps = {
      env: {},
    };
    if (args && args.req) {
      newProps.env = getVariables(args, options);
    } else {
      newProps.env = getVariables({}, options);
    }
    const newArgs = {
      ...args,
      ...newProps,
    };
    if (WrappedComponent.getInitialProps) {
      newProps = {
        ...newProps,
        ...await WrappedComponent.getInitialProps(newArgs),
      };
    }
    return newProps;
  }
  /* istanbul ignore next */
  render() {
    return <WrappedComponent {...this.props} />;
  }
};
