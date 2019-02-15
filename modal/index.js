'use strict';

var constant = require('lodash').constant;
var ReactDOM = require('react-dom');
var classnames = require('classnames');
var createReactClass = require('create-react-class');
var createFactory = require('react').createFactory;
var scroller = createFactory(require('../scroll-view'));
var button = createFactory(require('../button'));
var div = require('react-dom-factories').div;

var namespace = 'rag-modal';

var componentSpec = {
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
        className: classnames(
          namespace,
          props.backdrop && namespace + '-backdrop'
        ),
        onClick: props.closeOnBackdropClick && component.onClick
      },
      scroller(
        {className: classnames(namespace + '-window', props.className)},
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

  onClick: function (event) {
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

module.exports = createReactClass(componentSpec);
