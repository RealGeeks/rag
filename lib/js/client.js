'use strict';

var react = require('react');
var doc = react.createFactory(require('./document').html);

window.app = react.render(doc(), document);
