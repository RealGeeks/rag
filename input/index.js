'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var Hitarea = require('../hitarea');
var styles = require('./styles')();
var dom = require('react-dom');

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

  var style;

  if (state) {
    args.push(state);
  }

  style = styles(args);

  props.style = props.style ? defaults({}, props.style, style) : style;

  return dom[props.type == 'textarea' ? 'textarea' : 'input'](props);
};

if (process.env.NODE_ENV != 'production') {
  Input.displayName = 'Input';

  Input.propTypes = {
    type: React.PropTypes.string
  };
}

defaults(prototype, Hitarea.prototype);

module.exports = Input;
