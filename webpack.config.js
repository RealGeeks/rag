var path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    "./rag.js"
  ],
  devtool: "eval",
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['output'] }
    }),
    new PolyfillInjectorPlugin({
      polyfills: ['requestAnimationFrame'],
      filename: './lib/request-animation-frame-polyfill.js'
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
  externals: {
    'react': "react",
    'react-dom': "react-dom",
    'lodash': 'lodash',
    'react-addons-pure-render-mixin': 'react-addons-pure-render-mixin',
    'react-addons-css-transition-group': 'react-addons-css-transition-group'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
