const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const nodeExternals = require('webpack-node-externals');

//@todo request-ip should start using babel

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'env-hoc',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [
    nodeExternals({
      whitelist: [ 'request-ip' ],
    }),
    {
      react: 'react',
    }
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules\/(?!request-ip)|bower_components)/
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),
  ]
};

module.exports = config;
