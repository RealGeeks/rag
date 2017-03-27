'use strict';

var defaults = require('lodash/object/defaults');

exports.container = {
  position: 'absolute',
  top: 0,
  width: '50%',
  height: 200,
  maxHeight: 200,
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch'
};

var common = {
  background: 'red',
  position: 'absolute',
  width: 1,
  height: 1
};

exports.before = defaults({
  top: -10
}, common);

exports.after = defaults({
  bottom: -10
}, common);
