'use strict';

var defaults = require('lodash/object/defaults');
var touchTracker = require('../touchTracker');
var react = require('react');
var div = react.DOM.div;

var spec = {
  defaultProps: {
    value: 50,
    min: 0,
    max: 100,
    step: 0
  },

  styles: require('./styles'),

  init: function (component) {
    component.handleChange = function (value) {
      var props = component.props;
      var callback = props.onChange;

      if (callback) {
        var min = props.min;
        var step = props.step;

        value = min + value * (props.max - min) / 100;

        if (step) {
          step = 1 / step;
          value = Math.round(value * step) / step;
        }

        if (value != props.value) {
          callback(value);
        }
      }
    };
  },

  render: function (props) {
    var getStyle = this.getStyle;
    var percentage =
      (props.value - props.min) * 100 / (props.max - props.min) + '%';

    return touchTracker(
      {onChange: this.handleChange},
      div(
        {style: getStyle('container')},
        div(
          {style: getStyle('track')},
          div({style: defaults({left: percentage}, getStyle('progress'))})
        ),
        div({style: defaults({left: percentage}, getStyle('knob'))})
      )
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Range Input';
  spec.propTypes = {
    value: react.PropTypes.number,
    min: react.PropTypes.number,
    max: react.PropTypes.number,
    step: react.PropTypes.number,
    onChange: react.PropTypes.func
  };
}

module.exports = require('../lib/createComponent')(spec);
