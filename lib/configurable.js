'use strict';

var setDefaults = require('lodash/object/defaults');

module.exports = function (defaults) {
  var value = defaults;

  return function (options) {
    if (options) {
      value = setDefaults(options, value);
    }

    return value;
  };
};
