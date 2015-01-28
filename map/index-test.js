'use strict';

require('es6-promise').polyfill();

var test = require('tape');
var sinon = require('sinon');
var _ = require('lodash');
var react = require('react/addons');
var map = react.createFactory(require('./'));
var TestUtils = react.addons.TestUtils;

var loadGMaps = require('./load-gmaps');

// Use our stubbed Google Maps script.
loadGMaps.url = 'test/fixtures/google-maps.js';

test('Map', function (assert) {
  assert.plan(7);

  var component = TestUtils.renderIntoDocument(map({
    ready: function (map, api) {
      var addListenerSpy =
        sinon.spy(window.google.maps.event, 'addListener');
      var removeListenerSpy =
        sinon.spy(window.google.maps.event, 'removeListener');
      var triggerSpy =
        sinon.spy(window.google.maps.event, 'trigger');

      var listenerId = component.addListener('happening', _.noop);

      assert.ok(
        addListenerSpy.calledWith(sinon.match.object, 'happening', _.noop),
        'add listener'
      );

      component.removeListener(listenerId);

      assert.ok(
        removeListenerSpy.calledWith(listenerId),
        'remove listener'
      );

      component.trigger('resize', 12);

      assert.ok(
        triggerSpy.calledWith(sinon.match.object, 'resize', 12),
        'trigger event'
      );

      var options = component.createMapOptions({
        center: {
          lat: 12,
          lng: 40
        },
        zoom: 7,
        mapTypeId: 'ROADMAP',
        disableDefaultUI: true,
        mapTypeControlOptions: {
          style: 'DROPDOWN_MENU'
        },
        streetViewControlOptions: {
          position: 'TOP_LEFT'
        },
        zoomControlOptions: {
          style: 'SMALL',
          position: 'TOP_LEFT'
        }
      }, api);

      assert.deepEqual(options, {
        center: new api.LatLng(),
        zoom: 7,
        mapTypeId: '',
        disableDefaultUI: true,
        mapTypeControlOptions: {
          style: 1
        },
        streetViewControlOptions: {
          position: 3
        },
        zoomControlOptions: {
          style: 2,
          position: 3
        }
      }, 'options');
    }
  }));

  assert.ok(!component.map, 'no map');
  assert.equal(component.getDOMNode().innerHTML, '', 'no children');
  assert.deepEqual(component.state, {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 3
  }, 'initial state');
});
