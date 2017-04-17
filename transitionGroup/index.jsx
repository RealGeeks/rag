'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var ReactTransitionGroup = require('react-addons-css-transition-group');
var transitionChild = require('../transitionChild');

var spec = {
  render(props) {
    var transition_props = defaults({
      component: 'div',
      childFactory: transitionChild.bind(null, {
        style: props.childStyle,
        appear: props.childAppear,
        enter: props.childEnter,
        leave: props.childLeave
      })
    }, props);

    return <ReactTransitionGroup {...transition_props}>
      {this.props.children}
    </ReactTransitionGroup>;
  }
};

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Transiton Group';
  spec.propTypes = {
    childStyle: React.PropTypes.object,
    childAppear: React.PropTypes.object,
    childEnter: React.PropTypes.object,
    childLeave: React.PropTypes.object
  };
}

module.exports = require('../lib/createComponent')(spec);
