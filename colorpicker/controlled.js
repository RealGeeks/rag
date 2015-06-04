'use strict';

var luminance = require('../lib/luminance');
var toRgb = require('colr-convert').hsv.rgb;
var react = require('react');
var sample = require('./sample');
var shade = require('./shade');
var hue = require('./hue');
var div = react.DOM.div;

var spec = {
  styles: require('./styles'),

  init: function (component) {
    component.shadeHandler = function (hsv) {
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

    return div(
      {
        style: {
          width: 320,
          height: 320,
          color: luminance(toRgb(hsv)) < 0.5 ? '#fff' : '#000'
        }
      },
      sample({
        hsv: hsv,
        onChange: component.shadeHandler
      }),
      shade({
        hsv: hsv,
        onChange: component.shadeHandler
      }),
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
