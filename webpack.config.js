const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');
const packageJson = require('./package.json');

const config = {
  target: 'node',
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  externals: [
    webpackNodeExternals(),
    {
      react: true,
    }
  ],
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: packageJson.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
};

module.exports = config;
