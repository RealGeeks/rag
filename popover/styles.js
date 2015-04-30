'use strict';

var defaults = require('lodash/object/defaults');
var getTheme = require('../theme');

module.exports = function () {
  var theme = getTheme();
  var width = 200;
  var arrowSize = 10;

  var wrapperTop = {
    position: 'absolute',
    width: width
  };

  var wrapperBottom = defaults({marginTop: arrowSize}, wrapperTop);

  return {
    top: {
      visible: wrapperTop,
      hidden: defaults({visibility: 'hidden'}, wrapperTop)
    },

    bottom: {
      visible: wrapperBottom,
      hidden: defaults({visibility: 'hidden'}, wrapperBottom)
    },

    content: {
      position: 'relative',
      // The negative margin ensures the arrow doesn’t stick
      // to the outside of the popover body.
      // margin: '0 ' + (-arrowSize) + 'px',
      overflow: 'hidden'
    },

    arrowSize: arrowSize,
    borderRadius: theme.borderRadius
  };
};
