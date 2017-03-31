'use strict';

var defaults = require('lodash/object/defaults');
var iconSize = require('../theme')().iconSize;
var React = require('react');
var dom = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');

class Cog extends React.Component {
  constructor(props, context) {
    super(props);
    this.defaultProps = {
      width: 14,
      height: iconSize
    }
    this.context = context;
  }

  render() {
    var props = defaults(this.defaultProps, this.props);
    var path = 'M11.95 3.05L9.83 5.173C10.567 5.908 10.985 6.96 11 8m3 0h-3c0 1.042-.444 2.084-1.17 2.83m2.12 2.123L9.83 10.83C9.094 11.57 8.04 11.986 7 12m0 3v-3c-1.042 0-2.083-.443-2.83-1.17m-2.12 2.123l2.12-2.122C3.434 10.096 3.015 9.043 3 8M0 8h3c0-1.04.444-2.08 1.17-2.828m-2.12-2.12l2.12 2.12C4.906 4.436 5.96 4.015 7 4m0-3v3c1.042 0 2.083.446 2.83 1.172'
    return <svg viewBox='0 0 10 16' width={props.width} height={props.height} style={props.style}>
      <path d={path} stroke='currentColor' strokeWidth={2} fill='none' />
    </svg>
  }
}

var prototype = defaults(Cog.prototype, PureRenderMixin);

if (process.env.NODE_ENV != 'production') {
  Cog.displayName = 'Cog';
}

module.exports = Cog;


// var Glyph = require('../lib/createGlyph')

// class Cog extends Glyph {
//   constructor(props) {
//     var new_props = _.extend(props, {
//       width: 14,
//       path: 'M11.95 3.05L9.83 5.173C10.567 5.908 10.985 6.96 11 8m3 0h-3c0 1.042-.444 2.084-1.17 2.83m2.12 2.123L9.83 10.83C9.094 11.57 8.04 11.986 7 12m0 3v-3c-1.042 0-2.083-.443-2.83-1.17m-2.12 2.123l2.12-2.122C3.434 10.096 3.015 9.043 3 8M0 8h3c0-1.04.444-2.08 1.17-2.828m-2.12-2.12l2.12 2.12C4.906 4.436 5.96 4.015 7 4m0-3v3c1.042 0 2.083.446 2.83 1.172'
//     })
//     super(new_props);
//   }
// }

// module.exports = Cog