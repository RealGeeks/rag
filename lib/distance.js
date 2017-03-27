'use strict';

module.exports = function (a, b) {
  var sum = 0;
  var delta;
  var i;

  for (i = 0; i < a.length; i++) {
    delta = a[i] - b[i];
    sum += delta * delta;
  }

  return Math.sqrt(sum);
};
