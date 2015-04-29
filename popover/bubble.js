'use strict';

var fill = require('../lib/abstractions').fill;
var styles = require('./styles')();
var borderRadius = styles.borderRadius;
var arrowSize = styles.arrowSize;
var defaults = require('lodash/object/defaults');
var svg = require('../lib/svg');

var arrowTopPathDescription = [
  'm0',
  0,
  arrowSize,
  -arrowSize,
  arrowSize,
  arrowSize
].join();

var arrowBottomPathDescription = [
  'm0',
  0,
  arrowSize,
  arrowSize,
  arrowSize,
  -arrowSize
].join();

var wrapperProps = {
  style: defaults({overflow: 'visible'}, fill),
  width: '100%',
  height: '100%'
};

var filterProps = {id: 's'};

var blurProps = {
  in: 'SourceAlpha',
  stdDeviation: 0.5
};

var groupProps = {filter: 'url(#s)'};

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
  left: 0
};

prototype.render = function () {
  var bubble = this;
  var props = bubble.props;
  var isTop = props.placement == 'top';

  return svg.svg(
    wrapperProps,
    svg.filter(
      filterProps,
      svg.feGaussianBlur(blurProps),
      svg.feMerge(
        undefined,
        svg.feMergeNode(),
        svg.feMergeNode(inSourceGraphic)
      )
    ),
    svg.g(
      groupProps,
      svg.rect({
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
        rx: borderRadius,
        ry: borderRadius,
        fill: '#fff'
      }),
      svg.svg(
        {
          style: {overflow: 'visible'},
          viewBox: '0 0 ' + (arrowSize * 2) + ' ' + arrowSize,
          width: arrowSize * 2,
          height: '100%',
          preserveAspectRatio: isTop ? 'xMinYMax' : 'xMinYMin'
        },
        svg.path({
          transform: 'translate(' +
            (props.left - arrowSize) + ',' +
            (isTop ? arrowSize : 0) +
          ')',
          d: isTop ? arrowBottomPathDescription : arrowTopPathDescription,
          fill: '#fff'
        })
      )
    )
  );
};

if (process.env.NODE_ENV != 'production') {
  Bubble.displayName = 'Bubble';
}

module.exports = Bubble;
