'use strict';

var convert = require('colr-convert');
var luminance = convert.rgb.grayscale;
var toRgb = convert.hsv.rgb;
var react = require('react');
var sample = require('./sample');
var shade = require('./shade');
var hue = require('./hue');
var div = react.DOM.div;

var light = ['wrapper'];
var dark = ['wrapper', 'dark'];

var spec = {
  styles: require('./styles'),

  init: function (component) {
    component.changeHandler = function (hsv) {
      var callback = component.props.onChange;

      callback && callback(hsv);
    };

    component.hueHandler = function (hue) {
      var props = component.props;
      var hsv = props.hsv;
      var callback = props.onChange;

      callback && callback([hue, hsv[1], hsv[2]]);
    };
  },

  render: function (props) {
    var component = this;
    var hsv = props.hsv;

    var sharedProps = {
      hsv: hsv,
      onChange: component.changeHandler
    };

    return div(
      {style: component.getStyle(luminance(toRgb(hsv)) < 128 ? dark : light)},
      sample(sharedProps),
      div(
        {style: component.getStyle('shade')},
        shade(sharedProps)
      ),
      hue({
        value: hsv[0],
        onChange: component.hueHandler
      })
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Colorpicker';

  spec.propTypes = {
    hsv: react.PropTypes.arrayOf(react.PropTypes.number),
    onChange: react.PropTypes.func
  };
}

module.exports = require('../lib/createComponent')(spec);
