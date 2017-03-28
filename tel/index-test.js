'use strict';

var React = require('react');
var test = require('tape');
var tel = React.createFactory(require('./'));
var TestUtils = require('react-addons-test-utils');

test('Tel', function (assert) {
  assert.plan(1);

  var component = TestUtils.renderIntoDocument(tel());

  assert.equal(component.value(), '', 'empty initial value');
});
