'use strict';

var emitter = require('eventemitter3');
var setDefaults = require('lodash/object/defaults');

module.exports = function (defaults) {
  var value = defaults;

  var configurable = function (options) {
    if (options) {
      value = setDefaults({}, options, value);
      configurable.emit('change', value);
    }

    return value;
  };

  setDefaults(configurable, emitter.prototype);

  return configurable;
};
