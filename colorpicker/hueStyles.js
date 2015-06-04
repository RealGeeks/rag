'use strict';

module.exports = function (theme) {
  var padding = theme.padding;
  var controlSize = theme.controlSize;

  return {
    slider: {
      position: 'relative',
      height: controlSize,
      overflow: 'hidden'
    },

    needle: {
      position: 'absolute',
      top: 0,
      width: padding,
      height: '100%',
      marginLeft: -padding / 2,
      boxSizing: 'border-box',
      borderWidth: padding + 'px ' + padding / 2 + 'px',
      borderStyle: 'solid',
      borderColor: '#000 transparent'
    }
  };
};
