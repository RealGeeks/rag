/* global google */
'use strict';

var scriptLoad = require('scriptload');
var qs = require('query-string');
var mapsPromise;

function loadApi(resolve) {
  var query = {
    v: loadGmaps.version,
    callback: loadGmaps.callbackName
  };

  if (loadGmaps.key) {
    query.key = loadGmaps.key;
  }

  window[loadGmaps.callbackName] = function () {
    // IE8 throws an error if we try to delete window properties.
    window[loadGmaps.callbackName] = undefined;

    resolve(google.maps);
  };

  scriptLoad(loadGmaps.url + '?' + qs.stringify(query));
}

function loadGmaps() {
  return mapsPromise || (mapsPromise = new Promise(loadApi));
}

loadGmaps.url = 'https://maps.googleapis.com/maps/api/js';
loadGmaps.version = '3.17';
loadGmaps.callbackName = 'mapLoaded';

module.exports = loadGmaps;
