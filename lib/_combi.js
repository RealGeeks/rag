'use strict';

var test = require('tape');
var combi = require('./combi');

test('Combi', function (assert) {
  assert.plan(2);

  var styles = combi({
    size: 9
  });

  styles.add('a', function (current, config) {
    current.width = config.size;
  });

  styles.add('b', function (current) {
    current.width = 11;
    current.height = 10;
  });

  var result = styles.get(['b', 'a']);

  assert.deepEqual(result, {width: 9, height: 10}, 'composes functions');
  assert.equal(styles.get(['b', 'a']), result, 'caches results');
});
