'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var Hitarea = require('../hitarea');
var styles = require('./styles')();
var dom = require('react-dom');


class Input extends React.Component {
  constructor(props, context) {
    super(props);
    Hitarea.call(this, props, context);
  }

  render() {
    var props = defaults(this.getHandlers(), this.props);
    var args = [props.type || 'text'];

    var state = props.disabled && 'disabled' ||
      this.state.focus && 'focus';

    var style;

    if(state) { args.push(state); }

    style = styles(args);

    props.style = props.style ? defaults({}, props.style, style) : style;
    var tag = props.type == 'textarea' ? 'textarea' : 'input';
    delete props.type;

    return React.createElement(tag, props)
  }
}

if(process.env.NODE_ENV != 'production') {
  Input.displayName = 'Input';

  Input.propTypes = {
    type: React.PropTypes.string
  };
}

var prototype = Input.prototype;
defaults(prototype, Hitarea.prototype);

module.exports = Input;
