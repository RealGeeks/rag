'use strict';

var test = require('tape');
var bubblePath = require('./bubblePath');

test('bubblePath', function (assert) {
  assert.plan(1);

  assert.equal(
    bubblePath({
      placement: 'top',
      width: 300,
      height: 200,
      borderRadius: 0,
      arrowSize: 10,
      arrowOffset: 150
    }),
    'm 150 210 -10 -10 -140 0 0 -200 300 0 0 200 -140 0',
    'no border radius'
  );
});
