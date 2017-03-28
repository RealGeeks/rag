'use strict';

var iconSize = require('../theme')().iconSize;
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');

var SelectIcon = function (props, context) {
  this.props = props;
  this.context = context;
};

var prototype = Object.assign(SelectIcon.prototype, PureRenderMixin);

SelectIcon.defaultProps = {
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
      d: 'm1 6 4-4 4 4m0 4-4 4-4-4',
      stroke: 'currentColor',
      strokeWidth: 2,
      fill: 'none'
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  SelectIcon.displayName = 'Select Icon';
}

module.exports = SelectIcon;
