'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react/addons');
var styles = require('./styles')();
var dom = react.DOM;

var prototype = Button.prototype;

function Button(props, context) {
  this.props = props;
  this.context = context;
  this.state = {};
}

Button.defaultProps = {
  type: 'base'
};

prototype.render = function () {
  var component = this;
  var props = component.props;
  var state = component.state;
  var href = props.href;
  var disabled = state.disabled;
  var buttonProps = component.getHandlers();
  var tag;

  buttonProps.style = styles[props.type][
    disabled && 'disabled' ||
      state.active && 'active' ||
      state.hover && 'hover' ||
      state.keyboardFocus && 'focus' ||
      'normal'
  ];

  if (href) {
    tag = 'a';
    buttonProps.href = href;
  } else {
    tag = 'button';
    buttonProps.disabled = disabled;
  }

  return dom[tag](buttonProps, props.label || props.children);
};

if (process.env.NODE_ENV != 'production') {
  Button.displayName = 'Button';

  Button.propTypes = {
    label: react.PropTypes.string,
    type: react.PropTypes.string,
    href: react.PropTypes.string,
    active: react.PropTypes.bool,
    disabled: react.PropTypes.bool
  };
}

defaults(prototype, require('../hitarea').prototype);

module.exports = Button;
