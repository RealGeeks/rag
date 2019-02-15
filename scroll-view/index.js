'use strict';

var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var preventOverscroll = require('prevent-overscroll');
var div = require('react-dom-factories').div;

var componentSpec = {
  getDefaultProps: function () {
    return {
      style: {
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    };
  },

  render: function () {
    return div(this.props);
  }
};

if (require('supports/touch')) {
  componentSpec.componentDidMount = function () {
    this.detachListeners = preventOverscroll(ReactDOM.findDOMNode(this));
  };

  componentSpec.componentWillUnmount = function () {
    this.detachListeners();
  };
}

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Scroll View';
}

module.exports = createReactClass(componentSpec);
