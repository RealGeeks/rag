'use strict';

var constant = require('lodash').constant;
var react = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var createFactory = react.createFactory;
var surface = createFactory(require('../surface'));
var scroller = createFactory(require('../scroll-view'));
var button = createFactory(require('../button'));

var namespace = 'rag-modal';

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  getDefaultProps: constant({
    backdrop: true,
    locked: false
  }),

  getInitialState: function () {
    return {
      open: this.props.open
    };
  },

  render: function () {
    var component = this;
    var props = component.props;
    var canClose = !props.locked;

    if (!component.state.open) {
      return null;
    }

    return surface(
      {
        className: joinClasses(
          namespace,
          props.backdrop && namespace + '-backdrop'
        ),
        onTap: canClose && component.onTap
      },
      scroller(
        {className: joinClasses(namespace + '-window', props.className)},
        canClose && button({
          className: namespace + '-close',
          type: ['hitarea'],
          icon: 'x',
          onTap: component.close
        }),
        props.children
      )
    );
  },

  onTap: function (event) {
    if (event.target == this.getDOMNode()) {
      this.close();
    }
  },

  isOpen: function () {
    return this.state.open;
  },

  open: function () {
    this.setState({open: true}, this.props.didOpen);
  },

  close: function () {
    this.setState({open: false}, this.props.didClose);
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Modal';
}

module.exports = react.createClass(componentSpec);
