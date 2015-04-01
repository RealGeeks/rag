'use strict';

var assign = require('lodash/object/assign');
var react = require('react/addons');
var styles = require('./styles')();
var createFactory = react.createFactory;
var hitarea = createFactory(require('../hitarea'));
var scroller = createFactory(require('../scroll-view'));
var closeIcon = createFactory(require('./close'));

var Modal = function (props, context) {
  var component = this;

  component.props = props;
  component.context = context;
  component.state = {open: props.open};

  component.onTap = function (event) {
    if (event.target == react.findDOMNode(component)) {
      component.close();
    }
  };

  component.open = function () {
    component.setState({open: true}, component.props.didOpen);
  };

  component.close = function () {
    component.setState({open: false}, component.props.didClose);
  };
};

var prototype = assign(
  Modal.prototype,
  react.Component.prototype,
  react.addons.PureRenderMixin
);

Modal.defaultProps = {
  backdrop: true,
  closeOnBackdropClick: true,
  closeButton: true
};

prototype.render = function () {
  var component = this;
  var props = component.props;

  if (!component.state.open) {
    return null;
  }

  return hitarea(
    {
      tag: 'div',
      style: styles[props.backdrop ? 'backdrop' : 'container'],
      action: props.closeOnBackdropClick && component.onTap
    },
    scroller(
      {style: styles.window},
      props.closeButton && hitarea(
        {
          style: styles.close,
          action: component.close
        },
        closeIcon({style: styles.icon})
      ),
      props.children
    )
  );
};

prototype.isOpen = function () {
  return this.state.open;
};

if (process.env.NODE_ENV != 'production') {
  Modal.displayName = 'Modal';
}

module.exports = Modal;
