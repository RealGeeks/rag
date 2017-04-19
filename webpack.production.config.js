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
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'lodash': {
        root: 'lodash',
        commonjs2: 'lodash',
        commonjs: 'lodash',
        amd: 'lodash'
      }
    },
    {
      'react-addons-pure-render-mixin': {
        root: 'ReactAddonsPureRenderMixin',
        commonjs2: 'react-addons-pure-render-mixin',
        commonjs: 'react-addons-pure-render-mixin',
        amd: 'react-addons-pure-render-mixin'
      }
    },
    {
      'react-addons-css-transition-group': {
        root: 'ReactAddonsCSSTransitionGroup',
        commonjs2: 'react-addons-css-transition-group',
        commonjs: 'react-addons-css-transition-group',
        amd: 'react-addons-css-transition-group'
      }
    }
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
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/, loaders: ['style', 'css'] },
    ]
  }
};
