'use strict';

var getTheme = require('../theme');
var assign = require('lodash/object/assign');

module.exports = function () {
  var theme = getTheme();

  var basic = {
    backgroundColor: theme.colors.background,
    overflow: 'hidden',
    boxShadow: '0 0 1px #000'
  };

  return {
    basic: basic,
    indented: assign({borderRadius: theme.borderRadius}, basic)
  };
};
