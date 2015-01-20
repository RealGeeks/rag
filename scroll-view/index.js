'use strict';

var react = require('react/addons');
var preventOverscroll = require('prevent-overscroll');

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
    this.detachListeners = preventOverscroll(this.getDOMNode());
  };

  componentSpec.componentWillUnmount = function () {
    this.detachListeners();
  };
}

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Scroll View';
}

module.exports = react.createClass(componentSpec);
