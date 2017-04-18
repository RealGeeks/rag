'use strict';

var defaults = require('lodash/object/defaults');
var theme = require('../theme')();
var PureRenderMixin = require('react-addons-pure-render-mixin');
var React = require('react');

class CloseIcon extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      color: theme.colors.background,
      size: 24
    };
  }

  render() {
    var props = defaults(this.props, this.defaultProps);
    var size = props.size;
    var halfSize = size / 2;
    var svg_props = {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        style: props.style
    };
    var circle_props = {
      cx: halfSize,
      cy: halfSize,
      r: halfSize,
      opacity: 0.3
    };

    return <svg {...svg_props}>
      <circle {...circle_props} />
      <path d='m8 8 8 8m0-8-8 8' stroke={props.color} strokeWidth={1.4} fill='none' />
    </svg>;
  }
}

// var prototype = Object.assign(CloseIcon.prototype, PureRenderMixin);

if (process.env.NODE_ENV != 'production') {
  CloseIcon.displayName = 'Close Icon';
}

module.exports = CloseIcon;
