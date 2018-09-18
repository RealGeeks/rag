'use strict';

var test = require('tape');
var react = require('react/dist/react-with-addons');
var tel = react.createFactory(require('./'));
var TestUtils = require('react-addons-test-utils');

test('Tel', function (assert) {
  assert.plan(1);

  var component = TestUtils.renderIntoDocument(tel());

  assert.equal(component.value(), '', 'empty initial value');
});
