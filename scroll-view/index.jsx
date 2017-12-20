'use strict';

var React = require('react');
var defaults = require('lodash/object/defaults');
var PreventOverscroll = require('prevent-overscroll');

class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      style: { overflow: 'auto', WebkitOverflowScrolling: 'touch'}
    };
  }

  componentDidMount() {
    if(!require('supports/touch')) { return }
    this.detachListeners = PreventOverscroll(this.getDOMNode());
  }

  componentWillUnmount() {
    if(!require('supports/touch')) { return }
    if (this.detachListeners) {
      this.detachListeners();
    }
  }

  render() {
    var props = defaults(this.props, this.defaultProps);
    return <div {...props}>
      {this.props.children}
    </div>;
  }
}

if (process.env.NODE_ENV != 'production') {
  ScrollView.displayName = 'Scroll View';
}

module.exports = ScrollView;
