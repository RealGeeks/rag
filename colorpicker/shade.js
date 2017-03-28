'use strict';

var touchTracker = require('../touchTracker');
var div = require('react-dom').div;

var overlay = div({
  style: {
    height: '100%',
    backgroundImage:
      'linear-gradient(to top,#000,transparent),' +
      'linear-gradient(to right,#fff,transparent)'
  }
});

var spec = {
  init: function (component) {
    component.trackerProps = {
      onChange: function (x, y) {
        var props = component.props;
        var callback = props.onChange;

        callback && callback([props.hsv[0], x, 100 - y]);
      }
    };
  },

  render: function (props) {
    var component = this;
    var hsv = props.hsv;

    return touchTracker(
      component.trackerProps,
      div(
        {
          style: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: 'hidden',
            background: 'hsl(' + hsv[0] + ',100%,50%)'
          }
        },
        overlay,
        div({
          style: {
            position: 'absolute',
            top: 100 - hsv[2] + '%',
            left: hsv[1] + '%',
            width: 20,
            height: 20,
            marginTop: -10,
            marginLeft: -10,
            boxSizing: 'border-box',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'currentColor',
            borderRadius: 10
            // boxShadow: '0 0 0 1px rgba(0,0,0,.2), 0 0 0 1px rgba(0,0,0,.2) inset'
          }
        })
      )
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  var propTypes = require('react').PropTypes;
  spec.displayName = 'Shade Picker';
  spec.propTypes = {
    hsv: propTypes.arrayOf(propTypes.number),
    onChange: propTypes.func
  };
}

module.exports = require('../lib/createComponent')(spec);
