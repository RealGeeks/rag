'use strict';

var unshift = Array.prototype.unshift;
var defaults = require('lodash/object/defaults');
var omit = require('lodash/object/omit');

var isValidElement = require('react/lib/ReactElement').isValidElement;
var createElement = require('react').createElement;

var keysToOmit = ['render', 'defaultProps'];

if (process.env.NODE_ENV != 'production') {
  keysToOmit.push('displayName', 'propTypes');
}

var baseMixin = defaults(
  {},
  require('react/lib/ReactComponent').prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

module.exports = function (spec) {
  if (typeof spec == 'function') {
    spec = {render: spec};
  }

  var type = function (props, context) {
    var component = defaults(omit(spec, keysToOmit), baseMixin);

    component.props = props;
    component.context = context;

    component.init && component.init(component);

    component.render = function () {
      return spec.render.call(component, component.props, component.state);
    };

    return component;
  };

  type.defaultProps = spec.defaultProps;

  if (process.env.NODE_ENV != 'production') {
    type.displayName = spec.displayName;
    type.propTypes = spec.propTypes;
  }

  return function (config) {
    if (
      config == null ||
      config.constructor != Object ||
      isValidElement(config)
    ) {
      unshift.call(arguments, null);
    }

    unshift.call(arguments, type);

    return createElement.apply(null, arguments);
  };
};
