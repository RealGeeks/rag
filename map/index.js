'use strict';

var _ = require('lodash');
var inner = require('inner');
var react = require('react');
var joinClasses = require('react/lib/joinClasses');
var dom = react.DOM;

var mapComponent = {
  getInitialState: _.constant({
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 3
  }),

  getDefaultProps: _.constant({
    ready: _.noop,
    onChange: _.noop
  }),

  addListener: function (eventName, listener) {
    return this.api.event.addListener(this.map, eventName, listener);
  },

  removeListener: function (listenerId) {
    return this.api.event.removeListener(listenerId);
  },

  trigger: function () {
    var args = Array.prototype.concat.apply([this.map], arguments);
    var event = this.api.event;

    return event.trigger.apply(event, args);
  },

  createMapOptions: function (options, mapsApi) {
    options = _.clone(options);
    var state = this.state;
    var center = options.center || state.center;
    options.center = new mapsApi.LatLng(center.lat, center.lng);
    options.zoom = options.zoom || state.zoom;

    [
    [['mapTypeId'], 'MapTypeId'],
    [['mapTypeControlOptions', 'style'], 'MapTypeControlStyle'],
    [['streetViewControlOptions', 'position'], 'ControlPosition'],
    [['zoomControlOptions', 'style'], 'ZoomControlStyle'],
    [['zoomControlOptions', 'position'], 'ControlPosition']
    ].forEach(function (pair) {
      var path = pair[0];
      var option = inner.get(options, path);
      if (option) {
        inner.set(options, path, mapsApi[pair[1]][option]);
      }
    });

    return options;
  },

  updateBounds: function () {
    var component = this;
    var props = component.props;
    var map = component.map;
    var mapCenter = map.getCenter();
    var state = {
      center: {
        lat: mapCenter.lat(),
        lng: mapCenter.lng()
      },
      zoom: map.getZoom()
    };

    component.setState(state);
    props.onChange(state);
  },

  render: function () {
    return dom.div({
      className: joinClasses('rag-map', this.props.className)
    });
  },

  componentDidMount: function () {
    var component = this;
    var props = component.props;

    require('./load-gmaps')().then(function (mapsApi) {
      var map = component.map = new mapsApi.Map(
        component.getDOMNode(),
        component.createMapOptions(props, mapsApi)
      );
      var newState = {};
      var debouncedUpdateBounds = _.debounce(component.updateBounds, 500);

      component.api = mapsApi;

      component.addListener('dragend', component.updateBounds);
      component.addListener('resize', debouncedUpdateBounds);
      component.addListener('zoom_changed', debouncedUpdateBounds);

      if (props.center) {
        newState.center = props.center;
      }

      if (props.zoom) {
        newState.zoom = props.zoom;
      }

      component.setState(newState);
      props.ready(map, mapsApi);
    });
  },

  componentWillReceiveProps: function (props) {
    var component = this;
    var state = component.state;
    var map = component.map;

    if (!map) {
      return;
    }

    var center = props.center;
    if (center && !_.isEqual(center, state.center)) {
      map.panTo(center);
    }

    var zoom = props.zoom;
    if (zoom && zoom != state.zoom) {
      map.setZoom(zoom);
    }

    component.setState({
      center: center,
      zoom: zoom
    });
  },

  // As the map DOM is handled by the Google Maps lib, React never needs
  // to re-render this component.
  shouldComponentUpdate: require('../lib/js/functional').giveFalse
};

if (process.env.NODE_ENV != 'production') {
  mapComponent.displayName = 'Map';
}

module.exports = react.createClass(mapComponent);
