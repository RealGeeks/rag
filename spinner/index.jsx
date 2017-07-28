'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var prefixProp = require('../lib/prefix').prop;
var styles = require('./styles')();
var raf = requestAnimationFrame;

// var
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rotation: 0};
    this.ts = 0;
    this.compute = this.computeFrame.bind(this);

    this.defaultProps = {
      speed: 1.2,
      size: 'large'
    };
  }

  // Speed is measured in revolutions per second.
  componentDidMount() {
    this.frame = raf(window, this.compute);
  }

  componentWillUnmount() { cancelAnimationFrame(this.frame); }

  render() {
    var props = defaults({}, this.props, this.defaultProps);
    var transform = {};

    transform[prefixProp('transform')] = 'rotate(' + this.state.rotation + 'deg)';

    return <span style={styles[props.size]}>
      <span style={styles.track} />
      <span style={defaults(transform, styles.element)} />
    </span>;
  }

  computeFrame(timestamp) {
    this.setState({
      rotation: this.state.rotation +
        360 * this.props.speed * (timestamp - this.ts) / 1000
    });

    this.ts = timestamp;
    this.frame = raf(window, this.compute);
  }
}

if (process.env.NODE_ENV != 'production') {
  Spinner.displayName = 'Spinner';
}

module.exports = Spinner;
