'use strict';

var react = require('react');
var assign = require('react/lib/Object.assign');
var div = react.DOM.div;
var style = require('./style')();
var prototype;

function Container(props, context) {
  this.props = props;
  this.context = context;
}

prototype = assign(Container.prototype, react.Component.prototype);

prototype.render = function () {
  return div(
    {style: style},
    this.props.children
  );
};

if (process.env.NODE_ENV != 'production') {
  prototype.displayName = 'Container';
}

module.exports = Container;
