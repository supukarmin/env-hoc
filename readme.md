# env-hoc (for [Next.js](https://github.com/zeit/next.js) & [After.js](https://github.com/jaredpalmer/after.js))
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/env-hoc.svg?style=flat-square)](https://www.npmjs.com/package/env-hoc) [![Coverage Status](https://img.shields.io/coveralls/supukarmin/env-hoc/master.svg?style=flat-square)](https://coveralls.io/github/supukarmin/env-hoc?branch=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Provides an **universal** [HOC (higher-order component)](https://reactjs.org/docs/higher-order-components.html) for [Next.js](https://github.com/zeit/next.js) / [After.js](https://github.com/jaredpalmer/after.js) and populates the component props and the getInitialProps args object with an env property, which gives ***access to cookies, ipAddress, language(s), userAgent and doNotTrack*** on ***server-side and client-side*** in a standardized way.

* **Save time:** Most important thing: short if-else-blocks, no formatting needed, no old-browser-carrying, etc.
* **Standardized:** `Accept-Language` && `User-Agent` && `Cookie` && `DNT` headers are parsed and available in the same format as in `window`. (same parsing libraries / functions && reformatting && **backwards compatibility**)
* **Access to IP address:** IP address is available client-side and there are checked 10+ properties to ensure you always get the best match. Supports enabling/disabling of proxy trusting.
* **Fully tested:** Tested for strange edge cases, missing HTTP headers or missing window properties.
* **Some nice to have features:**
  * Console.warns() while process.ENV.NODE_ENV === 'development', if server props !== client props
  * Possibility to only use props from the HTTP request

![this.props.env](docs/res/envProps.png?raw=true "this.props.env")

***Feature requests for additional properties are welcomed***

# Install
You can install it directly from [npm](https://www.npmjs.com/package/env-hoc):
```shell
npm i env-hoc
```
or, if you are using yarn:
```shell
yarn add env-hoc
```

# Usage

## with [decorators](https://www.sitepoint.com/javascript-decorators-what-they-are/)

Just import the package and add it as a decorator to every page where you want to have access to the `env` object.
```js
import React from 'react';
import withEnv from 'env-hoc';

@withEnv
class Environment extends React.Component {
  static getInitialProps(args) {
    console.log('args.env:', args.env);
  }

  render() {
    console.log('this.props:', this.props.env);
    return (
      <div>
        <h1>Environment</h1>
        <pre>userAgent: {this.props.env.userAgent}</pre>
        <pre>language: {this.props.env.language}</pre>
        <pre>languages: {this.props.env.languages.join(', ')}</pre>
        <pre>ipAddress: {this.props.env.ipAddress}</pre>
        <pre>cookies: {JSON.stringify(this.props.env.cookies)}</pre>
        <pre>doNotTrack: {this.props.env.doNotTrack ? 'true' : 'false'}</pre>
      </div>
    );
  }
}

export default Environment;
```
### console output
```
/* CONSOLE OUTPUT:
args.env: { userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  language: 'de-DE',
  languages: [ 'de-DE', 'de', 'en-US', 'en', 'bs', 'hr' ],
  cookies: {},
  doNotTrack: true,
  ipAddress: '::1' }
this.props: { userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  language: 'de-DE',
  languages: [ 'de-DE', 'de', 'en-US', 'en', 'bs', 'hr' ],
  cookies: {},
  doNotTrack: true,
  ipAddress: '::1' }
*/
```

## without decorators

Just import the package and wrap it around every page where you want to have access to the `env` object.
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
      <div>
        <h1>Environment</h1>
        <pre>userAgent: {this.props.env.userAgent}</pre>
        <pre>language: {this.props.env.language}</pre>
        <pre>languages: {this.props.env.languages.join(', ')}</pre>
        <pre>ipAddress: {this.props.env.ipAddress}</pre>
        <pre>cookies: {JSON.stringify(this.props.env.cookies)}</pre>
        <pre>doNotTrack: {this.props.env.doNotTrack ? 'true' : 'false'}</pre>
      </div>
    );
  }
}

export default withEnv(Environment);
```

## Example with options

```js
//without decorator
withEnv({
  trustProxy: false,
})(Environment);

//with decorator
@withEnv({
  trustProxy: false,
})
class Environment extends React.Component {}
```

### onetime configuration
You can also configure withEnv once in a file and then import it from there when needed.
```js

//file: configuredWithEnv.js
export default withEnv({
  trustProxy: false,
});

//file: page.js
import configuredWithEnv from './configuredWithEnv';

//with decorator
@configuredWithEnv
export default class Environment extends React.Component {}

//without decorator
configuredWithEnv(class Environment extends React.Component {})
```

## Configuration / Options
* **trustProxy:** (boolean) If true, then it trusts proxy HTTP headers.
* **cookieParser:** (object) Is beeing passed to the parse function of the [cookie package](https://github.com/jshttp/cookie).
* **debug:** (boolean) If true, then it console.warns() you about different client / server behaviour.
* **useServerProps:** (boolean/object) If true, only the props from server-rendering are used. You can also pass an object with keys matching the key from this.props.env and enable usage of server props only partially. For example:
```js
withEnv({
    useServerProps: {
      cookies: true,
      languages: true,
    },
});
```

### Default options
```js
withEnv({
    trustProxy: true,
    cookieParser: {},
    debug: process.env.NODE_ENV === 'development',
    useServerProps: false,
});
```

### Some hints
If you want to be a good programmer or support very old browsers, you should still check if a property is available, if some data isn't available, then it will be always for:
* all properties except cookies: `null`
* cookies: `{}`

So a short `if () {}` will do it mostly.
