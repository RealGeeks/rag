'use strict';

var constant = require('lodash').constant;
var react = require('react/addons');

var matchNonDigit = /\D/g;

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  getDefaultProps: constant({limit: 10}),
  getInitialState: constant({value: ''}),

  render: function () {
    var component = this;
    var className = component.props.className;

    return react.DOM.input({
      type: 'tel',
      className: 'rag-tel' + (className ? ' ' + className : ''),
      value: component.state.value,
      onChange: component.onChange
    });
  },

  onChange: function (event) {
    var target = event.target;
    var number = target.value
      .replace(matchNonDigit, '')
      .substr(0, this.props.limit);
    var length = number.length;
    var value;
    var caretPosition;

    if (length < 4 || length > 11) {
      value = number;
    } else if (length == 11) {
      if (number[0] == 1) {
        value = '+' + number[0] + ' (' + number.substr(1, 3) + ') ' +
          number.substr(4, 3) + '-' + number.substr(7);
      } else {
        value = number;
      }
    } else if (length > 6) {
      value = '(' + number.substr(0, 3) + ') ' +
        number.substr(3, 3) + '-' + number.substr(6);
    } else if (length > 3) {
      value = '(' + number.substr(0, 3) + ') ' + number.substr(3);
    }

    caretPosition = target.selectionStart -
      (target.value.length - value.length);

    this.setState({value: value}, function () {
      target.setSelectionRange(caretPosition, caretPosition);
    });
  },

  value: function () {
    return this.state.value;
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Tel Input';
}

module.exports = react.createClass(componentSpec);
