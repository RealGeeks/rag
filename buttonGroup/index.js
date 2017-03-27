'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react/addons');
var button = react.createFactory(require('../button'));
var style = require('./style')();
var span = react.DOM.span;

var ButtonGroup = function (props, context) {
  this.props = props;
  this.context = context;
};

var prototype = defaults(ButtonGroup.prototype, react.addons.PureRenderMixin);

prototype.render = function () {
  var props = this.props;

  return span(
    {style: style[props.flex ? 'flex' : 'basic']},
    props.buttons.map(function (buttonProps, index, propsList) {
      var position = 'center';
      var kind = buttonProps.kind;

      if (Array.isArray(kind)) {
        // Clone array
        kind = kind.slice();
      } else {
        kind = kind && [kind] || [];
      }

      buttonProps = defaults({
        key: index,
        kind: kind
      }, buttonProps);

      if (!index) {
        position = 'left';
      } else if (index == propsList.length - 1) {
        position = 'right';
      }

      kind.push(position);

      if (props.flex) {
        kind.push('flex');
      }

      return button(buttonProps);
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  ButtonGroup.displayName = 'Button Group';
  ButtonGroup.propTypes = {
    buttons: react.PropTypes.arrayOf(
      react.PropTypes.object.isRequired
    ).isRequired
  };
}

module.exports = ButtonGroup;
