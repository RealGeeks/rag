'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react/addons');
var Hitarea = require('../hitarea');
var styles = require('./styles')();
var dom = react.DOM;

var prototype = Input.prototype;

function Input(props, context) {
  Hitarea.call(this, props, context);
}

prototype.render = function () {
  var component = this;
  var props = defaults(component.getHandlers(), component.props);

  var args = [props.type || 'text'];

  var state = props.disabled && 'disabled' ||
    component.state.focus && 'focus';

  if (state) {
    args.push(state);
  }

  props.style = styles(args);

  return dom[props.type == 'textarea' ? 'textarea' : 'input'](props);
};

if (process.env.NODE_ENV != 'production') {
  Input.displayName = 'Input';

  Input.propTypes = {
    type: react.PropTypes.string
  };
}

defaults(prototype, Hitarea.prototype);

module.exports = Input;
