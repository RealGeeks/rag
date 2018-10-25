'use strict';

var react = require('react/dist/react-with-addons');

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  render: function () {
    var props = Object.assign({}, props, {
      onClick: this.props.onClick
    });

    return react.DOM.div(props);
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Surface';
}

module.exports = react.createClass(componentSpec);
