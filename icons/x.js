'use strict';

var defaults = require('lodash/object/defaults');
var theme = require('../theme')();
var react = require('react');
var dom = react.DOM;

var X = function (props, context) {
  this.props = props;
  this.context = context;
};

var prototype = defaults(
  X.prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

X.defaultProps = {
  size: theme.iconSize
};

prototype.render = function () {
  var props = this.props;

  return dom.svg(
    {
      viewBox: '0 0 16 16',
      width: props.size,
      height: props.size,
      style: props.style
    },
    dom.path({
      d: 'm4 4 8 8m0-8-8 8',
      stroke: 'currentColor',
      strokeWidth: 2,
      fill: 'none'
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  X.displayName = 'X';
}

module.exports = X;
