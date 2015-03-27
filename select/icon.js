'use strict';

var assign = require('react/lib/Object.assign');
var theme = require('../theme')();
var react = require('react/addons');
var dom = react.DOM;

var SelectIcon = function (props, context) {
  this.props = props;
  this.context = context;
};

var prototype = assign(SelectIcon.prototype, react.addons.PureRenderMixin);

SelectIcon.defaultProps = {
  color: theme.colors.foreground,
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
      d: 'm4 6 4-4 4 4m0 4-4 4-4-4',
      stroke: props.color,
      strokeWidth: 2,
      fill: 'none'
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  SelectIcon.displayName = 'Select Icon';
}

module.exports = SelectIcon;
