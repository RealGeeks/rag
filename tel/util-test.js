'use strict';

var test = require('tape');
var util = require('./util');

test('isDigit', function (assert) {
  assert.plan(4);

  assert.ok(util.isDigit('0'), 'returns true for “0”');
  assert.ok(util.isDigit('5'), 'returns true for “5”');
  assert.ok(util.isDigit('9'), 'returns true for “9”');
  assert.ok(!util.isDigit('a'), 'returns false for “a”');
});

test('keepDigits', function (assert) {
  assert.plan(2);

  assert.deepEqual(
    util.keepDigits('f24t456y6:1'),
    '2445661',
    'removes non-digits'
  );

  assert.deepEqual(
    util.keepDigits('f24t456y6:1', 3),
    '244',
    'returns up to given limit of digits'
  );
});

test('countDigits', function (assert) {
  assert.plan(2);

  assert.deepEqual(
    util.countDigits('f24t456y6:1'),
    7,
    'returns the number of digits in a string'
  );

  assert.deepEqual(
    util.countDigits('f24t456y6:1', 3),
    2,
    'counts up to given index'
  );
});

test('adjustCursor', function (assert) {
  assert.plan(3);

  assert.equal(
    util.adjustCursor(3, '*(32) 190'),
    7,
    'returns cursor position taking non-digits into account'
  );

  assert.equal(
    util.adjustCursor(0, '*(32) 190'),
    2,
    'works for cursor position of 0'
  );

  assert.equal(
    util.adjustCursor(0, ''),
    0,
    'works for empty string'
  );
});

test('formatPhone', function (assert) {
  assert.plan(8);

  assert.deepEqual(
    util.formatPhone('123'),
    '123',
    'keeps small numbers unchanged'
  );

  assert.deepEqual(
    util.formatPhone('123456789012'),
    '123456789012',
    'keeps large numbers unchanged'
  );

  assert.deepEqual(
    util.formatPhone('23456789012'),
    '23456789012',
    'keeps 11 digit numbers unchanged if not prefixed with 1'
  );

  assert.deepEqual(
    util.formatPhone('12345678901'),
    '+1 (234) 567-8901',
    '11 digit number prefixed with 1'
  );

  assert.deepEqual(
    util.formatPhone('1234567890'),
    '(123) 456-7890',
    '10 digit number'
  );

  assert.deepEqual(
    util.formatPhone('1234567'),
    '(123) 456-7',
    '7 digit number'
  );

  assert.deepEqual(
    util.formatPhone('123456'),
    '(123) 456',
    '6 digit number'
  );

  assert.deepEqual(
    util.formatPhone('1234'),
    '(123) 4',
    '4 digit number'
  );
});
