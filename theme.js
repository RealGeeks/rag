'use strict';

module.exports = require('./lib/configurable')({
  colors: {
    lt_accent: '#6badd6',
    accent: '#38a4fc',
    success: '#2CA94F',
    warning: '#ffcc00',
    danger: '#dd0000',
    background: '#ffffff',
    foreground: '#333333'
  },
  padding: 10,
  borderRadius: 2,
  fontSize: 14,
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