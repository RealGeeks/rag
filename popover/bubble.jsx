'use strict';

var React = require('react');
var fill = require('../lib/abstractions').fill;
var styles = require('./styles')();
var borderRadius = styles.borderRadius;
var arrowSize = styles.arrowSize;
var defaults = require('lodash/object/defaults');
var extend = require('lodash/object/extend');
var uniqueId = require('lodash/utility/uniqueId');
var bubblePath = require('./bubblePath');
var svg = require('../lib/svg');

var wrapperStyle = defaults({overflow: 'visible'}, fill);

var inSourceGraphic = {in: 'SourceGraphic'};

class Bubble extends React.Component {
  constructor(props, context) {
    super(props);

    this.context = context;
    this.id = 'rag-' + uniqueId();
    this.defaultProps = {
      placement: 'top',
      width: 300,
      height: 200,
      borderRadius: borderRadius,
      arrowSize: arrowSize,
      arrowOffset: 150,
      backgroundColor: '#fff',
      dropShadow: true
    };
  }

  render() {
    var id = this.id;
    var props = extend(this.defaultProps, this.props);
    var dropShadow = props.dropShadow;

    return <svg style={wrapperStyle} width={props.width} height={props.height}>
      {this.render_svg_filter(dropShadow)}
      <path d={bubblePath(props)} fill={props.backgroundColor} filter={dropShadow && 'url(#' + id + ')'} />
    </svg>;
  }

  render_svg_filter(ds) {
    if(!ds) { return null; }
    return <filter
      id={this.id}
      x='-100%'
      width='300%'
      y='-100%'
      height='300%'
    >
      <feConvolveMatrix
        in='SourceAlpha'
        result='s'
        order='3 3'
        kernelMatrix='1 2 1 2 4 2 1 2 1'
      />
      <feGaussianBlur in='SourceAlpha' stdDeviation={5} />
      <feOffset dy={5} />
      <feComponentTransfer>
        <feFuncA type='linear' slope='0.15' />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in='s' />
        <feMergeNode {...inSourceGraphic} />
      </feMerge>
    </filter>;
  }
}

// var prototype = defaults(
//   Bubble.prototype,
//   require('react/lib/ReactComponentWithPureRenderMixin')
// );

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
