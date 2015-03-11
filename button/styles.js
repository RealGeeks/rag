'use strict';

var combi = require('../lib/combi');
var assign = require('lodash/object/assign');
var themeStyles = require('../theme');
var shade = require('../lib/shade');
var hitareaStyles = require('../hitarea/styles');
var abstractions = require('../lib/abstractions');

module.exports = function () {
  var theme = themeStyles();
  var colors = theme.colors;
  var hitarea = hitareaStyles();
  var styles = combi({
    size: 34,
    maxWidth: 320 - 2 * theme.padding,
    fontSize: theme.fontSize,
    padding: theme.padding,
    foregroundColor: colors.foreground,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: theme.borderRadius
  });

  styles.add('base', function (current, config) {
    assign(
      current,
      hitarea.normal,
      abstractions.truncate,
      {
        position: 'relative',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: config.size,
        minWidth: config.size,
        padding: '0 ' + config.padding + 'px',
        lineHeight: (config.size - 2 * config.borderWidth) / config.fontSize,
        fontWeight: 500,
        color: config.foregroundColor,
        textAlign: 'center',
        textDecoration: 'none',
        backgroundColor: config.backgroundColor,
        borderWidth: config.borderWidth,
        borderStyle: 'solid',
        borderColor: '#eee',
        borderRadius: config.borderRadius,
        verticalAlign: 'middle'
      }
    );
  });

  ['accent', 'success', 'warning', 'danger'].forEach(function (variation) {
    styles.add(variation, function (current) {
      current.color = colors[variation];
    });
  });

  styles.add('disabled', function (current) {
    var backgroundColor = shade(current.backgroundColor, 0.8);
    assign(
      current,
      hitarea.disabled,
      {
        color: shade(backgroundColor, -0.4),
        backgroundColor: backgroundColor
      }
    );
  });

  styles.add('active', function (current) {
    var temp = current.color;

    current.color = current.backgroundColor;
    current.backgroundColor = temp;
    current.borderColor = temp == '#ffffff' ? current.color : 'transparent';
    current.zIndex = 1;
  });

  styles.add('focus', function (current) {
    assign(current, hitarea.focus);
  });

  styles.add('hover', function (current) {
    current.backgroundColor = shade(
      current.backgroundColor, -0.02
    );
  });

  styles.add('overlay', function (current) {
    current.backgroundClip = 'padding-box';
    current.borderColor = 'rgba(0,0,0,.2)';
  });

  styles.add('prominent', function (current) {
    var temp = current.color;

    current.color = current.backgroundColor;
    current.backgroundColor = temp;
    current.borderColor = 'transparent';
  });

  styles.add('basic', function (current) {
    current.borderColor = 'transparent';
  });

  styles.add('block', function (current, config) {
    current.display = 'block';
    current.marginRight = 'auto';
    current.marginLeft = 'auto';
    current.width = '100%';
    current.maxWidth = config.maxWidth;
  });

  return styles.get;
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
