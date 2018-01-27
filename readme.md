# env-hoc (for [Next.js](https://github.com/zeit/next.js) & [After.js](https://github.com/jaredpalmer/after.js))
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/env-hoc.svg?style=flat-square)](https://www.npmjs.com/package/env-hoc) [![Coverage Status](https://img.shields.io/coveralls/supukarmin/env-hoc/master.svg?style=flat-square)](https://coveralls.io/github/supukarmin/env-hoc?branch=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Provides an **universal** [HOC (higher-order component)](https://reactjs.org/docs/higher-order-components.html) for [Next.js](https://github.com/zeit/next.js) / [After.js](https://github.com/jaredpalmer/after.js) and populates the component props and the getInitialProps args object with an env property, which gives ***access to cookies, ipAddress, language(s) and userAgent*** on ***server-side and client-side*** in a standardized way.

* **Save time:** Most important thing: short if-else-blocks, no formatting needed, no old-browser-carrying, etc.
* **Standardized:** `Accept-Language` && `User-Agent` && `Cookie` headers are parsed and available in the same format as in `window`. (same parsing libraries / functions && reformatting && **backwards compatibility**)
* **Access to IP address:** IP address is available client-side and there are checked 10+ properties to ensure you always get the best match. Supports enabling/disabling of proxy trusting.
* **Fully tested:** Tested for strange edge cases, missing HTTP headers or missing window properties.
* **Some nice to have features:**
  * Console.warns() while process.ENV.NODE_ENV === 'development', if server props !== client props
  * Possibility to only use props from the HTTP request

# Install
```
npm i env-hoc
```

# Usage
```js
//default options:
{
  trustProxy: true,
  cookieParser: {}, //will be passed to cookie.parse from the cookie package
  debug: process.env.NODE_ENV === 'development',
  useServerProps: false, //if true it uses the props from server-rendering only
  /*
  useServerProps can also be an object and works then only on the specified values
  useServerProps: {
    cookies: true,
  },
  */
}
```

```js
import React from 'react';
import withEnv from 'env-hoc';

class Environment extends React.Component {
  static getInitialProps(args) {
    console.log('args.env:', args.env);
  }

  render() {
    console.log('this.props:', this.props.env);
    return (
      <div className="page">
        <h1>About</h1>
        <pre>userAgent: {this.props.env.userAgent}</pre>
        <pre>language: {this.props.env.language}</pre>
        <pre>languages: {this.props.env.languages.join(', ')}</pre>
        <pre>ipAddress: {this.props.env.ipAddress}</pre>
        <pre>cookies: {JSON.stringify(this.props.env.cookies)}</pre>
      </div>
    );
  }
}

export default withEnv(Environment);

// Or if you like decorators:
@withEnv
export default class Environment extends React.Component {}

//example with options:
export default withEnv({
  trustProxy: false,
})(Environment);

@withEnv({
  trustProxy: false,
})
export default class Environment extends React.Component {}

//or configure it only once somewhere: configuredWithEnv.js
export default withEnv({
  trustProxy: false,
});

import configuredWithEnv from './configuredWithEnv';

@configuredWithEnv
export default class Environment extends React.Component {}

/* CONSOLE:
args.env: { userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  language: 'de-DE',
  languages: [ 'de-DE', 'de', 'en-US', 'en', 'bs', 'hr' ],
  cookies: {},
  ipAddress: '::1' }
this.props: { userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  language: 'de-DE',
  languages: [ 'de-DE', 'de', 'en-US', 'en', 'bs', 'hr' ],
  cookies: {},
  ipAddress: '::1' }
*/
```

## Some hints
If you want to be a good programmer or support very old browsers, you should still check if a property is available, if some data isn't available, then it will be always for:
* all properties except cookies: `null`
* cookies: `{}`

So a short `if () {}` will do it mostly.
