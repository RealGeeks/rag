'use strict';

module.exports = function (theme) {
  var accentColor = theme.colors.accent;
  var trackWidth = 4;
  var handleSize = 20;
  var handleHalfSize = handleSize / 2;
  var verticalPadding = (theme.controlSize - trackWidth) / 2;

  return {
    container: {
      position: 'relative',
      marginRight: handleHalfSize,
      marginLeft: handleHalfSize,
      paddingTop: verticalPadding,
      paddingBottom: verticalPadding
    },
    track: {
      overflow: 'hidden',
      width: '100%',
      marginLeft: -handleHalfSize,
      paddingRight: handleHalfSize,
      paddingLeft: handleHalfSize,
      height: trackWidth,
      borderRadius: theme.borderRadius,
      backgroundColor: 'rgba(0,0,0,.2)',
      transform: 'translate3d(0,0,0)'
    },
    progress: {
      position: 'relative',
      transform: 'translate(' + (-handleHalfSize) + 'px,0)',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      marginLeft: '-100%',
      paddingLeft: handleHalfSize,
      backgroundColor: accentColor
    },
    knob: {
      position: 'absolute',
      top: verticalPadding - handleHalfSize + trackWidth / 2,
      right: 0,
      left: 0,
      marginLeft: -handleHalfSize,
      width: handleSize,
      height: handleSize,
      borderRadius: handleSize,
      backgroundColor: '#fff',
      boxShadow: '0 0 1px #000'
    }
  };
};
