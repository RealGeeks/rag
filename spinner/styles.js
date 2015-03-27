'use strict';

var theme = require('../theme')();

var trackSize = 4;
var elementSize = trackSize - 2;
var elementOffset = (trackSize - elementSize) / 2;

module.exports = function () {
  var size = theme.controlSize;

  return {
    spinner: {
      position: 'relative',
      display: 'inline-block'
    },
    track: {
      display: 'block',
      boxSizing: 'border-box',
      width: size,
      height: size,
      borderWidth: trackSize,
      borderStyle: 'solid',
      borderColor: 'rgba(0,0,0,.2)',
      borderRadius: size
    },
    element: {
      position: 'absolute',
      top: elementOffset,
      right: elementOffset,
      bottom: elementOffset,
      left: elementOffset,
      borderWidth: elementSize,
      borderStyle: 'solid',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#fff',
      borderLeftColor: 'transparent',
      borderRadius: size
    }
  };
};
