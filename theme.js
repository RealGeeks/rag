'use strict';

module.exports = require('./lib/configurable')({
  colors: {
    accent: '#0099cc',
    success: '#669900',
    warning: '#ff8800',
    danger: '#ff4444',
    background: '#ffffff',
    foreground: '#333333'
  },
  padding: 10,
  borderRadius: 2,
  fontSize: 16,
  fontFamily: '"Helvetica Neue", Helvetica, Ubuntu, "Segoe UI", Arial, sans-serif',
  lineHeight: 1.375,
  iconSize: 16,
  strokeWidth: 2,
  controlSize: 34,
  screen: {
    small: 568,
    medium: 1024,
    large: 1440
  }
});