'use strict';

var theme = require('../theme');

module.exports = function () {
  var config = theme();

  return {
    fontSize: config.fontSize,
    fontFamily: config.fontFamily,
    lineHeight: config.lineHeight,
    color: config.colors.foreground,
    backgroundColor: config.colors.background
  };
};
