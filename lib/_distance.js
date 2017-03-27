'use strict';

var test = require('tape');
var distance = require('./distance');

test('Distance between 2 points', function (assert) {
  assert.plan(2);

  assert.equal(distance([3, 4], [9, 12]), 10, '2d');
  assert.equal(distance([2, 4, -1], [-9, 12, 15]), 21, '3d');
});
