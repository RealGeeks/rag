'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');
var preventOverscroll = require('prevent-overscroll');

var componentSpec = {
  mixins: [PureRenderMixin],

  getDefaultProps: function () {
    return {
      style: {
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    };
  },

  render: function () {
    return dom.div(this.props);
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

module.exports = React.createClass(componentSpec);
