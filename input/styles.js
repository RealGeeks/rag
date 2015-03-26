'use strict';

var combi = require('../lib/combi');
var assign = require('lodash/object/assign');
var themeStyles = require('../theme');
var shade = require('../lib/shade');
var prefixProp = require('../lib/prefix').prop;
var hitareaStyles = require('../hitarea/styles');

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

  var textInput = function (current, config) {
    current.position = 'relative';
    current.display = 'inline-block';
    current.boxSizing = 'border-box';
    current.width = '100%';
    current.height = config.size;
    current.minWidth = config.size;
    current.padding = '0 ' + config.padding + 'px';
    current.lineHeight =
      (config.size - 2 * config.borderWidth) / config.fontSize;
    current.color = config.foregroundColor;
    current.backgroundColor = config.backgroundColor;
    current.borderWidth = config.borderWidth;
    current.borderStyle = 'solid';
    current.borderColor = '#eee';
    current.borderRadius = config.borderRadius;
    current.cursor = 'text';
    current.verticalAlign = 'middle';
    current[prefixProp('appearance')] = 'none';
  };

  ['text', 'password', 'email', 'tel', 'url'].forEach(function (type) {
      styles.add(type, textInput);
    });

  ['accent', 'success', 'warning', 'danger'].forEach(function (variation) {
    styles.add(variation, function (current) {
      current.backgroundColor = colors[variation];
    });
  });

  styles.add('disabled', function (current) {
    var backgroundColor = shade(current.backgroundColor, 0.8);
    assign(
      current,
      hitarea.disabled,
      {
        color: shade(backgroundColor, -0.4),
        backgroundColor: backgroundColor,
        opacity: 1
      }
    );
  });

  styles.add('focus', function (current) {
    current.cursor = 'text';
  });

  styles.add('left', function (current) {
    current.borderTopRightRadius =
    current.borderBottomRightRadius =
      0;
  });

  styles.add('right', function (current) {
    current.borderTopLeftRadius =
    current.borderBottomLeftRadius =
      0;
    current.marginLeft = -current.borderWidth;
  });

  styles.add('center', function (current) {
    current.borderRadius = 0;
    current.marginLeft = -current.borderWidth;
  });

  styles.add('flex', function (current) {
    current[prefixProp('flex')] = 1;
  });

  return styles.get;
};
