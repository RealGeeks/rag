'use strict';

var defaults = require('lodash/object/defaults');
var capitalize = require('lodash/string/capitalize');
var react = require('react');
var findDOMNode = react.findDOMNode;
var transitionEvents = require('react/lib/ReactTransitionEvents');

var spec = {
  defaultProps: {
    component: 'div'
  },

  transition: function (state, done) {
    var component = this;
    var node = findDOMNode(component);

    var endListener = function (event) {
      if (event && event.target !== node) {
        return;
      }

      transitionEvents.removeEndEventListener(node, endListener);

      done();
    };

    transitionEvents.addEndEventListener(node, endListener);

    setTimeout(function () {
      component.setState(state);
    }, 17);
  },

  render: function (props, state) {
    var style = props.style ?
      defaults({}, state && state.style, props.style) : state.style;

    return react.createElement(
      props.component,
      defaults({style: style}, props)
    );
  }
};

['appear', 'enter', 'leave']
  .forEach(function (name) {
    spec['componentWill' + capitalize(name)] = function (done) {
      var style = this.props[name];

      if (style) {
        this.transition({style: style}, done);
      } else {
        done();
      }
    };
  });

if (process.env.NODE_ENV != 'production') {
  spec.displayName = 'Transition Child';
  spec.propTypes = {
    style: react.PropTypes.object,
    appear: react.PropTypes.object,
    enter: react.PropTypes.object,
    leave: react.PropTypes.object
  };
}

module.exports = require('../lib/createComponent')(spec);
