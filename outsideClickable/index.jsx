'use strict';

var React = require('react');

var hasTouch = require('supports/touch');
var defaults = require('lodash/object/defaults');
var throttle = require('lodash/function/throttle');

class OutsideClickable extends React.Component {
  constructor(props, context) {
    super(props);
    this.wrapperProps = {
      onMouseDown: this.block,
      onMouseUp: this.unblock,
      onMouseOut: this.unblock
    };

    if (hasTouch) {
      this.wrapperProps.onTouchStart = this.block;
      this.wrapperProps.onTouchEnd = this.unblock;
      this.wrapperProps.onTouchCancel = this.unblock;

      this.handleEvent = throttle(this.handleEvent, 400, {
        trailing: false
      });
    }

    this.context = context;
  }
  componentDidMount() {
    hasTouch && document.addEventListener('touchstart', this, false);
    document.addEventListener('mousedown', this, false);
  }

  componentWillUnmount() {
    hasTouch && document.removeEventListener('touchstart', this, false);
    document.removeEventListener('mousedown', this, false);
  }

  handleEvent(event) {
    var handler = this.props.onClickOutside;
    if (handler && !this.block) { handler(event); }
  }

  render() {
    var props = this.props,
        el = props.component || 'div';

    return React.createElement('div', defaults(this.wrapperProps, {style: props.style}), props.children);
  }

  block() { this.block = true; }

  unblock() { this.block = false; }

};

// A mousedown event is triggered after a touchstart in touch supporting
// devices. Make sure the handler is not triggered twice.
// if (hasTouch) {
//   prototype.handleEvent = throttle(prototype.handleEvent, 400, {
//     trailing: false
//   });
// }

if (process.env.NODE_ENV != 'production') {
  OutsideClickable.displayName = 'Outside Clickable';
}

module.exports = OutsideClickable;
