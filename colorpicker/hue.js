'use strict';

var defaults = require('lodash/object/defaults');
var touchTracker = require('../touchTracker');
var div = require('react/lib/ReactDOM').div;

var strip = div({
  style: {
    height: '100%',
    backgroundImage:
      'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)'
  }
});

var spec = {
  styles: require('./hueStyles'),

  init: function (component) {
    component.trackerProps = {
      onChange: function (percentage) {
        var callback = component.props.onChange;

        callback && callback(percentage * 3.6);
      }
    };
  },
  render: function (props) {
    var component = this;
    var getStyle = component.getStyle;

    return touchTracker(
      component.trackerProps,
      div(
        {style: getStyle('slider')},
        strip,
        div({
          style: defaults(
            {left: props.value / 3.6 + '%'},
            getStyle('needle')
          )
        })
      )
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  var propTypes = require('react').PropTypes;
  spec.displayName = 'Hue Slider';
  spec.propTypes = {
    value: propTypes.number
  };
}

module.exports = require('../lib/createComponent')(spec);
