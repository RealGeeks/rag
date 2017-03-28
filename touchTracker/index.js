'use strict';

var clamp = require('clamp');
var touchable = require('../touchable');
var ReactDom = require('react-dom');

var spec = {
  init: function (component) {
    component.touchableProps = {
      onTouch: function (event) {
        // Prevent scroll, but don’t prevent focus.
        !event.isFirst && !event.isLast && event.preventDefault();

        var callback = component.props.onChange;
        var center = event.center;
        var bounds = component.node.getBoundingClientRect();

        callback && callback(
          clamp((center.x - bounds.left) / bounds.width, 0, 1) * 100,
          clamp((center.y - bounds.top) / bounds.height, 0, 1) * 100
        );
      }
    };
  },

  componentDidMount: function () {
    this.node = ReactDom.findDOMNode(this);
  },

  render: function (props) {
    var component = this;

    return touchable(
      component.touchableProps,
      props.children
    );
  }
};

module.exports = require('../lib/createComponent')(spec);
