'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react');
var prefixProp = require('../lib/prefix').prop;
var styles = require('./styles')();
var span = react.DOM.span;
var raf = requestAnimationFrame;

var computeFrame = function (timestamp) {
  var component = this;

  component.setState({
    rotation: component.state.rotation +
      360 * component.props.speed * (timestamp - component.ts) / 1000
  });

  component.ts = timestamp;
  component.frame = raf(component.compute);
};

var Spinner = function (props, context) {
  var component = this;

  component.props = props;
  component.context = context;
  component.state = {rotation: 0};
  component.ts = 0;
  component.compute = computeFrame.bind(component);
};

var prototype = Spinner.prototype;

// Speed is measured in revolutions per second.
Spinner.defaultProps = {speed: 1.2};

prototype.render = function () {
  var transform = {};

  transform[prefixProp('transform')] = 'rotate(' + this.state.rotation + 'deg)';

  return span(
    {style: styles.spinner},
    span({style: styles.track}),
    span({style: defaults(transform, styles.element)})
  );
};

prototype.componentDidMount = function () {
  this.frame = raf(this.compute);
};

prototype.componentWillUnmount = function () {
  cancelAnimationFrame(this.frame);
};

defaults(prototype, require('react/lib/ReactComponent').prototype);

if (process.env.NODE_ENV != 'production') {
  Spinner.displayName = 'Spinner';
}

module.exports = Spinner;
