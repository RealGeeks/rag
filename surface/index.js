'use strict';

var react = require('react/dist/react-with-addons');

var componentSpec = {
  mixins: [
    require('react-touch-mixin'),
    react.addons.PureRenderMixin
  ],

  render: function () {
    return react.DOM.div(this.props);
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Surface';
}

module.exports = react.createClass(componentSpec);
