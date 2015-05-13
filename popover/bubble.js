'use strict';

var fill = require('../lib/abstractions').fill;
var styles = require('./styles')();
var borderRadius = styles.borderRadius;
var arrowSize = styles.arrowSize;
var defaults = require('lodash/object/defaults');
var bubblePath = require('./bubblePath');
var svg = require('../lib/svg');

var wrapperStyle = defaults({overflow: 'visible'}, fill);

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
      {
        id: 's',
        x: '-100%',
        width: '300%',
        y: '-100%',
        height: '300%'
      },
      svg.feGaussianBlur({
        in: 'SourceAlpha',
        stdDeviation: 1
      }),
      svg.feComponentTransfer(
        {
          result: 's'
        },
        svg.feFuncA({
          type: 'table',
          tableValues: '0 0 .1 .3 .3 .3 .3 .3 .3'
        })
      ),
      svg.feGaussianBlur({
        in: 'SourceAlpha',
        stdDeviation: 5
      }),
      svg.feOffset({dy: 5}),
      svg.feComponentTransfer(
        undefined,
        svg.feFuncA({
          type: 'linear',
          slope: '.15'
        })
      ),
      svg.feMerge(
        undefined,
        svg.feMergeNode(),
        svg.feMergeNode({in: 's'}),
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
