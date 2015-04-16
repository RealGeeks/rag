'use strict';

var defaults = require('lodash/object/defaults');
var theme = require('../theme')();
var iconSize = theme.iconSize;
var react = require('react');
var pureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var dom = react.DOM;

module.exports = function (options) {
  var Glyph = function (props, context) {
    this.props = props;
    this.context = context;
  };

  var prototype = defaults(
    Glyph.prototype,
    pureRenderMixin
  );

  var width = options.width || iconSize;
  var height = options.height || iconSize;
  var viewBox = '0 0 ' + width + ' ' + height;

  var pathProps = {
    d: options.path,
    stroke: 'currentColor',
    strokeWidth: theme.strokeWidth,
    fill: 'none'
  };

  Glyph.defaultProps = {
    width: width,
    height: height
  };

  prototype.render = function () {
    var props = this.props;

    return dom.svg(
      {
        viewBox: viewBox,
        width: props.width,
        height: props.height,
        style: props.style
      },
      dom.path(pathProps)
    );
  };

  if (process.env.NODE_ENV != 'production') {
    Glyph.displayName = 'Glyph';
  }

  return Glyph;
};
