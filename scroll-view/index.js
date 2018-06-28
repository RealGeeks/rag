'use strict';

var preventOverscroll = require('prevent-overscroll');
var react = require('react/addons');
var ReactDOM = require('react-dom');

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  getDefaultProps: function () {
    return {
      style: {
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    };
  },

  render: function () {
    return react.DOM.div(this.props);
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

module.exports = react.createClass(componentSpec);
