'use strict';

var convert = require('colr-convert');
var toHsv = convert.rgb.hsv;
var toRgb = convert.hsv.rgb;
var colorpicker = require('./controlled');
var black = [0, 0, 0];

var spec = {
  init: function (component) {
    var defaultColor = component.props.defaultColor;

    component.state = {
      rgb: defaultColor || black,
      hsv: defaultColor && toHsv(defaultColor) || black
    };

    component.setColor = function (hsv) {
      var callback = component.props.onChange;
      var newState = {hsv: hsv};
      var oldRgb = component.state.rgb;
      var rgb = toRgb(hsv).map(Math.round);

      if (rgb[0] != oldRgb[0] || rgb[1] != oldRgb[1] || rgb[2] != oldRgb[2]) {
        newState.rgb = rgb;

        callback && callback(rgb);
      }

      component.setState(newState);
    };
  },

  render: function (props, state) {
    return colorpicker({
      hsv: state.hsv,
      onChange: this.setColor
    });
  }
};

if (process.env.NODE_ENV != 'production') {
  var react = require('react');

  spec.displayName = 'Colorpicker';

  spec.propTypes = {
    defaultColor: react.PropTypes.arrayOf(react.PropTypes.number),
    onChange: react.PropTypes.func
  };
}

module.exports = require('../lib/createComponent')(spec);
