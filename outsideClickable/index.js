'use strict';

var react = require('react');
var createElement = react.createElement;

var hasTouch = require('supports/touch');
var defaults = require('lodash/object/defaults');
var throttle = require('lodash/function/throttle');

var OutsideClickable = function (props, context) {
  var component = this;

  var block = function () {
    component.block = true;
  };

  var unblock = function () {
    component.block = false;
  };

  var wrapperProps = component.wrapperProps = {
    onMouseDown: block,
    onMouseUp: unblock,
    onMouseOut: unblock
  };

  if (hasTouch) {
    wrapperProps.onTouchStart = block;
    wrapperProps.onTouchEnd = unblock;
    wrapperProps.onTouchCancel = unblock;
  }

  component.props = props;
  component.context = context;
};

var prototype = defaults(
  OutsideClickable.prototype,
  require('react/lib/ReactComponent').prototype
);

OutsideClickable.defaultProps = {
  component: 'div'
};

prototype.render = function () {
  var props = this.props;
  return createElement(props.component, defaults({}, this.wrapperProps, props));
};

prototype.componentDidMount = function () {
  hasTouch && document.addEventListener('touchstart', this, false);
  document.addEventListener('mousedown', this, false);
};

prototype.componentWillUnmount = function () {
  hasTouch && document.removeEventListener('touchstart', this, false);
  document.removeEventListener('mousedown', this, false);
};

prototype.handleEvent = function (event) {
  var handler = this.props.onClickOutside;
  if (handler && !this.block) {
    handler(event);
  }
};

// A mousedown event is triggered after a touchstart in touch supporting
// devices. Make sure the handler is not triggered twice.
if (hasTouch) {
  prototype.handleEvent = throttle(prototype.handleEvent, 400, {
    trailing: false
  });
}

if (process.env.NODE_ENV != 'production') {
  OutsideClickable.displayName = 'Outside Clickable';
}

module.exports = OutsideClickable;
