'use strict';

var transform = require('./prefix').prop('transform');

module.exports = function (x, y, z, usePercentage) {
  var style = {};
  var suffix = usePercentage ? '%' : 'px';

  style[transform] = 'translate3d(' +
    (x ? x + suffix : 0) + ',' +
    (y ? y + suffix : 0) + ',' +

    // The z coordinate can’t be a percentage.
    (z ? z + 'px' : 0) +
  ')';

  return style;
};
