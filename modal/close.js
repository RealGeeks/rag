'use strict';

var theme = require('../theme')();
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');

var CloseIcon = function (props, context) {
  this.props = props;
  this.context = context;
};

var prototype = Object.assign(CloseIcon.prototype, PureRenderMixin);

CloseIcon.defaultProps = {
  color: theme.colors.background,
  size: 24
};

prototype.render = function () {
  var props = this.props;
  var size = props.size;
  var halfSize = size / 2;

  return dom.svg(
    {
      viewBox: '0 0 24 24',
      width: size,
      height: size,
      style: props.style
    },
    dom.circle({
      cx: halfSize,
      cy: halfSize,
      r: halfSize,
      opacity: 0.3
    }),
    dom.path({
      d: 'm8 8 8 8m0-8-8 8',
      stroke: props.color,
      strokeWidth: 1.4,
      fill: 'none'
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  CloseIcon.displayName = 'Close Icon';
}

module.exports = CloseIcon;
