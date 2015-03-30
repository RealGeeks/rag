'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react');
var icon = react.createFactory(require('./icon'));
var Hitarea = require('../hitarea');
var styles = require('./styles')();
var dom = react.DOM;

var mapOption = function (option, index) {
  if (typeof option == 'object') {
    var value = option.value;
    var label = option.label || value;
    var disabled = option.disabled;

    if (option.options) {
      return dom.optgroup(
        {
          label: label,
          disabled: disabled,
          key: index
        },
        option.options.map(mapOption)
      );
    }
  } else {
    value = label = option;
  }

  return dom.option({
    value: value,
    disabled: disabled,
    key: index
  }, label);
};

var Select = function (props, context) {
  Hitarea.call(this, props, context);
};

var prototype = Select.prototype;

prototype.render = function () {
  var component = this;
  var props = defaults(component.getHandlers(), component.props);
  var options = props.options && props.options.map(mapOption);

  props.style = styles[
    props.disabled && 'disabled' ||
    component.state.focus && 'focus' ||
    'normal'
  ];

  return dom.div(
    {style: styles[props.block ? 'block' : 'wrapper']},
    dom.select(props, options),
    icon({
      color: props.style.color,
      style: styles.icon
    })
  );
};

if (process.env.NODE_ENV != 'production') {
  var types = react.PropTypes;

  Select.displayName = 'Select';

  Select.propTypes = {
    type: types.string,
    options: types.arrayOf(types.oneOfType([
      types.string,
      types.number,
      types.shape({
        value: types.oneOfType([types.string, types.number]).isRequired,
        label: types.oneOfType([types.string, types.number])
      }),
      types.shape({
        label: types.oneOfType([types.string, types.number]).isRequired,
        options: types.arrayOf(types.oneOfType([
          types.string,
          types.number,
          types.shape({
            value: types.oneOfType([types.string, types.number]).isRequired,
            label: types.oneOfType([types.string, types.number])
          })
        ]))
      })
    ]))
  };
}

defaults(prototype, Hitarea.prototype);

module.exports = Select;
