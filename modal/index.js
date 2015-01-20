'use strict';

var react = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var createFactory = react.createFactory;
var scroller = createFactory(require('../scroll-view'));
var button = createFactory(require('../button'));
var div = react.DOM.div;

var namespace = 'rag-modal';

var componentSpec = {
  mixins: [require('react-touch-mixin'), react.addons.PureRenderMixin],

  render: function () {
    var props = this.props;

    return div(
      {
        className: joinClasses(
          namespace,
          props.noninteractive && namespace + '-noninteractive',
          props.backdrop && namespace + '-backdrop'
        )
      },
      div(
        {className: joinClasses(namespace + '-window', props.className)},
        props.close && button({
          className: namespace + '-close',
          type: ['hitarea'],
          icon: 'x',
          onTap: props.close
        }),
        scroller({className: namespace + '-scroller'}, props.children)
      )
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Modal';
}

module.exports = react.createClass(componentSpec);
