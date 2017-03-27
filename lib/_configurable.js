'use strict';

var test = require('tape');
var configurable = require('./configurable');

test('Configurable', function (assert) {
  assert.plan(3);

  var defaults = {
    a: 1,
    b: 2
  };

  var config = configurable(defaults);

  assert.equal(config(), defaults, 'returns passed in defaults');

  config({b: 3});

  assert.equal(config().a, 1, 'unchanged property');
  assert.equal(config().b, 3, 'changed property');
});
