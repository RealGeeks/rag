'use strict';

module.exports = function (doc) {
  var body = doc.body;
  var div = doc.createElement('div');
  var style = div.style;

  style.position = 'absolute';
  style.top = '-999px';
  style.overflow = 'scroll';

  body.appendChild(div);

  var scrollbarWidth = div.offsetWidth;

  body.removeChild(div);

  return scrollbarWidth;
};
