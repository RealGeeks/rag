'use strict';

var defaults = require('lodash/object/defaults');
var div = require('react').DOM.div;

var spec = {
  styles: require('./styles'),
  render: function (props) {
    var getStyle = this.getStyle;
    var style = getStyle('container');

    if (props.style) {
      style = defaults({}, props.style, style);
    }

    return div(
      defaults({style: style}, props),
      div({style: getStyle('before')}),
      div(undefined, props.children),
      div({style: getStyle('after')})
    );
  }
};

spec.defaultProps = {
  component: 'div'
};

// if (require('supports/touch')) {
//   spec.componentDidMount = function () {
//     this.detachListeners = preventOverscroll(this.getDOMNode());
//   };
//
//   spec.componentWillUnmount = function () {
//     this.detachListeners();
//   };
// }

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Scroll View';
}

module.exports = require('../lib/createComponent')(spec);
