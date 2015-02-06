'use strict';

var regex = /([A-Z])/g;

function convertMatch($1) {
  return '-' + $1.toLowerCase();
}

function convertName(name) {
  return '$' + name.replace(regex, convertMatch);
}

module.exports = function (vars) {
  return Object.keys(vars).map(function (name) {
    return convertName(name) + ': ' + vars[name] + ' !default;';
  }).join('\n');
};
