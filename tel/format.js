'use strict';

var isDigit = exports.isDigit = function (char) {
  return char >= '0' && char <= '9';
};

exports.keepDigits = function (string, limit) {
  var result = '';
  var index = 0;
  var char;

  if (limit === 0) {
    return result;
  }

  while (index < string.length) {
    char = string[index];

    if (isDigit(char)) {
      result += char;

      if (limit == result.length) {
        break;
      }
    }

    index++;
  }

  return result;
};

exports.countDigits = function (string, end) {
  if (end === 0) {
    return 0;
  }

  var count = 0;
  var index = 0;

  while (index < string.length && !end || index < end) {
    if (isDigit(string[index])) {
      count++;
    }

    index++;
  }

  return count;
};

exports.phone = function (phone) {
  var length = phone.length;

  if (length < 4 || length > 11) {
    return phone;
  }

  if (length == 11) {
    if (phone[0] == 1) {
      return '+1 (' + phone.substr(1, 3) + ') ' +
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
};
