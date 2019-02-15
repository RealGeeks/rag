'use strict';

var classnames = require('classnames');
var dom = require('react-dom-factories');

var HITAREA = 'hitarea';
var namespace = 'rag-button';

function Button(props) {
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

  return dom[props.href ? 'a' : 'span']({
    className: classnames.apply(undefined, classes),
    onClick: function (e) {
      props.onClick && props.onClick(e);
    }
  },
    children
  );
}

if (process.env.NODE_ENV != 'production') {
  Button.displayName = 'Button';
}

module.exports = Button;
