'use strict';

var defaults = require('lodash/object/defaults');
var getTheme = require('../theme');
var prefix = require('../lib/prefix').block;

module.exports = function () {
  var theme = getTheme();
  var backgroundColor = theme.colors.background;
  var width = 200;
  var arrowSize = 12;
  var arrowDiagonal = Math.floor(Math.sqrt(arrowSize * arrowSize / 2));
  var shadowSpread = 1;
  var boxShadow = '0 0 ' + shadowSpread + 'px #000';

  var wrapperTop = {
    position: 'absolute',
    width: width
  };

  var wrapperBottom = defaults({marginTop: arrowSize}, wrapperTop);

  var arrow = {
    position: 'absolute',
    width: 0,
    height: 0,
    marginLeft: -arrowDiagonal,
    borderWidth: Math.floor(Math.sqrt(arrowSize * arrowSize / 2)),
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: backgroundColor,
    borderLeftColor: backgroundColor,
    boxShadow: boxShadow,
    clip: 'rect(auto auto ' +
      (3 * arrowSize) + 'px ' + (-3 * arrowSize) + 'px)'
  };

  return {
    top: {
      visible: wrapperTop,
      hidden: defaults({visibility: 'hidden'}, wrapperTop),
      arrow: defaults(prefix(
        {
          bottom: -arrowDiagonal,
          transform: 'rotate(-45deg)'
        }
      ), arrow)
    },

    bottom: {
      visible: wrapperBottom,
      hidden: defaults({visibility: 'hidden'}, wrapperBottom),
      arrow: defaults(prefix(
        {
          top: -arrowDiagonal,
          transform: 'rotate(135deg)'
        }
      ), arrow)
    },

    content: {
      // The negative margin ensures the arrow doesn’t stick
      // to the outside of the popover body.
      // margin: '0 ' + (-arrowSize) + 'px',
      overflow: 'hidden',
      background: backgroundColor,
      borderRadius: theme.borderRadius,
      boxShadow: boxShadow
    },

    arrowSize: arrowSize
  };
};
