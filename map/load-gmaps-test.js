'use strict';

require('es6-promise').polyfill();

var test = require('tape');
var loadGmaps = require('./load-gmaps');

// Use our stubbed Google Maps script.
loadGmaps.url = 'test/fixtures/google-maps.js';

test('Gmaps loader', function (assert) {
  assert.plan(2);

  loadGmaps().then(function (mapsApi) {
    assert.ok(mapsApi.Map, 'Map contstructor presence');

    loadGmaps().then(function () {
      assert.equal(window.mapScriptLoadCount, 1, 'loads only once');
    });
  });
});
