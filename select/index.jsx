'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var ReactDom = require('react-dom');
var Icon = require('../icons/chevron-up-down');
var Hitarea = require('../hitarea');
var styles = require('./styles')();

class Select extends Hitarea {
  constructor(props) {
    super(props);
  }
  // Hitarea.call(this, props, context);

  render() {
    var props = defaults(this.getHandlers(), this.props);
    var options = props.options && props.options.map(this.mapOption.bind(this));
    var block = props.block;
    delete props.block;
    delete props.options;

    props.style = styles[
      props.disabled && 'disabled' ||
      this.state.focus && 'focus' ||
      'normal'
    ];

    return <span style={styles[props.block ? 'block' : 'wrapper']}>
      <select {...props}>{options}</select>
      <Icon style={defaults({color: props.style.color}, styles.icon)} />
    </span>
  }

  mapOption(option, index) {
    var value;
    var label;
    var disabled;

    if (typeof option == 'object') {
      value = option.value;
      label = option.label || value;
      disabled = option.disabled;

      // if option _has_ options then it's an optiongroup
      // and we need to map through each of the optiongroup's options
      if (option.options) {
        return <optgroup
          label={label}
          disabled={disabled}
          key={index}
        >
          {option.options.map(this.mapOption.bind(this))}
        </optgroup>
      }
    } else {
      value = label = option;
    }

    return <option
      value={value}
      disabled={disabled}
      key={index}
    >{label}</option>
  }
};

var prototype = Select.prototype;

if (process.env.NODE_ENV != 'production') {
  var types = React.PropTypes;

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
