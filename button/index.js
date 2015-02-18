'use strict';

var react = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var dom = react.DOM;

var HITAREA = 'hitarea';
var namespace = 'rag-button';

var buttonSpec = {
  mixins: [require('react-touch-mixin'), react.addons.PureRenderMixin],

  render: function () {
    var props = this.props;
    var state = props.disabled && 'disabled' || props.active && 'active';
    var type = props.type;
    var classes = type == HITAREA ? [HITAREA] : [namespace];
    var icon = props.icon;
    var iconPosition = props.iconPosition || 'left';
    var children = props.children;

    if (type) {
      if (Array.isArray(type)) {
        type.forEach(function (kind) {
          classes.push(namespace + '-' + kind);
        });
      } else if (type != HITAREA) {
        classes.push(namespace + '-' + type);
      }
    }

    if (icon) {
      classes.push('icon', 'icon-' + icon);

      if (state) {
        classes.push('icon-' + icon + '-' + state);
      }

      if (children) {
        classes.push('icon-' + iconPosition);
      }
    }

    classes.push(props.className, state);

    return dom.a({
      /* jshint -W107 */
      href: props.href || 'javascript:;',
      /* jshint +W107 */
      className: joinClasses.apply(undefined, classes),
      onKeyUp: props.onTap && function (event) {
        if (event.which == 13) {
          props.onTap();
        }
      }
    },
      children
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  buttonSpec.displayName = 'Button';
}

module.exports = react.createClass(buttonSpec);
