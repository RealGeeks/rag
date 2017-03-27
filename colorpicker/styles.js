'use strict';

module.exports = function (theme) {
  var controlSize = theme.controlSize;

  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#000'
    },

    dark: {
      color: '#fff'
    },

    shade: {
      position: 'relative',
      flex: 1,
      minHeight: 2 * controlSize
    }
  };
};
