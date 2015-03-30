'use strict';

var trackSize = 4;
var elementSize = trackSize - 2;
var elementOffset = (trackSize - elementSize) / 2;

module.exports = function () {
  return {
    small: {
      position: 'relative',
      display: 'inline-block',
      fontSize: 16
    },
    large: {
      position: 'relative',
      display: 'inline-block',
      fontSize: 32
    },
    track: {
      display: 'block',
      boxSizing: 'border-box',
      width: '1em',
      height: '1em',
      borderWidth: trackSize,
      borderStyle: 'solid',
      borderColor: 'rgba(0,0,0,.2)',
      borderRadius: '50%'
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
      borderRadius: '50%'
    }
  };
};
