'use strict';

var _ = require('lodash');

var has = function (key) {
  return _.has(this, key);
};

exports.giveFalse = _.constant(false);

var hasProps = exports.hasProps = function (target, props) {
  return props.every(has, target);
};

exports.hasRange = function (array, start, end) {
  return hasProps(array, _.range(start, end));
};

exports.checkProp = function (prop, value) {
  return function (item) {
    return item && item[prop] == value;
  };
};
