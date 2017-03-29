'use strict';

var defaults = require('lodash/object/defaults');
var theme = require('../theme')();
var iconSize = theme.iconSize;
var React = require('react');
var dom = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');

module.exports = function (options) {
  class Glyph extends React.Component {
    constructor(props, context) {
      super(props);
      this.context = context;
    }

    render() {
      var props = this.props;
      var scale = props.scale || 1;
      var width = options.width || iconSize;
      var height = options.height || iconSize;
      var viewBox = '0 0 ' + width + ' ' + height;

      var svg_props = {
        viewBox: viewBox,
        width: width * scale,
        height: height * scale,
        style: props.style
      };

      var pathProps = {
        d: options.path,
        stroke: 'currentColor',
        strokeWidth: theme.strokeWidth,
        fill: 'none'
      };

      return <svg {...svg_props}>
        <path {...pathProps} />
      </svg>
    }
  }

  // var prototype = defaults(
  //   Glyph.prototype,
  //   PureRenderMixin
  // );
  // Glyph.defaultProps = {
  //   width: width,
  //   height: height
  // };

  if (process.env.NODE_ENV != 'production') {
    Glyph.displayName = 'Glyph';
  }

  return Glyph;
};
