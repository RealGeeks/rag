'use strict';

var react = require('react/dist/react-with-addons');
var dom = require('react-dom-factories');

var facebookLoginButtonSpec = {
  mixins: [react.addons.PureRenderMixin],

  render: function () {
    var props = this.props;

    return dom.iframe(
      {
        src: props.iframeSource,
        // Default size is for a medium button
        width: props.iframeWidth || 242,
        height: props.iframeHeight || 35,
        frameBorder: 0,
        scrolling: 'no',
        style: {
          overflow: 'hidden'
        }
      },
      dom.p(
        undefined,
        'Your browser does not support iframes'
      )
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  facebookLoginButtonSpec.displayName = 'Facebook Login Button';
}

module.exports = react.createClass(facebookLoginButtonSpec);
