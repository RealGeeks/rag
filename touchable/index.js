'use strict';

var findDOMNode = require('react/lib/findDOMNode');
var Mallet;

var build = function (oldProps) {
  var component = this;
  var mallet = component.mallet;
  var oldHandler = oldProps && oldProps.onTouch;
  var newHandler = component.props.onTouch;
  if (newHandler != oldHandler) {
    if (oldHandler) {
      mallet.off('input', oldHandler);
    }

    if (newHandler) {
      if (!mallet) {
        // Only require mallet here, so that the module works in Node.
        if (!Mallet) {
          Mallet = require('mallet');
        }

        mallet = component.mallet =
          new Mallet(findDOMNode(component), {recognizers: []});
      }

      mallet.on('input', newHandler);
    }
  }
};

var spec = {
  componentDidMount: build,
  componentDidUpdate: build,

  componentWillUnmount: function () {
    var component = this;
    if (component.mallet) {
      component.mallet.destroy();
      component.mallet = undefined;
    }
  },

  render: function (props) {
    return props.children;
  }
};

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Touchable';
}

module.exports = require('../lib/createComponent')(spec);
