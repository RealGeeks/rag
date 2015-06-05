'use strict';

var _ = require('lodash');
var constant = _.constant;
var omit = _.omit;
var react = require('react/addons');

var propsToOmit = ['className', 'limit'];
var matchNonDigit = /\D/g;

var componentSpec = {
  mixins: [react.addons.PureRenderMixin],

  getDefaultProps: constant({limit: 10}),

  getInitialState: function () {
    var props = this.props;
    var value = props.defaultValue;

    return {
      value: value && formatPhoneNumber(value, props.limit) || ''
    };
  },

  render: function () {
    var component = this;
    var props = component.props;
    var className = props.className;

    props = omit(props, propsToOmit);
    props.type = 'tel';
    props.className = 'rag-tel' + (className ? ' ' + className : '');
    props.value = component.state.value;
    props.onChange = component.onChange;

    return react.DOM.input(props);
  },

  onChange: function (event) {
    var target = event.target;
    var value = target.value;
    var phone = formatPhoneNumber(value, this.props.limit);
    var caretPosition;

    caretPosition = target.selectionStart -
      (value.length - phone.length);

    this.setState({value: phone}, function () {
      target.setSelectionRange(caretPosition, caretPosition);
    });
  },

  value: function () {
    // IE8 does not (usually) fire change events, in which case just
    // return the value from the dom node.
    return (this.state.value || this.getDOMNode().value)
      .replace(matchNonDigit, '');
  }
};

if (process.env.NODE_ENV != 'production') {
  componentSpec.displayName = 'Tel Input';
}

function formatPhoneNumber(phone, limit) {
  phone = phone.replace(matchNonDigit, '');

  if (limit) {
    phone = phone.substr(0, limit);
  }

  var length = phone.length;

  if (length < 4 || length > 11) {
    return phone;
  }

  if (length == 11) {
    if (phone[0] == 1) {
      return '+' + phone[0] + ' (' + phone.substr(1, 3) + ') ' +
        phone.substr(4, 3) + '-' + phone.substr(7);
    }

    return phone;
  }

  if (length > 6) {
    return '(' + phone.substr(0, 3) + ') ' +
      phone.substr(3, 3) + '-' + phone.substr(6);
  }

  // At this point length >= 4 && length <= 6
  return '(' + phone.substr(0, 3) + ') ' + phone.substr(3);
}

module.exports = react.createClass(componentSpec);
