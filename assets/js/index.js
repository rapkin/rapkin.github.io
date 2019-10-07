'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var swup = _interopDefault(require('swup'));
var LazyLoad = _interopDefault(require('vanilla-lazyload'));

new LazyLoad({ elements_selector: ".lazyload" });
new swup();
