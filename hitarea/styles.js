'use strict';

var defaults = require('lodash/object/defaults');
var prefixProp = require('../lib/prefix').prop;

var normal = {
  cursor: 'pointer',
  outline: 0
};

normal[prefixProp('userSelect')] = 'none';

module.exports = require('react/lib/emptyFunction').thatReturns({
  normal: normal,

  focus: defaults({outline: ''}, normal),

  disabled: {
    cursor: 'default',
    pointerEvents: 'none'
  }
});
