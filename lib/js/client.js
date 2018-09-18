'use strict';

var react = require('react');
var ReactDOM = require('react-dom');
var doc = react.createFactory(require('./document').html);

window.app = ReactDOM.render(doc(), document);
