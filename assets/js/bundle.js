(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var DOCUMENT_NODE_TYPE = 9;

	/**
	 * A polyfill for Element.matches()
	 */
	if (typeof Element !== 'undefined' && !Element.prototype.matches) {
	    var proto = Element.prototype;

	    proto.matches = proto.matchesSelector ||
	                    proto.mozMatchesSelector ||
	                    proto.msMatchesSelector ||
	                    proto.oMatchesSelector ||
	                    proto.webkitMatchesSelector;
	}

	/**
	 * Finds the closest parent that matches a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @return {Function}
	 */
	function closest (element, selector) {
	    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
	        if (typeof element.matches === 'function' &&
	            element.matches(selector)) {
	          return element;
	        }
	        element = element.parentNode;
	    }
	}

	var closest_1 = closest;

	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @param {Boolean} useCapture
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);

	    element.addEventListener(type, listenerFn, useCapture);

	    return {
	        destroy: function() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    }
	}

	/**
	 * Finds closest match and invokes callback.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Function}
	 */
	function listener(element, selector, type, callback) {
	    return function(e) {
	        e.delegateTarget = closest_1(e.target, selector);

	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    }
	}

	var delegate_1 = delegate;

	var Cache_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cache = exports.Cache = function () {
		function Cache() {
			_classCallCheck(this, Cache);

			this.pages = {};
			this.last = null;
		}

		_createClass(Cache, [{
			key: 'cacheUrl',
			value: function cacheUrl(page) {
				if (page.url in this.pages === false) {
					this.pages[page.url] = page;
				}
				this.last = this.pages[page.url];
				this.swup.log('Cache (' + Object.keys(this.pages).length + ')', this.pages);
			}
		}, {
			key: 'getPage',
			value: function getPage(url) {
				return this.pages[url];
			}
		}, {
			key: 'getCurrentPage',
			value: function getCurrentPage() {
				return this.getPage(window.location.pathname + window.location.search);
			}
		}, {
			key: 'exists',
			value: function exists(url) {
				return url in this.pages;
			}
		}, {
			key: 'empty',
			value: function empty() {
				this.pages = {};
				this.last = null;
				this.swup.log('Cache cleared');
			}
		}, {
			key: 'remove',
			value: function remove(url) {
				delete this.pages[url];
			}
		}]);

		return Cache;
	}();

	exports.default = Cache;
	});

	unwrapExports(Cache_1);
	var Cache_2 = Cache_1.Cache;

	var classify_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var classify = function classify(text) {
		var output = text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
		.replace(/\//g, '-') // Replace / with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
		if (output[0] === '/') output = output.splice(1);
		if (output === '') output = 'homepage';
		return output;
	};

	exports.default = classify;
	});

	unwrapExports(classify_1);

	var createHistoryRecord_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var createHistoryRecord = function createHistoryRecord(url) {
		window.history.pushState({
			url: url || window.location.href.split(window.location.hostname)[1],
			random: Math.random(),
			source: 'swup'
		}, document.getElementsByTagName('title')[0].innerText, url || window.location.href.split(window.location.hostname)[1]);
	};

	exports.default = createHistoryRecord;
	});

	unwrapExports(createHistoryRecord_1);

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var query = exports.query = function query(selector) {
		var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

		if (typeof selector !== 'string') {
			return selector;
		}

		return context.querySelector(selector);
	};

	var queryAll = exports.queryAll = function queryAll(selector) {
		var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

		if (typeof selector !== 'string') {
			return selector;
		}

		return Array.prototype.slice.call(context.querySelectorAll(selector));
	};
	});

	unwrapExports(utils);
	var utils_1 = utils.query;
	var utils_2 = utils.queryAll;

	var getDataFromHtml_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



	var getDataFromHtml = function getDataFromHtml(html, containers) {
		var content = html.replace('<body', '<div id="swupBody"').replace('</body>', '</div>');
		var fakeDom = document.createElement('div');
		fakeDom.innerHTML = content;
		var blocks = [];

		var _loop = function _loop(i) {
			if (fakeDom.querySelector(containers[i]) == null) {
				// page in invalid
				return {
					v: null
				};
			} else {
				(0, utils.queryAll)(containers[i]).forEach(function (item, index) {
					(0, utils.queryAll)(containers[i], fakeDom)[index].setAttribute('data-swup', blocks.length); // marks element with data-swup
					blocks.push((0, utils.queryAll)(containers[i], fakeDom)[index].outerHTML);
				});
			}
		};

		for (var i = 0; i < containers.length; i++) {
			var _ret = _loop(i);

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}

		var json = {
			title: fakeDom.querySelector('title').innerText,
			pageClass: fakeDom.querySelector('#swupBody').className,
			originalContent: html,
			blocks: blocks
		};

		// to prevent memory leaks
		fakeDom.innerHTML = '';
		fakeDom = null;

		return json;
	};

	exports.default = getDataFromHtml;
	});

	unwrapExports(getDataFromHtml_1);

	var fetch_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var fetch = function fetch(setOptions) {
		var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var defaults = {
			url: window.location.pathname + window.location.search,
			method: 'GET',
			data: null,
			headers: {}
		};

		var options = _extends({}, defaults, setOptions);

		var request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status !== 500) {
					callback(request);
				} else {
					callback(request);
				}
			}
		};

		request.open(options.method, options.url, true);
		Object.keys(options.headers).forEach(function (key) {
			request.setRequestHeader(key, options.headers[key]);
		});
		request.send(options.data);
		return request;
	};

	exports.default = fetch;
	});

	unwrapExports(fetch_1);

	var transitionEnd_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var transitionEnd = function transitionEnd() {
		var el = document.createElement('div');

		var transEndEventNames = {
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'transitionend',
			OTransition: 'oTransitionEnd otransitionend',
			transition: 'transitionend'
		};

		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return transEndEventNames[name];
			}
		}

		return false;
	};

	exports.default = transitionEnd;
	});

	unwrapExports(transitionEnd_1);

	var getCurrentUrl_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var getCurrentUrl = function getCurrentUrl() {
		return window.location.pathname + window.location.search;
	};

	exports.default = getCurrentUrl;
	});

	unwrapExports(getCurrentUrl_1);

	var markSwupElements_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var markSwupElements = function markSwupElements(element, containers) {
		var blocks = 0;

		var _loop = function _loop(i) {
			if (element.querySelector(containers[i]) == null) {
				console.warn('Element ' + containers[i] + ' is not in current page.');
			} else {
				(0, utils.queryAll)(containers[i]).forEach(function (item, index) {
					(0, utils.queryAll)(containers[i], element)[index].setAttribute('data-swup', blocks);
					blocks++;
				});
			}
		};

		for (var i = 0; i < containers.length; i++) {
			_loop(i);
		}
	};

	exports.default = markSwupElements;
	});

	unwrapExports(markSwupElements_1);

	var Link_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Link = function () {
		function Link(elementOrUrl) {
			_classCallCheck(this, Link);

			if (elementOrUrl instanceof Element || elementOrUrl instanceof SVGElement) {
				this.link = elementOrUrl;
			} else {
				this.link = document.createElement('a');
				this.link.href = elementOrUrl;
			}
		}

		_createClass(Link, [{
			key: 'getPath',
			value: function getPath() {
				var path = this.link.pathname;
				if (path[0] !== '/') {
					path = '/' + path;
				}
				return path;
			}
		}, {
			key: 'getAddress',
			value: function getAddress() {
				var path = this.link.pathname + this.link.search;

				if (this.link.getAttribute('xlink:href')) {
					path = this.link.getAttribute('xlink:href');
				}

				if (path[0] !== '/') {
					path = '/' + path;
				}
				return path;
			}
		}, {
			key: 'getHash',
			value: function getHash() {
				return this.link.hash;
			}
		}]);

		return Link;
	}();

	exports.default = Link;
	});

	unwrapExports(Link_1);

	var helpers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Link = exports.markSwupElements = exports.getCurrentUrl = exports.transitionEnd = exports.fetch = exports.getDataFromHtml = exports.createHistoryRecord = exports.classify = undefined;



	var _classify2 = _interopRequireDefault(classify_1);



	var _createHistoryRecord2 = _interopRequireDefault(createHistoryRecord_1);



	var _getDataFromHtml2 = _interopRequireDefault(getDataFromHtml_1);



	var _fetch2 = _interopRequireDefault(fetch_1);



	var _transitionEnd2 = _interopRequireDefault(transitionEnd_1);



	var _getCurrentUrl2 = _interopRequireDefault(getCurrentUrl_1);



	var _markSwupElements2 = _interopRequireDefault(markSwupElements_1);



	var _Link2 = _interopRequireDefault(Link_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var classify = exports.classify = _classify2.default;
	var createHistoryRecord = exports.createHistoryRecord = _createHistoryRecord2.default;
	var getDataFromHtml = exports.getDataFromHtml = _getDataFromHtml2.default;
	var fetch = exports.fetch = _fetch2.default;
	var transitionEnd = exports.transitionEnd = _transitionEnd2.default;
	var getCurrentUrl = exports.getCurrentUrl = _getCurrentUrl2.default;
	var markSwupElements = exports.markSwupElements = _markSwupElements2.default;
	var Link = exports.Link = _Link2.default;
	});

	unwrapExports(helpers);
	var helpers_1 = helpers.Link;
	var helpers_2 = helpers.markSwupElements;
	var helpers_3 = helpers.getCurrentUrl;
	var helpers_4 = helpers.transitionEnd;
	var helpers_5 = helpers.fetch;
	var helpers_6 = helpers.getDataFromHtml;
	var helpers_7 = helpers.createHistoryRecord;
	var helpers_8 = helpers.classify;

	var loadPage_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var loadPage = function loadPage(data, popstate) {
		var _this = this;

		// create array for storing animation promises
		var animationPromises = [],
		    xhrPromise = void 0;
		var animateOut = function animateOut() {
			_this.triggerEvent('animationOutStart');

			// handle classes
			document.documentElement.classList.add('is-changing');
			document.documentElement.classList.add('is-leaving');
			document.documentElement.classList.add('is-animating');
			if (popstate) {
				document.documentElement.classList.add('is-popstate');
			}
			document.documentElement.classList.add('to-' + (0, helpers.classify)(data.url));

			// animation promise stuff
			animationPromises = _this.getAnimationPromises('out');
			Promise.all(animationPromises).then(function () {
				_this.triggerEvent('animationOutDone');
			});

			// create history record if this is not a popstate call
			if (!popstate) {
				// create pop element with or without anchor
				var state = void 0;
				if (_this.scrollToElement != null) {
					state = data.url + _this.scrollToElement;
				} else {
					state = data.url;
				}

				(0, helpers.createHistoryRecord)(state);
			}
		};

		this.triggerEvent('transitionStart', popstate);

		// set transition object
		if (data.customTransition != null) {
			this.updateTransition(window.location.pathname, data.url, data.customTransition);
			document.documentElement.classList.add('to-' + (0, helpers.classify)(data.customTransition));
		} else {
			this.updateTransition(window.location.pathname, data.url);
		}

		// start/skip animation
		if (!popstate || this.options.animateHistoryBrowsing) {
			animateOut();
		} else {
			this.triggerEvent('animationSkipped');
		}

		// start/skip loading of page
		if (this.cache.exists(data.url)) {
			xhrPromise = new Promise(function (resolve) {
				resolve();
			});
			this.triggerEvent('pageRetrievedFromCache');
		} else {
			if (!this.preloadPromise || this.preloadPromise.route != data.url) {
				xhrPromise = new Promise(function (resolve, reject) {
					(0, helpers.fetch)(_extends({}, data, { headers: _this.options.requestHeaders }), function (response) {
						if (response.status === 500) {
							_this.triggerEvent('serverError');
							reject(data.url);
							return;
						} else {
							// get json data
							var page = _this.getPageData(response);
							if (page != null) {
								page.url = data.url;
							} else {
								reject(data.url);
								return;
							}
							// render page
							_this.cache.cacheUrl(page);
							_this.triggerEvent('pageLoaded');
						}
						resolve();
					});
				});
			} else {
				xhrPromise = this.preloadPromise;
			}
		}

		// when everything is ready, handle the outcome
		Promise.all(animationPromises.concat([xhrPromise])).then(function () {
			// render page
			_this.renderPage(_this.cache.getPage(data.url), popstate);
			_this.preloadPromise = null;
		}).catch(function (errorUrl) {
			// rewrite the skipPopStateHandling function to redirect manually when the history.go is processed
			_this.options.skipPopStateHandling = function () {
				window.location = errorUrl;
				return true;
			};

			// go back to the actual page were still at
			window.history.go(-1);
		});
	};

	exports.default = loadPage;
	});

	unwrapExports(loadPage_1);

	var renderPage_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





	var renderPage = function renderPage(page, popstate) {
		var _this = this;

		document.documentElement.classList.remove('is-leaving');

		// replace state in case the url was redirected
		var link = new helpers.Link(page.responseURL);
		if (window.location.pathname !== link.getPath()) {
			window.history.replaceState({
				url: link.getPath(),
				random: Math.random(),
				source: 'swup'
			}, document.title, link.getPath());

			// save new record for redirected url
			this.cache.cacheUrl(_extends({}, page, { url: link.getPath() }));
		}

		// only add for non-popstate transitions
		if (!popstate || this.options.animateHistoryBrowsing) {
			document.documentElement.classList.add('is-rendering');
		}

		this.triggerEvent('willReplaceContent', popstate);

		// replace blocks
		for (var i = 0; i < page.blocks.length; i++) {
			document.body.querySelector('[data-swup="' + i + '"]').outerHTML = page.blocks[i];
		}

		// set title
		document.title = page.title;

		this.triggerEvent('contentReplaced', popstate);
		this.triggerEvent('pageView', popstate);

		// empty cache if it's disabled (because pages could be preloaded and stuff)
		if (!this.options.cache) {
			this.cache.empty();
		}

		// start animation IN
		setTimeout(function () {
			if (!popstate || _this.options.animateHistoryBrowsing) {
				_this.triggerEvent('animationInStart');
				document.documentElement.classList.remove('is-animating');
			}
		}, 10);

		// handle end of animation
		var animationPromises = this.getAnimationPromises('in');
		if (!popstate || this.options.animateHistoryBrowsing) {
			Promise.all(animationPromises).then(function () {
				_this.triggerEvent('animationInDone');
				_this.triggerEvent('transitionEnd', popstate);
				// remove "to-{page}" classes
				document.documentElement.className.split(' ').forEach(function (classItem) {
					if (new RegExp('^to-').test(classItem) || classItem === 'is-changing' || classItem === 'is-rendering' || classItem === 'is-popstate') {
						document.documentElement.classList.remove(classItem);
					}
				});
			});
		} else {
			this.triggerEvent('transitionEnd', popstate);
		}

		// reset scroll-to element
		this.scrollToElement = null;
	};

	exports.default = renderPage;
	});

	unwrapExports(renderPage_1);

	var triggerEvent_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var triggerEvent = function triggerEvent(eventName, originalEvent) {
		// call saved handlers with "on" method and pass originalEvent object if available
		this._handlers[eventName].forEach(function (handler) {
			try {
				handler(originalEvent);
			} catch (error) {
				console.error(error);
			}
		});

		// trigger event on document with prefix "swup:"
		var event = new CustomEvent('swup:' + eventName, { detail: eventName });
		document.dispatchEvent(event);
	};

	exports.default = triggerEvent;
	});

	unwrapExports(triggerEvent_1);

	var on_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var on = function on(event, handler) {
		if (this._handlers[event]) {
			this._handlers[event].push(handler);
		} else {
			console.warn("Unsupported event " + event + ".");
		}
	};

	exports.default = on;
	});

	unwrapExports(on_1);

	var off_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var off = function off(event, handler) {
		var _this = this;

		if (event != null) {
			if (handler != null) {
				if (this._handlers[event] && this._handlers[event].filter(function (savedHandler) {
					return savedHandler === handler;
				}).length) {
					var toRemove = this._handlers[event].filter(function (savedHandler) {
						return savedHandler === handler;
					})[0];
					var index = this._handlers[event].indexOf(toRemove);
					if (index > -1) {
						this._handlers[event].splice(index, 1);
					}
				} else {
					console.warn("Handler for event '" + event + "' no found.");
				}
			} else {
				this._handlers[event] = [];
			}
		} else {
			Object.keys(this._handlers).forEach(function (keys) {
				_this._handlers[keys] = [];
			});
		}
	};

	exports.default = off;
	});

	unwrapExports(off_1);

	var updateTransition_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var updateTransition = function updateTransition(from, to, custom) {
		// transition routes
		this.transition = {
			from: from,
			to: to,
			custom: custom
		};
	};

	exports.default = updateTransition;
	});

	unwrapExports(updateTransition_1);

	var getAnimationPromises_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});





	var getAnimationPromises = function getAnimationPromises() {
		var promises = [];
		var animatedElements = (0, utils.queryAll)(this.options.animationSelector);
		animatedElements.forEach(function (element) {
			var promise = new Promise(function (resolve) {
				element.addEventListener((0, helpers.transitionEnd)(), function (event) {
					if (element == event.target) {
						resolve();
					}
				});
			});
			promises.push(promise);
		});
		return promises;
	};

	exports.default = getAnimationPromises;
	});

	unwrapExports(getAnimationPromises_1);

	var getPageData_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var getPageData = function getPageData(request) {
		// this method can be replaced in case other content than html is expected to be received from server
		// this function should always return {title, pageClass, originalContent, blocks, responseURL}
		// in case page has invalid structure - return null
		var html = request.responseText;
		var pageObject = (0, helpers.getDataFromHtml)(html, this.options.containers);

		if (pageObject) {
			pageObject.responseURL = request.responseURL ? request.responseURL : window.location.href;
		} else {
			console.warn('Received page is invalid.');
			return null;
		}

		return pageObject;
	};

	exports.default = getPageData;
	});

	unwrapExports(getPageData_1);

	var plugins = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var use = exports.use = function use(plugin) {
		if (!plugin.isSwupPlugin) {
			console.warn('Not swup plugin instance ' + plugin + '.');
			return;
		}

		this.plugins.push(plugin);
		plugin.swup = this;
		if (typeof plugin._beforeMount === 'function') {
			plugin._beforeMount();
		}
		plugin.mount();

		return this.plugins;
	};

	var unuse = exports.unuse = function unuse(plugin) {
		var pluginReference = void 0;

		if (typeof plugin === 'string') {
			pluginReference = this.plugins.find(function (p) {
				return plugin === p.name;
			});
		} else {
			pluginReference = plugin;
		}

		if (!pluginReference) {
			console.warn('No such plugin.');
			return;
		}

		pluginReference.unmount();

		if (typeof pluginReference._afterUnmount === 'function') {
			pluginReference._afterUnmount();
		}

		var index = this.plugins.indexOf(pluginReference);
		this.plugins.splice(index, 1);

		return this.plugins;
	};

	var findPlugin = exports.findPlugin = function findPlugin(pluginName) {
		return this.plugins.find(function (p) {
			return pluginName === p.name;
		});
	};
	});

	unwrapExports(plugins);
	var plugins_1 = plugins.use;
	var plugins_2 = plugins.unuse;
	var plugins_3 = plugins.findPlugin;

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	// modules




	var _delegate2 = _interopRequireDefault(delegate_1);



	var _Cache2 = _interopRequireDefault(Cache_1);



	var _loadPage2 = _interopRequireDefault(loadPage_1);



	var _renderPage2 = _interopRequireDefault(renderPage_1);



	var _triggerEvent2 = _interopRequireDefault(triggerEvent_1);



	var _on2 = _interopRequireDefault(on_1);



	var _off2 = _interopRequireDefault(off_1);



	var _updateTransition2 = _interopRequireDefault(updateTransition_1);



	var _getAnimationPromises2 = _interopRequireDefault(getAnimationPromises_1);



	var _getPageData2 = _interopRequireDefault(getPageData_1);







	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Swup = function () {
		function Swup(setOptions) {
			_classCallCheck(this, Swup);

			// default options
			var defaults = {
				animateHistoryBrowsing: false,
				animationSelector: '[class*="transition-"]',
				linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
				cache: true,
				containers: ['#swup'],
				requestHeaders: {
					'X-Requested-With': 'swup',
					Accept: 'text/html, application/xhtml+xml'
				},
				plugins: [],
				skipPopStateHandling: function skipPopStateHandling(event) {
					return !(event.state && event.state.source === 'swup');
				}
			};

			// merge options
			var options = _extends({}, defaults, setOptions);

			// handler arrays
			this._handlers = {
				animationInDone: [],
				animationInStart: [],
				animationOutDone: [],
				animationOutStart: [],
				animationSkipped: [],
				clickLink: [],
				contentReplaced: [],
				disabled: [],
				enabled: [],
				openPageInNewTab: [],
				pageLoaded: [],
				pageRetrievedFromCache: [],
				pageView: [],
				popState: [],
				samePage: [],
				samePageWithHash: [],
				serverError: [],
				transitionStart: [],
				transitionEnd: [],
				willReplaceContent: []
			};

			// variable for id of element to scroll to after render
			this.scrollToElement = null;
			// variable for promise used for preload, so no new loading of the same page starts while page is loading
			this.preloadPromise = null;
			// variable for save options
			this.options = options;
			// variable for plugins array
			this.plugins = [];
			// variable for current transition object
			this.transition = {};
			// variable for keeping event listeners from "delegate"
			this.delegatedListeners = {};

			// make modules accessible in instance
			this.cache = new _Cache2.default();
			this.cache.swup = this;
			this.loadPage = _loadPage2.default;
			this.renderPage = _renderPage2.default;
			this.triggerEvent = _triggerEvent2.default;
			this.on = _on2.default;
			this.off = _off2.default;
			this.updateTransition = _updateTransition2.default;
			this.getAnimationPromises = _getAnimationPromises2.default;
			this.getPageData = _getPageData2.default;
			this.log = function () {}; // here so it can be used by plugins
			this.use = plugins.use;
			this.unuse = plugins.unuse;
			this.findPlugin = plugins.findPlugin;

			// enable swup
			this.enable();
		}

		_createClass(Swup, [{
			key: 'enable',
			value: function enable() {
				var _this = this;

				// check for Promise support
				if (typeof Promise === 'undefined') {
					console.warn('Promise is not supported');
					return;
				}

				// add event listeners
				this.delegatedListeners.click = (0, _delegate2.default)(document, this.options.linkSelector, 'click', this.linkClickHandler.bind(this));
				window.addEventListener('popstate', this.popStateHandler.bind(this));

				// initial save to cache
				var page = (0, helpers.getDataFromHtml)(document.documentElement.outerHTML, this.options.containers);
				page.url = page.responseURL = (0, helpers.getCurrentUrl)();
				if (this.options.cache) {
					this.cache.cacheUrl(page);
				}

				// mark swup blocks in html
				(0, helpers.markSwupElements)(document.documentElement, this.options.containers);

				// mount plugins
				this.options.plugins.forEach(function (plugin) {
					_this.use(plugin);
				});

				// modify initial history record
				window.history.replaceState(Object.assign({}, window.history.state, {
					url: window.location.href,
					random: Math.random(),
					source: 'swup'
				}), document.title, window.location.href);

				// trigger enabled event
				this.triggerEvent('enabled');

				// add swup-enabled class to html tag
				document.documentElement.classList.add('swup-enabled');

				// trigger page view event
				this.triggerEvent('pageView');
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				var _this2 = this;

				// remove delegated listeners
				this.delegatedListeners.click.destroy();
				this.delegatedListeners.mouseover.destroy();

				// remove popstate listener
				window.removeEventListener('popstate', this.popStateHandler.bind(this));

				// empty cache
				this.cache.empty();

				// unmount plugins
				this.options.plugins.forEach(function (plugin) {
					_this2.unuse(plugin);
				});

				// remove swup data atributes from blocks
				(0, utils.queryAll)('[data-swup]').forEach(function (element) {
					element.removeAttribute('data-swup');
				});

				// remove handlers
				this.off();

				// trigger disable event
				this.triggerEvent('disabled');

				// remove swup-enabled class from html tag
				document.documentElement.classList.remove('swup-enabled');
			}
		}, {
			key: 'linkClickHandler',
			value: function linkClickHandler(event) {
				// no control key pressed
				if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
					// index of pressed button needs to be checked because Firefox triggers click on all mouse buttons
					if (event.button === 0) {
						this.triggerEvent('clickLink', event);
						event.preventDefault();
						var link = new helpers.Link(event.delegateTarget);
						if (link.getAddress() == (0, helpers.getCurrentUrl)() || link.getAddress() == '') {
							// link to the same URL
							if (link.getHash() != '') {
								// link to the same URL with hash
								this.triggerEvent('samePageWithHash', event);
								var element = document.querySelector(link.getHash());
								if (element != null) {
									history.replaceState({
										url: link.getAddress() + link.getHash(),
										random: Math.random(),
										source: 'swup'
									}, document.title, link.getAddress() + link.getHash());
								} else {
									// referenced element not found
									console.warn('Element for offset not found (' + link.getHash() + ')');
								}
							} else {
								// link to the same URL without hash
								this.triggerEvent('samePage', event);
							}
						} else {
							// link to different url
							if (link.getHash() != '') {
								this.scrollToElement = link.getHash();
							}

							// get custom transition from data
							var customTransition = event.delegateTarget.getAttribute('data-swup-transition');

							// load page
							this.loadPage({ url: link.getAddress(), customTransition: customTransition }, false);
						}
					}
				} else {
					// open in new tab (do nothing)
					this.triggerEvent('openPageInNewTab', event);
				}
			}
		}, {
			key: 'popStateHandler',
			value: function popStateHandler(event) {
				if (this.options.skipPopStateHandling(event)) return;
				var link = new helpers.Link(event.state ? event.state.url : window.location.pathname);
				if (link.getHash() !== '') {
					this.scrollToElement = link.getHash();
				} else {
					event.preventDefault();
				}
				this.triggerEvent('popState', event);
				this.loadPage({ url: link.getAddress() }, event);
			}
		}]);

		return Swup;
	}();

	exports.default = Swup;
	});

	var Swup = unwrapExports(lib);

	const runningOnBrowser = typeof window !== "undefined";

	const isBot =
		(runningOnBrowser && !("onscroll" in window)) ||
		(typeof navigator !== "undefined" &&
			/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

	const supportsIntersectionObserver =
		runningOnBrowser &&
		"IntersectionObserver" in window &&
		"IntersectionObserverEntry" in window &&
		"intersectionRatio" in window.IntersectionObserverEntry.prototype &&
		"isIntersecting" in window.IntersectionObserverEntry.prototype;

	const supportsClassList =
		runningOnBrowser && "classList" in document.createElement("p");

	const defaultSettings = {
		elements_selector: "img",
		container: isBot || runningOnBrowser ? document : null,
		threshold: 300,
		thresholds: null,
		data_src: "src",
		data_srcset: "srcset",
		data_sizes: "sizes",
		data_bg: "bg",
		class_loading: "loading",
		class_loaded: "loaded",
		class_error: "error",
		load_delay: 0,
		auto_unobserve: true,
		callback_enter: null,
		callback_exit: null,
		callback_reveal: null,
		callback_loaded: null,
		callback_error: null,
		callback_finish: null,
		use_native: false
	};

	var getInstanceSettings = customSettings => {
		return Object.assign({}, defaultSettings, customSettings);
	};

	/* Creates instance and notifies it through the window element */
	const createInstance = function(classObj, options) {
		var event;
		let eventString = "LazyLoad::Initialized";
		let instance = new classObj(options);
		try {
			// Works in modern browsers
			event = new CustomEvent(eventString, { detail: { instance } });
		} catch (err) {
			// Works in Internet Explorer (all versions)
			event = document.createEvent("CustomEvent");
			event.initCustomEvent(eventString, false, false, { instance });
		}
		window.dispatchEvent(event);
	};

	/* Auto initialization of one or more instances of lazyload, depending on the 
	    options passed in (plain object or an array) */
	function autoInitialize(classObj, options) {
		if (!options) {
			return;
		}
		if (!options.length) {
			// Plain object
			createInstance(classObj, options);
		} else {
			// Array of objects
			for (let i = 0, optionsItem; (optionsItem = options[i]); i += 1) {
				createInstance(classObj, optionsItem);
			}
		}
	}

	const dataPrefix = "data-";
	const processedDataName = "was-processed";
	const timeoutDataName = "ll-timeout";
	const trueString = "true";

	const getData = (element, attribute) => {
		return element.getAttribute(dataPrefix + attribute);
	};

	const setData = (element, attribute, value) => {
		var attrName = dataPrefix + attribute;
		if (value === null) {
			element.removeAttribute(attrName);
			return;
		}
		element.setAttribute(attrName, value);
	};

	const setWasProcessedData = element =>
		setData(element, processedDataName, trueString);

	const getWasProcessedData = element =>
		getData(element, processedDataName) === trueString;

	const setTimeoutData = (element, value) =>
		setData(element, timeoutDataName, value);

	const getTimeoutData = element => getData(element, timeoutDataName);

	const purgeProcessedElements = elements => {
		return elements.filter(element => !getWasProcessedData(element));
	};

	const purgeOneElement = (elements, elementToPurge) => {
		return elements.filter(element => element !== elementToPurge);
	};

	const callbackIfSet = (callback, argument) => {
		if (callback) {
			callback(argument);
		}
	};

	const updateLoadingCount = (instance, plusMinus) => {
		instance._loadingCount += plusMinus;
		if (instance._elements.length === 0 && instance._loadingCount === 0) {
			callbackIfSet(instance._settings.callback_finish);
		}
	};

	const getSourceTags = parentTag => {
		let sourceTags = [];
		for (let i = 0, childTag; (childTag = parentTag.children[i]); i += 1) {
			if (childTag.tagName === "SOURCE") {
				sourceTags.push(childTag);
			}
		}
		return sourceTags;
	};

	const setAttributeIfValue = (element, attrName, value) => {
		if (!value) {
			return;
		}
		element.setAttribute(attrName, value);
	};

	const setImageAttributes = (element, settings) => {
		setAttributeIfValue(
			element,
			"sizes",
			getData(element, settings.data_sizes)
		);
		setAttributeIfValue(
			element,
			"srcset",
			getData(element, settings.data_srcset)
		);
		setAttributeIfValue(element, "src", getData(element, settings.data_src));
	};

	const setSourcesImg = (element, settings) => {
		const parent = element.parentNode;

		if (parent && parent.tagName === "PICTURE") {
			let sourceTags = getSourceTags(parent);
			sourceTags.forEach(sourceTag => {
				setImageAttributes(sourceTag, settings);
			});
		}

		setImageAttributes(element, settings);
	};

	const setSourcesIframe = (element, settings) => {
		setAttributeIfValue(element, "src", getData(element, settings.data_src));
	};

	const setSourcesVideo = (element, settings) => {
		let sourceTags = getSourceTags(element);
		sourceTags.forEach(sourceTag => {
			setAttributeIfValue(
				sourceTag,
				"src",
				getData(sourceTag, settings.data_src)
			);
		});
		setAttributeIfValue(element, "src", getData(element, settings.data_src));
		element.load();
	};

	const setSourcesBgImage = (element, settings) => {
		const srcDataValue = getData(element, settings.data_src);
		const bgDataValue = getData(element, settings.data_bg);

		if (srcDataValue) {
			element.style.backgroundImage = `url("${srcDataValue}")`;
		}

		if (bgDataValue) {
			element.style.backgroundImage = bgDataValue;
		}
	};

	const setSourcesFunctions = {
		IMG: setSourcesImg,
		IFRAME: setSourcesIframe,
		VIDEO: setSourcesVideo
	};

	const setSources = (element, instance) => {
		const settings = instance._settings;
		const tagName = element.tagName;
		const setSourcesFunction = setSourcesFunctions[tagName];
		if (setSourcesFunction) {
			setSourcesFunction(element, settings);
			updateLoadingCount(instance, 1);
			instance._elements = purgeOneElement(instance._elements, element);
			return;
		}
		setSourcesBgImage(element, settings);
	};

	const addClass = (element, className) => {
		if (supportsClassList) {
			element.classList.add(className);
			return;
		}
		element.className += (element.className ? " " : "") + className;
	};

	const removeClass = (element, className) => {
		if (supportsClassList) {
			element.classList.remove(className);
			return;
		}
		element.className = element.className.
			replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").
			replace(/^\s+/, "").
			replace(/\s+$/, "");
	};

	const genericLoadEventName = "load";
	const mediaLoadEventName = "loadeddata";
	const errorEventName = "error";

	const addEventListener = (element, eventName, handler) => {
		element.addEventListener(eventName, handler);
	};

	const removeEventListener = (element, eventName, handler) => {
		element.removeEventListener(eventName, handler);
	};

	const addEventListeners = (element, loadHandler, errorHandler) => {
		addEventListener(element, genericLoadEventName, loadHandler);
		addEventListener(element, mediaLoadEventName, loadHandler);
		addEventListener(element, errorEventName, errorHandler);
	};

	const removeEventListeners = (element, loadHandler, errorHandler) => {
		removeEventListener(element, genericLoadEventName, loadHandler);
		removeEventListener(element, mediaLoadEventName, loadHandler);
		removeEventListener(element, errorEventName, errorHandler);
	};

	const eventHandler = function(event, success, instance) {
		var settings = instance._settings;
		const className = success ? settings.class_loaded : settings.class_error;
		const callback = success
			? settings.callback_loaded
			: settings.callback_error;
		const element = event.target;

		removeClass(element, settings.class_loading);
		addClass(element, className);
		callbackIfSet(callback, element);

		updateLoadingCount(instance, -1);
	};

	const addOneShotEventListeners = (element, instance) => {
		const loadHandler = event => {
			eventHandler(event, true, instance);
			removeEventListeners(element, loadHandler, errorHandler);
		};
		const errorHandler = event => {
			eventHandler(event, false, instance);
			removeEventListeners(element, loadHandler, errorHandler);
		};
		addEventListeners(element, loadHandler, errorHandler);
	};

	const managedTags = ["IMG", "IFRAME", "VIDEO"];

	const onEnter = (element, instance) => {
		const settings = instance._settings;
		callbackIfSet(settings.callback_enter, element);
		if (!settings.load_delay) {
			revealAndUnobserve(element, instance);
			return;
		}
		delayLoad(element, instance);
	};

	const revealAndUnobserve = (element, instance) => {
		var observer = instance._observer;
		revealElement(element, instance);
		if (observer && instance._settings.auto_unobserve) {
			observer.unobserve(element);
		}
	};

	const onExit = (element, instance) => {
		const settings = instance._settings;
		callbackIfSet(settings.callback_exit, element);
		if (!settings.load_delay) {
			return;
		}
		cancelDelayLoad(element);
	};

	const cancelDelayLoad = element => {
		var timeoutId = getTimeoutData(element);
		if (!timeoutId) {
			return; // do nothing if timeout doesn't exist
		}
		clearTimeout(timeoutId);
		setTimeoutData(element, null);
	};

	const delayLoad = (element, instance) => {
		var loadDelay = instance._settings.load_delay;
		var timeoutId = getTimeoutData(element);
		if (timeoutId) {
			return; // do nothing if timeout already set
		}
		timeoutId = setTimeout(function() {
			revealAndUnobserve(element, instance);
			cancelDelayLoad(element);
		}, loadDelay);
		setTimeoutData(element, timeoutId);
	};

	const revealElement = (element, instance, force) => {
		var settings = instance._settings;
		if (!force && getWasProcessedData(element)) {
			return; // element has already been processed and force wasn't true
		}
		if (managedTags.indexOf(element.tagName) > -1) {
			addOneShotEventListeners(element, instance);
			addClass(element, settings.class_loading);
		}
		setSources(element, instance);
		setWasProcessedData(element);
		callbackIfSet(settings.callback_reveal, element);
		callbackIfSet(settings.callback_set, element);
	};

	const isIntersecting = entry =>
		entry.isIntersecting || entry.intersectionRatio > 0;

	const getObserverSettings = settings => ({
		root: settings.container === document ? null : settings.container,
		rootMargin: settings.thresholds || settings.threshold + "px"
	});

	const setObserver = instance => {
		if (!supportsIntersectionObserver) {
			return false;
		}
		instance._observer = new IntersectionObserver(entries => {
			entries.forEach(entry =>
				isIntersecting(entry)
					? onEnter(entry.target, instance)
					: onExit(entry.target, instance)
			);
		}, getObserverSettings(instance._settings));
		return true;
	};

	const nativeLazyTags = ["IMG", "IFRAME"];

	const shouldUseNative = settings =>
		settings.use_native && "loading" in HTMLImageElement.prototype;

	const loadAllNative = instance => {
		instance._elements.forEach(element => {
			if (nativeLazyTags.indexOf(element.tagName) === -1) {
				return;
			}
			element.setAttribute("loading", "lazy");
			revealElement(element, instance);
		});
	};

	const nodeSetToArray = nodeSet => Array.prototype.slice.call(nodeSet);

	const queryElements = settings =>
		settings.container.querySelectorAll(settings.elements_selector);

	const getElements = (elements, settings) =>
		purgeProcessedElements(nodeSetToArray(elements || queryElements(settings)));

	const LazyLoad = function(customSettings, elements) {
		this._settings = getInstanceSettings(customSettings);
		this._loadingCount = 0;
		setObserver(this);
		this.update(elements);
	};

	LazyLoad.prototype = {
		update: function(elements) {
			var settings = this._settings;
			this._elements = getElements(elements, settings);
			if (isBot || !this._observer) {
				this.loadAll();
				return;
			}
			if (shouldUseNative(settings)) {
				loadAllNative(this);
				this._elements = getElements(elements, settings);
			}
			this._elements.forEach(element => {
				this._observer.observe(element);
			});
		},

		destroy: function() {
			if (this._observer) {
				this._elements.forEach(element => {
					this._observer.unobserve(element);
				});
				this._observer = null;
			}
			this._elements = null;
			this._settings = null;
		},

		load: function(element, force) {
			revealElement(element, this, force);
		},

		loadAll: function() {
			this._elements.forEach(element => {
				revealAndUnobserve(element, this);
			});
		}
	};

	/* Automatic instances creation if required (useful for async script loading) */
	if (runningOnBrowser) {
		autoInitialize(LazyLoad, window.lazyLoadOptions);
	}

	var lib$1 = createCommonjsModule(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(window, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {


	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _index2.default; // this is here for webpack to expose SwupTheme as window.SwupTheme

	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _theme = __webpack_require__(2);

	var _theme2 = _interopRequireDefault(_theme);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SlideTheme = function (_Theme) {
		_inherits(SlideTheme, _Theme);

		function SlideTheme(options) {
			_classCallCheck(this, SlideTheme);

			var _this = _possibleConstructorReturn(this, (SlideTheme.__proto__ || Object.getPrototypeOf(SlideTheme)).call(this));

			_this.name = 'SlideTheme';


			var defaultOptions = {
				mainElement: '#swup',
				reversed: false
			};

			_this.options = _extends({}, defaultOptions, options);
			return _this;
		}

		_createClass(SlideTheme, [{
			key: 'mount',
			value: function mount() {
				this.applyStyles(_index2.default);
				this.addClassName(this.options.mainElement, 'main');
				if (this.options.reversed) {
					document.documentElement.classList.add('swup-theme-reverse');
				}
			}
		}, {
			key: 'unmount',
			value: function unmount() {
				document.documentElement.classList.remove('swup-theme-reverse');
			}
		}]);

		return SlideTheme;
	}(_theme2.default);

	exports.default = SlideTheme;

	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Theme = function () {
		function Theme() {
			var _this = this;

			_classCallCheck(this, Theme);

			this._addedStyleElements = [];
			this._addedHTMLContent = [];
			this._classNameAddedToElements = [];

			this._addClassNameToElement = function () {
				_this._classNameAddedToElements.forEach(function (item) {
					var elements = Array.prototype.slice.call(document.querySelectorAll(item.selector));
					elements.forEach(function (element) {
						element.classList.add('swup-transition-' + item.name);
					});
				});
			};

			this.isSwupPlugin = true;
		}

		_createClass(Theme, [{
			key: '_beforeMount',
			value: function _beforeMount() {
				// save original and replace animationSelector option
				this._originalAnimationSelectorOption = String(this.swup.options.animationSelector);
				this.swup.options.animationSelector = '[class*="swup-transition-"]';
			}
		}, {
			key: '_afterUnmount',
			value: function _afterUnmount() {
				// reset animationSelector option
				this.swup.options.animationSelector = this._originalAnimationSelectorOption;

				// remove added styles
				this._addedStyleElements.forEach(function (element) {
					element.outerHTML = '';
					element = null;
				});

				// remove added HTML
				this._addedHTMLContent.forEach(function (element) {
					element.outerHTML = '';
					element = null;
				});

				// remove added classnames
				this._classNameAddedToElements.forEach(function (item) {
					var elements = Array.prototype.slice.call(document.querySelectorAll(item.selector));
					elements.forEach(function (element) {
						element.className.split(' ').forEach(function (classItem) {
							if (new RegExp('^swup-transition-').test(classItem)) {
								element.classList.remove(classItem);
							}
						});
					});
				});

				this.swup.off('contentReplaced', this._addClassNameToElement);
			}
		}, {
			key: 'mount',
			value: function mount() {
				// this is mount method rewritten by class extending
				// and is executed when swup is enabled with theme
			}
		}, {
			key: 'unmount',
			value: function unmount() {
				// this is unmount method rewritten by class extending
				// and is executed when swup with theme is disabled
			}
		}, {
			key: 'applyStyles',
			value: function applyStyles(styles) {
				var head = document.head;
				var style = document.createElement('style');

				style.setAttribute('data-swup-theme', '');
				style.appendChild(document.createTextNode(styles));

				this._addedStyleElements.push(style);
				head.prepend(style);
			}
		}, {
			key: 'applyHTML',
			value: function applyHTML(content) {
				var element = document.createElement('div');
				element.innerHTML = content;
				this._addedHTMLContent.push(element);
				document.body.appendChild(element);
			}
		}, {
			key: 'addClassName',
			value: function addClassName(selector, name) {
				this._classNameAddedToElements.push({ selector: selector, name: name });

				// save so it can be later removed
				this._addClassNameToElement();

				this.swup.on('contentReplaced', this._addClassNameToElement);
			}

			// this is here so we can tell if plugin was created by extending this class

		}]);

		return Theme;
	}();

	exports.default = Theme;

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)(false);
	// Module
	exports.push([module.i, ".swup-transition-main {\n  opacity: 1;\n  transition: opacity 0.3s, transform 0.4s;\n  transform: translate3d(0, 0, 0);\n}\nhtml.is-animating .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, -60px, 0);\n}\nhtml.is-animating.is-leaving .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, 60px, 0);\n}\nhtml.is-animating.swup-theme-reverse .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, 60px, 0);\n}\nhtml.is-animating.swup-theme-reverse.is-leaving .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, -60px, 0);\n}\n", ""]);



	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {


	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function (useSourceMap) {
	  var list = []; // return the list of modules as css string

	  list.toString = function toString() {
	    return this.map(function (item) {
	      var content = cssWithMappingToString(item, useSourceMap);

	      if (item[2]) {
	        return '@media ' + item[2] + '{' + content + '}';
	      } else {
	        return content;
	      }
	    }).join('');
	  }; // import a list of modules into the list


	  list.i = function (modules, mediaQuery) {
	    if (typeof modules === 'string') {
	      modules = [[null, modules, '']];
	    }

	    var alreadyImportedModules = {};

	    for (var i = 0; i < this.length; i++) {
	      var id = this[i][0];

	      if (id != null) {
	        alreadyImportedModules[id] = true;
	      }
	    }

	    for (i = 0; i < modules.length; i++) {
	      var item = modules[i]; // skip already imported module
	      // this implementation is not 100% perfect for weird media query combinations
	      // when a module is imported multiple times with different media queries.
	      // I hope this will never occur (Hey this way we have smaller bundles)

	      if (item[0] == null || !alreadyImportedModules[item[0]]) {
	        if (mediaQuery && !item[2]) {
	          item[2] = mediaQuery;
	        } else if (mediaQuery) {
	          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
	        }

	        list.push(item);
	      }
	    }
	  };

	  return list;
	};

	function cssWithMappingToString(item, useSourceMap) {
	  var content = item[1] || '';
	  var cssMapping = item[3];

	  if (!cssMapping) {
	    return content;
	  }

	  if (useSourceMap && typeof btoa === 'function') {
	    var sourceMapping = toComment(cssMapping);
	    var sourceURLs = cssMapping.sources.map(function (source) {
	      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
	    });
	    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	  }

	  return [content].join('\n');
	} // Adapted from convert-source-map (MIT)


	function toComment(sourceMap) {
	  // eslint-disable-next-line no-undef
	  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
	  return '/*# ' + data + ' */';
	}

	/***/ })
	/******/ ]);
	});
	});

	var SwupSlideTheme = unwrapExports(lib$1);

	var webfontloader = createCommonjsModule(function (module) {
	/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return +new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document;}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild);}function v(a){a.parentNode&&a.parentNode.removeChild(a);}
	function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e]);}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e]);}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"");}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return !0;return !1}
	function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null);}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d();},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d();}):setTimeout(function(){e=!0;d();},0);u(a,"head",b);}
	function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f));};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")));},d||5E3);return f}return null}function B(){this.a=0;this.c=null;}function C(a){a.a++;return function(){a.a--;D(a);}}function E(a,b){a.c=b;D(a);}function D(a){0==a.a&&a.c&&(a.c(),a.c=null);}function F(a){this.a=a||"-";}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10));}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d);}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
	function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b}function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes;}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading");}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d);}K(a,"inactive");}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]();}function ja(){this.c={};}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c));}return d}function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f);}function N(a){u(a.c,"body",a.a);}function O(a){return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")}function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0;}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25);},function(){e();});}f();}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f);});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a);},function(){b.j(b.a);});};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
	O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m);}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10));}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this);};
	function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return !0;return !1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v);}function ma(a){setTimeout(p(function(){U(this);},a),50);}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a);},a),0);}function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c;}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this);};
	W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e);}K(b,"fontinactive",a);na(this);};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a));}function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0;}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a);};
	function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
	X=x?42<parseInt(x[1],10):xa?!1:!0;}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r);}for(h=0;h<l.length;h++)l[h].start();}},0);}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c);});}function ra(a,b){this.c=a;this.a=b;}
	ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k));}a(e);}else setTimeout(function(){b();},50);}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
	d]=function(){return c.a},b());}).id="__MonotypeAPIScript__"+d;}else a([]);};function sa(a,b){this.c=a;this.a=b;}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f);});};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||"";}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f));}}
	function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b}function ya(a){this.f=a;this.a=[];this.c={};}
	var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
	Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
	function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("");}}else k="";k&&g.push(k);}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
	g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d));}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]));}}function Ea(a,b){this.c=a;this.a=b;}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa);});};function Ga(a,b){this.c=a;this.a=b;}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0});}catch(l){}a(e);}},2E3):a([]);};function Ha(a,b){this.c=a;this.f=b;this.a=[];}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)));}a(d.a);},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([]);})):a([]);};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());
	});

	webfontloader.load({
	  google: {
	    families: ["Inconsolata", "Literata&display=swap"]
	  }
	});

	const id = "UA-37531241-1";

	(function(i, s, o, g, r, a, m) {
	  i["idObject"] = r;
	  (i[r] =
	    i[r] ||
	    function() {
	      (i[r].q = i[r].q || []).push(arguments);
	    }),
	    (i[r].l = 1 * new Date());
	  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
	  a.async = 1;
	  a.src = g;
	  m.parentNode.insertBefore(a, m);
	})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

	ga("create", id, "auto");
	ga("send", "pageview");

	const ll = new LazyLoad({ elements_selector: ".lazyload" });
	const sw = new Swup({
	  plugins: [new SwupSlideTheme()]
	});

	const handleAchor = () => {
	  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	    anchor.addEventListener("click", function(e) {
	      e.preventDefault();

	      document.querySelector(this.getAttribute("href")).scrollIntoView({
	        behavior: "smooth"
	      });
	    });
	  });
	};

	handleAchor();

	sw.on("contentReplaced", () => {
	  ll.update();
	  handleAchor();
	  ga("send", "pageview");
	});

}());