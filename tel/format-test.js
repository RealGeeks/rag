'use strict';

var test = require('tape');
var format = require('./format');

test('Format digits', function (assert) {
  assert.plan(2);

  assert.deepEqual(
    format.digits({
      value: 'f24t456y6:1',
      cursor: 7
    }),
    {
      value: '2445661',
      cursor: 5
    },
    'removes non-digits and adjusts cursor position'
  );

  assert.deepEqual(
    format.digits({
      value: 'f24t456y6:1',
      cursor: 7,
      limit: 3
    }),
    {
      value: '244',
      cursor: 5
    },
    'limits the number of characters in the string'
  );
});

test('Format phone', function (assert) {
  assert.plan(16);

  assert.deepEqual(
    format.phone({
      value: '123',
      cursor: 1
    }),
    {
      value: '123',
      cursor: 1
    },
    'keeps small numbers unchanged'
  );

  assert.deepEqual(
    format.phone({
      value: '123456789012',
      cursor: 2
    }),
    {
      value: '123456789012',
      cursor: 2
    },
    'keeps large numbers unchanged'
  );

  assert.deepEqual(
    format.phone({
      value: '23456789012',
      cursor: 1
    }),
    {
      value: '23456789012',
      cursor: 1
    },
    'keeps 11 digit numbers unchanged if not prefixed with 1'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 0
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 1
    },
    '11 digit number with cursor in position 0'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 1
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 4
    },
    '11 digit number with cursor in position 1'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 3
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 6
    },
    '11 digit number with cursor in position 3'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 4
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 9
    },
    '11 digit number with cursor in position 4'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 6
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 11
    },
    '11 digit number with cursor in position 6'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 7
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 13
    },
    '11 digit number with cursor in position 7'
  );

  assert.deepEqual(
    format.phone({
      value: '12345678901',
      cursor: 11
    }),
    {
      value: '+1 (234) 567-8901',
      cursor: 17
    },
    '11 digit number with cursor in position 11'
  );

  assert.deepEqual(
    format.phone({
      value: '1234567890',
      cursor: 0
    }),
    {
      value: '(123) 456-7890',
      cursor: 1
    },
    '10 digit number with cursor in position 0'
  );

  assert.deepEqual(
    format.phone({
      value: '1234567890',
      cursor: 3
    }),
    {
      value: '(123) 456-7890',
      cursor: 6
    },
    '10 digit number with cursor in position 3'
  );

  assert.deepEqual(
    format.phone({
      value: '1234567890',
      cursor: 6
    }),
    {
      value: '(123) 456-7890',
      cursor: 10
    },
    '10 digit number with cursor in position 6'
  );

  assert.deepEqual(
    format.phone({
      value: '1234567',
      cursor: 7
    }),
    {
      value: '(123) 456-7',
      cursor: 11
    },
    '7 digit number with cursor in position 7'
  );

  assert.deepEqual(
    format.phone({
      value: '123456',
      cursor: 5
    }),
    {
      value: '(123) 456',
      cursor: 8
    },
    '6 digit number with cursor in position 5'
  );

  assert.deepEqual(
    format.phone({
      value: '1234',
      cursor: 3
    }),
    {
      value: '(123) 4',
      cursor: 6
    },
    '4 digit number with cursor in position 3'
  );
});
