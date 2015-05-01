'use strict';

var styles = require('./styles')();
var defaults = require('lodash/object/defaults');
var react = require('react');
var findDomNode = react.findDOMNode;
var div = react.DOM.div;
var bubble = react.createFactory(require('./bubble.js'));

var initialState = {
  visibility: 'hidden',
  placement: 'top',
  top: 0,
  left: 0,
  arrowOffset: 0
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
  var padding = props.padding;

  var node = findDomNode(popover);
  var nodeWidth = node.offsetWidth;
  var nodeHeight = node.offsetHeight;

  var parentBounds = getNodeBounds(node.offsetParent);
  var viewportBounds = props.viewport ?
    getNodeBounds(props.viewport) : parentBounds;

  var placement = 'top';
  var top = anchorTop - nodeHeight - styles.arrowSize;
  var left = anchorLeft - nodeWidth / 2;
  var arrowOffset = nodeWidth / 2;

  var leftDelta;
  var rightDelta;

  if (parentBounds.top + top < viewportBounds.top + padding) {
    placement = 'bottom';
    top = anchorTop;
  }

  // overflow left
  if (
    (
      leftDelta =
        viewportBounds.left - parentBounds.left - left + padding
    ) > 0
  ) {
    left += leftDelta;
    arrowOffset -= leftDelta;
  // overflow right
  } else if (
    (
      rightDelta =
        parentBounds.left + left + nodeWidth - viewportBounds.right + padding
    ) > 0
  ) {
    left -= rightDelta;
    arrowOffset += rightDelta;
  }

  popover.setState({
    visibility: props.visible ? 'visible' : 'hidden',
    top: top,
    left: left,
    width: nodeWidth,
    height: nodeHeight,
    placement: placement,
    arrowOffset: arrowOffset
  });
};

Popover.defaultProps = {
  visible: false,
  top: 0,
  left: 0,
  padding: 0
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
    bubble(state),
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
  Popover.propTypes = {
    padding: react.PropTypes.number
  };
}

module.exports = Popover;
