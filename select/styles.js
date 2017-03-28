'use strict';

var inputStyles = require('../input/styles')();
var theme = require('../theme')();
var iconSize = require('../theme')().iconSize;
var icon = {
  width: iconSize * 10 / 16,
  height: iconSize
};

module.exports = function () {
  var normal = inputStyles(['text']);
  var disabled = inputStyles(['text', 'disabled']);

  normal.cursor = disabled.cursor = 'pointer';
  normal.width = disabled.width = '100%';
  normal.paddingRight = disabled.paddingRight =
    2 * theme.padding + icon.width;

  return {
    normal: normal,
    focus: normal,
    disabled: disabled,
    wrapper: {
      position: 'relative',
      display: 'inline-block'
    },
    block: {
      position: 'relative',
      display: 'block',
      width: '100%'
    },
    icon: {
      position: 'absolute',
      top: (theme.controlSize - icon.height) / 2,
      right: theme.padding,
      pointerEvents: 'none'
    }
  };
};
