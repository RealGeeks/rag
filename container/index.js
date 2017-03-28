'use strict';

var react = require('react');
var style = require('./style')();
var div = require('react-dom').div;
var containerStyle = require('./style')();
var prototype;

function Container(props, context) {
  this.props = props;
  this.context = context;
}

prototype = Object.assign(Container.prototype, react.Component.prototype);

prototype.render = function () {
  var component = this;
  var styleProp = component.props.style;
  var style = containerStyle;

  if (styleProp) {
    style = Object.assign({}, style, styleProp);
  }

  return div(
    {style: style},
    this.props.children
  );
};

if (process.env.NODE_ENV != 'production') {
  prototype.displayName = 'Container';
}

module.exports = Container;
