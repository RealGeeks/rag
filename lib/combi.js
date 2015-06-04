'use strict';

var assign = require('lodash/object/assign');
var memoize = require('lodash/function/memoize');
var isFunction = require('lodash/lang/isFunction');

module.exports = function (config, dict) {
  dict = assign({}, isFunction(dict) ? dict(config) : dict);

  function reducer(current, name) {
    var modifier = dict[name];

    if (!modifier) {
      return current;
    }

    if (isFunction(modifier)) {
      return modifier(current, config) || current;
    }

    return assign(current, modifier);
  }

  return {
    add: function (name, value) {
      dict[name] = value;
    },

    get: memoize(function (list) {
      return list.reduce(reducer, {});
    })
  };
};
