(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _bifMouseTimeDisplay = __webpack_require__(1);

	var _bifMouseTimeDisplay2 = _interopRequireDefault(_bifMouseTimeDisplay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	videojs.registerComponent('BIFMouseTimeDisplay', _bifMouseTimeDisplay2.default);

	/**
	 * Replace component implementation.
	 */

	/* global videojs */

	/* eslint-disable no-underscore-dangle */

	/**
	 * Register component.
	 */

	var VjsSeekBar = videojs.getComponent('SeekBar');

	var vjsSeekBarChildren = VjsSeekBar.prototype.options_.children;

	var mouseTimeDisplayIndex = vjsSeekBarChildren.indexOf('mouseTimeDisplay');

	vjsSeekBarChildren.splice(mouseTimeDisplayIndex, 1, 'BIFMouseTimeDisplay');

	/**
	 * Register plugin for easier component configurability.
	 *
	 * @param {Object} [options]
	 * @param {ArrayBuffer} options.data
	 * @param {function} [options.createBIFImage]
	 * @param {function} [options.createBIFTime] 
	 * @param {function} [options.template]
	 * @param {string} [options.src] 
	 */
	videojs.plugin('bif', function bifPlugin() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var BIFMouseTimeDisplay = this.player_.controlBar.progressControl.seekBar.BIFMouseTimeDisplay;


	  if (options.src) {

	    this.player_.addClass('video-has-bif');

	    var request = new XMLHttpRequest();

	    request.open('GET', options.src, true);
	    request.responseType = 'arraybuffer';

	    request.onload = function (event) {
	      if (event.target.status !== 200) {
	        return;
	      }

	      BIFMouseTimeDisplay.render({
	        data: event.target.response
	      });
	    };

	    request.send(null);
	  }

	  this.player_.controlBar.progressControl.on('mousemove', function (event) {

	    BIFMouseTimeDisplay.handleMouseMove(event, this.el().offsetLeft);
	  });

	  this.player_.controlBar.progressControl.on('mouseout', function (event) {

	    BIFMouseTimeDisplay.handleMouseOut();
	  });
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(30);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(75);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _parser = __webpack_require__(87);

	var _dom = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global videojs */

	/* eslint-disable no-underscore-dangle */

	var defaults = {
	  createBIFImage: Function.prototype,
	  createBIFTime: Function.prototype,
	  template: Function.prototype
	};

	var VjsMouseTimeDisplay = videojs.getComponent('MouseTimeDisplay');

	/**
	 * Extends the `MouseTimeDisplay` component with an image preview based on a the time
	 * at which the user hovers over the `SeekBar`.
	 *
	 * @example
	 * videojs('player').ready(function () {
	 *   this.bif({
	 *     src: '/path/to/bif.bif',
	 *   });
	 * });
	 *
	 * videojs('player').ready(function () {
	 *   this.bif({
	 *     data: event.target.response,
	 *   });
	 * });
	 *
	 * @param {Object} [options]
	 * @param {ArrayBuffer} options.data
	 * @param {function} [options.createBIFImage]
	 * @param {function} [options.createBIFTime]
	 * @param {function} [options.template]
	 */

	var BIFMouseTimeDisplay = function (_VjsMouseTimeDisplay) {
	  (0, _inherits3.default)(BIFMouseTimeDisplay, _VjsMouseTimeDisplay);
	  (0, _createClass3.default)(BIFMouseTimeDisplay, null, [{
	    key: 'createBIFElement',

	    /**
	     * Create BIF element.
	     *
	     * @param {HTMLElement} root
	     * @returns {HTMLElement} BIFElement
	     */
	    value: function createBIFElement(root) {
	      var BIFElement = document.createElement('div');

	      BIFElement.className = 'bif-thumbnail';

	      root.appendChild(BIFElement);

	      return BIFElement;
	    }

	    /**
	     * Create BIF image element.
	     *
	     * @returns {HTMLElement} BIFImage
	     */

	  }, {
	    key: 'createBIFImage',
	    value: function createBIFImage() {
	      var BIFImage = document.createElement('img');

	      BIFImage.className = 'bif-image';

	      return BIFImage;
	    }

	    /**
	     * Create BIF time element.
	     *
	     * @returns {HTMLElement} BIFTime
	     */

	  }, {
	    key: 'createBIFTime',
	    value: function createBIFTime() {
	      var BIFTime = document.createElement('span');

	      BIFTime.className = 'bif-time';

	      return BIFTime;
	    }
	  }]);

	  function BIFMouseTimeDisplay(player) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    (0, _classCallCheck3.default)(this, BIFMouseTimeDisplay);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (BIFMouseTimeDisplay.__proto__ || (0, _getPrototypeOf2.default)(BIFMouseTimeDisplay)).call(this, player, options));

	    _this.BIFElement = BIFMouseTimeDisplay.createBIFElement(player.el());

	    _this.render(options);

	    return _this;
	  }

	  /**
	   * Configures the component with new options. If one of those options is data,
	   * then the component attempts to convert that data into usable BIF image previews.
	   *
	   * @param {Object} [options]
	   * @param {ArrayBuffer} options.data
	   * @param {function} [options.createBIFImage]
	   * @param {function} [options.createBIFTime]
	   * @param {function} [options.template]
	   */


	  (0, _createClass3.default)(BIFMouseTimeDisplay, [{
	    key: 'configure',
	    value: function configure(options) {
	      this.options_ = videojs.mergeOptions(defaults, this.options_, options);

	      var data = options.data;


	      if (data instanceof ArrayBuffer) {
	        this.BIFParser = new _parser.BIFParser(data);
	      } else if (data != null) {
	        throw new Error('Invalid BIF data.');
	      }
	    }

	    /**
	     * Gets the current BIF image at a specific time in seconds.
	     *
	     * @param {number} time in seconds
	     * @returns {string} image base64 encoded image
	     */

	  }, {
	    key: 'getCurrentImageAtTime',
	    value: function getCurrentImageAtTime(time) {

	      var image = void 0;

	      if (this.hasImages()) {
	        image = this.BIFParser.getImageDataAtSecond(time);
	      }

	      return image;
	    }

	    /**
	     * Gets the current time in seconds based on the mouse position over the `SeekBar`.
	     *
	     * @param {Event} event
	     * @returns {number} time
	     */

	  }, {
	    key: 'getCurrentTimeAtEvent',
	    value: function getCurrentTimeAtEvent(event) {
	      var seekBar = this.player_.controlBar.progressControl.seekBar;


	      var position = (0, _dom.getPointerPosition)(event, seekBar.el());

	      return position.x * this.player_.duration();
	    }

	    /**
	     * Event that fires every time the mouse is moved, throttled, over the `ProgressControl`.
	     *
	     * @param {Event} event
	     */

	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(event, parent) {

	      if (!event) {

	        return;
	      }

	      // gets the time in seconds
	      var time = this.getCurrentTimeAtEvent(event);

	      // gets the image
	      var image = this.getCurrentImageAtTime(time);

	      this.BIFElement.style.display = 'block';
	      this.BIFElement.style.left = event.offsetX + parent + 'px';

	      if (image) {

	        this.BIFImage.src = image;
	      }

	      this.BIFTime.innerHTML = videojs.formatTime(Math.floor(time));
	    }
	  }, {
	    key: 'handleMouseOut',
	    value: function handleMouseOut() {

	      this.BIFElement.style.display = 'none';
	    }

	    /**
	     * Determines the existence of the `BIFParser` which manages the index and all
	     * associated images.
	     *
	     * @returns {boolean}
	     */

	  }, {
	    key: 'hasImages',
	    value: function hasImages() {
	      return !!this.BIFParser;
	    }

	    /**
	     * Renders and rerenders the BIF component. It manages the three main elements
	     * of the component—`BIFImage`, `BIFTime`, and the `template`.
	     *
	     * @param {Object} [options]
	     * @param {ArrayBuffer} options.data
	     * @param {function} [options.createBIFImage]
	     * @param {function} [options.createBIFTime]
	     * @param {function} [options.template]
	     */

	  }, {
	    key: 'render',
	    value: function render(options) {
	      this.configure(options);

	      // create BIF image element

	      var BIFImage = this.options_.createBIFImage.apply(this);

	      if (BIFImage instanceof HTMLElement) {
	        this.BIFImage = BIFImage;
	      } else {
	        this.BIFImage = BIFMouseTimeDisplay.createBIFImage();
	      }

	      // create BIF time element

	      var BIFTime = this.options_.createBIFTime.apply(this);

	      if (BIFTime instanceof HTMLElement) {
	        this.BIFTime = BIFTime;
	      } else {
	        this.BIFTime = BIFMouseTimeDisplay.createBIFTime();
	      }

	      // create BIF template element

	      var template = this.options_.template.apply(this);

	      if (!(template instanceof HTMLElement)) {
	        template = this.template();
	      }

	      // replace template contents every render

	      this.BIFElement.innerHTML = '';

	      this.BIFElement.appendChild(template);
	    }

	    /**
	     * The primary template for the component. Typically houses the `BIFImage` and
	     * `BIFTime` elements to be styled or altered.
	     *
	     * @returns {HTMLElement} template
	     */

	  }, {
	    key: 'template',
	    value: function template() {
	      var template = document.createElement('div');

	      template.className = 'bif';
	      template.id = 'bif';

	      // append image element only if the images are ready
	      if (this.hasImages()) {
	        template.appendChild(this.BIFImage);
	      }

	      template.appendChild(this.BIFTime);

	      return template;
	    }
	  }]);
	  return BIFMouseTimeDisplay;
	}(VjsMouseTimeDisplay);

	exports.default = BIFMouseTimeDisplay;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(11).Object.getPrototypeOf;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(5);
	var $getPrototypeOf = __webpack_require__(7);

	__webpack_require__(15)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(8);
	var toObject = __webpack_require__(5);
	var IE_PROTO = __webpack_require__(9)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(10)('keys');
	var uid = __webpack_require__(14);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(11);
	var global = __webpack_require__(12);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(13) ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(16);
	var core = __webpack_require__(11);
	var fails = __webpack_require__(25);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(12);
	var core = __webpack_require__(11);
	var ctx = __webpack_require__(17);
	var hide = __webpack_require__(19);
	var has = __webpack_require__(8);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(20);
	var createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21);
	var IE8_DOM_DEFINE = __webpack_require__(23);
	var toPrimitive = __webpack_require__(27);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function () {
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	var document = __webpack_require__(12).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(31);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(32);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	__webpack_require__(55);
	module.exports = __webpack_require__(59).f('iterator');


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(35)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(37)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36);
	var defined = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(13);
	var $export = __webpack_require__(16);
	var redefine = __webpack_require__(38);
	var hide = __webpack_require__(19);
	var Iterators = __webpack_require__(39);
	var $iterCreate = __webpack_require__(40);
	var setToStringTag = __webpack_require__(53);
	var getPrototypeOf = __webpack_require__(7);
	var ITERATOR = __webpack_require__(54)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(41);
	var descriptor = __webpack_require__(28);
	var setToStringTag = __webpack_require__(53);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(54)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(21);
	var dPs = __webpack_require__(42);
	var enumBugKeys = __webpack_require__(51);
	var IE_PROTO = __webpack_require__(9)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(52).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(20);
	var anObject = __webpack_require__(21);
	var getKeys = __webpack_require__(43);

	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(44);
	var enumBugKeys = __webpack_require__(51);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(8);
	var toIObject = __webpack_require__(45);
	var arrayIndexOf = __webpack_require__(48)(false);
	var IE_PROTO = __webpack_require__(9)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(46);
	var defined = __webpack_require__(6);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(47);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(45);
	var toLength = __webpack_require__(49);
	var toAbsoluteIndex = __webpack_require__(50);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(36);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(12).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f;
	var has = __webpack_require__(8);
	var TAG = __webpack_require__(54)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(10)('wks');
	var uid = __webpack_require__(14);
	var Symbol = __webpack_require__(12).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var global = __webpack_require__(12);
	var hide = __webpack_require__(19);
	var Iterators = __webpack_require__(39);
	var TO_STRING_TAG = __webpack_require__(54)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(57);
	var step = __webpack_require__(58);
	var Iterators = __webpack_require__(39);
	var toIObject = __webpack_require__(45);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(54);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	module.exports = __webpack_require__(11).Symbol;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(12);
	var has = __webpack_require__(8);
	var DESCRIPTORS = __webpack_require__(24);
	var $export = __webpack_require__(16);
	var redefine = __webpack_require__(38);
	var META = __webpack_require__(63).KEY;
	var $fails = __webpack_require__(25);
	var shared = __webpack_require__(10);
	var setToStringTag = __webpack_require__(53);
	var uid = __webpack_require__(14);
	var wks = __webpack_require__(54);
	var wksExt = __webpack_require__(59);
	var wksDefine = __webpack_require__(64);
	var enumKeys = __webpack_require__(65);
	var isArray = __webpack_require__(68);
	var anObject = __webpack_require__(21);
	var isObject = __webpack_require__(22);
	var toObject = __webpack_require__(5);
	var toIObject = __webpack_require__(45);
	var toPrimitive = __webpack_require__(27);
	var createDesc = __webpack_require__(28);
	var _create = __webpack_require__(41);
	var gOPNExt = __webpack_require__(69);
	var $GOPD = __webpack_require__(71);
	var $GOPS = __webpack_require__(66);
	var $DP = __webpack_require__(20);
	var $keys = __webpack_require__(43);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(67).f = $propertyIsEnumerable;
	  $GOPS.f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(13)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

	$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return $GOPS.f(toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(14)('meta');
	var isObject = __webpack_require__(22);
	var has = __webpack_require__(8);
	var setDesc = __webpack_require__(20).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(12);
	var core = __webpack_require__(11);
	var LIBRARY = __webpack_require__(13);
	var wksExt = __webpack_require__(59);
	var defineProperty = __webpack_require__(20).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(43);
	var gOPS = __webpack_require__(66);
	var pIE = __webpack_require__(67);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(47);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(45);
	var gOPN = __webpack_require__(70).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(44);
	var hiddenKeys = __webpack_require__(51).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(67);
	var createDesc = __webpack_require__(28);
	var toIObject = __webpack_require__(45);
	var toPrimitive = __webpack_require__(27);
	var has = __webpack_require__(8);
	var IE8_DOM_DEFINE = __webpack_require__(23);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(64)('asyncIterator');


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(64)('observable');


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(76);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	var $Object = __webpack_require__(11).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', { defineProperty: __webpack_require__(20).f });


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(80);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(84);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(31);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(11).Object.setPrototypeOf;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(16);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(83).set });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(22);
	var anObject = __webpack_require__(21);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(17)(Function.call, __webpack_require__(71).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	var $Object = __webpack_require__(11).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(41) });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BIFParser = exports.MAGIC_NUMBER = exports.BIF_INDEX_ENTRY_LENGTH = exports.VERSION_OFFSET = exports.NUMBER_OF_BIF_IMAGES_OFFSET = exports.FRAMEWISE_SEPARATION_OFFSET = exports.BIF_INDEX_OFFSET = undefined;

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(75);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Offsets

	var BIF_INDEX_OFFSET = exports.BIF_INDEX_OFFSET = 64;
	var FRAMEWISE_SEPARATION_OFFSET = exports.FRAMEWISE_SEPARATION_OFFSET = 16;
	var NUMBER_OF_BIF_IMAGES_OFFSET = exports.NUMBER_OF_BIF_IMAGES_OFFSET = 12;
	var VERSION_OFFSET = exports.VERSION_OFFSET = 8;

	// Metadata

	var BIF_INDEX_ENTRY_LENGTH = exports.BIF_INDEX_ENTRY_LENGTH = 8;

	// Magic Number
	// SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-MagicNumber
	var MAGIC_NUMBER = exports.MAGIC_NUMBER = new Uint8Array(['0x89', '0x42', '0x49', '0x46', '0x0d', '0x0a', '0x1a', '0x0a']);

	/**
	 * Validate the file identifier against the magic number.
	 *
	 * @returns {boolean} isValid
	 */
	function validate(magicNumber) {
	  var isValid = true;

	  MAGIC_NUMBER.forEach(function (byte, i) {
	    if (byte !== magicNumber[i]) {
	      isValid = false;

	      return;
	    }
	  });

	  return isValid;
	}

	/**
	 * Parsing and read BIF file format.
	 *
	 * @param {ArrayBuffer} arrayBuffer
	 */

	var BIFParser = exports.BIFParser = function () {
	  function BIFParser(arrayBuffer) {
	    (0, _classCallCheck3.default)(this, BIFParser);

	    // Magic Number
	    // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-MagicNumber
	    var magicNumber = new Uint8Array(arrayBuffer).slice(0, 8);

	    if (!validate(magicNumber)) {
	      throw new Error('Invalid BIF file.');
	    }

	    this.arrayBuffer = arrayBuffer;

	    this.data = new DataView(arrayBuffer); // eslint-disable-line new-cap

	    // Framewise Separation
	    // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-FramewiseSeparation
	    this.framewiseSeparation = this.data.getUint32(FRAMEWISE_SEPARATION_OFFSET, true) || 1000;

	    // Number of BIF images
	    // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-NumberofBIFimages
	    this.numberOfBIFImages = this.data.getUint32(NUMBER_OF_BIF_IMAGES_OFFSET, true);

	    // Version
	    // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-Version
	    this.version = this.data.getUint32(VERSION_OFFSET, true);

	    this.bifIndex = this.generateBIFIndex(true);
	  }

	  /**
	   * Create the BIF index
	   * SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-BIFindex
	   *
	   * @returns {Array} bifIndex
	   */


	  (0, _createClass3.default)(BIFParser, [{
	    key: 'generateBIFIndex',
	    value: function generateBIFIndex() {
	      var bifIndex = [];

	      for (
	      // BIF index starts at byte 64 (BIF_INDEX_OFFSET)
	      var i = 0, bifIndexEntryOffset = BIF_INDEX_OFFSET; i < this.numberOfBIFImages; i += 1, bifIndexEntryOffset += BIF_INDEX_ENTRY_LENGTH) {
	        var bifIndexEntryTimestampOffset = bifIndexEntryOffset;
	        var bifIndexEntryAbsoluteOffset = bifIndexEntryOffset + 4;

	        var nextBifIndexEntryAbsoluteOffset = bifIndexEntryAbsoluteOffset + BIF_INDEX_ENTRY_LENGTH;

	        // Documented example, items within `[]`are used to generate the frame.
	        // 64, 65, 66, 67 | 68, 69, 70, 71
	        // [Frame 0 timestamp] | [absolute offset of frame]
	        // 72, 73, 74, 75 | 76, 77, 78, 79
	        // Frame 1 timestamp | [absolute offset of frame]
	        var offset = this.data.getUint32(bifIndexEntryAbsoluteOffset, true);
	        var nextOffset = this.data.getUint32(nextBifIndexEntryAbsoluteOffset, true);
	        var timestamp = this.data.getUint32(bifIndexEntryTimestampOffset, true);

	        bifIndex.push({
	          offset: offset,
	          timestamp: timestamp,

	          length: nextOffset - offset
	        });
	      }

	      return bifIndex;
	    }

	    /**
	     * Return image data for a specific frame of a movie.
	     *
	     * @param {number} second
	     * @returns {string} imageData
	     */

	  }, {
	    key: 'getImageDataAtSecond',
	    value: function getImageDataAtSecond(second) {

	      var image = 'data:image/jpeg;base64,';

	      // since frames are defined at an interval of `this.framewiseSeparation`,
	      // we need to convert the time into an appropriate frame number.
	      var frameNumber = Math.floor(second / (this.framewiseSeparation / 1000));

	      var frame = this.bifIndex[frameNumber];

	      if (!frame) {
	        return image;
	      }

	      var base64 = btoa(new Uint8Array(this.arrayBuffer.slice(frame.offset, frame.offset + frame.length)).reduce(function (data, byte) {
	        return data + String.fromCharCode(byte);
	      }, ''));

	      return '' + image + base64;
	    }
	  }]);
	  return BIFParser;
	}();

/***/ }),
/* 88 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getElementPosition = getElementPosition;
	exports.getPointerPosition = getPointerPosition;
	/**
	 * @typedef {Object} Point
	 * @property {number} x
	 * @property {number} y
	 */

	/**
	 * @typedef {Object} Offset
	 * @property {number} left
	 * @property {number} top
	 */

	/**
	 * SEE: https://github.com/videojs/video.js/blob/4f6cb03adde9ddf800e2ecf6fa87b07d436b74e8/src/js/utils/dom.js#L438
	 *
	 * @param {HTMLElement} element
	 * @returns {Offset}
	 */
	function getElementPosition(element) {

	  var elementPosition = {
	    left: 0,
	    top: 0
	  };

	  if (element.getBoundingClientRect && element.parentNode) {
	    elementPosition = element.getBoundingClientRect();
	  }

	  var _document = document,
	      body = _document.body,
	      documentElement = _document.documentElement;


	  var clientLeft = documentElement.clientLeft || body.clientLeft || 0;
	  var scrollLeft = window.pageXOffset || body.scrollLeft;

	  var clientTop = documentElement.clientTop || body.clientTop || 0;
	  var scrollTop = window.pageYOffset || body.scrollTop;

	  // Android sometimes returns slightly off decimal values, so need to round
	  return {
	    left: Math.round(elementPosition.left + (scrollLeft - clientLeft)),
	    top: Math.round(elementPosition.top + (scrollTop - clientTop))
	  };
	}

	/**
	 * SEE: https://github.com/videojs/video.js/blob/4f6cb03adde9ddf800e2ecf6fa87b07d436b74e8/src/js/utils/dom.js#L480
	 *
	 * @param {Event} event
	 * @param {HTMLElement} element
	 * @returns {Point}
	 */
	function getPointerPosition(event, element) {

	  var elementPosition = getElementPosition(element);

	  var elementWidth = element.offsetWidth;
	  var elementHeight = element.offsetHeight;

	  var pageX = event.pageX,
	      pageY = event.pageY;


	  if (event.changedTouches) {
	    var _event$changedTouches = event.changedTouches[0];
	    pageX = _event$changedTouches.pageX;
	    pageY = _event$changedTouches.pageY;
	  }

	  return {
	    x: Math.max(0, Math.min(1, (event.pageX - elementPosition.left) / elementWidth)),
	    y: Math.max(0, Math.min(1, (elementPosition.top - event.pageY + elementHeight) / elementHeight))
	  };
	}

/***/ })
/******/ ])
});
;