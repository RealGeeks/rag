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
            button({action: function () {
              window.alert('Normal');
            }}, 'Normal'), ' ',
            button({
              href: '#',
              action: function (event) {
                window.alert('Anchor');
                event.preventDefault();
              }
            }, 'Anchor'), ' ',
            button({disabled: true}, 'Disabled'), ' ',
            button({active: true}, 'Active')
          ),
          p(
            undefined,
            button({kind: 'accent'}, 'Accent'), ' ',
            button({
              label: 'Anchor',
              kind: 'accent',
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: 'accent',
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: 'accent',
              active: true
            })
          ),
          p(
            undefined,
            button({kind: 'success'}, 'Success'), ' ',
            button({
              label: 'Anchor',
              kind: 'success',
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: 'success',
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: 'success',
              active: true
            })
          ),
          p(
            undefined,
            button({kind: 'warning'}, 'Warning'), ' ',
            button({
              label: 'Anchor',
              kind: 'warning',
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: 'warning',
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: 'warning',
              active: true
            })
          ),
          p(
            undefined,
            button({kind: 'danger'}, 'Danger'), ' ',
            button({
              label: 'Anchor',
              kind: 'danger',
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: 'danger',
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: 'danger',
              active: true
            })
          ),

          h3(undefined, 'Prominent'),
          p(
            undefined,
            button({kind: 'prominent'}, 'Normal'), ' ',
            button({
              label: 'Anchor',
              kind: 'prominent',
              href: '#'
            }, 'Disabled'), ' ',
            button({
              label: 'Disabled',
              kind: 'prominent',
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: 'prominent',
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['accent', 'prominent']}, 'Accent'), ' ',
            button({
              label: 'Anchor',
              kind: ['accent', 'prominent'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['accent', 'prominent'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['accent', 'prominent'],
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['success', 'prominent']}, 'Success'), ' ',
            button({
              label: 'Anchor',
              kind: ['success', 'prominent'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['success', 'prominent'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['success', 'prominent'],
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['warning', 'prominent']}, 'Warning'), ' ',
            button({
              label: 'Anchor',
              kind: ['warning', 'prominent'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['warning', 'prominent'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['warning', 'prominent'],
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['danger', 'prominent']}, 'Danger'), ' ',
            button({
              label: 'Anchor',
              kind: ['danger', 'prominent'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['danger', 'prominent'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['danger', 'prominent'],
              active: true
            })
          ),

          h3(undefined, 'Overlay'),
          p(
            undefined,
            button({kind: 'overlay'}, 'Normal'), ' ',
            button({
              label: 'Anchor',
              kind: 'overlay',
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: 'overlay',
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: 'overlay',
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['accent', 'overlay']}, 'Accent'), ' ',
            button({
              label: 'Anchor',
              kind: ['accent', 'overlay'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['accent', 'overlay'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['accent', 'overlay'],
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['success', 'overlay']}, 'Success'), ' ',
            button({
              label: 'Anchor',
              kind: ['success', 'overlay'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['success', 'overlay'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['success', 'overlay'],
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['warning', 'overlay']}, 'Warning'), ' ',
            button({
              label: 'Anchor',
              kind: ['warning', 'overlay'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['warning', 'overlay'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['warning', 'overlay'],
              active: true
            })
          ),
          p(
            undefined,
            button({kind: ['danger', 'overlay']}, 'Danger'), ' ',
            button({
              label: 'Anchor',
              kind: ['danger', 'overlay'],
              href: '#'
            }), ' ',
            button({
              label: 'Disabled',
              kind: ['danger', 'overlay'],
              disabled: true
            }), ' ',
            button({
              label: 'Active',
              kind: ['danger', 'overlay'],
              active: true
            })
          ),

          h3(undefined, 'Block'),
          p(
            undefined,
            button({kind: ['accent', 'block']}, 'Accent Block')
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
