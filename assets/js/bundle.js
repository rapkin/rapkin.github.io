!function(){"use strict";function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function t(e,t){return e(t={exports:{}},t.exports),t.exports}if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}var r=function(e,t){for(;e&&9!==e.nodeType;){if("function"==typeof e.matches&&e.matches(t))return e;e=e.parentNode}};function o(e,t,n,o){return function(n){n.delegateTarget=r(n.target,t),n.delegateTarget&&o.call(e,n)}}var a=function(e,t,n,r,a){var i=o.apply(this,arguments);return e.addEventListener(n,i,a),{destroy:function(){e.removeEventListener(n,i,a)}}},i=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var r=t.Cache=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pages={},this.last=null}return n(e,[{key:"cacheUrl",value:function(e){e.url in this.pages==!1&&(this.pages[e.url]=e),this.last=this.pages[e.url],this.swup.log("Cache ("+Object.keys(this.pages).length+")",this.pages)}},{key:"getPage",value:function(e){return this.pages[e]}},{key:"getCurrentPage",value:function(){return this.getPage(window.location.pathname+window.location.search)}},{key:"exists",value:function(e){return e in this.pages}},{key:"empty",value:function(){this.pages={},this.last=null,this.swup.log("Cache cleared")}},{key:"remove",value:function(e){delete this.pages[e]}}]),e}();t.default=r}));e(i);i.Cache;var s=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e.toString().toLowerCase().replace(/\s+/g,"-").replace(/\//g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"");return"/"===t[0]&&(t=t.splice(1)),""===t&&(t="homepage"),t}}));e(s);var l=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){window.history.pushState({url:e||window.location.href.split(window.location.hostname)[1],random:Math.random(),source:"swup"},document.getElementsByTagName("title")[0].innerText,e||window.location.href.split(window.location.hostname)[1])}}));e(l);var u=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.query=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"!=typeof e?e:t.querySelector(e)},t.queryAll=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"!=typeof e?e:Array.prototype.slice.call(t.querySelectorAll(e))}}));e(u);u.query,u.queryAll;var c=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=function(e,t){var r=e.replace("<body",'<div id="swupBody"').replace("</body>","</div>"),o=document.createElement("div");o.innerHTML=r;for(var a=[],i=function(e){if(null==o.querySelector(t[e]))return{v:null};(0,u.queryAll)(t[e]).forEach((function(n,r){(0,u.queryAll)(t[e],o)[r].setAttribute("data-swup",a.length),a.push((0,u.queryAll)(t[e],o)[r].outerHTML)}))},s=0;s<t.length;s++){var l=i(s);if("object"===(void 0===l?"undefined":n(l)))return l.v}var c={title:o.querySelector("title").innerText,pageClass:o.querySelector("#swupBody").className,originalContent:e,blocks:a};return o.innerHTML="",o=null,c}}));e(c);var d=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r={url:window.location.pathname+window.location.search,method:"GET",data:null,headers:{}},o=n({},r,e),a=new XMLHttpRequest;return a.onreadystatechange=function(){4===a.readyState&&(a.status,t(a))},a.open(o.method,o.url,!0),Object.keys(o.headers).forEach((function(e){a.setRequestHeader(e,o.headers[e])})),a.send(o.data),a}}));e(d);var f=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=document.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t)if(void 0!==e.style[n])return t[n];return!1}}));e(f);var h=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){return window.location.pathname+window.location.search}}));e(h);var p=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){for(var n=0,r=function(r){null==e.querySelector(t[r])?console.warn("Element "+t[r]+" is not in current page."):(0,u.queryAll)(t[r]).forEach((function(o,a){(0,u.queryAll)(t[r],e)[a].setAttribute("data-swup",n),n++}))},o=0;o<t.length;o++)r(o)}}));e(p);var m=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t instanceof Element||t instanceof SVGElement?this.link=t:(this.link=document.createElement("a"),this.link.href=t)}return n(e,[{key:"getPath",value:function(){var e=this.link.pathname;return"/"!==e[0]&&(e="/"+e),e}},{key:"getAddress",value:function(){var e=this.link.pathname+this.link.search;return this.link.getAttribute("xlink:href")&&(e=this.link.getAttribute("xlink:href")),"/"!==e[0]&&(e="/"+e),e}},{key:"getHash",value:function(){return this.link.hash}}]),e}();t.default=r}));e(m);var g=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Link=t.markSwupElements=t.getCurrentUrl=t.transitionEnd=t.fetch=t.getDataFromHtml=t.createHistoryRecord=t.classify=void 0;var n=y(s),r=y(l),o=y(c),a=y(d),i=y(f),u=y(h),g=y(p),v=y(m);function y(e){return e&&e.__esModule?e:{default:e}}t.classify=n.default,t.createHistoryRecord=r.default,t.getDataFromHtml=o.default,t.fetch=a.default,t.transitionEnd=i.default,t.getCurrentUrl=u.default,t.markSwupElements=g.default,t.Link=v.default}));e(g);g.Link,g.markSwupElements,g.getCurrentUrl,g.transitionEnd,g.fetch,g.getDataFromHtml,g.createHistoryRecord,g.classify;var v=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e,t){var r=this,o=[],a=void 0;this.triggerEvent("transitionStart",t),null!=e.customTransition?(this.updateTransition(window.location.pathname,e.url,e.customTransition),document.documentElement.classList.add("to-"+(0,g.classify)(e.customTransition))):this.updateTransition(window.location.pathname,e.url),!t||this.options.animateHistoryBrowsing?function(){if(r.triggerEvent("animationOutStart"),document.documentElement.classList.add("is-changing"),document.documentElement.classList.add("is-leaving"),document.documentElement.classList.add("is-animating"),t&&document.documentElement.classList.add("is-popstate"),document.documentElement.classList.add("to-"+(0,g.classify)(e.url)),o=r.getAnimationPromises("out"),Promise.all(o).then((function(){r.triggerEvent("animationOutDone")})),!t){var n=void 0;n=null!=r.scrollToElement?e.url+r.scrollToElement:e.url,(0,g.createHistoryRecord)(n)}}():this.triggerEvent("animationSkipped"),this.cache.exists(e.url)?(a=new Promise((function(e){e()})),this.triggerEvent("pageRetrievedFromCache")):a=this.preloadPromise&&this.preloadPromise.route==e.url?this.preloadPromise:new Promise((function(t,o){(0,g.fetch)(n({},e,{headers:r.options.requestHeaders}),(function(n){if(500===n.status)return r.triggerEvent("serverError"),void o(e.url);var a=r.getPageData(n);null!=a?(a.url=e.url,r.cache.cacheUrl(a),r.triggerEvent("pageLoaded"),t()):o(e.url)}))})),Promise.all(o.concat([a])).then((function(){r.renderPage(r.cache.getPage(e.url),t),r.preloadPromise=null})).catch((function(e){r.options.skipPopStateHandling=function(){return window.location=e,!0},window.history.go(-1)}))}}));e(v);var y=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e,t){var r=this;document.documentElement.classList.remove("is-leaving");var o=new g.Link(e.responseURL);window.location.pathname!==o.getPath()&&(window.history.replaceState({url:o.getPath(),random:Math.random(),source:"swup"},document.title,o.getPath()),this.cache.cacheUrl(n({},e,{url:o.getPath()}))),t&&!this.options.animateHistoryBrowsing||document.documentElement.classList.add("is-rendering"),this.triggerEvent("willReplaceContent",t);for(var a=0;a<e.blocks.length;a++)document.body.querySelector('[data-swup="'+a+'"]').outerHTML=e.blocks[a];document.title=e.title,this.triggerEvent("contentReplaced",t),this.triggerEvent("pageView",t),this.options.cache||this.cache.empty(),setTimeout((function(){t&&!r.options.animateHistoryBrowsing||(r.triggerEvent("animationInStart"),document.documentElement.classList.remove("is-animating"))}),10);var i=this.getAnimationPromises("in");!t||this.options.animateHistoryBrowsing?Promise.all(i).then((function(){r.triggerEvent("animationInDone"),r.triggerEvent("transitionEnd",t),document.documentElement.className.split(" ").forEach((function(e){(new RegExp("^to-").test(e)||"is-changing"===e||"is-rendering"===e||"is-popstate"===e)&&document.documentElement.classList.remove(e)}))})):this.triggerEvent("transitionEnd",t),this.scrollToElement=null}}));e(y);var w=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){this._handlers[e].forEach((function(e){try{e(t)}catch(e){console.error(e)}}));var n=new CustomEvent("swup:"+e,{detail:e});document.dispatchEvent(n)}}));e(w);var _=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){this._handlers[e]?this._handlers[e].push(t):console.warn("Unsupported event "+e+".")}}));e(_);var b=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){var n=this;if(null!=e)if(null!=t)if(this._handlers[e]&&this._handlers[e].filter((function(e){return e===t})).length){var r=this._handlers[e].filter((function(e){return e===t}))[0],o=this._handlers[e].indexOf(r);o>-1&&this._handlers[e].splice(o,1)}else console.warn("Handler for event '"+e+"' no found.");else this._handlers[e]=[];else Object.keys(this._handlers).forEach((function(e){n._handlers[e]=[]}))}}));e(b);var E=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){this.transition={from:e,to:t,custom:n}}}));e(E);var k=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=[];return(0,u.queryAll)(this.options.animationSelector).forEach((function(t){var n=new Promise((function(e){t.addEventListener((0,g.transitionEnd)(),(function(n){t==n.target&&e()}))}));e.push(n)})),e}}));e(k);var P=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e.responseText,n=(0,g.getDataFromHtml)(t,this.options.containers);return n?(n.responseURL=e.responseURL?e.responseURL:window.location.href,n):(console.warn("Received page is invalid."),null)}}));e(P);var O=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.use=function(e){if(e.isSwupPlugin)return this.plugins.push(e),e.swup=this,"function"==typeof e._beforeMount&&e._beforeMount(),e.mount(),this.plugins;console.warn("Not swup plugin instance "+e+".")},t.unuse=function(e){var t=void 0;if(t="string"==typeof e?this.plugins.find((function(t){return e===t.name})):e){t.unmount(),"function"==typeof t._afterUnmount&&t._afterUnmount();var n=this.plugins.indexOf(t);return this.plugins.splice(n,1),this.plugins}console.warn("No such plugin.")},t.findPlugin=function(e){return this.plugins.find((function(t){return e===t.name}))}}));e(O);O.use,O.unuse,O.findPlugin;var S=e(t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=L(a),s=L(i),l=L(v),c=L(y),d=L(w),f=L(_),h=L(b),p=L(E),m=L(k),S=L(P);function L(e){return e&&e.__esModule?e:{default:e}}var M=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var r={animateHistoryBrowsing:!1,animationSelector:'[class*="transition-"]',linkSelector:'a[href^="'+window.location.origin+'"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',cache:!0,containers:["#swup"],requestHeaders:{"X-Requested-With":"swup",Accept:"text/html, application/xhtml+xml"},plugins:[],skipPopStateHandling:function(e){return!(e.state&&"swup"===e.state.source)}},o=n({},r,t);this._handlers={animationInDone:[],animationInStart:[],animationOutDone:[],animationOutStart:[],animationSkipped:[],clickLink:[],contentReplaced:[],disabled:[],enabled:[],openPageInNewTab:[],pageLoaded:[],pageRetrievedFromCache:[],pageView:[],popState:[],samePage:[],samePageWithHash:[],serverError:[],transitionStart:[],transitionEnd:[],willReplaceContent:[]},this.scrollToElement=null,this.preloadPromise=null,this.options=o,this.plugins=[],this.transition={},this.delegatedListeners={},this.cache=new s.default,this.cache.swup=this,this.loadPage=l.default,this.renderPage=c.default,this.triggerEvent=d.default,this.on=f.default,this.off=h.default,this.updateTransition=p.default,this.getAnimationPromises=m.default,this.getPageData=S.default,this.log=function(){},this.use=O.use,this.unuse=O.unuse,this.findPlugin=O.findPlugin,this.enable()}return r(e,[{key:"enable",value:function(){var e=this;if("undefined"!=typeof Promise){this.delegatedListeners.click=(0,o.default)(document,this.options.linkSelector,"click",this.linkClickHandler.bind(this)),window.addEventListener("popstate",this.popStateHandler.bind(this));var t=(0,g.getDataFromHtml)(document.documentElement.outerHTML,this.options.containers);t.url=t.responseURL=(0,g.getCurrentUrl)(),this.options.cache&&this.cache.cacheUrl(t),(0,g.markSwupElements)(document.documentElement,this.options.containers),this.options.plugins.forEach((function(t){e.use(t)})),window.history.replaceState(Object.assign({},window.history.state,{url:window.location.href,random:Math.random(),source:"swup"}),document.title,window.location.href),this.triggerEvent("enabled"),document.documentElement.classList.add("swup-enabled"),this.triggerEvent("pageView")}else console.warn("Promise is not supported")}},{key:"destroy",value:function(){var e=this;this.delegatedListeners.click.destroy(),this.delegatedListeners.mouseover.destroy(),window.removeEventListener("popstate",this.popStateHandler.bind(this)),this.cache.empty(),this.options.plugins.forEach((function(t){e.unuse(t)})),(0,u.queryAll)("[data-swup]").forEach((function(e){e.removeAttribute("data-swup")})),this.off(),this.triggerEvent("disabled"),document.documentElement.classList.remove("swup-enabled")}},{key:"linkClickHandler",value:function(e){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)this.triggerEvent("openPageInNewTab",e);else if(0===e.button){this.triggerEvent("clickLink",e),e.preventDefault();var t=new g.Link(e.delegateTarget);if(t.getAddress()==(0,g.getCurrentUrl)()||""==t.getAddress()){if(""!=t.getHash())this.triggerEvent("samePageWithHash",e),null!=document.querySelector(t.getHash())?history.replaceState({url:t.getAddress()+t.getHash(),random:Math.random(),source:"swup"},document.title,t.getAddress()+t.getHash()):console.warn("Element for offset not found ("+t.getHash()+")");else this.triggerEvent("samePage",e)}else{""!=t.getHash()&&(this.scrollToElement=t.getHash());var n=e.delegateTarget.getAttribute("data-swup-transition");this.loadPage({url:t.getAddress(),customTransition:n},!1)}}}},{key:"popStateHandler",value:function(e){if(!this.options.skipPopStateHandling(e)){var t=new g.Link(e.state?e.state.url:window.location.pathname);""!==t.getHash()?this.scrollToElement=t.getHash():e.preventDefault(),this.triggerEvent("popState",e),this.loadPage({url:t.getAddress()},e)}}}]),e}();t.default=M})));const L="undefined"!=typeof window,M=L&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),T=L&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&"isIntersecting"in window.IntersectionObserverEntry.prototype,j=L&&"classList"in document.createElement("p"),A={elements_selector:"img",container:M||L?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1};const H=function(e,t){var n;let r="LazyLoad::Initialized",o=new e(t);try{n=new CustomEvent(r,{detail:{instance:o}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent(r,!1,!1,{instance:o})}window.dispatchEvent(n)};const C="data-",x="was-processed",R="ll-timeout",N="true",q=(e,t)=>e.getAttribute(C+t),I=(e,t,n)=>{var r=C+t;null!==n?e.setAttribute(r,n):e.removeAttribute(r)},U=e=>q(e,x)===N,D=(e,t)=>I(e,R,t),z=e=>q(e,R),B=(e,t)=>{e&&e(t)},F=(e,t)=>{e._loadingCount+=t,0===e._elements.length&&0===e._loadingCount&&B(e._settings.callback_finish)},V=e=>{let t=[];for(let n,r=0;n=e.children[r];r+=1)"SOURCE"===n.tagName&&t.push(n);return t},G=(e,t,n)=>{n&&e.setAttribute(t,n)},K=(e,t)=>{G(e,"sizes",q(e,t.data_sizes)),G(e,"srcset",q(e,t.data_srcset)),G(e,"src",q(e,t.data_src))},W={IMG:(e,t)=>{const n=e.parentNode;if(n&&"PICTURE"===n.tagName){V(n).forEach((e=>{K(e,t)}))}K(e,t)},IFRAME:(e,t)=>{G(e,"src",q(e,t.data_src))},VIDEO:(e,t)=>{V(e).forEach((e=>{G(e,"src",q(e,t.data_src))})),G(e,"src",q(e,t.data_src)),e.load()}},$=(e,t)=>{const n=t._settings,r=e.tagName,o=W[r];if(o)return o(e,n),F(t,1),void(t._elements=(a=t._elements,i=e,a.filter((e=>e!==i))));var a,i;((e,t)=>{const n=q(e,t.data_src),r=q(e,t.data_bg);n&&(e.style.backgroundImage=`url("${n}")`),r&&(e.style.backgroundImage=r)})(e,n)},X=(e,t)=>{j?e.classList.add(t):e.className+=(e.className?" ":"")+t},J="load",Q="loadeddata",Y="error",Z=(e,t,n)=>{e.addEventListener(t,n)},ee=(e,t,n)=>{e.removeEventListener(t,n)},te=(e,t,n)=>{ee(e,J,t),ee(e,Q,t),ee(e,Y,n)},ne=function(e,t,n){var r=n._settings;const o=t?r.class_loaded:r.class_error,a=t?r.callback_loaded:r.callback_error,i=e.target;((e,t)=>{j?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")})(i,r.class_loading),X(i,o),B(a,i),F(n,-1)},re=(e,t)=>{const n=o=>{ne(o,!0,t),te(e,n,r)},r=o=>{ne(o,!1,t),te(e,n,r)};((e,t,n)=>{Z(e,J,t),Z(e,Q,t),Z(e,Y,n)})(e,n,r)},oe=["IMG","IFRAME","VIDEO"],ae=(e,t)=>{var n=t._observer;le(e,t),n&&t._settings.auto_unobserve&&n.unobserve(e)},ie=e=>{var t=z(e);t&&(clearTimeout(t),D(e,null))},se=(e,t)=>{var n=t._settings.load_delay,r=z(e);r||(r=setTimeout((function(){ae(e,t),ie(e)}),n),D(e,r))},le=(e,t,n)=>{var r=t._settings;!n&&U(e)||(oe.indexOf(e.tagName)>-1&&(re(e,t),X(e,r.class_loading)),$(e,t),(e=>{I(e,x,N)})(e),B(r.callback_reveal,e),B(r.callback_set,e))},ue=e=>{return!!T&&(e._observer=new IntersectionObserver((t=>{t.forEach((t=>(e=>e.isIntersecting||e.intersectionRatio>0)(t)?((e,t)=>{const n=t._settings;B(n.callback_enter,e),n.load_delay?se(e,t):ae(e,t)})(t.target,e):((e,t)=>{const n=t._settings;B(n.callback_exit,e),n.load_delay&&ie(e)})(t.target,e)))}),{root:(t=e._settings).container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}),!0);var t},ce=["IMG","IFRAME"],de=(e,t)=>{return(e=>e.filter((e=>!U(e))))((n=e||(e=>e.container.querySelectorAll(e.elements_selector))(t),Array.prototype.slice.call(n)));var n},fe=function(e,t){this._settings=(e=>Object.assign({},A,e))(e),this._loadingCount=0,ue(this),this.update(t)};fe.prototype={update:function(e){var t,n=this._settings;(this._elements=de(e,n),!M&&this._observer)?((e=>e.use_native&&"loading"in HTMLImageElement.prototype)(n)&&((t=this)._elements.forEach((e=>{-1!==ce.indexOf(e.tagName)&&(e.setAttribute("loading","lazy"),le(e,t))})),this._elements=de(e,n)),this._elements.forEach((e=>{this._observer.observe(e)}))):this.loadAll()},destroy:function(){this._observer&&(this._elements.forEach((e=>{this._observer.unobserve(e)})),this._observer=null),this._elements=null,this._settings=null},load:function(e,t){le(e,this,t)},loadAll:function(){this._elements.forEach((e=>{ae(e,this)}))}},L&&function(e,t){if(t)if(t.length)for(let n,r=0;n=t[r];r+=1)H(e,n);else H(e,t)}(fe,window.lazyLoadOptions);var he,pe,me,ge,ve,ye,we=e(t((function(e,t){var n;window,n=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var r,o=n(1),a=(r=o)&&r.__esModule?r:{default:r};e.exports=a.default},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=s(n(2)),i=s(n(3));function s(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.name="SlideTheme",n.options=r({},{mainElement:"#swup",reversed:!1},e),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"mount",value:function(){this.applyStyles(i.default),this.addClassName(this.options.mainElement,"main"),this.options.reversed&&document.documentElement.classList.add("swup-theme-reverse")}},{key:"unmount",value:function(){document.documentElement.classList.remove("swup-theme-reverse")}}]),t}(a.default);t.default=l},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._addedStyleElements=[],this._addedHTMLContent=[],this._classNameAddedToElements=[],this._addClassNameToElement=function(){t._classNameAddedToElements.forEach((function(e){Array.prototype.slice.call(document.querySelectorAll(e.selector)).forEach((function(t){t.classList.add("swup-transition-"+e.name)}))}))},this.isSwupPlugin=!0}return r(e,[{key:"_beforeMount",value:function(){this._originalAnimationSelectorOption=String(this.swup.options.animationSelector),this.swup.options.animationSelector='[class*="swup-transition-"]'}},{key:"_afterUnmount",value:function(){this.swup.options.animationSelector=this._originalAnimationSelectorOption,this._addedStyleElements.forEach((function(e){e.outerHTML="",e=null})),this._addedHTMLContent.forEach((function(e){e.outerHTML="",e=null})),this._classNameAddedToElements.forEach((function(e){Array.prototype.slice.call(document.querySelectorAll(e.selector)).forEach((function(e){e.className.split(" ").forEach((function(t){new RegExp("^swup-transition-").test(t)&&e.classList.remove(t)}))}))})),this.swup.off("contentReplaced",this._addClassNameToElement)}},{key:"mount",value:function(){}},{key:"unmount",value:function(){}},{key:"applyStyles",value:function(e){var t=document.head,n=document.createElement("style");n.setAttribute("data-swup-theme",""),n.appendChild(document.createTextNode(e)),this._addedStyleElements.push(n),t.prepend(n)}},{key:"applyHTML",value:function(e){var t=document.createElement("div");t.innerHTML=e,this._addedHTMLContent.push(t),document.body.appendChild(t)}},{key:"addClassName",value:function(e,t){this._classNameAddedToElements.push({selector:e,name:t}),this._addClassNameToElement(),this.swup.on("contentReplaced",this._addClassNameToElement)}}]),e}();t.default=o},function(e,t,n){(e.exports=n(4)(!1)).push([e.i,".swup-transition-main {\n  opacity: 1;\n  transition: opacity 0.3s, transform 0.4s;\n  transform: translate3d(0, 0, 0);\n}\nhtml.is-animating .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, -60px, 0);\n}\nhtml.is-animating.is-leaving .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, 60px, 0);\n}\nhtml.is-animating.swup-theme-reverse .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, 60px, 0);\n}\nhtml.is-animating.swup-theme-reverse.is-leaving .swup-transition-main {\n  opacity: 0;\n  transform: translate3d(0, -60px, 0);\n}\n",""])},function(e,t,n){e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n,r=e[1]||"",o=e[3];if(!o)return r;if(t&&"function"==typeof btoa){var a=(n=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),i=o.sources.map((function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"}));return[r].concat(i).concat([a]).join("\n")}return[r].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];null!=i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}}])},e.exports=n()})));he=window,pe=document,me="script",ge="ga",he.idObject=ge,he.ga=he.ga||function(){(he.ga.q=he.ga.q||[]).push(arguments)},he.ga.l=1*new Date,ve=pe.createElement(me),ye=pe.getElementsByTagName(me)[0],ve.async=1,ve.src="//www.google-analytics.com/analytics.js",ye.parentNode.insertBefore(ve,ye),ga("create","UA-37531241-1","auto"),ga("send","pageview",location.pathname);var _e=new fe({elements_selector:".lazyload"}),be=new S({plugins:[new we]}),Ee=function(){document.querySelectorAll('a[href^="#"]').forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth"})}))}))};Ee(),be.on("contentReplaced",(function(){_e.update(),Ee(),ga("send","pageview",location.pathname)}))}();
