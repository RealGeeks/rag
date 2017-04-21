var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './rag'
  ],
  devtool: 'eval',
  output: {
    path: __dirname,
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
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
  resolve: {
    extensions: [".js", '.jsx', ".scss", ".css"],
    alias: {
      React: path.resolve(__dirname, 'node_modules/react'),
      ReactDOM: path.resolve(__dirname, 'node_modules/react-dom'),
      ReactAddonsPureRenderMixin: path.resolve(__dirname, 'node_modules/react-addons-pure-render-mixin'),
      ReactAddonsCSSTransitionGroup: path.resolve(__dirname, 'node_modules/react-addons-css-transition-group')
    }
  },
  externals: {
    'react': "React",
    'react-dom': 'ReactDOM',
    'lodash': 'lodash',
    'react-addons-pure-render-mixin': 'ReactAddonsPureRenderMixin',
    'react-addons-css-transition-group': 'ReactAddonsCSSTransitionGroup'
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
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/, loaders: ['style', 'css'] },
    ]
  }
};
