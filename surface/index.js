'use strict';

var createReactClass = require('create-react-class');
var div = require('react-dom-factories').div;

var componentSpec = {
  render: function () {
    var props = Object.assign({}, props, {
      onClick: this.props.onClick
    });

    return div(props);
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Surface';
}

module.exports = createReactClass(componentSpec);
