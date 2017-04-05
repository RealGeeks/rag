'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');
var styles = require('./styles')();

class Hitarea extends React.Component {
  constructor(props, context) {
    super(props);
    this.focusState = {focus: true};
    this.keyboardFocusState = {
      focus: true,
      keyboardFocus: true
    };
    this.unfocusState = {
      focus: false,
      keyboardFocus: false
    };
    this.hoverState = {hover: true};
    this.unhoverState = {
      hover: false,
      active: false
    };
    this.activeState = {active: true};
    this.activeMouseFocusState = {
      active: true,
      keyboardFocus: false
    };
    this.inactiveState = {active: false};
    this.state = {
      focus: false,
      keyboardFocus: false,
      hover: false,
      active: false
    };
  }

  render() {
    var state = this.state;
    var props = defaults(this.getHandlers(), this.props);
    var disabled = props.disabled;
    var tag = props.tag || 'div';

    var style = styles[
      disabled && 'disabled' ||
        state.keyboardFocus && 'focus' ||
        'normal'
    ];

    props.style = props.style ? defaults({}, props.style, style) : style;

    if (!disabled && props.action) { props.tabIndex = 0; }

    // Don’t pass action prop as it will get added as an attribute
    // on the underlying DOM element.
    delete props.action;
    delete props.tag;
    return React.createElement(tag, props, props.children)
  }

  getHandlers() {
    return {
      onFocus:      this.onFocus.bind(this),
      onBlur:       this.onBlur.bind(this),
      onMouseEnter: this.onMouseEnter.bind(this),
      onMouseLeave: this.onMouseLeave.bind(this),
      onMouseDown:  this.onMouseDown.bind(this),
      onMouseUp:    this.onMouseUp.bind(this),
      onKeyDown:    this.onKeyDown.bind(this),
      onKeyUp:      this.onKeyUp.bind(this),
      onClick:      this.props.action
    };
  };

  onFocus() {
    this.setState(this.state.active ? this.focusState : this.keyboardFocusState);
  }

  onBlur() {
    this.setState(this.unfocusState);
  }

  onMouseEnter() {
    this.setState(this.hoverState);
  }

  onMouseLeave() {
    this.setState(this.unhoverState);
  }

  onMouseDown() {
    this.setState(this.activeMouseFocusState);
  }

  onMouseUp() {
    this.setState(this.inactiveState);
  }

  onKeyDown(event) {
    if (!this.state.disabled) {
      // this.setState(keyboardFocusState);
      var keyCode = event.which;

      if (keyCode == 13 || keyCode == 32) {
        this.setState(this.activeState);
      }
    }
  }

  onKeyUp(event) {
    var keyCode = event.which;

    // Enter key
    if (!this.state.disabled && (keyCode == 13 || keyCode == 32)) {
      this.setState(this.inactiveState);
    }
  }

  focus() {
    dom.findDOMNode(this).focus();
  }
}

// var prototype = Hitarea.prototype;


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
  require('react-touch-mixin'),
  PureRenderMixin
);

module.exports = Hitarea;
