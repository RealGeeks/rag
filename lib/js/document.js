'use strict';

var react = require('react');
var dom = react.DOM;
var meta = dom.meta;
var div = dom.div;
var p = dom.p;
var h2 = dom.h2;

var button = react.createFactory(require('../../button'));
var group = react.createFactory(require('../../button-group'));
var modal = react.createFactory(require('../../modal'));
var map = react.createFactory(require('../../map'));

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
            button({type: 'overlay'}, 'Overlay'),
            button({icon: 'house'}),
            button({icon: 'chevron-left'}, 'Left'),
            button({
              icon: 'chevron-right',
              iconPosition: 'right'
            }, 'Right')
          ),

          h2(undefined, 'Button Groups'),
          group(
            undefined,
            button(undefined, 'Ant'),
            button(undefined, 'Beattle'),
            button(undefined, 'Cricket')
          ),

          group(
            {flex: true},
            button(undefined, 'Apple'),
            button(undefined, 'Banana'),
            button(undefined, 'Cherry')
          ),

          h2(undefined, 'Modal'),
          div(
            {style: {
              position: 'relative',
              background: '#333',
              height: 400
            }},
            modal(
              {
                ref: 'modal',
                open: true,
                didClose: this.props.modalDidClose
              },
              p({className: 'container'}, 'Modal body')
            )
          ),

          h2(undefined, 'Map'),
          map({
            className: 'map'
          })
        ),

        dom.script({src: 'client.js'})
      )
    );
  }
});

exports.toString = function () {
  return '<!doctype html>' + react.renderToString(
    react.createFactory(exports.html)()
  );
};
