'use strict';

var convert = require('colr-convert');
var hsvToRgb = convert.hsv.rgb;
var hexToRgb = convert.hex.rgb;
var rgbToHex = convert.rgb.hex;
var rgbToHsv = convert.rgb.hsv;
var react = require('react');
var input = react.createFactory(require('../input'));
var nonHexRegex = /[^#0-9a-f]/g;

var spec = {
  init: function (component) {
    component.state = {};

    component.changeHandler = function (event) {
      var props = component.props;
      var callback = props.onChange;
      var value = event.target.value
        .toLowerCase()
        .replace(nonHexRegex, '')
        .slice(0, 7);

      console.log(value);

      if (callback && value[0] == '#' && value.length == 7) {
        callback(rgbToHsv(hexToRgb(value)));
        component.setState({value: ''});
      } else {
        component.setState({value: value});
      }

    };
  },

  render: function (props, state) {
    var component = this;
    var hsv = props.hsv;
    var hex = rgbToHex(hsvToRgb(hsv).map(Math.round));

    return input({
      style: {
        backgroundColor: hex,
        color: 'currentColor',
        textAlign: 'center',
        fontFamily: 'monospace',
        // lineHeight: '32px',
        borderWidth: 0,
        borderRadius: 0,
        outline: 0
      },
      value: state.value || hex,
      onChange: component.changeHandler
    });
  }
};

if (process.env.NODE_ENV != 'production') {
  var propTypes = require('react').PropTypes;
  spec.displayName = 'Sample';
  spec.propTypes = {
    hsv: propTypes.arrayOf(propTypes.number),
    onChange: propTypes.func
  };
}

module.exports = require('../lib/createComponent')(spec);
