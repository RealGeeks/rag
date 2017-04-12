'use strict';

var defaults = require('lodash/object/defaults');
var theme = require('../theme')();
var iconSize = theme.iconSize;
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');


class Glyph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var props = this.props;
    var scale = props.scale || 1;
    var width = props.width || iconSize;
    var height = props.height || iconSize;
    var viewBox = '0 0 ' + width + ' ' + height;

    var svg_props = {
      viewBox: viewBox,
      width: width * scale,
      height: height * scale,
      style: props.style
    };

    var pathProps = {
      d: props.path,
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

module.exports = Glyph;
