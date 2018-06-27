'use strict';

var test = require('tape');
var react = require('react');
var TestUtils = require('react-addons-test-utils');

var tel = react.createFactory(require('./'));

test('Tel', function (assert) {
  assert.plan(1);

  var component = TestUtils.renderIntoDocument(tel());

  assert.equal(component.value(), '', 'empty initial value');
});
