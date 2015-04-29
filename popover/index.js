'use strict';

var styles = require('./styles')();
var defaults = require('lodash/object/defaults');
var clamp = require('clamp');
var react = require('react');
var findDomNode = react.findDOMNode;
var div = react.DOM.div;
var bubble = react.createFactory(require('./bubble.js'));
var minArrowLeft = styles.borderRadius + styles.arrowSize;

var initialState = {
  visibility: 'hidden',
  placement: 'top',
  top: 0,
  left: 0,
  arrowLeft: 0
};

var Popover = function (props, context) {
  var popover = this;

  popover.props = props;
  popover.context = context;
  popover.state = initialState;
};

var prototype = defaults(
  Popover.prototype,
  require('react/lib/ReactComponent').prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

var getNodeBounds = function (node) {
  return node.getBoundingClientRect();
};

var computePosition = function (props) {
  var popover = this;

  props = props || popover.props;

  var anchorTop = props.top;
  var anchorLeft = props.left;

  var node = findDomNode(popover);
  var nodeWidth = node.offsetWidth;
  var nodeHeight = node.offsetHeight + styles.arrowSize;

  var parentBounds = getNodeBounds(node.offsetParent);
  var viewportBounds = props.viewport ?
    getNodeBounds(props.viewport) : parentBounds;

  var placement = 'top';
  var top = anchorTop - nodeHeight;
  var left = anchorLeft - nodeWidth / 2;
  var arrowLeft = nodeWidth / 2;

  var leftDelta;
  var rightDelta;

  if (parentBounds.top + top < viewportBounds.top + props.offsetTop) {
    placement = 'bottom';
    top = anchorTop;
  }

  // overflow left
  if (
    (
      leftDelta =
        viewportBounds.left - parentBounds.left - left + props.offsetLeft
    ) > 0
  ) {
    left += leftDelta;
    arrowLeft -= leftDelta;
  // overflow right
  } else if (
    (
      rightDelta =
        parentBounds.left + left + nodeWidth - viewportBounds.right +
        props.offsetRight
    ) > 0
  ) {
    left -= rightDelta;
    arrowLeft += rightDelta;
  }

  popover.setState({
    visibility: props.visible ? 'visible' : 'hidden',
    top: top,
    left: left,
    placement: placement,

    // Make sure arrow doesn’t stick outside popover
    arrowLeft: clamp(arrowLeft, minArrowLeft, nodeWidth - minArrowLeft)
  });
};

Popover.defaultProps = {
  visible: false,
  top: 0,
  left: 0,
  offsetTop: 0,
  offsetRight: 0,
  offsetLeft: 0
};

prototype.render = function () {
  var popover = this;
  var props = popover.props;
  var state = popover.state;
  var placement = state.placement;

  return div(
    {
      style: defaults({
        top: state.top,
        left: state.left
      }, styles[placement][state.visibility])
    },
    bubble({
      placement: placement,
      left: state.arrowLeft
    }),
    div(
      {style: styles.content},
      props.children
    )
  );
};

prototype.componentDidMount = computePosition;
prototype.componentWillUpdate = computePosition;

if (process.env.NODE_ENV != 'production') {
  Popover.displayName = 'Popover';
}

module.exports = Popover;
