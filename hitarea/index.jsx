'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');
var styles = require('./styles')();

var focusState = {focus: true};
var keyboardFocusState = {
  focus: true,
  keyboardFocus: true
};
var unfocusState = {
  focus: false,
  keyboardFocus: false
};
var hoverState = {hover: true};
var unhoverState = {
  hover: false,
  active: false
};
var activeState = {active: true};
var activeMouseFocusState = {
  active: true,
  keyboardFocus: false
};
var inactiveState = {active: false};
var initialState = {
  focus: false,
  keyboardFocus: false,
  hover: false,
  active: false
};

var onFocus = function () {
  this.setState(this.state.active ? focusState : keyboardFocusState);
};

var onBlur = function () {
  this.setState(unfocusState);
};

var onMouseEnter = function () {
  this.setState(hoverState);
};

var onMouseLeave = function () {
  this.setState(unhoverState);
};

var onMouseDown = function () {
  this.setState(activeMouseFocusState);
};

var onMouseUp = function () {
  this.setState(inactiveState);
};

var onKeyDown = function (event) {
  if (!this.state.disabled) {
    // this.setState(keyboardFocusState);
    var keyCode = event.which;

    if (keyCode == 13 || keyCode == 32) {
      this.setState(activeState);
    }
  }
};

var onKeyUp = function (event) {
  var component = this;
  var keyCode = event.which;

  // Enter key
  if (!component.state.disabled && (keyCode == 13 || keyCode == 32)) {
    component.setState(inactiveState);
  }
};

var prototype = Hitarea.prototype;

function Hitarea(props, context) {
  this.props = props;
  this.context = context;
  this.state = initialState;
}

Hitarea.defaultProps = {tag: 'span'};

prototype.render = function () {
  var component = this;
  var state = component.state;
  var props = defaults(component.getHandlers(), component.props);
  var disabled = props.disabled;

  var style = styles[
    disabled && 'disabled' ||
      state.keyboardFocus && 'focus' ||
      'normal'
  ];

  props.style = props.style ? defaults({}, props.style, style) : style;

  if (!disabled && props.action) {
    props.tabIndex = 0;
  }

  // Don’t pass action prop as it will get added as an attribute
  // on the underlying DOM element.
  delete props.action;
  var tag = props.tag;
  delete props.tag;

  return React.createElement(tag, props, props.children)
};

prototype.getHandlers = function () {
  var component = this;

  var handlers = {
    onFocus: onFocus.bind(component),
    onBlur: onBlur.bind(component),
    onMouseEnter: onMouseEnter.bind(component),
    onMouseLeave: onMouseLeave.bind(component),
    onMouseDown: onMouseDown.bind(component),
    onMouseUp: onMouseUp.bind(component),
    onKeyDown: onKeyDown.bind(component),
    onKeyUp: onKeyUp.bind(component),
    onClick: component.props.action
  };

  return handlers;
};

prototype.focus = function () {
  dom.findDOMNode(this).focus();
};

if (process.env.NODE_ENV != 'production') {
  Hitarea.displayName = 'Hitarea';

  Hitarea.propTypes = {
    tag: React.PropTypes.string,
    action: React.PropTypes.func
  };
}

defaults(
  Hitarea.prototype,
  React.Component.prototype,
  // require('react-touch-mixin'),
  PureRenderMixin
);

module.exports = Hitarea;
