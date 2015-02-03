'use strict';

var join = Array.prototype.join;
var suffixes = ['accent', 'active', 'disabled'];

function className() {
  return '.' + join.call(arguments, '-');
}

function split(name) {
  var result = {
    base: name,
    suffix: ''
  };
  var suffixIndex = name.lastIndexOf('-');
  var suffix = name.slice(suffixIndex + 1);

  if (~suffixes.indexOf(suffix)) {
    result.base = name.slice(0, suffixIndex);
    result.suffix = suffix;
  }

  return result;
}

module.exports = function (vars, image) {
  var namespace = image.namespace;
  var parts = split(image.name);
  var name = className(namespace, image.name);
  var base = className(namespace, parts.base);
  var suffix = parts.suffix;
  var selectors = [name];

  if (suffix) {
    selectors.push(
      base + '.' + suffix,
      '.rag-button.' + suffix + ' ' + base
    );
  }

  if (suffix == 'disabled') {
    selectors.push(
      base + '[disabled]',
      '.rag-button[disabled] ' + base
    );
  } else if (suffix == 'active' || suffix == 'hover') {
    selectors.push(
      base + ':' + suffix,
      '.rag-button:' + suffix + ' ' + base
    );
  }

  return selectors.join(',') + '{' +
      'background-image:url("' + image.uri + '")' +
    '}\n' +

    className(namespace, 'inline') + name + '{' +
      'width:' + image.width + 'px' +
    '}' +

    className(namespace, 'right') + name + '{' +
      'padding-right:' + (1.5 * vars.padding + image.width) + 'px' +
    '}' +

    className(namespace, 'left') + name + '{' +
      'padding-left:' + (1.5 * vars.padding + image.width) + 'px' +
    '}';
};
