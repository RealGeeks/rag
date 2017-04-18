'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var Hitarea = require('../hitarea');
var styles = require('./styles')();
var dom = React.DOM;


class Button extends Hitarea {
  constructor(props) {
    super(props);
  }

  render() {
    var state = this.state;
    var props = defaults(this.getHandlers(), this.props);
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
    if(props.href) {
      return <a {...props}>{props.label || props.children}</a>;
    } else {
      return <button {...props}>{props.label || props.children}</button>;
    }
  }
}

if (process.env.NODE_ENV != 'production') {
  Button.displayName = 'Button';

  Button.propTypes = {
    label: React.PropTypes.string,
    kind: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    href: React.PropTypes.string,
    action: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  };
}

// defaults(prototype, Hitarea.prototype);

module.exports = Button;
