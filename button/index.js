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
  var props = component.props;
  var state = component.state;
  var href = props.href;
  var disabled = state.disabled;
  var buttonProps = component.getHandlers();
  var tag;

  var args = ['base'];

  if (props.kind) {
    args = args.concat(props.kind);
  }

  var buttonState = disabled && 'disabled' ||
    state.active && 'active' ||
    state.hover && 'hover' ||
    state.keyboardFocus && 'focus';

  if (buttonState) {
    args.push(buttonState);
  }

  buttonProps.style = styles(args);

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
    kind: react.PropTypes.oneOfType([
      react.PropTypes.string,
      react.PropTypes.array
    ]),
    href: react.PropTypes.string,
    active: react.PropTypes.bool,
    disabled: react.PropTypes.bool
  };
}

defaults(prototype, Hitarea.prototype);

module.exports = Button;
