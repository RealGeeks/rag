'use strict';

module.exports = require('./lib/configurable')({
  colors: {
    accent: '#09c',
    success: '#690',
    warning: '#f80',
    danger: '#f44',
    background: '#fff',
    foreground: '#333'
  },
  padding: 10,
  borderRadius: 2,
  fontSize: 16,
  fontFamily: '"Helvetica Neue", Helvetica, Ubuntu, "Segoe UI", Arial, sans-serif',
  lineHeight: 1.4,
  screen: {
    small: 568,
    medium: 1024,
    large: 1440
  }
});
