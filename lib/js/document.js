'use strict';

var react = require('react');
var dom = react.DOM;
var meta = dom.meta;
var div = dom.div;
var p = dom.p;
var h2 = dom.h2;

var button = react.createFactory(require('../../button'));
var modal = react.createFactory(require('../../modal'));

module.exports = function () {
  return '<!doctype html>' + react.renderToString(dom.html(
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
        href: 'style.css',
        rel: 'stylesheet'
      })
    ),

    dom.body(
      undefined,
      div(
        {className: 'container'},
        dom.h1(undefined, 'Real Geeks UI'),

        h2(undefined, 'Buttons'),
        p(
          undefined,
          button(undefined, 'Default'),
          button({type: 'basic'}, 'Basic'),
          button({type: 'accent'}, 'Accent'),
          button({type: 'prominent'}, 'Prominent'),
          button({type: 'overlay'}, 'Overlay')
        ),

        div(
          {style: {
            position: 'relative',
            background: '#333',
            height: 400
          }},
          modal(
            {close: function () {}},
            p({className: 'container'}, 'Modal body')
          )
        )
      )
    )
  ));
};
