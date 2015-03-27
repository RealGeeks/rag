'use strict';

var find = require('lodash/collection/find');
var capitalize = require('lodash/string/capitalize');

var style = typeof document != 'undefined' ?
  document.documentElement.style : {};

// Find the vendor prefix of the current browser. Cheking is done
// against 'userSelect' which is prefixed in every browser.
var prefix = find(['Webkit', 'Moz', 'ms'], function (vendorPrefix) {
  return style[vendorPrefix + 'UserSelect'] != undefined;
});

var prefixProp = exports.prop = function (prop) {
  if (!prefix || style[prop] != undefined) {
    return prop;
  }

  return prefix + capitalize(prop);
};

var prefixValue = exports.value = function (prop, value) {
  // Using 'flexBasis' in order to discriminate between the spec
  // flexbox syntax and the older one supported by IE10.
  if (
    prop == 'display' &&
    value == 'flex' &&
    style.flexBasis == undefined &&
    style.WebkitFlexBasis != undefined
  ) {
    return '-webkit-flex';
  }

  return value;
};

exports.block = function (block) {
  return Object.keys(block).reduce(function (newBlock, prop) {
    newBlock[prefixProp(prop)] = prefixValue(prop, block[prop]);

    return newBlock;
  }, {});
};
