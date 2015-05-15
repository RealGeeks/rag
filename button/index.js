'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react/addons');
var Hitarea = require('../hitarea');
var styles = require('./styles')();
var dom = react.DOM;

var prototype = Button.prototype;

function Button(props, context) {
  Hitarea.call(this, props, context);
}

prototype.render = function () {
  var component = this;
  var state = component.state;
  var props = defaults(component.getHandlers(), component.props);
  var style;

  var args = ['base'];

  if (props.kind) {
    args = args.concat(props.kind);
  }

  var buttonState = props.disabled && 'disabled' ||
    (props.active || state.active) && 'active' ||
    state.hover && 'hover';

  if (buttonState) {
    args.push(buttonState);
  }

  if (state.keyboardFocus) {
    args.push('focus');
  }

  style = styles(args);
  props.style = props.style ? defaults({}, props.style, style) : style;

  return dom[props.href ? 'a' : 'button'](props, props.label || props.children);
};

if (process.env.NODE_ENV != 'production') {
  Button.displayName = 'Button';

  Button.propTypes = {
    label: react.PropTypes.string,
    kind: react.PropTypes.oneOfType([
      react.PropTypes.string,
      react.PropTypes.array
    ]),
    href: react.PropTypes.string,
    action: react.PropTypes.func,
    active: react.PropTypes.bool,
    disabled: react.PropTypes.bool
  };
}

defaults(prototype, Hitarea.prototype);

module.exports = Button;
