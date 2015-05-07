'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react');
var format = require('./format');
var keepDigits = format.digits;
var formatPhone = format.phone;
var input = react.createFactory(require('../input'));

var Tel = function (props, context) {
  var tel = this;

  tel.props = props;
  tel.context = context;
  tel.state = formatPhone(keepDigits({
    value: props.value || props.defaultValue || '',
    cursor: 0,
    limit: props.limit
  }));

  tel.onChange = function (event) {
    var target = event.target;
    var newState = formatPhone(keepDigits({
      value: target.value,
      cursor: target.selectionStart,
      limit: tel.props.limit
    }));

    tel.setState(newState, function () {
      var onChangeProp = tel.props.onChange;
      onChangeProp && onChangeProp(newState);
      setTimeout(function () {
        tel.componentDidUpdate();
      }, 0);
    });
  };
};

var prototype = defaults(
  Tel.prototype,
  react.Component.prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

Tel.defaultProps = {limit: 10};

prototype.render = function () {
  var tel = this;
  var props = tel.props;

  return input(defaults({
    type: 'tel',
    value: tel.state.value,
    onChange: tel.onChange
  }, props));
};

prototype.componentDidMount = function () {
  this.node = react.findDOMNode(this);
};

prototype.componentWillReceiveProps = function (props) {
  var tel = this;
  var value = props.value;
  var limit = props.limit;

  if (value != tel.props.value || limit != tel.props.limit) {
    tel.setState(formatPhone(keepDigits({
      value: value != null ? value : tel.state.value,
      cursor: tel.state.cursor,
      limit: limit
    })));
  }
};

prototype.componentDidUpdate = function () {
  var cursor = this.state.cursor;
  this.node.setSelectionRange(cursor, cursor);
};

prototype.value = function () {
  var value = this.props.value;

  return value != null ? value : keepDigits(this.state.value);
};

if (process.env.NODE_ENV != 'production') {
  Tel.displayName = 'Tel Input';
  Tel.propTypes = {
    value: react.PropTypes.string,
    limit: react.PropTypes.number
  };
}

module.exports = Tel;
