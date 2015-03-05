'use strict';

var defaults = require('lodash/object/defaults');
var theme = require('../theme');
var hitareaStyles = require('../hitarea/styles');
var abstractions = require('../lib/abstractions');

var size = 34;
var borderWidth = 1;

module.exports = function () {
  var config = theme();
  var hitarea = hitareaStyles();
  var backgroundColor = config.colors.background;
  var accentColor = config.colors.accent;

  var baseNormal = defaults(
    {
      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      height: size,
      minWidth: size,
      padding: '0 ' + config.padding + 'px',
      lineHeight: (size - 2 * borderWidth) / config.fontSize,
      fontWeight: 500,
      color: config.colors.foreground,
      textAlign: 'center',
      textDecoration: 'none',
      backgroundColor: backgroundColor,
      borderWidth: borderWidth,
      borderStyle: 'solid',
      borderColor: '#eee',
      borderRadius: config.borderRadius,
      verticalAlign: 'middle'
    },
    hitarea.normal,
    undefined && abstractions.truncate
  );

  var baseDisabled = defaults(
    {color: '#888'},
    hitarea.disabled,
    baseNormal
  );

  var baseActive = defaults(
    {
      zIndex: 1,
      backgroundColor: accentColor,
      borderColor: 'transparent',
      color: backgroundColor
    },
    baseNormal
  );

  var overlay = {
    backgroundClip: 'padding-box',
    borderColor: 'rgba(0,0,0,.2)'
  };

  var block = {
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 320 - 2 * config.padding
  };

  var prominent = {
    backgroundColor: accentColor,
    borderColor: 'transparent',
    color: backgroundColor
  };

  return {
    base: {
      normal: baseNormal,
      disabled: baseDisabled,
      active: baseActive,
      focus: defaults({}, hitarea.focus, baseNormal),
      hover: defaults({backgroundColor: '#fafafa'}, baseNormal)
    },

    overlay: {
      enabled: defaults({}, overlay, baseNormal),
      disabled: defaults({}, overlay, baseDisabled),
      active: defaults({}, overlay, baseActive)
    },

    block: {
      enabled: defaults({}, block, baseNormal),
      disabled: defaults({}, block, baseDisabled),
      active: defaults({}, block, baseActive)
    },

    prominent: {
      enabled: defaults({}, prominent, baseNormal),
      disabled: defaults({}, prominent, baseDisabled),
      active: defaults({}, prominent, baseActive)
    }
  };
};

// .rag-button-large {
//   height: $button-size-large;
//   line-height: ($button-size-large - 2 * $button-border-width);
// }
//
// .rag-button-basic {
//   color: $color-primary;
//   border-radius: 0;
//   border-color: transparent;
// }
//
// .rag-button-accent {
//   color: $color-primary;
// }
//
// .rag-button-prominent {
//   background-color: $color-primary;
//   border-color: transparent;
//   color: $text-color-inverted;
//
//   &:hover {
//     background-color: darken($color-primary, 5%);
//   }
//
//   &.success {
//     background-color: $color-success;
//     border-color: $color-success;
//
//     &:hover {
//       background-color: darken($color-success, 5%);
//     }
//   }
//
//   &.warning {
//     background-color: $color-warning;
//     border-color: $color-warning;
//
//     &:hover {
//       background-color: darken($color-warning, 5%);
//     }
//   }
//
//   &.danger {
//     background-color: $color-danger;
//     border-color: $color-danger;
//
//     &:hover {
//       background-color: darken($color-danger, 5%);
//     }
//   }
// }
