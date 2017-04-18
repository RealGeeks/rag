'use strict';

// module.exports = require('../lib/createGlyph')({
//   width: 12,
//   path: 'm2 8h8'
// });
var defaults = require('lodash/object/defaults');
var React = require('react');
var Glyph = require('../lib/createGlyph');

class Minus extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      width: 12,
      path: 'm2 8h8'
    }
  }

  render() {
    var props = defaults({}, this.props, this.defaultProps);
    return <Glyph {...props} />;
  }
}

module.exports = Minus;