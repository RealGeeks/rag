'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react');
var reactTransitionGroup =
  react.createFactory(require('react/lib/ReactTransitionGroup'));
var transitionChild = require('../transitionChild');

var spec = {
  render: function (props) {
    return reactTransitionGroup(defaults({
      component: 'div',
      childFactory: transitionChild.bind(null, {
        style: props.childStyle,
        appear: props.childAppear,
        enter: props.childEnter,
        leave: props.childLeave
      })
    }, props));
  }
};

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Transiton Group';
  spec.propTypes = {
    childStyle: react.PropTypes.object,
    childAppear: react.PropTypes.object,
    childEnter: react.PropTypes.object,
    childLeave: react.PropTypes.object
  };
}

module.exports = require('../lib/createComponent')(spec);
