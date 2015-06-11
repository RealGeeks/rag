'use strict';
var _ = require('lodash');
var defaults = _.defaults;
var omit = _.omit;
var react = require('react');
var util = require('./util');
var keepDigits = util.keepDigits;
var countDigits = util.countDigits;
var adjustCursor = util.adjustCursor;
var formatPhone = util.formatPhone;
var backspace = util.backspace;
var input = react.DOM.input;

var ua = navigator.userAgent;

// IE < 10
var ie = 'documentMode' in document && document.documentMode < 10;

// Andorid Dolphin
var android = (
  ~ua.indexOf('Mozilla/5.0') &&
  ~ua.indexOf('Android') &&
  ~ua.indexOf('AppleWebKit') &&
  ~ua.indexOf('Version')
);

var getInputSelection = function (input) {
  var start = 0;
  var end = 0;
  var normalizedValue;
  var range;
  var textInputRange;
  var len;
  var endRange;

  if (typeof input.selectionStart == 'number') {
    start = input.selectionStart;
    end = input.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() == input) {
      len = input.value.length;
      normalizedValue = input.value.replace(/\r\n/g, '\n');

      // Create a working TextRange that lives only in the input
      textInputRange = input.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = input.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart('character', -len);
        start += normalizedValue.slice(0, start).split('\n').length - 1;

        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd('character', -len);
          end += normalizedValue.slice(0, end).split('\n').length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end
  };
};

var setInputSelection = function (input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.setSelectionRange(selectionStart, selectionStart);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
};

var propsToOmit = ['className', 'limit', 'value', 'cursor', 'onChange'];

var Tel = function (props, context) {
  var tel = this;

  tel.props = props;
  tel.context = context;

  if (props.value == null) {
    tel.val = keepDigits(props.defaultValue, props.limit);
  }

  tel.update = function () {
    tel.scheduled = 0;

    var target = tel.node;
    var props = tel.props;
    var cursor = getInputSelection(target).start;
    var propValue = props.value;
    var oldUnformattedValue = propValue == null ? tel.val : propValue;
    var oldValue = formatPhone(oldUnformattedValue);
    var value = target.value;
    var length;
    var adjustedCursor;

    // If the text hasn’t changed bail here to allow text selection.
    if (value == oldValue) {
      return;
    }

    length = value.length;

    // If the user backspaced a non-digit, backspace until a digit is removed.
    value = backspace(oldValue, value, cursor);
    cursor -= length - value.length;

    cursor = countDigits(value, cursor);
    value = keepDigits(value, props.limit);

    if (propValue == null) {
      oldValue = target.value = formatPhone(value);
    } else {
      target.value = oldValue;
    }

    adjustedCursor = adjustCursor(cursor, oldValue);
    setInputSelection(target, adjustedCursor, adjustedCursor);

    if (value != oldUnformattedValue) {
      propValue == null && (tel.val = value);

      props.onChange && props.onChange({
        value: value,
        cursor: cursor
      });
    }
  };

  tel.scheduleUpdate = function () {
    if (!tel.scheduled) {
      tel.scheduled = setTimeout(tel.update);
    }
  };
};

var prototype = defaults(
  Tel.prototype,
  react.Component.prototype,
  require('react/lib/ReactComponentWithPureRenderMixin')
);

Tel.defaultProps = {
  defaultValue: '',
  limit: 10
};

prototype.render = function () {
  var tel = this;
  var props = tel.props;
  var className = props.className;

  props = omit(props, propsToOmit);
  props.type = 'tel';
  props.className = 'rag-tel' + (className ? ' ' + className : '');

  // Android Dolphin renders two inputs and this seems to fix it.
  if (android) {
    var style = props.style || (props.style = {});
    style.WebkitUserModify = 'read-write';
  }

  return input(props);
};

prototype.componentDidMount = function () {
  var tel = this;
  var value = tel.props.value;
  var node = tel.node = react.findDOMNode(tel);
  var scheduleUpdate = tel.scheduleUpdate;

  node.value = formatPhone(value != null ? value : tel.val);

  // IE8 does not support input event;
  // IE9 support for input event is buggy;
  // Android Dolphin browser has the cursor position all wrong.
  if (ie || android) {
    node.addEventListener('keydown', scheduleUpdate);
    node.addEventListener('keypress', scheduleUpdate);
    node.addEventListener('paste', scheduleUpdate);
  } else {
    node.addEventListener('input', tel.update);
  }

};

prototype.componentDidUpdate = function () {
  // this.scheduleUpdate();
  var tel = this;
  var props = tel.props;
  var value = props.value;

  if (value != null) {
    var node = tel.node;
    var cursor = props.cursor;

    node.value = formatPhone(value);

    if (cursor != null) {
      setInputSelection(node, cursor, cursor);
    }
  }
};

prototype.componentWillUnmount = function () {
  if (this.scheduled) {
    clearTimeout(this.scheduled);
  }
};

prototype.value = function () {
  var propValue = this.props.value;

  return propValue == null ? this.val : propValue;
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
