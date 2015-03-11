'use strict';

var defaults = require('lodash/object/defaults');

module.exports = function () {
  var basic = {
    display: 'inline-block',
    verticalAlign: 'middle'
  };

  return {
    basic: basic,
    flex: defaults({
      display: 'flex'
    }, basic)
  };
};
