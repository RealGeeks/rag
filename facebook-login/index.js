'use strict';

var react = require('react/addons');
var dom = react.DOM;

var facebookLoginButtonSpec = {
  mixins: [react.addons.PureRenderMixin],

  render: function () {
    var props = this.props;
    var iframeSource = props.iframeSource;
    var width = props.width || 215;
    var height = props.height || 43;

    return dom.iframe(
      {
        src: iframeSource,
        width: width,
        height: height,
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
