'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var dom = require('react-dom');

var componentSpec = {
  mixins: [
    require('react-touch-mixin'),
    PureRenderMixin
  ],

  render: function () {
    return dom.div(this.props);
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Surface';
}

module.exports = React.createClass(componentSpec);
