'use strict';

var test = require('tape');
var format = require('./format');

test('Format digits', function (assert) {
  assert.plan(2);

  assert.deepEqual(
    format.digits('f24t456y6:1'),
    '2445661',
    'removes non-digits'
  );

  assert.deepEqual(
    format.digits('f24t456y6:1', 3),
    '24',
    'returns digits up to limit'
  );
});

test('Format phone', function (assert) {
  assert.plan(8);

  assert.deepEqual(
    format.phone('123'),
    '123',
    'keeps small numbers unchanged'
  );

  assert.deepEqual(
    format.phone('123456789012'),
    '123456789012',
    'keeps large numbers unchanged'
  );

  assert.deepEqual(
    format.phone('23456789012'),
    '23456789012',
    'keeps 11 digit numbers unchanged if not prefixed with 1'
  );

  assert.deepEqual(
    format.phone('12345678901'),
    '+1 (234) 567-8901',
    '11 digit number prefixed with 1'
  );

  assert.deepEqual(
    format.phone('1234567890'),
    '(123) 456-7890',
    '10 digit number'
  );

  assert.deepEqual(
    format.phone('1234567'),
    '(123) 456-7',
    '7 digit number'
  );

  assert.deepEqual(
    format.phone('123456'),
    '(123) 456',
    '6 digit number'
  );

  assert.deepEqual(
    format.phone('1234'),
    '(123) 4',
    '4 digit number'
  );
});
