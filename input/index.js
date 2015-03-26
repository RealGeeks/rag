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
  var props = component.props;
  var state = component.state;
  var inputProps = defaults(component.getHandlers(), props);

  var args = [props.type || 'text'];

  var inputState = props.disabled && 'disabled' ||
    state.focus && 'focus';

  if (inputState) {
    args.push(inputState);
  }

  inputProps.style = styles(args);

  return dom[props.type == 'textarea' ? 'textarea' : 'input'](inputProps);
};

if (process.env.NODE_ENV != 'production') {
  Input.displayName = 'Input';

  Input.propTypes = {
    type: react.PropTypes.string
  };
}

defaults(prototype, Hitarea.prototype);

module.exports = Input;
