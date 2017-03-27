'use strict';

var distance = require('./distance');

module.exports = function (component, callback, tolerance) {
  var touchCoordinates;

  if (tolerance == undefined) {
    tolerance = 5;
  }

  return {
    onTouchStart: function (event) {
      if (event.touches.length > 1) {
        touchCoordinates = undefined;
        return;
      }

      var touch = event.changedTouches[0];
      touchCoordinates = [touch.clientX, touch.clientY];
    },

    onTouchMove: function (event) {
      var touch = event.changedTouches[0];

      if (!touchCoordinates) {
        return;
      }

      if (
        distance(touchCoordinates, [touch.clientX, touch.clientY]) > tolerance
      ) {
        touchCoordinates = undefined;
        return;
      }
    },

    onTouchEnd: function (event) {
      if (touchCoordinates) {
        event.preventDefault();
        event.stopPropagation();
        callback(event);
      }
    },

    onTouchCancel: function () {
      touchCoordinates = undefined;
    }
  };
};
