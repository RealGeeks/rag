'use strict';

module.exports = function (config) {
  var dict = {};
  var cache = {};

  function reducer(current, name) {
    return dict[name](current, config) || current;
  }

  return {
    add: function (name, value) {
      dict[name] = value;
    },

    get: function (list) {
      var id = list.join();

      return cache[id] ||
        (cache[id] = list.reduce(reducer, {}));
    }
  };
};
