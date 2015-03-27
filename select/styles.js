'use strict';

var inputStyles = require('../input/styles')();
var theme = require('../theme')();

module.exports = function () {
  var normal = inputStyles(['text']);
  var disabled = inputStyles(['text', 'disabled']);

  normal.cursor = disabled.cursor = 'pointer';
  normal.width = disabled.width = '';
  normal.paddingRight = disabled.paddingRight =
    2 * theme.padding + theme.iconSize;

  return {
    normal: normal,
    focus: normal,
    disabled: disabled,
    wrapper: {
      position: 'relative',
      display: 'inline-block'
    },
    icon: {
      position: 'absolute',
      top: (theme.controlSize - theme.iconSize) / 2,
      right: theme.padding,
      pointerEvents: 'none'
    }
  };
};
