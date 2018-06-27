'use strict';

var constant = require('lodash').constant;
var joinClasses = require('react/lib/joinClasses');
var react = require('react/addons');
var ReactDOM = require('react-dom');

var createFactory = react.createFactory;
var scroller = createFactory(require('../scroll-view'));
var button = createFactory(require('../button'));
var div = react.DOM.div;

var namespace = 'rag-modal';

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  getDefaultProps: constant({
    backdrop: true,
    closeOnBackdropClick: true,
    closeButton: true
  }),

  getInitialState: function () {
    return {
      open: this.props.open
    };
  },

  render: function () {
    var component = this;
    var props = component.props;

    if (!component.state.open) {
      return null;
    }

    return div(
      {
        className: joinClasses(
          namespace,
          props.backdrop && namespace + '-backdrop'
        ),
        onClick: props.closeOnBackdropClick &&
          (component.onClick || component.onTap)
      },
      scroller(
        {className: joinClasses(namespace + '-window', props.className)},
        props.closeButton && button({
          className: namespace + '-close',
          type: ['hitarea'],
          icon: 'x',
          onClick: component.close
        }),
        props.children
      )
    );
  },

  onTap: function (event) {
    if (event.target == ReactDOM.findDOMNode(this)) {
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
