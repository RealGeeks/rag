'use strict';

var defaults = require('lodash/object/defaults');
var prefixValue = require('../lib/prefix').value;

module.exports = function () {
  var basic = {
    display: 'inline-block',
    verticalAlign: 'middle'
  };

  return {
    basic: basic,
    flex: defaults({
      display: prefixValue('display', 'flex')
    }, basic)
  };
};
