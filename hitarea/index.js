'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react/addons');
var findDOMNode = react.findDOMNode;
var styles = require('./styles')();
var dom = react.DOM;

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
  var action = component.props.action;
  var keyCode = event.which;

  // Enter key
  if (!component.state.disabled && (keyCode == 13 || keyCode == 32)) {
    component.setState(inactiveState);

    if (action) {
      action();
    }
  }
};

var prototype = Hitarea.prototype;

function Hitarea(props, context) {
  this.props = props;
  this.context = context;
  this.state = {
    disabled: props.disabled,
    focus: props.focus,
    hover: props.hover,
    active: props.active
  };
}

Hitarea.defaultProps = {tag: 'span'};

prototype.render = function () {
  var component = this;
  var props = component.props;
  var state = component.state;
  var disabled = state.disabled;
  var hitareaProps = component.getHandlers();

  hitareaProps.style = styles[
    disabled && 'disabled' ||
      state.keyboardFocus && 'focus' ||
      'normal'
  ];

  if (!disabled && props.action) {
    hitareaProps.tabIndex = 0;
  }

  return dom[props.tag](hitareaProps, props.children);
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
    onKeyUp: onKeyUp.bind(component)
  };

  return handlers;
};

prototype.componentDidMount = function () {
};

prototype.componentWillReceiveProps = function (nextProps) {

  this.setState({
    disabled: nextProps.disabled || this.state.disabled,
    active: nextProps.active || this.state.active,
    hover: nextProps.hover || this.state.hover,
    focus: nextProps.focus || this.state.focus
  });
};

prototype.focus = function () {
  findDOMNode(this).focus();
};

if (process.env.NODE_ENV != 'production') {
  Hitarea.displayName = 'Hitarea';

  Hitarea.propTypes = {
    tag: react.PropTypes.string,
    action: react.PropTypes.func,
    disabled: react.PropTypes.bool,
    active: react.PropTypes.bool
  };
}

defaults(
  Hitarea.prototype,
  react.Component.prototype,
  // require('react-touch-mixin'),
  react.addons.PureRenderMixin
);

module.exports = Hitarea;
