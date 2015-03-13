'use strict';

var react = require('react');
var guide = react.createFactory(require('./guide'));

window.app = react.render(guide(), document.getElementById('guide'));
