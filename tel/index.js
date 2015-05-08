'use strict';

var defaults = require('lodash/object/defaults');
var react = require('react');
var util = require('./util');
var keepDigits = util.keepDigits;
var countDigits = util.countDigits;
var formatPhone = util.formatPhone;
var input = react.createFactory(require('../input'));

var adjustCursor = function (cursor, string) {
  var index = 0;
  var char;

  while (index <= cursor) {
    char = string[index];

    if (char < '0' || char > '9') {
      cursor++;
    }

    index++;
  }

  return cursor;
};

var Tel = function (props, context) {
  var tel = this;

  tel.props = props;
  tel.context = context;
  tel.state = {
    value: keepDigits(props.value || props.defaultValue || '', props.limit),
    cursor: 0
  };

  tel.onChange = function (event) {
    var target = event.target;
    var props = tel.props;
    var newState = {
      value: keepDigits(target.value, props.limit),
      cursor: countDigits(target.value, target.selectionStart)
    };
    var onChangeProp = props.onChange;

    onChangeProp && onChangeProp(newState);

    if (props.value == null) {
      tel.setState(newState);
    }
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
    value: formatPhone(tel.state.value),
    onChange: tel.onChange
  }, props));
};

prototype.componentDidMount = function () {
  this.node = react.findDOMNode(this);
};

prototype.componentWillReceiveProps = function (props) {
  var tel = this;
  var value = props.value;
  var node = tel.node;

  if (value != tel.props.value) {
    tel.setState({
      value: value != null ? keepDigits(value, props.limit) : tel.state.value,
      cursor: countDigits(node.value, node.selectionStart)
    });
  }
};

prototype.componentDidUpdate = function () {
  var node = this.node;
  var cursor = adjustCursor(this.state.cursor, node.value);

  node.setSelectionRange(cursor, cursor);
};

prototype.value = function () {
  return this.state.value;
};

if (process.env.NODE_ENV != 'production') {
  Tel.displayName = 'Tel Input';
  Tel.propTypes = {
    defaultValue: react.PropTypes.string,
    value: react.PropTypes.string,
    limit: react.PropTypes.number,
    onChange: react.PropTypes.func
  };
}

module.exports = Tel;
