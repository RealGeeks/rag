'use strict';

var styles = require('./styles')();
var arrowSize = styles.arrowSize;
var borderRadius = styles.borderRadius;
var clamp = require('clamp');
var defaults = require('lodash/object/defaults');
var React = require('react');
var ReactDom = require('react-dom');
var createFactory = React.createFactory;
var Bubble = require('./bubble');
var OutsideClickable = require('../outsideClickable');

var computePosition = function(props, pop) {
  var anchorTop  = props.top;
  var anchorLeft = props.left;
  var padding    = props.padding;
  var placement  = props.placement;

  var node       = ReactDom.findDOMNode(pop);
  var nodeWidth  = node.offsetWidth;
  var nodeHeight = node.offsetHeight;

  var parentBounds   = pop.getNodeBounds(node.offsetParent);
  var viewportBounds = props.viewport ? pop.getNodeBounds(props.viewport) : parentBounds;

  var minTop  = viewportBounds.top + padding - parentBounds.top;
  var maxTop  = viewportBounds.bottom - padding - parentBounds.top;
  var minLeft = viewportBounds.left + padding - parentBounds.left;
  var maxLeft = viewportBounds.right - padding - parentBounds.left;

  var top;
  var left;
  var arrowOffset;

  if (placement == 'auto') {
    var unusableSpace = borderRadius + arrowSize;
    var topOrBottom =
      anchorTop - nodeHeight - arrowSize >= minTop && 'top' ||
      anchorTop + nodeHeight + arrowSize <= maxTop && 'bottom';
    var rightOrLeft =
      anchorLeft + nodeWidth + arrowSize <= maxLeft && 'right' ||
      anchorLeft - nodeWidth - arrowSize >= minLeft && 'left';

    placement = nodeWidth <= maxLeft - minLeft &&
      anchorLeft >= minLeft + unusableSpace &&
      anchorLeft <= maxLeft - unusableSpace &&
        topOrBottom ||
          nodeHeight <= maxTop - minTop &&
          anchorTop >= minTop + unusableSpace &&
          anchorTop <= maxTop - unusableSpace &&
            rightOrLeft || topOrBottom || rightOrLeft;
  }

  if (placement == 'top' || placement == 'bottom') {
    top = placement == 'top' ?
      anchorTop - nodeHeight - arrowSize : anchorTop;
    left = clamp(anchorLeft - nodeWidth / 2, minLeft, maxLeft - nodeWidth);
    arrowOffset = anchorLeft - left;
  } else {
    top = clamp(anchorTop - nodeHeight / 2, minTop, maxTop - nodeHeight);
    left = placement == 'left' ?
      anchorLeft - nodeWidth - arrowSize : anchorLeft;
    arrowOffset = anchorTop - top;
  }

  return {
    top: top,
    left: left,
    width: nodeWidth,
    height: nodeHeight,
    placement: placement,
    arrowOffset: arrowOffset
  };
};

class Popover extends React.Component {
  constructor(props, context) {
    super(props);

    this.context = context;
    this.state = {
      visibility: 'hidden',
      placement: 'top',
      top: 0,
      left: 0,
      arrowOffset: 0
    };
  }

  componentDidMount() {
    var state = computePosition(this.props, this);
    state.visibility = this.props.visible ? 'visible' : 'hidden';
    this.setState(state);
  }

  componentWillReceiveProps(props) {
    var state = computePosition(props, this);
    state.visibility = props.visible ? 'visible' : 'hidden';
    this.setState(state);
  }

  render() {
    var props = this.props;
    var state = this.state;
    var placement = state.placement;
    var visibility = state.visibility;

    var outside_props = {
      onClickOutside: props.onClickOutside,
      style: defaults({
        top: state.top,
        left: state.left
      }, styles[placement][visibility])
    }

    return <OutsideClickable {...outside_props}>
      {this.render_bubble()}
      <div style={styles.content}>{props.children}</div>
    </OutsideClickable>
  }

  render_bubble() {
    if(this.state.visibility != 'visible') { return null; }
    return <Bubble {...this.state} />;
  }

  getNodeBounds(node) { return node.getBoundingClientRect(); };
};

if (process.env.NODE_ENV != 'production') {
  Popover.displayName = 'Popover';
  Popover.propTypes = {
    placement: React.PropTypes.oneOf(
      ['auto', 'top', 'right', 'bottom', 'left']
    ),
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    padding: React.PropTypes.number,
    onClickOutside: React.PropTypes.func
  };
}

module.exports = Popover;