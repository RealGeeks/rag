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
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    }
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
    },
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
