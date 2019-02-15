'use strict';

require('es6-promise').polyfill();

var test = require('tape');
var sinon = require('sinon');
var _ = require('lodash');
var react = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var loadGMaps = require('@realgeeks/load-gmaps');

var map = react.createFactory(require('./'));

// Use our stubbed Google Maps script.
loadGMaps.url = 'test/fixtures/google-maps.js';

test('Map', function (assert) {
  assert.plan(13);

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

  var otherComponent = TestUtils.renderIntoDocument(map({
    zoom: 4,
    ready: function () {
      assert.deepEqual(
        otherComponent.state.center,
        {
          lat: 0,
          lng: 0
        },
        'unchanged prop should not change state'
      );
      assert.equal(otherComponent.state.zoom, 4, 'should set zoom state');

      otherComponent.map.getZoom = sinon.spy(_.constant(4));
      otherComponent.updateBounds = sinon.spy();
      otherComponent.onZoom();

      assert.ok(
        otherComponent.map.getZoom.called,
        'getZoom should be called when map zoom changes'
      );
      assert.ok(
        !otherComponent.updateBounds.called,
        'updateBounds should not be triggered when zoom change comes from app'
      );

      otherComponent.map.getZoom = sinon.spy(_.constant(5));
      otherComponent.onZoom();

      assert.ok(
        otherComponent.updateBounds.called,
        'updateBounds should be called when user changes zoom'
      );
    }
  }));

  assert.ok(!otherComponent.map, 'no other map');
  assert.ok(!component.map, 'no map');
  assert.equal(ReactDOM.findDOMNode(component).innerHTML, '', 'no children');
  assert.deepEqual(component.state, {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 3
  }, 'initial state');
});
