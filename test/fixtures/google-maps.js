(function () {
  'use strict';

  function noop() {}

  function Map() {
  }
  Map.prototype.panTo = noop;
  Map.prototype.setZoom = noop;

  function Marker() {}
  Marker.prototype.setMap = noop;
  Marker.prototype.setOptions = noop;

  window.google = {
    maps: {
      LatLng: noop,
      Map: Map,
      MapTypeId: {ROADMAP: ''},
      MapTypeControlStyle: {DROPDOWN_MENU: 1},
      ZoomControlStyle: {SMALL: 2},
      ControlPosition: {TOP_LEFT: 3},
      event: {
        addListener: noop,
        removeListener: noop,
        trigger: noop
      }
    }
  };

  if (!window.mapScriptLoadCount) {
    window.mapScriptLoadCount = 0;
  }

  window.mapScriptLoadCount++;
  window.mapLoaded();
})();
