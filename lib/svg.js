'use strict';

/**
 * Add support for SVG elements and attributes that React does not provide.
 */

var domPropertyInjection = require('react/lib/DOMProperty').injection;
var mustUseAttribute = domPropertyInjection.MUST_USE_ATTRIBUTE;
var react = require('react');
var createFactory = react.createFactory;
var svgProperties = {};

[
  'filter',
  'in',
  'result',
  'slope',
  'tableValues',
  'operator',
  'radius',
  'order',
  'kernelMatrix',
  'stdDeviation'
].forEach(function (attribute) {
  svgProperties[attribute] = mustUseAttribute;
});

domPropertyInjection.injectDOMPropertyConfig({
  Properties: svgProperties
});

[
  'filter',
  'feGaussianBlur',
  'feOffset',
  'feComponentTransfer',
  'feConvolveMatrix',
  'feFuncA',
  'feMorphology',
  'feMergeNode',
  'feMerge'
].forEach(function (type) {
  exports[type] = createFactory(type);
});

require('lodash/object/defaults')(exports, react.DOM);
