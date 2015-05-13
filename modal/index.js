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

  component.handleBackdropClick = function (event) {
    if (event.target == react.findDOMNode(component)) {
      component.props.onBackdropClick();
    }
  };
};

var prototype = assign(
  Modal.prototype,
  react.addons.PureRenderMixin
);

Modal.defaultProps = {
  backdrop: true,
  closeButton: true
};

prototype.render = function () {
  var component = this;
  var props = component.props;

  return hitarea(
    {
      tag: 'div',
      style: styles[props.backdrop ? 'backdrop' : 'container'],
      action: props.onBackdropClick && component.handleBackdropClick
    },
    scroller(
      {style: styles.window},
      props.closeButton && hitarea(
        {
          style: styles.close,
          action: props.onCloseButtonClick
        },
        closeIcon({style: styles.icon})
      ),
      props.children
    )
  );
};

if (process.env.NODE_ENV != 'production') {
  Modal.displayName = 'Modal';
  Modal.propTypes = {
    onBackdropClick: react.PropTypes.func,
    onCloseButtonClick: react.PropTypes.func
  };
}

module.exports = Modal;
