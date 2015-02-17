'use strict';

var react = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var span = react.DOM.span;

var baseClass = 'rag-button-group';

var filter = function (value) {
  return value != null && typeof value != 'boolean';
};

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  render: function () {
    var component = this;
    var props = component.props;
    var children = props.children;
    var buttonCount = children.length && children.filter(filter).length || 0;

    return span(
      {
        className: joinClasses(
          baseClass,
          props.className,
          baseClass + '-' + buttonCount,
          props.flex && baseClass + '-flex'
        )
      },
      span(
        {className: baseClass + '-view'},
        children
      )
    );
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Button Group';
}

module.exports = react.createClass(componentSpec);
