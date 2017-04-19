'use strict';

var defaults = require('lodash/object/defaults');
var React = require('React');
// var PureRenderMixin = require('react-addons-pure-render-mixin');
var Button = require('../button');
var style = require('./style')();

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var props = this.props;

    return <span style={style[props.flex ? 'flex' : 'basic']}>
      {props.buttons.map(this.render_button).bind(this)}
    </span>;
  }

  render_button(buttonProps, index, propsList) {
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

    return <Button {...buttonProps} />;
  }
}

// var prototype = defaults(ButtonGroup.prototype, PureRenderMixin);

if (process.env.NODE_ENV != 'production') {
  ButtonGroup.displayName = 'Button Group';
  ButtonGroup.propTypes = {
    buttons: React.PropTypes.arrayOf(
      React.PropTypes.object.isRequired
    ).isRequired
  };
}

module.exports = ButtonGroup;
