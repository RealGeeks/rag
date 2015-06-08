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

exports.adjustCursor = function (cursor, string) {
  var index = 0;
  var char;

  while (index <= cursor) {
    char = string[index];
    if (char && !isDigit(char)) {
      cursor++;
    }

    index++;
  }

  return cursor;
};

exports.formatPhone = function (phone) {
  var length = phone.length;
  var result;

  if (length < 1 || length > 11) {
    return phone;
  }

  if (length == 11) {
    if (phone[0] == 1) {
      return '+1 (' + phone.substr(1, 3) + ') ' +
        phone.substr(4, 3) + '-' + phone.substr(7);
    }

    return phone;
  }

  result = '(' + phone.substr(0, 3);

  if (length > 2) {
    result += ') ' + phone.substr(3, 3);

    if (length > 5) {
      result += '-' + phone.substr(6);
    }
  }

  return result;
};

// Backspace until a digit is removed.
exports.backspace = function (oldString, newString, position) {
  if (
    // if the new string is shorter
    newString.length < oldString.length &&

    // and a character was removed at position
    newString[position] != oldString[position] &&

    // and the character removed is not a digit
    !isDigit(oldString[position])
  ) {
    var i = position - 1;

    // then backspace from position until a digit is removed
    while (i > 0) {
      if (isDigit(newString[i])) {
        return newString.slice(0, i) + newString.slice(position);
      }

      i--;
    }
  }

  return newString;
};
