'use strict';

exports.digits = function (input) {
  var originalString = input.value;
  var originalCursor = input.cursor;
  var limit = input.limit;
  var string = '';
  var cursor = originalCursor;
  var index = 0;
  var char;

  while (index < originalString.length) {
    char  = originalString[index];
    if (char >= '0' && char <= '9') {
      string += char;

      if (limit && string.length == limit) {
        break;
      }
    } else if (index < originalCursor) {
      cursor--;
    }

    index++;
  }

  return {
    value: string,
    cursor: cursor
  };
};

exports.phone = function (input) {
  var phone = input.value;
  var cursor = input.cursor;
  var output = {
    value: phone,
    cursor: cursor
  };
  var length = phone.length;

  if (length < 4 || length > 11) {
    return output;
  }

  if (length == 11) {
    if (phone[0] == 1) {
      output.value = '+1 (' + phone.substr(1, 3) + ') ' +
        phone.substr(4, 3) + '-' + phone.substr(7);

      if (cursor <= 0) {
        output.cursor = 1;
      } else {
        output.cursor += 3;

        if (cursor > 3) {
          output.cursor += 2;
        }

        if (cursor > 6) {
          output.cursor++;
        }
      }
    }

    return output;
  }

  if (length > 6) {
    output.value = '(' + phone.substr(0, 3) + ') ' +
      phone.substr(3, 3) + '-' + phone.substr(6);

    output.cursor++;

    if (cursor > 2) {
      output.cursor += 2;
    }

    if (cursor > 5) {
      output.cursor++;
    }

    return output;
  }

  // At this point length >= 4 && length <= 6
  output.value = '(' + phone.substr(0, 3) + ') ' + phone.substr(3);

  output.cursor++;

  if (cursor > 2) {
    output.cursor += 2;
  }

  return output;
};
