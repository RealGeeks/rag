'use strict';

var defaults = require('lodash/object/defaults');

var normal = {
  cursor: 'pointer',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  outline: 0
};

module.exports = require('react/lib/emptyFunction').thatReturns({
  normal: normal,

  focus: defaults({outline: ''}, normal),

  disabled: {
    cursor: 'default',
    pointerEvents: 'none'
  }
});
