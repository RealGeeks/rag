'use strict';

var unshift = Array.prototype.unshift;
var defaults = require('lodash/object/defaults');
var omit = require('lodash/object/omit');
var without = require('lodash/array/without');
var emptyArray = require('empty/array');

var isValidElement = require('react/lib/ReactElement').isValidElement;
var createElement = require('react').createElement;

var combi = require('../lib/combi');
var theme = require('../theme');
var prefix = require('../lib/prefix').block;

var keysToOmit = ['render', 'defaultProps'];
var prefixerKey = 'rag-prefixer';
var styleable = [];

if (process.env.NODE_ENV != 'production') {
  keysToOmit.push('displayName', 'propTypes');
}

var baseMixin = defaults(
  {},
  require('react/lib/ReactComponent').prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

var forceUpdate = function (component) {
  var constructor = component.constructor;

  if (constructor.theme != this) {
    constructor.initCombinator(this);
  }

  component.forceUpdate();
};

theme.on('change', function (value) {
  styleable.forEach(forceUpdate, value);
});

module.exports = function (spec) {
  if (typeof spec == 'function') {
    spec = {render: spec};
  }

  var styles = spec.styles;

  var type = function (props, context) {
    var component = this;

    component.props = props;
    component.context = context;

    component.init && component.init(component);

    styles && styleable.push(component);

    return component;
  };

  var prototype = defaults(
    type.prototype,
    omit(spec, keysToOmit),
    baseMixin
  );

  if (styles) {
    var initCombinator = type.initCombinator = function (config) {
      var combinator = type.combinator = combi(config, styles);
      combinator.add(prefixerKey, prefix);
      type.theme = config;
    };
    var oldUnmountHandler = spec.componentWillUnmount;

    prototype.getStyle = function (list) {
      return type.combinator.get(emptyArray.concat(list, prefixerKey));
    };

    prototype.componentWillUnmount = function () {
      styleable = without(styleable, this);
      oldUnmountHandler && oldUnmountHandler.call(this);
    };

    initCombinator(theme());
  }

  prototype.render = function () {
    return spec.render.call(this, this.props, this.state);
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
