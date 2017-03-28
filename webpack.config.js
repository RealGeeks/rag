var path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    "./index.js"
  ],
  devtool: "eval",
  output: {
    path: path.join(__dirname, "output"),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['output'] }
    })
  ],
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
      { test: /\.scss$/, loaders: ['style', 'css', 'sass']}
    ]
  },
  resolve: {
    extensions: [".js", '.jsx', ".scss", ".css"]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
