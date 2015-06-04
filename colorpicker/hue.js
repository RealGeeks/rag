'use strict';

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

    return touchTracker(
      component.trackerProps,
      div(
        {
          style: {
            position: 'relative',
            height: 44,
            overflow: 'hidden'
          }
        },
        strip,
        div({
          style: {
            position: 'absolute',
            top: 0,
            left: props.value / 360 * 100 + '%',
            width: 10,
            height: '100%',
            marginLeft: -5,
            boxSizing: 'border-box',
            borderWidth: '10px 5px',
            borderStyle: 'solid',
            borderColor: '#000 transparent'
          }
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
