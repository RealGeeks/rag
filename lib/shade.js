'use strict';

var round = Math.round;

// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

module.exports = function (color, ratio) {
  color = parseInt(color.slice(1), 16);

  var r = color >> 16;
  var g = color >> 8 & 0x00FF;
  var b = color & 0x0000FF;

  var t = ratio < 0 ? 0 : 255;
  ratio = ratio < 0 ? ratio * -1 : ratio;

  return '#' +
    (0x1000000 +
      (round((t - r) * ratio) + r) * 0x10000 +
      (round((t - g) * ratio) + g) * 0x100 +
      (round((t - b) * ratio) + b)
    ).toString(16).slice(1);
};
