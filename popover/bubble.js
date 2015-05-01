'use strict';

var fill = require('../lib/abstractions').fill;
var styles = require('./styles')();
var borderRadius = styles.borderRadius;
var arrowSize = styles.arrowSize;
var defaults = require('lodash/object/defaults');
var bubblePath = require('./bubblePath');
var svg = require('../lib/svg');

var wrapperStyle = defaults({overflow: 'visible'}, fill);

var filterProps = {id: 's'};

var blurProps = {
  in: 'SourceAlpha',
  stdDeviation: 0.5
};

var inSourceGraphic = {in: 'SourceGraphic'};

var Bubble = function (props, context) {
  this.props = props;
  this.context = context;
};

var prototype = defaults(
  Bubble.prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

Bubble.defaultProps = {
  placement: 'top',
  width: 300,
  height: 200,
  borderRadius: borderRadius,
  arrowSize: arrowSize,
  arrowOffset: 150,
  backgroundColor: '#fff',
  dropShadow: true
};

prototype.render = function () {
  var props = this.props;
  var dropShadow = props.dropShadow;

  return svg.svg(
    {
      style: wrapperStyle,
      width: props.width,
      height: props.height
    },
    dropShadow && svg.filter(
      filterProps,
      svg.feGaussianBlur(blurProps),
      svg.feMerge(
        undefined,
        svg.feMergeNode(),
        svg.feMergeNode(inSourceGraphic)
      )
    ),
    svg.path({
      d: bubblePath(props),
      fill: props.backgroundColor,
      filter: dropShadow && 'url(#s)'
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  var propTypes = require('react').PropTypes;
  Bubble.displayName = 'Bubble';
  Bubble.propTypes = {
    placement: propTypes.oneOf(['top', 'bottom', 'left', 'right']),
    width: propTypes.number,
    height: propTypes.number,
    borderRadius: propTypes.number,
    arrowSize: propTypes.number,
    arrowOffset: propTypes.number,
    backgroundColor: propTypes.string,
    dropShadow: propTypes.bool
  };
}

module.exports = Bubble;
