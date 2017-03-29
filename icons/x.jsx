'use strict';

var defaults = require('lodash/object/defaults');
var iconSize = require('../theme')().iconSize;
var React = require('react');
var dom = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');

class X extends React.Component {
  constructor(props, context) {
    super(props);
    this.defaultProps = {
      width: (iconSize * 10 / 16),
      height: iconSize
    }
    this.context = context;
  }

  render() {
    var props = this.props;
    return <svg viewBox='0 0 10 16' width={props.width} height={props.height} style={props.style}>
      <path d='m1 4 8 8m0-8-8 8' stroke='currentColor' strokeWidth={2} fill='none' />
    </svg>
  }
}

var prototype = defaults(X.prototype, PureRenderMixin);

if (process.env.NODE_ENV != 'production') {
  X.displayName = 'X';
}

module.exports = X;
