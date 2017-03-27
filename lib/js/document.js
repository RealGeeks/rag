'use strict';

var react = require('react');
var dom = react.DOM;
var meta = dom.meta;

exports.html = react.createClass({
  render: function () {
    return dom.html(
      undefined,

      dom.head(
        undefined,

        meta({charSet: 'utf-8'}),
        meta({
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        }),
        meta({
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        }),
        meta({
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black'
        }),

        dom.link({
          rel: 'stylesheet',
          href: '//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css'
        })
      ),

      dom.body(
        undefined,
        dom.div({id: 'guide'}),
        dom.script({src: 'client.js'})
      )
    );
  }
});

exports.toString = function () {
  return '<!doctype html>' + react.renderToStaticMarkup(
    react.createFactory(exports.html)()
  );
};
