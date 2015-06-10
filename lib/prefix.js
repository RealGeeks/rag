'use strict';

var find = require('lodash/collection/find');
var capitalize = require('lodash/string/capitalize');
var camelCase = require('lodash/string/camelCase');
var regexps = {
  transition: /\b[^\d\s]+\b/,
  transitionProperty: /\b[^\d\s]+\b/g
};

var style = typeof document != 'undefined' ?
  document.documentElement.style : {};

// Find the vendor prefix of the current browser. Cheking is done
// against 'userSelect' which is prefixed in every browser.
var prefix = find(['Webkit', 'Moz', 'ms'], function (vendorPrefix) {
  return style[vendorPrefix + 'UserSelect'] != undefined;
});

var cssPrefix = prefix && '-' + prefix.toLowerCase() + '-';

var prefixProp = exports.prop = function (prop) {
  if (!prefix || style[prop] != undefined) {
    return prop;
  }

  return prefix + capitalize(prop);
};

var prefixTransitionProperty = function (prop) {
  if (
    !cssPrefix || prop == 'all' || prop == 'none' ||
    style[camelCase(prop)] != undefined
  ) {
    return prop;
  }

  return cssPrefix + prop;
};

var prefixValue = exports.value = function (prop, value) {
  // Using 'flexBasis' in order to discriminate between the spec
  // flexbox syntax and the older one supported by IE10.
  if (prop == 'display') {
    if (
      (value == 'flex' || value == 'inline-flex') &&
      style.flexBasis == undefined &&
      style.WebkitFlexBasis != undefined
    ) {
      return '-webkit-' + value;
    }
  } else if (prop == 'transition' || prop == 'transitionProperty') {
    return value.replace(regexps[prop], prefixTransitionProperty);
  }

  return value;
};

exports.block = function (block) {
  return Object.keys(block).reduce(function (newBlock, prop) {
    newBlock[prefixProp(prop)] = prefixValue(prop, block[prop]);

    return newBlock;
  }, {});
};
