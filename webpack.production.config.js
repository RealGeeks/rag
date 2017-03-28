var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './index'
  ],
  devtool: 'eval',
  output: {
    path: path.join(__dirname, "output"),
    filename: 'index.js',
    library: 'rag',
    libraryTarget: 'umd'
  },
  resolveLoader: {
    modules: ['..', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/configs/),
    new webpack.IgnorePlugin(/un~$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      { test: /\.css$/, loaders: ['style', 'css']},
    ]
  }
};
