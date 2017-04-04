'use strict';

var clamp = require('clamp');

function arc(radius, x, y) {
  return ['a', radius, radius, 0, 0, 1, x, y, 'l'].join(' ');
}

module.exports = function (options) {
  var placement = options.placement;
  var width = options.width;
  var height = options.height;
  var borderRadius = options.borderRadius;
  var doubleBorderRadius = 2 * borderRadius;
  var arrowSize = options.arrowSize;
  var arrowSizePlusBorderRadius = arrowSize + borderRadius;
  var arrowOffset = clamp(
    options.arrowOffset,
    arrowSizePlusBorderRadius,
    (placement == 'top' || placement == 'bottom' ? width : height) -
      arrowSizePlusBorderRadius
  );
  var description = ['m'];
  var push = description.push.bind(description);

  if (placement == 'top') {
    push(
      arrowOffset, height + arrowSize,
      -arrowSize, -arrowSize,
      arrowSizePlusBorderRadius - arrowOffset, 0
    );

    borderRadius && push(arc(borderRadius, -borderRadius, -borderRadius));
    push(0, doubleBorderRadius - height);

    borderRadius && push(arc(borderRadius, borderRadius, -borderRadius));
    push(width - doubleBorderRadius, 0);

    borderRadius && push(arc(borderRadius, borderRadius, borderRadius));
    push(0, height - doubleBorderRadius);

    borderRadius && push(arc(borderRadius, -borderRadius, borderRadius));
    push(arrowOffset + arrowSizePlusBorderRadius - width, 0);

  } else if (placement == 'right') {
    push(
      -arrowSize, arrowOffset,
      arrowSize, -arrowSize,
      0, arrowSizePlusBorderRadius - arrowOffset
    );

    borderRadius && push(arc(borderRadius, borderRadius, -borderRadius));
    push(width - doubleBorderRadius, 0);

    borderRadius && push(arc(borderRadius, borderRadius, borderRadius));
    push(0, height - doubleBorderRadius);

    borderRadius && push(arc(borderRadius, -borderRadius, borderRadius));
    push(doubleBorderRadius - width, 0);

    borderRadius && push(arc(borderRadius, -borderRadius, -borderRadius));
    push(0, arrowOffset + arrowSizePlusBorderRadius - height);

  } else if (placement == 'left') {
    push(
      width + arrowSize, arrowOffset,
      -arrowSize, arrowSize,
      0, height - arrowOffset - arrowSizePlusBorderRadius
    );

    borderRadius && push(arc(borderRadius, -borderRadius, borderRadius));
    push(doubleBorderRadius - width, 0);

    borderRadius && push(arc(borderRadius, -borderRadius, -borderRadius));
    push(0, doubleBorderRadius - height);

    borderRadius && push(arc(borderRadius, borderRadius, -borderRadius));
    push(width - doubleBorderRadius, 0);

    borderRadius && push(arc(borderRadius, borderRadius, borderRadius));
    push(0, arrowOffset - arrowSizePlusBorderRadius);

  } else {
    push(
      arrowOffset, -arrowSize,
      arrowSize, arrowSize,
      width - arrowOffset - arrowSizePlusBorderRadius, 0
    );

    borderRadius && push(arc(borderRadius, borderRadius, borderRadius));
    push(0, height - doubleBorderRadius);

    borderRadius && push(arc(borderRadius, -borderRadius, borderRadius));
    push(doubleBorderRadius - width, 0);

    borderRadius && push(arc(borderRadius, -borderRadius, -borderRadius));
    push(0, doubleBorderRadius - height);

    borderRadius && push(arc(borderRadius, borderRadius, -borderRadius));
    push(arrowOffset - arrowSizePlusBorderRadius, 0);
  }

  push('z');
  return description.join(' ');
};
