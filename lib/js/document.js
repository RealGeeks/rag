'use strict';

var react = require('react');
var createFactory = react.createFactory;
var dom = react.DOM;
var meta = dom.meta;
// var div = dom.div;
var p = dom.p;
var h2 = dom.h2;
var h3 = dom.h3;

var container = createFactory(require('../../container'));
var button = createFactory(require('../../button'));
// var group = react.createFactory(require('../../button-group'));
// var modal = react.createFactory(require('../../modal'));
// var map = react.createFactory(require('../../map'));

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
        container(
          undefined,
          dom.h1(undefined, 'Real Geeks UI'),

          h2(undefined, 'Buttons'),
          h3(undefined, 'Default'),
          p(
            undefined,
            button(undefined, 'Normal'), ' ',
            button({disabled: true}, 'Disabled'), ' ',
            button({active: true}, 'Active'), ' ',
            button({hover: true}, 'Hover')
          ),
          h3(undefined, 'Prominent'),
          p(
            undefined,
            button({type: 'prominent'}, 'Normal'), ' ',
            button({
              type: 'prominent',
              disabled: true
            }, 'Disabled'), ' ',
            button({
              type: 'prominent',
              active: true
            }, 'Active'), ' ',
            button({
              type: 'prominent',
              hover: true
            }, 'Hover'), ' '
          ),
          h3(undefined, 'Overlay'),
          p(
            undefined,
            button({type: 'overlay'}, 'Normal'), ' ',
            button({
              type: 'overlay',
              disabled: true
            }, 'Disabled'), ' ',
            button({
              type: 'overlay',
              active: true
            }, 'Active'), ' ',
            button({
              type: 'overlay',
              hover: true
            }, 'Hover')
          )

          // h2(undefined, 'Button Groups'),
          // group(
          //   undefined,
          //   button(undefined, 'Ant'),
          //   button(undefined, 'Beattle'),
          //   button(undefined, 'Cricket')
          // ),
          //
          // group(
          //   {flex: true},
          //   button(undefined, 'Apple'),
          //   button(undefined, 'Banana'),
          //   button(undefined, 'Cherry')
          // ),
          //
          // h2(undefined, 'Modal'),
          // div(
          //   {style: {
          //     position: 'relative',
          //     background: '#333',
          //     height: 400
          //   }},
          //   modal(
          //     {
          //       ref: 'modal',
          //       open: true,
          //       didClose: this.props.modalDidClose
          //     },
          //     p({className: 'container'}, 'Modal body')
          //   )
          // ),
          //
          // h2(undefined, 'Map'),
          // map({
          //   className: 'map'
          // })
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
