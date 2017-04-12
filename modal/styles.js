'use strict';

var defaults = require('lodash/object/defaults');
var abstractions = require('../lib/abstractions');
var theme = require('../theme')();
var panel = require('../panel/style')();
var prefix = require('../lib/prefix');

module.exports = function () {
  var container = defaults(
    prefix.block({
      display: 'flex',
      height: '100%',
      padding: theme.padding,
      boxSizing: 'border-box',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'default',
      zIndex: 1
    }),
    abstractions.fill
  );

  var styles = {
    container: container,
    backdrop: defaults({background: 'rgba(0,0,0,.3)'}, container),
    window: defaults({
      position: 'relative',
      maxWidth: '100%',
      maxHeight: '100%',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      // Without a z-index set some content overflows in Webkit.
      zIndex: 0
    }, panel.indented),
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
      boxSizing: 'content-box',
      padding: '5px 5px 15px 15px',
      // On iOS, elements positioned on top of iframes don’t receive
      // touch events without this.
      zIndex: 1
    },
    icon: {
      display: 'block'
    }
  };

  console.log(styles);
  return styles;
};
