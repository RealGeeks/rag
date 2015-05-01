'use strict';

var styles = require('./styles')();
var arrowSize = styles.arrowSize;
var borderRadius = styles.borderRadius;
var clamp = require('clamp');
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
  var placement = props.placement;

  var node = findDomNode(popover);
  var nodeWidth = node.offsetWidth;
  var nodeHeight = node.offsetHeight;

  var parentBounds = getNodeBounds(node.offsetParent);
  var viewportBounds = props.viewport ?
    getNodeBounds(props.viewport) : parentBounds;

  var minTop = viewportBounds.top + padding - parentBounds.top;
  var maxTop = viewportBounds.bottom - padding - parentBounds.top;
  var minLeft = viewportBounds.left + padding - parentBounds.left;
  var maxLeft = viewportBounds.right - padding - parentBounds.left;

  var top;
  var left;
  var arrowOffset;

  if (placement == 'auto') {
    var unusableSpace = borderRadius + arrowSize;

    placement = nodeWidth <= maxLeft - minLeft &&
      anchorLeft >= minLeft + unusableSpace &&
      anchorLeft <= maxLeft - unusableSpace ?
        anchorTop - nodeHeight - arrowSize >= minTop && 'top' ||
        anchorTop + nodeHeight + arrowSize <= maxTop && 'bottom'
        : (
          nodeHeight <= maxTop - minTop &&
          anchorTop >= minTop + unusableSpace &&
          anchorTop <= maxTop - unusableSpace ?
            anchorLeft + nodeWidth + arrowSize <= maxLeft && 'right' ||
            anchorLeft - nodeWidth - arrowSize >= minLeft && 'left'
            : 'bottom'
        );
  }

  if (placement == 'top' || placement == 'bottom') {
    top = placement == 'top' ?
      anchorTop - nodeHeight - arrowSize : anchorTop;
    left = clamp(anchorLeft - nodeWidth / 2, 0, maxLeft - nodeWidth);
    arrowOffset = anchorLeft - left;
  } else {
    top = clamp(anchorTop - nodeHeight / 2, 0, maxTop - nodeHeight);
    left = placement == 'left' ?
      anchorLeft - nodeWidth - arrowSize : anchorLeft;
    arrowOffset = anchorTop - top;
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
  placement: 'auto',
  top: 0,
  left: 0,
  padding: 0
};

prototype.render = function () {
  var popover = this;
  var props = popover.props;
  var state = popover.state;
  var placement = state.placement;
  var visibility = state.visibility;

  return div(
    {
      style: defaults({
        top: state.top,
        left: state.left
      }, styles[placement][visibility])
    },
    visibility == 'visible' && bubble(state),
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
    placement: react.PropTypes.oneOf(
      ['auto', 'top', 'right', 'bottom', 'left']
    ),
    padding: react.PropTypes.number
  };
}

module.exports = Popover;
