'use strict';

var defaults = require('lodash/object/defaults');
var _extend = require('lodash/object/extend')
var iconSize = require('../theme')().iconSize;
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');

class SelectIcon extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      width: iconSize * 10 / 16,
      height: iconSize
    };
  }

  render() {
    var props = defaults(this.defaultProps, this.props);
    var path_props = {
      d: 'm1 6 4-4 4 4m0 4-4 4-4-4',
      stroke: 'currentColor',
      strokeWidth: 2,
      fill: 'none'
    };
    return <svg viewBox='0 0 10 16' width={props.width} height={props.height} style={props.style}>
      <path {...path_props}/>
    </svg>
  }
}

var prototype = _extend(SelectIcon.prototype, PureRenderMixin);

if (process.env.NODE_ENV != 'production') {
  SelectIcon.displayName = 'Select Icon';
}

module.exports = SelectIcon;
