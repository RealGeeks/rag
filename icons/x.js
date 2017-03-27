'use strict';

var defaults = require('lodash/object/defaults');
var iconSize = require('../theme')().iconSize;
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
  width: iconSize * 10 / 16,
  height: iconSize
};

prototype.render = function () {
  var props = this.props;

  return dom.svg(
    {
      viewBox: '0 0 10 16',
      width: props.width,
      height: props.height,
      style: props.style
    },
    dom.path({
      d: 'm1 4 8 8m0-8-8 8',
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
