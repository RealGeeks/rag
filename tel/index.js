'use strict';

var _ = require('lodash');
var defaults = _.defaults;
var omit = _.omit;
var react = require('react');
var ReactDOM = require('react-dom');
var dom = require('react-dom-factories');
var util = require('./util');
var keepDigits = util.keepDigits;
var countDigits = util.countDigits;
var adjustCursor = util.adjustCursor;
var formatPhone = util.formatPhone;
var backspace = util.backspace;
var input = dom.input;

var document = document || {documentMode: null};
var navigator = navigator || {userAgent: ''};

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

var propsToOmit = ['className', 'value', 'cursor', 'onChange'];

var Tel = function (props, context) {
  var tel = this;

  tel.props = props;
  tel.context = context;

  if (props.value == null) {
    tel.val = keepDigits(props.defaultValue);
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
    value = keepDigits(value);

    if (propValue == null) {
      oldValue = target.value = formatPhone(value);
    } else {
      target.value = oldValue;
    }

    setTimeout(function () {
      adjustedCursor = adjustCursor(cursor, oldValue);
      setInputSelection(target, adjustedCursor, adjustedCursor);
    }, 10);

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
  defaultValue: ''
};

prototype.render = function () {
  var tel = this;
  var props = tel.props;
  var className = props.className;
  var allCountries = require('./country_data').allCountries;
  var options = _.map(allCountries, function (c) {
    return dom.option(
      {
        value: c.iso2,
        key: c.iso2
      },
      c.name + ' (+' + c.dialCode + ')');
  });

  props = omit(props, propsToOmit);
  props.type = 'tel';
  props.className = 'rag-tel' + (className ? ' ' + className : '');

  // Android Dolphin renders two inputs and this seems to fix it.
  if (android) {
    var style = props.style || (props.style = {});
    style.WebkitUserModify = 'read-write';
  }

  if (props.useIntlPhoneInput) {
    props.ref = 'phoneInput';
    return dom.div(
      undefined,
      dom.select(
        {
          ref: 'dialCode',
          className: 'dial-code',
          defaultValue: 'us'
        },
        options
      ),
      input(props)
    );
  } else {
    return input(props);
  }
};

prototype.componentDidMount = function () {
  var tel = this;
  var value = tel.props.value;
  var node = tel.node = ReactDOM.findDOMNode(tel);
  var scheduleUpdate = tel.scheduleUpdate;

  node.value = formatPhone(value != null ? value : tel.val);

  if (!tel.props.useIntlPhoneInput) {
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
  } else {
    node.addEventListener('input', function () {
      var countryCode = ReactDOM.findDOMNode(tel.refs.dialCode).value;
      var phone = ReactDOM.findDOMNode(tel.refs.phoneInput).value;
      tel.refs.phoneInput.value = phone;
      tel.refs.dialCode.value = countryCode;
    });
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
  if (this.props.useIntlPhoneInput) {
    var countryCode = ReactDOM.findDOMNode(this.refs.dialCode).value;
    var phone = ReactDOM.findDOMNode(this.refs.phoneInput).value;

    // Convert countryCode (us) to dialCode (1)
    var allCountries = require('./country_data').allCountries;
    var country = _.find(allCountries, function (country) {
      return country.iso2 === countryCode;
    });
    return '+' + country.dialCode + phone;
  } else {
    var propValue = this.props.value;
    return propValue == null ? this.val : propValue;
  }
};

if (process.env.NODE_ENV != 'production') {
  Tel.displayName = 'Tel Input';
  Tel.propTypes = {
    defaultValue: react.PropTypes.string,
    value: react.PropTypes.string,
    onChange: react.PropTypes.func
  };
}

module.exports = Tel;
