'use strict';

var react = require('react');
var createFactory = react.createFactory;
var dom = react.DOM;
var p = dom.p;
var h2 = dom.h2;
var h3 = dom.h3;

var container = createFactory(require('../../container'));
var button = createFactory(require('../../button'));
var group = react.createFactory(require('../../buttonGroup'));
var input = react.createFactory(require('../../input'));
var select = react.createFactory(require('../../select'));
var spinner = react.createFactory(require('../../spinner'));
var x = react.createFactory(require('../../icons/x'));
var minus = react.createFactory(require('../../icons/minus'));
var chevronLeft = react.createFactory(require('../../icons/chevron-left'));
var chevronRight = react.createFactory(require('../../icons/chevron-right'));
var chevronUp = react.createFactory(require('../../icons/chevron-up'));
var chevronDown = react.createFactory(require('../../icons/chevron-down'));
var chevronUpDown = react.createFactory(require('../../icons/chevron-up-down'));
var modal = react.createFactory(require('../../modal'));
var popover = react.createFactory(require('../../popover'));
// var map = react.createFactory(require('../../map'));

var render = function () {
  var guide = this;

  return container(
    {
      style: {
        maxWidth: 800,
        margin: 'auto'
      }
    },
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

    h3(undefined, 'Basic'),
    p(
      undefined,
      button({
        kind: 'basic',
        label: 'Normal'
      }),
      button({
        kind: 'basic',
        label: 'Anchor',
        href: '#'
      }),
      button({
        kind: 'basic',
        label: 'Disabled',
        disabled: true
      }),
      button({
        kind: 'basic',
        label: 'Active',
        active: true
      })
    ),
    p(
      undefined,
      button({
        kind: ['accent', 'basic'],
        label: 'Normal'
      }),
      button({
        kind: ['accent', 'basic'],
        label: 'Anchor',
        href: '#'
      }),
      button({
        kind: ['accent', 'basic'],
        label: 'Disabled',
        disabled: true
      }),
      button({
        kind: ['accent', 'basic'],
        label: 'Active',
        active: true
      })
    ),
    p(
      undefined,
      button({
        kind: ['success', 'basic'],
        label: 'Normal'
      }),
      button({
        kind: ['success', 'basic'],
        label: 'Anchor',
        href: '#'
      }),
      button({
        kind: ['success', 'basic'],
        label: 'Disabled',
        disabled: true
      }),
      button({
        kind: ['success', 'basic'],
        label: 'Active',
        active: true
      })
    ),
    p(
      undefined,
      button({
        kind: ['warning', 'basic'],
        label: 'Normal'
      }),
      button({
        kind: ['warning', 'basic'],
        label: 'Anchor',
        href: '#'
      }),
      button({
        kind: ['warning', 'basic'],
        label: 'Disabled',
        disabled: true
      }),
      button({
        kind: ['warning', 'basic'],
        label: 'Active',
        active: true
      })
    ),
    p(
      undefined,
      button({
        kind: ['danger', 'basic'],
        label: 'Normal'
      }),
      button({
        kind: ['danger', 'basic'],
        label: 'Anchor',
        href: '#'
      }),
      button({
        kind: ['danger', 'basic'],
        label: 'Disabled',
        disabled: true
      }),
      button({
        kind: ['danger', 'basic'],
        label: 'Active',
        active: true
      })
    ),

    h3(undefined, 'Block'),
    p(
      undefined,
      button({kind: ['accent', 'block']}, 'Accent Block')
    ),

    h2(undefined, 'Buttons Groups'),
    p(
      undefined,
      group({
        buttons: [
          {label: 'Ant'},
          {label: 'Beattle'},
          {
            label: 'Cricket',
            kind: 'prominent'
          }
        ]
      })
    ),
    p(
      undefined,
      group({
        flex: true,
        buttons: [
          {
            label: 'Flex',
            kind: ['success', 'prominent']
          },
          {label: 'Flex'},
          {label: 'Flex'}
        ]
      })
    ),

    h2(undefined, 'Input'),
    p(
      undefined,
      input({
        disabled: true,
        value: 'Value'
      })
    ),
    p(
      undefined,
      input({placeholder: 'Some text'})
    ),
    p(
      undefined,
      input({
        type: 'textarea',
        defaultValue: 'Textarea'
      })
    ),

    h2(undefined, 'Select'),
    p(
      undefined,
      select({options: [{value: '1'}, '2', 3]})
    ),

    p(
      undefined,
      select({
        disabled: true,
        block: true,
        value: 'b',
        options: [
          {
            value: 'a',
            label: 'Label for a'
          },
          {
            value: 'b',
            label: 'Label for b'
          },
          {
            value: 'c',
            label: 'Label for c'
          }
        ]
      })
    ),

    p(
      undefined,
      select({
        value: 2,
        options: [
          'Any',
          {
            label: 'Letters',
            options: ['a', 'b', 'c']
          },
          {
            label: 'Numbers',
            options: [1, 2, 3]
          }
        ]
      })
    ),

    h2(undefined, 'Spinner'),
    p(undefined, spinner(), spinner({size: 'small'})),

    h2(undefined, 'Icons'),
    p(undefined,
      chevronLeft(),
      chevronRight(),
      chevronUp(),
      chevronDown(),
      x(),
      chevronUpDown(),
      minus()
    ),

    h2(undefined, 'Modal'),
    dom.div(
      {
        style: {
          position: 'relative',
          background: '#333',
          height: 400
        }
      },
      modal(
        {open: true},
        p({
            style: {
              padding: 20
            }
          },
          'Modal body'
        )
      )
    ),

    h2(undefined, 'Popover'),
    dom.div(
      {
        style: {
          position: 'relative',
          background: '#eee',
          height: 400
        },
        onMouseMove: function (event) {
          var bounds = event.currentTarget.getBoundingClientRect();
          guide.setState({
            top: event.clientY - bounds.top,
            left: event.clientX - bounds.left
          });
        }
      },
      popover(
        {
          visible: true,
          top: guide.state.top,
          left: guide.state.left
        },
        'Cool Popover'
      )
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
  );
};

module.exports = function () {
  var guide = Object.create(react.Component.prototype);

  guide.render = render;
  guide.state = {};

  return guide;
};
