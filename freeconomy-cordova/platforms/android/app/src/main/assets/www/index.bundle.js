/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/index.less":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/index.less ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./img/logo.png */ "./src/img/logo.png");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
exports.push([module.i, "/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n* {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  /* make transparent link selection, adjust last value opacity 0 to 1.0 */\n}\nbody {\n  -webkit-touch-callout: none;\n  /* prevent callout to copy image, etc when tap to hold */\n  -webkit-text-size-adjust: none;\n  /* prevent webkit from resizing text to fit */\n  -webkit-user-select: none;\n  /* prevent copy paste, to allow, change 'none' to 'text' */\n  background-color: #E4E4E4;\n  background-image: linear-gradient(top, #A7A7A7 0%, #E4E4E4 51%);\n  font-family: system-ui, -apple-system, -apple-system-font, 'Segoe UI', 'Roboto', sans-serif;\n  font-size: 12px;\n  height: 100vh;\n  margin: 0px;\n  padding: 0px;\n  /* Padding to avoid the \"unsafe\" areas behind notches in the screen */\n  padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-right, 0px);\n  text-transform: uppercase;\n  width: 100%;\n}\n/* Portrait layout (default) */\n.app {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center top;\n  /* 170px x 200px */\n  position: absolute;\n  /* position in the center of the screen */\n  left: 50%;\n  top: 50%;\n  height: 50px;\n  /* text area height */\n  width: 225px;\n  /* text area width */\n  text-align: center;\n  padding: 180px 0px 0px 0px;\n  /* image height is 200px (bottom 20px are overlapped with text) */\n  margin: -115px 0px 0px -112px;\n  /* offset vertical: half of image height and text area height */\n  /* offset horizontal: half of text area width */\n}\n/* Landscape layout (with min-width) */\n@media screen and (min-aspect-ratio: 1) and (min-width: 400px) {\n  .app {\n    background-position: left center;\n    padding: 75px 0px 75px 170px;\n    /* padding-top + padding-bottom + text area = image height */\n    margin: -90px 0px 0px -198px;\n    /* offset vertical: half of image height */\n    /* offset horizontal: half of image width and text area width */\n  }\n}\nh1 {\n  font-size: 24px;\n  font-weight: normal;\n  margin: 0px;\n  overflow: visible;\n  padding: 0px;\n  text-align: center;\n}\n.event {\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  color: #FFFFFF;\n  font-size: 12px;\n  margin: 0px 30px;\n  padding: 2px 0px;\n}\n.event.listening {\n  background-color: #333333;\n  display: block;\n}\n.event.received {\n  background-color: #4B946A;\n  display: none;\n}\n@keyframes fade {\n  from {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fade {\n  from {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.blink {\n  animation: fade 3000ms infinite;\n  -webkit-animation: fade 3000ms infinite;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/img/logo.png":
/*!**************************!*\
  !*** ./src/img/logo.png ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/index.less":
/*!************************!*\
  !*** ./src/index.less ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/index.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./index.less */ "./src/index.less");
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        if (!parentElement) {
            return;
        }
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        if (!listeningElement || !receivedElement) {
            return;
        }
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
        // console.log("ouiii", device.model);
    }
};
app.initialize();
console.log("test ludo");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1nL2xvZ28ucG5nIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5sZXNzPzJiODMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xG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LGdCQUFnQixDQUFDLENBQUM7UUFFeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNyQyxzQ0FBc0M7SUFDMUMsQ0FBQztDQUNKLENBQUM7QUFFRixHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSByZXF1aXJlKFwiLi9pbWcvbG9nby5wbmdcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qXFxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXFxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcXG4gKiBcXFwiTGljZW5zZVxcXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXFxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxcbiAqXFxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXFxuICpcXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXFxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cXG4gKiBcXFwiQVMgSVNcXFwiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXFxuICogdW5kZXIgdGhlIExpY2Vuc2UuXFxuICovXFxuKiB7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAvKiBtYWtlIHRyYW5zcGFyZW50IGxpbmsgc2VsZWN0aW9uLCBhZGp1c3QgbGFzdCB2YWx1ZSBvcGFjaXR5IDAgdG8gMS4wICovXFxufVxcbmJvZHkge1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLyogcHJldmVudCBjYWxsb3V0IHRvIGNvcHkgaW1hZ2UsIGV0YyB3aGVuIHRhcCB0byBob2xkICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAvKiBwcmV2ZW50IHdlYmtpdCBmcm9tIHJlc2l6aW5nIHRleHQgdG8gZml0ICovXFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLyogcHJldmVudCBjb3B5IHBhc3RlLCB0byBhbGxvdywgY2hhbmdlICdub25lJyB0byAndGV4dCcgKi9cXG4gIGJhY2tncm91bmQtY29sb3I6ICNFNEU0RTQ7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjQTdBN0E3IDAlLCAjRTRFNEU0IDUxJSk7XFxuICBmb250LWZhbWlseTogc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCAtYXBwbGUtc3lzdGVtLWZvbnQsICdTZWdvZSBVSScsICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG1hcmdpbjogMHB4O1xcbiAgcGFkZGluZzogMHB4O1xcbiAgLyogUGFkZGluZyB0byBhdm9pZCB0aGUgXFxcInVuc2FmZVxcXCIgYXJlYXMgYmVoaW5kIG5vdGNoZXMgaW4gdGhlIHNjcmVlbiAqL1xcbiAgcGFkZGluZzogZW52KHNhZmUtYXJlYS1pbnNldC10b3AsIDBweCkgZW52KHNhZmUtYXJlYS1pbnNldC1yaWdodCwgMHB4KSBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSwgMHB4KSBlbnYoc2FmZS1hcmVhLWluc2V0LXJpZ2h0LCAwcHgpO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4vKiBQb3J0cmFpdCBsYXlvdXQgKGRlZmF1bHQpICovXFxuLmFwcCB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgdG9wO1xcbiAgLyogMTcwcHggeCAyMDBweCAqL1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgLyogcG9zaXRpb24gaW4gdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuICovXFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIGhlaWdodDogNTBweDtcXG4gIC8qIHRleHQgYXJlYSBoZWlnaHQgKi9cXG4gIHdpZHRoOiAyMjVweDtcXG4gIC8qIHRleHQgYXJlYSB3aWR0aCAqL1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMTgwcHggMHB4IDBweCAwcHg7XFxuICAvKiBpbWFnZSBoZWlnaHQgaXMgMjAwcHggKGJvdHRvbSAyMHB4IGFyZSBvdmVybGFwcGVkIHdpdGggdGV4dCkgKi9cXG4gIG1hcmdpbjogLTExNXB4IDBweCAwcHggLTExMnB4O1xcbiAgLyogb2Zmc2V0IHZlcnRpY2FsOiBoYWxmIG9mIGltYWdlIGhlaWdodCBhbmQgdGV4dCBhcmVhIGhlaWdodCAqL1xcbiAgLyogb2Zmc2V0IGhvcml6b250YWw6IGhhbGYgb2YgdGV4dCBhcmVhIHdpZHRoICovXFxufVxcbi8qIExhbmRzY2FwZSBsYXlvdXQgKHdpdGggbWluLXdpZHRoKSAqL1xcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4tYXNwZWN0LXJhdGlvOiAxKSBhbmQgKG1pbi13aWR0aDogNDAwcHgpIHtcXG4gIC5hcHAge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IGNlbnRlcjtcXG4gICAgcGFkZGluZzogNzVweCAwcHggNzVweCAxNzBweDtcXG4gICAgLyogcGFkZGluZy10b3AgKyBwYWRkaW5nLWJvdHRvbSArIHRleHQgYXJlYSA9IGltYWdlIGhlaWdodCAqL1xcbiAgICBtYXJnaW46IC05MHB4IDBweCAwcHggLTE5OHB4O1xcbiAgICAvKiBvZmZzZXQgdmVydGljYWw6IGhhbGYgb2YgaW1hZ2UgaGVpZ2h0ICovXFxuICAgIC8qIG9mZnNldCBob3Jpem9udGFsOiBoYWxmIG9mIGltYWdlIHdpZHRoIGFuZCB0ZXh0IGFyZWEgd2lkdGggKi9cXG4gIH1cXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIG1hcmdpbjogMHB4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBwYWRkaW5nOiAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5ldmVudCB7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGNvbG9yOiAjRkZGRkZGO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbWFyZ2luOiAwcHggMzBweDtcXG4gIHBhZGRpbmc6IDJweCAwcHg7XFxufVxcbi5ldmVudC5saXN0ZW5pbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMztcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uZXZlbnQucmVjZWl2ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRCOTQ2QTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbkBrZXlmcmFtZXMgZmFkZSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIGZhZGUge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcbi5ibGluayB7XFxuICBhbmltYXRpb246IGZhZGUgMzAwMG1zIGluZmluaXRlO1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUgMzAwMG1zIGluZmluaXRlO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gdXJsICYmIHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmw7XG5cbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUtvQUFBRElDQVlBQUFCNFNuclRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBS1QybERRMUJRYUc5MGIzTm9iM0FnU1VORElIQnliMlpwYkdVQUFIamFuVk5uVkZQcEZqMzMzdlJDUzRpQWxFdHZVaFVJSUZKQ2k0QVVrU1lxSVFrUVNvZ2hvZGtWVWNFUlJVVUVHOGlnaUFPT2pvQ01GVkVzRElvSzJBZmtJYUtPZzZPSWlzcjc0WHVqYTlhODkrYk4vclhYUHVlczg1Mnp6d2ZBQ0F5V1NETlJOWUFNcVVJZUVlQ0R4OFRHNGVRdVFJRUtKSEFBRUFpelpDRnovU01CQVBoK1BEd3JJc0FIdmdBQmVOTUxDQURBVFp2QU1CeUgvdy9xUXBsY0FZQ0VBY0Iwa1RoTENJQVVBRUI2amtLbUFFQkdBWUNkbUNaVEFLQUVBR0RMWTJMakFGQXRBR0FuZitiVEFJQ2QrSmw3QVFCYmxDRVZBYUNSQUNBVFpZaEVBR2c3QUt6UFZvcEZBRmd3QUJSbVM4UTVBTmd0QURCSlYyWklBTEMzQU1ET0VBdXlBQWdNQURCUmlJVXBBQVI3QUdESUl5TjRBSVNaQUJSRzhsYzg4U3V1RU9jcUFBQjRtYkk4dVNRNVJZRmJDQzF4QjFkWExoNG96a2tYS3hRMllRSmhta0F1d25tWkdUS0JOQS9nODh3QUFLQ1JGUkhnZy9QOWVNNE9yczdPTm82MkRsOHQ2cjhHL3lKaVl1UCs1YytyY0VBQUFPRjBmdEgrTEMrekdvQTdCb0J0L3FJbDdnUm9YZ3VnZGZlTFpySVBRTFVBb09uYVYvTncrSDQ4UEVXaGtMbloyZVhrNU5oS3hFSmJZY3BYZmY1bndsL0FWLzFzK1g0OC9QZjE0TDdpSklFeVhZRkhCUGpnd3N6MFRLVWN6NUlKaEdMYzVvOUgvTGNMLy93ZDB5TEVTV0s1V0NvVTQxRVNjWTVFbW96ek1xVWlpVUtTS2NVbDB2OWs0dDhzK3dNKzN6VUFzR28rQVh1UkxhaGRZd1AyU3ljUVdIVEE0dmNBQVBLN2I4SFVLQWdEZ0dpRDRjOTMvKzgvL1VlZ0pRQ0Faa21TY1FBQVhrUWtMbFRLc3ovSENBQUFSS0NCS3JCQkcvVEJHQ3pBQmh6QkJkekJDL3hnTm9SQ0pNVENRaEJDQ21TQUhISmdLYXlDUWlpR3piQWRLbUF2MUVBZE5NQlJhSWFUY0E0dXdsVzREajF3RC9waENKN0JLTHlCQ1FSQnlBZ1RZU0hhaUFGaWlsZ2pqZ2dYbVlYNEljRklCQktMSkNESmlCUlJJa3VSTlVneFVvcFVJRlZJSGZJOWNnSTVoMXhHdXBFN3lBQXlndnlHdkVjeGxJR3lVVDNVRExWRHVhZzNHb1JHb2d2UVpIUXhtbzhXb0p2UWNyUWFQWXcyb2VmUXEyZ1AybzgrUThjd3dPZ1lCelBFYkRBdXhzTkNzVGdzQ1pOank3RWlyQXlyeGhxd1Zxd0R1NG4xWTgreGR3UVNnVVhBQ1RZRWQwSWdZUjVCU0ZoTVdFN1lTS2dnSENRMEVkb0pOd2tEaEZIQ0p5S1RxRXUwSnJvUitjUVlZakl4aDFoSUxDUFdFbzhUTHhCN2lFUEVOeVFTaVVNeUo3bVFBa214cEZUU0V0SkcwbTVTSStrc3FaczBTQm9qazhuYVpHdXlCem1VTENBcnlJWGtuZVRENURQa0crUWg4bHNLbldKQWNhVDRVK0lvVXNwcVNobmxFT1UwNVFabG1ESkJWYU9hVXQyb29WUVJOWTlhUXEyaHRsS3ZVWWVvRXpSMW1qbk5neFpKUzZXdG9wWFRHbWdYYVBkcHIraDB1aEhkbFI1T2w5Qlgwc3ZwUitpWDZBUDBkd3dOaGhXRHg0aG5LQm1iR0FjWVp4bDNHSytZVEtZWjA0c1p4MVF3TnpIcm1PZVpENWx2VlZncXRpcDhGWkhLQ3BWS2xTYVZHeW92VkttcXBxcmVxZ3RWODFYTFZJK3BYbE45cmtaVk0xUGpxUW5VbHF0VnFwMVE2MU1iVTJlcE82aUhxbWVvYjFRL3BINVovWWtHV2NOTXcwOURwRkdnc1YvanZNWWdDMk1aczNnc0lXc05xNFoxZ1RYRUpySE4yWHgyS3J1WS9SMjdpejJxcWFFNVF6TktNMWV6VXZPVVpqOEg0NWh4K0p4MFRnbm5LS2VYODM2SzNoVHZLZUlwRzZZMFRMa3haVnhycXBhWGxsaXJTS3RScTBmcnZUYXU3YWVkcHIxRnUxbjdnUTVCeDBvblhDZEhaNC9PQlozblU5bFQzYWNLcHhaTlBUcjFyaTZxYTZVYm9idEVkNzl1cCs2WW5yNWVnSjVNYjZmZWViM24raHg5TC8xVS9XMzZwL1ZIREZnR3N3d2tCdHNNemhnOHhUVnhiendkTDhmYjhWRkRYY05BUTZWaGxXR1g0WVNSdWRFOG85VkdqVVlQakduR1hPTWs0MjNHYmNhakpnWW1JU1pMVGVwTjdwcFNUYm1tS2FZN1REdE14ODNNemFMTjFwazFtejB4MXpMbm0rZWIxNXZmdDJCYWVGb3N0cWkydUdWSnN1UmFwbG51dHJ4dWhWbzVXYVZZVlZwZHMwYXRuYTBsMXJ1dHU2Y1JwN2xPazA2cm50Wm53N0R4dHNtMnFiY1pzT1hZQnR1dXRtMjJmV0ZuWWhkbnQ4V3V3KzZUdlpOOXVuMk4vVDBIRFlmWkRxc2RXaDErYzdSeUZEcFdPdDZhenB6dVAzM0Y5SmJwTDJkWXp4RFAyRFBqdGhQTEtjUnBuVk9iMDBkbkYyZTVjNFB6aUl1SlM0TExMcGMrTHBzYnh0M0l2ZVJLZFBWeFhlRjYwdldkbTdPYnd1Mm8yNi91TnU1cDdvZmNuOHcwbnltZVdUTnowTVBJUStCUjVkRS9DNStWTUd2ZnJINVBRMCtCWjdYbkl5OWpMNUZYcmRld3Q2VjNxdmRoN3hjKzlqNXluK00rNHp3MzNqTGVXVi9NTjhDM3lMZkxUOE52bmwrRjMwTi9JLzlrLzNyLzBRQ25nQ1VCWndPSmdVR0JXd0w3K0hwOEliK09QenJiWmZheTJlMUJqS0M1UVJWQmo0S3RndVhCclNGb3lPeVFyU0gzNTVqT2tjNXBEb1ZRZnVqVzBBZGg1bUdMdzM0TUo0V0hoVmVHUDQ1d2lGZ2EwVEdYTlhmUjNFTnozMFQ2UkpaRTNwdG5NVTg1cnkxS05TbytxaTVxUE5vM3VqUzZQOFl1WmxuTTFWaWRXRWxzU3h3NUxpcXVObTVzdnQvODdmT0g0cDNpQytON0Y1Z3Z5RjF3ZWFIT3d2U0ZweGFwTGhJc09wWkFUSWhPT0pUd1FSQXFxQmFNSmZJVGR5V09Dbm5DSGNKbklpL1JOdEdJMkVOY0toNU84a2dxVFhxUzdKRzhOWGtreFRPbExPVzVoQ2Vwa0x4TURVemRtenFlRnBwMklHMHlQVHE5TVlPU2taQnhRcW9oVFpPMlorcG41bVoyeTZ4bGhiTCt4VzZMdHk4ZWxRZkphN09RckFWWkxRcTJRcWJvVkZvbzF5b0hzbWRsVjJhL3pZbktPWmFybml2TjdjeXp5dHVRTjV6dm4vL3RFc0lTNFpLMnBZWkxWeTBkV09hOXJHbzVzanh4ZWRzSzR4VUZLNFpXQnF3OHVJcTJLbTNWVDZ2dFY1ZXVmcjBtZWsxcmdWN0J5b0xCdFFGcjZ3dFZDdVdGZmV2YzErMWRUMWd2V2QrMVlmcUduUnMrRlltS3JoVGJGNWNWZjlnbzNIamxHNGR2eXIrWjNKUzBxYXZFdVdUUFp0Sm02ZWJlTFo1YkRwYXFsK2FYRG00TjJkcTBEZDlXdE8zMTlrWGJMNWZOS051N2c3WkR1YU8vUExpOFphZkp6czA3UDFTa1ZQUlUrbFEyN3RMZHRXSFgrRzdSN2h0N3ZQWTA3TlhiVzd6My9UN0p2dHRWQVZWTjFXYlZaZnRKKzdQM1A2NkpxdW40bHZ0dFhhMU9iWEh0eHdQU0EvMEhJdzYyMTduVTFSM1NQVlJTajlZcjYwY094eCsrL3AzdmR5ME5OZzFWalp6RzRpTndSSG5rNmZjSjMvY2VEVHJhZG94N3JPRUgweDkySFdjZEwycENtdkthUnB0VG12dGJZbHU2VDh3KzBkYnEzbnI4UjlzZkQ1dzBQRmw1U3ZOVXlXbmE2WUxUazJmeXo0eWRsWjE5Zmk3NTNHRGJvclo3NTJQTzMyb1BiKys2RUhUaDBrWC9pK2M3dkR2T1hQSzRkUEt5MitVVFY3aFhtcTg2WDIzcWRPbzgvcFBUVDhlN25MdWFycmxjYTdudWVyMjFlMmIzNlJ1ZU44N2Q5TDE1OFJiLzF0V2VPVDNkdmZONmIvZkY5L1hmRnQxK2NpZjl6c3U3MlhjbjdxMjhUN3hmOUVEdFFkbEQzWWZWUDF2KzNOanYzSDlxd0hlZzg5SGNSL2NHaFlQUC9wSDFqdzlEQlkrWmo4dUdEWWJybmpnK09UbmlQM0w5NmZ5blE4OWt6eWFlRi82aS9zdXVGeFl2ZnZqVjY5Zk8wWmpSb1pmeWw1Ty9iWHlsL2VyQTZ4bXYyOGJDeGg2K3lYZ3pNVjcwVnZ2dHdYZmNkeDN2bzk4UFQrUjhJSDhvLzJqNXNmVlQwS2Y3a3htVGsvOEVBNWp6L0dNekxkc0FBQUFnWTBoU1RRQUFlaVVBQUlDREFBRDUvd0FBZ09rQUFIVXdBQURxWUFBQU9wZ0FBQmR2a2wvRlJnQUFTbUZKUkVGVWVOcnN2V21RSmRsMUh2YWRtNWx2ZjdYMk5sZ0d3d0VCem1BR0dGZ0FnN0pENWc3U0VTUUVnYVl0TzBncVRDdGtPMlNIMS9BU2xNTUxHU0psV0FvcXFKQVlrQ25KSUJtVUFSQUVLYXdraGhxUUFDd2FGUGJadXJ1cXVydTZ1N3FxcTd2MnQrUnk3L0dQM0c3bXkvWFZxNXFhbWNxWW1uNUxacjdNdk44OXkzZVdTOHlNOCsxOE8rdWJPSDhFNTl1cllUUFArZ1Y2MHZ0dFZyd01BRVhTZjlydmpudHMxdjc1eDFDNEY1Z1pSRlQ2T3llcDhZZ0l6SXlqbzZQZkhBd0cvMXkvbnJPMjBWbFcvVkxKWC9BODcyOUxUMGFEV21WQXc5ZnBmYXNDTXYyNkx0Q3o5bWRXQ2NCbTc4TW5QcEhTRTRlSTRUanV1TlBwdkdGK2ZuNzN6QUxWZGQyemFaTUk4YWowNUExUGVrS1hQbW5naEs5RDZaQzFiOW14WldDZHhmdmd3OFJiZFNiQUNpaWwwTzEyZjJkdWJ1NW5oRGliMWlBNWpuUG1MaXA0OEgvTXpEK2NKUjFQQzJCRjU1MFZlTStDWkNVaUtLVUE0SWM4ei91aWxQSmM5VmZjL3Fyak9QK1BsRExYanBzV2NLY04xc25QT0MxWXo0Z1pBRER6YmR1MjN3S0F6NXBrUFhOQVplYU9sSEpUU3Rrdkc4QlhBcXl6a2FSbkU2ek1ETU13ZnVYS2xTdS9jQzVSeSsybDMvQTg3NjhycFhJZHFIT3duZ3hZUTN1KzErdTlUUWl4Y2c3VS9BZjFmWjduL1ZsZ0w4MEVST2MyYTMyd012T2ZlWjczYjQ3SDQzT2dadEpSVWw2VlVyNTlHaUNjZzNXMlpvRGpPUCt4WlZuL3pMS3NjNkNtVlA0dlNDbi9kcEhLUHdmcjZZRlZTbmwwNWNxVk4xbVd0WDhPMUhoN1RFcTVxcFFTeHgzNGN6WmdObUJsWnBpbStURWh4Rjg5Q3hnNUUwQlZTajBucGZ6QldVbXBjd2RyZHBMVjg3d2ZHNDFHWDhqeUcxNW5RT1dma1ZMOWR2cEJuSVAxYklEVjg3ejFWcXYxZUsvWGs2OW5vUGFVVXJlVlVndlQybTZ2QlRQZ0xOdXNVa3IwKy8zL1kyRmg0WDk2M1FLVm1mK3BsUExuWnoySTV3N1c3RFBDQUR5aGxMcjZTcGtBcnlSUS82SlM2bC9WNVV6UHdYcjZZQTF5QWI0NkhvKy83NVhDeXlzR1ZLWFVDak8vOWJRRzliVUVWakNEVHhtc1NpbFlsdlUzTGwrKy9CdXZHNkF5OC8rc2xQcWxrNWFrNXc3VzdNQWE1QUhZYzNOemp3Z2hkbDhQUUgxTUtYV2o2a005Qit2WkFxdFM2bmVsbFAvZWFhZUhuanBRbWZtTHpQd0RkUjdxT1ZqUGpzMUtSTEJ0KzhlRUVGOHdET00xQzlTZlZVcjkxalFQOWR6Qk9qdGdWVXF0WDdseTVUSFROUG0xQ05RZU05OW01b1ZwSC9RNVdNOEdXSmtabG1WOXlEVE4vL0cxQ05UZll1YWZyZlB3enRtQXM4c0dNRE04ejN0Nk5CcTljQm9ZT2kyZy9pVm0vdEswRCttMWFMUE81ajVmT1FlTGlPQTR6cjl1dFZyZjIyNjNYeHRBWmVaVkFJOGY1d0dlTzFobkQ2eFNTaXdzTFB4bi9YNy93NjhGb1A2dnpQeS8xWDBZNTJCOTFWQlhOaEc5VVNuMThOVU0xTWNCck01QzNaOEZOdUFzbXdHdmxJTVZoRmMvTVJxTmZscFBlbisxQWZXTEFINWdWclpwK3JPOGt0NkFtQzVzUkZIbUtDaWxVTGVud0xSZ0phS0pCaHJwWmhuaFoxblhtcnhQRmV6djk3dndQeXVmR01jQnExSUtwbW0rNzlLbFM4K2VGSjVPRXFnL0ErQzNqenVqaXdhbm1IRG1vRE1KK1MyZldGT1BGSHlkOXBFNStCOFJBSUxudW5BOWJ3SWtzd1NyVWdwQ0NEU2JqWnhycW5udThIOFUzNnBpeG5oc282ek1aMXF3QnRVQTl4WVhGOThraEZCVm1ZT3pBTlErZ0EwQXZlT0NNaytTZXA2SHUzZnU0TUhPTGt6VENBYTVtSzZaNkNPVk5RbkFZT1dEOWZMbHk3aDA4Y0tFWkUxTFBLM1RTQzJ3RWhHRUlEeDh1SVAxMjNlZ3BBK2tVckNDSjc2YVBIL2c4SGd1NWhmbThmaGpqd0VsRSs2NFlHWG0vMU5LK1QrY1JKdW9rK3JtOSt0NUlDMVNZMFd6UFR3bVZKT0hod2Y0L0wvOEVsNjhkZ1BkVGhzQVF5bU9WWjNpVUw1b243TVB4RUFWVXZCYU1jQXN3UXdRQTU2U3VIUHZQdjdMLytUbjhKWkgzd3pIY1VyN1ZsWHA2SklGMW1hekNjL3o4UGMvL0Z0WVhkL0FZcjhIeFFvTS94N1l2eG0vVHhVelZEZ0JGYURDcm9Edzd3SFJOU3BJNmYvV2FEUkNvOVhDUi83aDM4Rzdudm9lN096dVI5ZGFOQTU1Z0N3NmhvaitlOC96UG1LYTVndXp0bFZQQXFnL0dLajlVaDZ1N3NPSXYxTzR1bklEdHpZZW9OTnVRNGpRQkZBUlVCVVlCQldvZmdWV0RCVU5hbUFXaFBZY0FNRHdmMU13b0FBU0JpNWZ2bGc2Y2VyY1ovb1lJb0xuU1N3dkxlSHloV1U4ZiswbTVucytDQVBjd2NjYkJaNTlJRzBWSUFOdHdhR3VaLysrV0NsL24rQVpOSnBOWEwrMWdjODgreVc4KytrbklZU29aUHRPTXo1QnhPb2pWNjVjZWUrczh3Qk9BcWovcExMZFVmTmhoTkowNStGRHZQRFNLcGlCVnFzUlNVakRFRkFxa0R5S0VmWXBaaGIrSUxJMm9BRllkUW1ybUVITThGd1BseTRzWW5GaGZ2Wk9RY1o5TlpzTnZPR1J5MmcxRzJnMkdzSDNvUWJ3VzFZeXh4TXNsTFMrN0FUQUNzemsveHNjNXo4SGdLSHd0c2ZlZ0U5KzlrL3dnUi8vUWJ6anllL0c3dTUrYk1UT0VLekJaKy9aMzkvL202WnAvcU96RE5UL1BZdllueFZZZlMrZmNmWDZHdFkzN3FQVGJrRjZUc28waUgybzJKUkx2TW0vbHBBWWRGMHNMUzFnZnE1L2JDbGE1WDJqMGNDRkM0dUJiYXhkYXVKbUZBUUFGZXhBMFhjbEd4UDYzVGJXN2o3RTczL3VPVHo5NU50aEdBYWtWSlZWZWwyd2prYWp2eXVsL05ob05Ib3dxOUtWV1FMMXJRRCtsMWxKbWJ6djluWjI4UHpMSzVDSzBUSUZsTXdZTC9KdFRVNjhwOGdSb2NqcnorUUs0TGd1bGhibXNUQS9CeTU0MEdWcXZjcDdab1pwV2JoeThZSis0b21iSW9ST0Z1ditmUURlRkw1QkVBSlFNcmJSMy9USU1uN3ZjOC9oQS8vT0QrSHBkN3dOdTd2N0UvYy9LN0FLSWRxZTUvMWZ2Vjd2ZzdNS3I4NFNxTDg1YTVXWVZ2a0E0NlZycTc1dDJta0duR0U4UklsemtQYTVTb09TZ3Y5OHRVOEFXQU9ISnlXV2x4ZDlHekpvZmFrRE1vc0J5QU5qZXQrczkyREcwdUlDNW5vZGVKNkVhWWpKU2FRalVWQ284ek1tYUFackFFSzMzY0lMSzdmd3ljLytNZDcxOVBkQUdCUTVuVHhqc0Fhdi84ckN3c0tQZDd2ZFB6eExRUDFyQVA2dGs3RGY5QUhkM1htSTc3eThBc1dBYVJqd1BGOFJZb0lnSjQxTVpMMTFmcllWRUVqZzhEeEtLbHhZWGd3ZXVpcVZrRVZnclhLZlNpa3N6TTlqZnI2UC9ZTWptRVl6dXVESnk0MWxhL3hSSUZjNUg5d014cU5YTHVJVG4zc09IL3lKSDhiVFQ3NGR1M3Y3MmRKN0JtQzFMQXNIQndjZkdRd0diMlJtZVJhQXVnQmdab1p6MGNONDZmb2ExamNlb050dXh2c1dxZVBnZjc3VUpIQmdENUFHQTMrY2ttZnhQSWxMRjVZbktNeHB3VnJnZUFRU1hPSEM4Z0lXNTNxNC8zQUhuVll6T2QySUp1M1h6UE1HZ0Uyak83QmVlcjAyWHJoK0M3LzM2VC9HTTA4OUFTRjg1N1BzK280aFdTODdqdk9oMFdqMDN4M1hWcDBGVVA4QmdPNUplY2FoTk4zZjNjR0xMNitCR1g1RWltTmh5Uk5jcTJhRE1pVnN1Z3g1RkVHQ2lDQ1ZRcXZWd0ZMZzhlZXA4eXgrTnl0VUcwYUQ4c0FRUlVqNlBWeGNYc1NMMTI5bU8xUkVJR1pmNnpNU0VsZkVXRXphaWlESThFVEtmeFNQWHJtSVQzem1PZnpVVC80bzN2bmsyL0Z3Ync4RU9qR3dBdmh2Ky8zK1AxMWFXbm9odlJMTWFRTDErd0g4N0VsRUROSTMvTksxVmF4djNFZTMwNHgxT09YNkhxSGg2WU15c2dDeVFKclVrcTdqWW42dWo4dVhMa1FxVEFjNmRPNVM4OEFtQXBrY1N2TjBOQ3dWSm1YQU1FMzBlejFjdVh3Ump1Zm0zbFBDRUVnaVZyL2wySEVNT0dIOW12cmRObDY0ZGhPZi9QU3plT2JwSjJBRVVyV0s1SjhHckVHbyt5T0dZYnozT08zV2p3dlVqK0FFdDNEMjdlMzZuajR6WUJvaU1UNngrdWRDeWluMmxiVkJBU2ZZQVFiZ1NvbUx5MHRnVnRqZXZvL2hjQXdoNGhBcEo5RWF2ZVFnbWtRb1huMGwzRGQ1bjBDMzAwYXYwNFloakNLbXliZWwwelo0cFljWllGVXhIbnZqSmZ6dXAvOGxmdXI5NzhNN24zd2JIdTdzQmM3bjdNRWFKRmkvWjNOejgyOHFwZjdSdEF0WkhBZW92d1RnTVp6Qzl2SzFWZHplZklCT3R6Mkp3RkRXVER3MFNyajdSTUhRY215clpqbFVuVllMWTl2R3IvL0c3OEJ4SFQraUJRREtEdzRveFdDb0lLZ1ZrT3VzZ21nU1I3a0NVZUFoQ0NwRXI4T01Kb1JSSkI4OHBtbGdQSFp3Y1hIZTErV1NrbktVQUtGMENncVZIQ29LYlFQdGlHNnZnN1dyTi9HSlQzMEI3M3JxZTN4ZVZiTWhRNDZXWndoV0l2cDdqdU44VENuMVlCcjFQMjFTeXRzQVhEc05rTzd2N2VCMy8rQ1BjUFBlTnZyZFRqUzRSQVRwZWZCY0o0amVjQ0o1SkF5Wmh2eVRIODBCVkJDZlRNYis0eHdCS1NXa0RPTCtRYmhXTWNVUm9TQk1LN1hZdW9JRzFQQTZGRWZSTGdtRzBJR0tJSTFRSlZQd1BPa0ZZVkFKSlRtT1VDR0lTdW5oMGVCNnd2aC9ib1JLS2dqRGdOWHNJRGdRQ3NCd05NYlljZkhQZi8yWDhjeFRUK0RoN3Q2a0JKOWhQbXZ3L2IrNGN1WEtCNllKcjA0clVYOFRwN1M5ZEhVVnR6ZTMwVzIzTk5zdTZiMkhFaWVEVm94OXFkQmhBa0dCTTZTUy8wNElBVUdFWnJNWlNHRUZWaFNCRGhuSkxVbkpxZWVCQm9RN3h3QUxKYkZFSE1hRjhtM084WGdNZSt4ZzdOcVEwazFKbE5qK3pMS3owOFIvWkkrVGJ2eHdiS3QyV3JoNTV6NSs3OVBQNHBtbm52RHB2cFJhUGdHYjlTOGZIUjI5MzdLc1Q1V0JleFpBL1hrQWYvRTBRTHEzdTRNWFhsNEZnMkFhQm1US3RtUGRCRkFGQkRtVm1YTVpYektEaFBBbDFJUXVUWmtPcExscG5BUUZaNFMrVk5yMUN1MFNBRUlRQklsSmgwcDNEcEVrL2lsZGZWckJkSlhTdDFWLzc3UFA0WU0vOFNONDV1a25zTHQzZ0hSWnk2ekFHaWJESEIwZGZkanp2TStQeDJQM0pDWHFQSUJmT3kxcCt2TDFWZHpaZW9oT3F4V2xzK2xlYlJvL25CZk80VWxibEFPU2xaZ3pZd0Y2K0RYYUY1Z0lxU1o1MnhCSUZPWTdUVGh6eWRodTBzVUxFMDJFb0lqL3paYjdGZEdZTXlrRmZQWGZhN2Z4L09wTmZQSXpmNHhubm81NTFmU3NuNlZrSmFKSG1QbERuVTdudjJrMEdpY0cxTUk4MDFuYnBpKzg1UE9td2hBWm1TWU1JaFNEaG54Vnp4SDlrc2p4U0lJM0FCbUI0alZLTTdqYVBFRk11b1RQY3Noamx6M0pieWFVZ2xhYUFpMDNRVHRGT3VER2FRT0FGTUJCK2dyNW9Fek14UERXeVRkSkhuM0RSWHppczgvaHAzN3lSL0N1cDU2TThsV3JBSE1hc0FiZi85Zkx5OHYvcE5QcFBIOFNRUDFCQVAvaDZkcW05OUZwdHdPakwxYWs0ZUNGVWpiTk1VWlo4b213Znd4RTFsbUN6QVNRV0xwRkpuRlUyVUxhWE5HdFpvcnMxZ2trVTJ3aGgyQ05CQ3ZGNWtJbzNRVUVCQWtvUGZKSUFXOGE3Sy9UcUpWa2EvQU1mYTh2cHZTNjdSYStmZTBtUHZHcFovSHVkejRKSVpJQmpBbTZjQVpzUUJCZS9hM2hjUGh2VkxWVHpjcjZBdmkvVHd1ayszczdlUDdsVlRBRURNUHdPY3hFUmhSTk1sU0ZBbzh5SENxVjYxQWxna0w2TkdCb2lNMHFGMkVkZDdGUVprcmtJYWdJMFA1TmhXZUxnRWNFRWd4Vy9qTGxVWjROOUpDeFJ2d0hXVkpDeDNMa2VDR3BlZlNKRmx6MmQ3M3BNajc2cVdmeDc3Ny9mWGozMDAvZ3djNWVJaEdJMC9iNE1jRWEyS3Z2SG8xRy8vbDRQUDZIbnVmTkRLaS9CT0F0cHdYVUYxOWV3ZDNOYlhRN0hUQ3JqSGc4VjdOUmRWV3BJMmNpbEZvUXMrS00zeUJ0a29SQktNSUVTQ2tSWU9BVTBGUDJxbllnQ1lJZ0E0QTdJWmt6dmFZTThCU0ZQSkkzUitoMzJsaGR2NGVQL2Y3bjhSZmU5UTdmY1kxczhlUmt5WHZZZGNDcWNhdC92OXZ0L3U3OC9QeFdHU2FxeExUZUR1QnZuUlpJRC9aMjhNTFZOVEFSREVHWmo1d1NuMUQweklreVl2RzZqWmlXTGxteEF3MXduTUlSYXhJcDlPazU2MXBTdG0vNkp3VnAxeEdCbmxPREtCSlhSem5YUzFsRFNuRjFBMldOZENwWXdxencrSnN1NCtPZmVoWmYvL1lMV0ZpY244ellvdXlvWWRsbmVaOEg5MmsyVzgxLzNPMTIwZTEwMGVsMGN2K3FTTlNQNEJTM0Y2K3Q0dTdXQTNRN25XenB3UVVvUzVHcHlmelVsRjJJRkgwVktsWU82U0lWdUQySWMxYlR3a2hqSDlMcW5qUnB5N29UbC9BSGc0dks0b0FwQTRhNkpDdEkvczRVUlVyejluaFN3L1E3SGF5dGIrSGp2LzlIK0F2UFBPMUwxUVN2bXBGd2VFd0hTd2dCMjdiLzhzYkd4dnROMHl6a1Zzc2s2bDgvTGM0MDh2UmZYZ05Jd05CUytMTCs1ZFE0VXRhRFFVd3JKYVJEZ0poSk1PVFl2cUZFb0xUOGpOVTQ2UkdJdEJuQlNYQ3IwSm5ScUFJVm1oQ0JGakdFbUpSaXFSY2k0LzVGaWVHdThpNkxHVzk5MDJWODlGTmZ3RGUrL1NJV0YrWW1ua1JWS1ZwSHNnYWo4MkhUTk0xR280RzhQM0ZXT0ZOZG12YmFyWlRhNWdtM3FBUmFtUU9iNTMxbEdRdXNxZkxDT0FHbEpRNW5xdWFrN0dWTjNLYnNWbzN0REE4VW1ZT3QzYm1nN0h1aWRMUWo1TnM0RTY3OWJoc2I5eC9nWTMvd2VSQUloaUV5MHhwbkRWWUFqOWkyL2F0emMzTllYRnpNL0NzQzZtOEE2SndXU1BkMmQvRGl5NnRSYm1UR3JJdmZjNWJsRnd3SlpZOFlKUTNDNkQxUkRvYjF5YUdyVEMxQTRFZXROREJ6S0djblJTRm4yc09CRkJZeEIwYUJWeVlFUldYZ25DSDVFM1o2bUs5YTVVSHJ3WktVcWxMTWVPdWIzNENQZnZLUDhQVnZQNCtGaFg2VTg2Q1BpZjgrZzh5ZkVxeEVCTVhxdnhnTUJ1OGVEb2NZREFZVGYzbEEvVkVBUDMyYTB2U2xxeXU0dC9VUW5VQ2FUaGlFbkZLdmlkNDFsRFFETWowbWloeG5vbXlQSkFUSlpEZ0pBWWl5NUc1S0drNndWcFFBUkFqdTZGOUE0elhqL1VqNFhWU1N0RnEyS3BpODM5aWhDbThwN2V6VFJLR2duOXJTNjdTd3NmMFFILy85UHdRQ3FacW5UaWFGd3ZTU1ZaREEzdjdlYng0Y0hHQXdHT0RnNENEeEozSVUyajg3VFpEdTdqekVpOWZXQUcxd0pwUVRhYlpweXQvT2MwQW8xOGpMc0EySU5GbEZFMElvYlJkekppNDVCbTkwRFNvQVRkTENwckFzUnRQSTRUV0VBUWtDYVhNZ3hZbHFkbXJOZGZneWFsbGorMVZLaWNmZkhOaXEzM29CQy9QOXlXTEVFMklEQklsM0NpSCtxM2E3alg2L24vakxBdW92QTNqVGFRTDE1V3VydUhmL0lkcXRWbmFwdXVaWUVhZWNLRXA2MkxubUpHVTVWRVVHYURJeTVVZGxLSU9Kb0lRVHoxa1RpN0xacTBqMUU4ZncwU2FiU0VsNHFtaW5DaXEzMzR2Q0pMMU9HM2Z2NytMamYvQ0hRS29aM1VtQ1ZRaUI4WGo4ZHczRHVOTHI5YUQvcGZOUm53SHd6ZE1FNmM3REIvajRIM3dlOXg3c290ZHB4em1hUUpCWENhMWpDRWQ5bC96M0VpcklIZFZ6UWNQV05qSGRFZVNpU2daVGNIeXdqOUo2VU1tb0M0bi9BNVpseHJtc1FKQU1yUksvcDRLd3BONExTb1VoWHhXbFV2dHhmQVk0eURPVjVQTkZmaDRDd1hWYzJJN3RNd0RLUDZjdkxxWGZSeW82RnhMM3FYZE9BUkJsbUlWZFljTFBoV0ZGTFkwaXJhU0MrSnlNOVpSZlc4VVlERWZ3Rk9OM1B2eDM4SjVuM29uOWc4T0N4bTkrOHNSa2YrSDZhd29vcGRCc05qL2RhRFRlbjRoTTZlRXJJdnA3cHdYUWNDYmR2WGNmdzdHTHl4ZVcvVTRvbklxekoyNHVHU0ZocFNDVmpCOHl4K2F0Zmt4czVyTG1KN0dXaUpmTUl3MS94eklNa0tDb0JWQllLNVVBUDVBSXEwYVRUTVg1Q1NwVTUwRSthaFFzNE5qemQ2WGY0dEkvblVLajBjRDJneDJzMzczbjEyMXhjS1lvOFJweGJxeFczaElETnJ4MUJTakFzQ3kvSDFjNHVSQW5jZXQxVmVFOXRkdHRmT1BGRmZ6aHMxL0I5NzMzUFJPOWFDY0JKektOSWFYS093UHFIR3NnVlg5eVoyZm5SNG5vMlFpb0J3Y0grckZTS1JXVTBKNDhVRTNUZ09QWW1PdDNZVm1OQ2ZzTE9aNTliTE9wWkduMEpEZFRFTUhKb0xFMSs0SUJHR1FrYlVEMnBZMC9Bc2xhTGNhazg4Y1VUem9LSndGcGtrYkZuVnVrcCtBcDVac2tCRmltaVFjUGRqQWUyNkJXcUdGaXg0MFRUZEpVWlBvbzVvaEVRTmlNbU1Sa3NqZVNIUTg1S2xhTkt3ZzY3UVlZQ3NQQklYWjNkek03Rms3V2h1V255T1JKNUhTVjczZzhobTNiYmYzMzBwR3BQL2M4NzhkT3NzVjFtczR3VFFOS1NvemtXUE55SzU2REdkTzJkMDBYQkhJS3JXR1RpeWpQZ0ZPV0s2ZWtPRGhPQ0FtQkdKZ1prUnFrMkp4SkRoU2dQQm5GMTV2TkJ0YTNkM0IxWlEzQ0VIQWROMGdCWkVCcTBqaFF0eXJrQkZocHRucndYV0JhR0lHSkJLaElvb2FTTktzUVViS0NBdU9SS3hjeEhvOHhIQTRuT25qbkhWc0cwa1RKVURaWVhTRkV3Z1ExajQ2T0l0dWcwV2hjYnpRYThJSXV5NmVnLzlIdGROQnNOWEEwdExYMmtWWEJScWpWaENORklmb1VrZEtGb0FaVWlycEJxeFJRSjVybmhoZ2hqaVZucE5vcEJxa0t5MVhpZExtUXJsVlJXM05mb3E3ZnZZdlIyRUcvMTBYVUlFMGhWY1F2WWtjckNQa3lxV0FDQjZVMUthZUhXVUJRVU9RdmZCTkN6NUtLR3drVG1xYUppOHRMSUJJSmh5b0xYRVdnVGZjNnlPc2xHK0xRTUl5TmRydDlSemNKVE5NMG93TU13N3laUTRlZHlLYVU4bHN0bWhaMm5TT1lOZXUrSTJlbStnRUZEemFtamtLSFJlbkFUTnU0aU5zNlJ2QldtdDNMSEVtNWFQY0F1Rkdib05BczhHMHVLTWxvTkV6czdSN2l6cDFOTkpxTlNLMHI1a1RsYTNqbEtrSTdCU1hiV3U2dUNyNG53TkJzWElRMmJzcDRRY3JSNnJRYVdKeWZoL1JrMUVoajJnWG1hcmFMWC9VOEw3R0QyZWtrZ2s4M1hMK3Z0WFZhVHBVUUJzandPNVRJS2RxK1ZGNFpPUk9vaU1SVHBEb1J4NzVsa0x1YWFCb3hvZkkxZGF2L3E5bU9DZStYVlpRN296VHZUMGtKcFJpQ0ROemR1SWU5dzBQTWRUc0prTVlUSUs0NkRVUjFETjZBYlZENnhRUU1DUlMwejVPbVRQcjVqTWNPTGl6T285ZHR3M2J0MmdCTnEvYWlmVExPZFgwNEhDYjJNL1hscklsb25ZanVBZlRvYVFIVk5JMW9vUVhKZFZtL3VHdDBkV0dxa29FdHhJNE5FS3BvUktYVkJEMnJuUk01MDNyVmFlSmg2MmFDOXVPNlRRcmR5UUpES2dWQmhORjRpUFdOZTdCTUVaWEVzSW9yWEtVRytGZzY2MlhZeVpxczhQZVZtclRGUThCVEJvQkdqbzN2WG5vemVyMHVYTWV0TEEycjJxNUZrdFl3akpWMFNiV1ovSUFBOENxQVV3RnFjRkhvZHpxQnV2SHEyeDJGQm56YVlVbzlGTVVwMENhOWF3V2hKVHhqQW1SSWdEM0xMTkNjUFZhVGtUWHRuRklxTk5wTjNMNXpEOXZiTzM3d28xQ0tjdFNkaFhWMXpobHhQUWFZbERiRXNYMU1PUjc2Y0RqR2hhVTV6UFc2T0R3OFBIR0FKaHc1S2RmU1BwS3A4MlBCNmg3WGlPaUhUc1B6QndBU0FxMW1JeWFvYTRLVUN5VHFwQTJhQXJGbUl5YnJuM3lWSlZSY3MwbGFPY2trS0VPcUxJRU5UY0xHa28weEtWMFpFc3dNMTNWeDU4NDkzK0VRQUV1bFJlSTFNMExqVENPcWxEa2ozU0IyNkNoVjUxVm1Ncm11eFBMaUlob05LK0ozVHhxZ0dwZDZmVUx6aHJORml3cGN0eXdMczJwcFhlNklFeXpMQU1GZmpVVFVtaHdGOUZTZUF6UWhDYlVIbFo3WlVCQXFCbGpDVWRIT09TazVhWEpnRXNjbGoxY0tNRTJCaHcvM2NPLytObHBOeTQraTZjWUt4OFdCckpzakNaRHFFeUs4RjRwWUFTNVhRdkc0R0lTTHk0dnhDakkwZVU5MVZoK3M2a3dwcFE0T0R3OVgwNEl5OHZyRG5ZVmhyR2FWSXArWStnZlFhclZnTmd3NGpnZXEwKzRsVlNMUHlLNG1UVXVaYkxCcDRJMmE4UVdycEhEY1VFMUJ4WTBnTk5zVk9pMmxuemRuRXVpZit5RlFFeHViVzdEdE1YcWRMbFRFSndSM1lscUFFRUdQS1FaY0NTZ0p4VzdZVkV2VEVxeUJOQ0R3cVY3MmlnRGh3dklpaE1CTU9OTWFyTUNhYVpyRE5JMlY4UHFEV2JOMkVndGE1ZDBRczBLMzAwYTcyY1JnWUFkRmJUV1kxSUtpUDZXREVPU1htSkNJczVSWUJiRjcxampPOE5od3NvcWtKTlc5YTJqbWl0WlhLc2tDY1BhK0dzQ0ZFTmpmUDhMRzVqWWFqWWFmY0JlS1N4Smcwd0MxdXhCV0Uyb3dCcGtFN2xxZzRRQVlBK3c2MnNxRW5DaUhUb3JsR2tBbHdvV2x4VVMrUUIzdWRCcmFLbmg5UGF2dmY4THI5KzBEdWc3Z0VLRCs2WUFWYUpnV1RDR2dwQWV3V1F1b1NzdUw0RVEveW9CM0RNdU1EQUVZQnRocWdLVDBwWXdoQU5jQmUyNEFXSld3NFNJaE5PSDFweVJwUW9JaWFUOG15SDRrZ1I3WWo2WXBjSDk3RzRkSEE3VGFyYUNSVytBd0NRSzFPcURlSE1UY0VveWYrRjdnNEFqZU43OEdaVnArRk1Cem8yU2VPQTl4Y2huTHFwdmplcGp2ZFREWDc4RU4rclZPcSticjhLcEVCQ25sYWxiNXRKbW1BWWhvcEpSYUJmRHVVeEtyZnJjNXk0SlVrMzJaeXJ6OWhBM0lhVWRMSzlZakFUVGJFRllEN3FVcmdBRE1lNXZ3REFNWU1CaWVka3dNSnNFeVFUV3hTbEZUK204aEtWMTFtM0ZDdWdZZmk2QTUyc2JXdGw4dkZkRk9Fa3dHeUxSQTNSNUVieEhXVDd3ZjdmYzlBeW1COGUvMFlIL2xUMEd1RGJadHNPZHBYVlNTSUsyN2pXMEhGNVlYME90MVlkdHVia09LYVNScTJicXdBRmF6SnBXWjB3THd1cEx5M2VvWXJhenIyS2lXWmFIWGJVTXBQd0tTaTFYS1pQRzFHNTRrcjVrQk5rMmcwWURaYU1KOXkrTVlmTis3b0V5Zys5V1hZRjIvQ3JmcGdUM0hwOGM0anZYN0ZRVmlJcGxEVCtSSXhxMVREbDU2WmVlRWsrTmZyMmsyc0xXOWpaMjlmVFN0WU9GZWxzRXFnZ1MwV3FCV0YvejBNMWo2dDUvQnV3R01EZUFiUC9JRGNOZnZRTGxqNE9nSTVOaGc5Z0FXbWVDc0E5alIyTWJ5d2dJVzV2cXc3ZkhVWG53VmdLYjNGVUpjeThKY09udktEMnUyV2o3aEt1VXBDRlNHYVFyMHV1MG9SN1E0dkZUMFFIVEtKN0E3aFFDUkFWZ051QXZMa0U4OWlTY3NQeHZuK3ROUHdON2RBOTF6d01LQVVvaHlVYU9VTjlMT0g4VHprOUVwVHRtb21rT2o1UThrUVJ5RDJYTVZOdTQvQUVzRnRnQ0VJQVVBWVlBYkxYQjNBZUtacC9GVUMzaWZBZzRKZVBoSUN6dFB2UU8wc1E1dU5BRTZDalA2anIzWmpvUGx4VGwwdTIzc3BmcW1uaFJBQTNDcW82T2o2MW05L2szRFRFcFVndzBJSVZhSVRqN21IMThRSVdRZjh2bmJTWjYxekM2SytvOGFCbUEyWVQveUJyeHgwY0o3R0RBWkdIY0pxMjk4STVyYjI1Qmk0S3QyVHlWaTNtSEhxaWpmVkdsSnljaW1heVk5KzZTWkVINW5XUmIyRC9ieGNHY0hsbWtFSUkxN3FMSWhZRFRiNEV1WE1mZW1LL2h1QWg0WHdCSDhWdDh2dnVYTnNIc0xFTTF0ZUNKMCtsVDlwUDRKNmN0WVhscUFFRVloSlRXTmVpOTZ6Y3pyaG1Gc1pnSzEyK21tYlZRb3BWWTh6dzJMRzA4TXBCRllRV2kzV2pCTkFVOTZxVDcyQlRlZFJVMmxQV3Npa0REQnpRNXdZUWx2QUhBSmdDbUFOd0s0c2J3RXI5TUREL2FnS0pDb2tTOFRWNFZHcWoydHZoTVJxR3huS2s3U1RnTFZZTWJXOWtPTXhnNWFEU3RpS1ZTZzlzbHNBSTBtMU1WTFdKenY0REtBZWVGUHNrY0E5QzhzWXJ5d0JOcHNBcVlKMk9GVG9YSjFWTEJKNmVIaWhTVVlJbWhDUEtYek5JWDl1dEpzTmpNdmRNTHJEOEM2RWhUMDBFa0JORWtqTVhxOURsck5CZzRIUTVBbEptekJQS21hQktwT1NxdUlFWVJwUVhhN2FQZDdXQVRRSThBQXNBU2cwKzlpdjllRHNXTkJoUzBxbGViU2FTbHdyR1djNkVrb0hJVTJkVldmdkhaT21RT0dFQmlPUnRqZTNmVlg2bE1jUFF1L0RNVUVMQk13RytDTEY3SFVCaFlaYUpKdmppd3pNRGZmeGYwTHkrQkdBekFzRkNZdDExSDluc1NsQzBzd0RCTlNxbHBMdkJlcCtwd1YvblRWdjVhM0dFV21NMFZFbTBxcGRhTFpOVVlySW9pVlZHZzJHckJNRTY0cllhYXVLUnVvY1hleTVFTUtKWjhLbTFHQkJFRjJlK2kwTGN3RGFNRDNVL29NZEZxRWgvMDVDR0ZBQ2VISHo1V0tRSyszc0dUZEZrNUowaWg5TGgzcjEwaGRYYXFhcG9tZDNWME1qZ2F3VEI4UVNVRm9BSVlKV0MwMEZucFlOUHpyUlhEOTh3RG0yZ0ROejRITkJzZzB3RUlVK0JWY2Vad3MwOFRDd2x5d3FuVSt3S3JZckNXcVB2M2RhcDd6bnVmMUt3RFhwWlJ2T2M0aVZtWHg1T2dteVg4NGxtbjRCV2NxcnB0UFpQdG9FU1BGbkdpT3kxcldlbHpSR1RST0lCT3EwMEdyNFhmVU1JTGJhVFBRdFFCMDIxRENBQlA1dFVZcVRueE9aTFZyVkZSUy9XZVVoNlQyMTlrSUlvSXp0ckcxL1RCS3kwdFFiZ0hESVF3RDNPckE3UFV3QjZCTkVZVFJaV0RPQkl3NUg2Z3dnc2hWSGxBcmlsVEhjWEZoY1E1enZSNXMyNjRWTXAwbXJwL2FydWFkYzhMckR4MmFkcnU5Sm9UQU5Pc0NWY2tSVFYrd1pWbm90RnJ3cFBRSjd4Q2M0UW9LME1vNk5FbEdVUVo5bkZnY3ByK3hFUlJHa3dsdU5kRVRRRk16NFpvSWxoeHN0eUdGci9yOTFVZGtWSjFQMGZwU2NaZzBYT0EzSzIwUDZicWtOSGVxR0kxR0E3dDdlOWcvT0lScG1WQlNKV2kyU0lvSkE5UnF3ZXkyMFNWZmtvWmJpL3hycDE0UE1CdUFhWlRTZ0pYVXZ1MWllWGtSQ3d2enNKMXlzcitPZEMzN3pyYnRsVHdhTFZPaUNrTUFSQ3RBUFFleURrQW4xSTFsWVc2dUM4L3p3RkZscVVhV1QzQ21ZVXRlbWlnTjVpaktGUFJPTWdTNDJVQURnS25ka0VGQUd3Q2FGanpUQWtoQUtkOFUwUmRTMVoyZ3VDd2xCZFJFK2h3bnBLTktCQUg4NUp2dGg3dVFVZ1pzUjFyNktqQUpzR2xDTlJwb05CdG9JNW5OM21TZ0JVQzBHb0JsZ1lRUjVBSGt3YlFhVkVldWc2V0ZQdWI3UGRoamV5WlJxSXJmN1FnaDFrT0hmZ0tvM1c0M3kwYUZVdXE2NjdxNVBtUWRrSmJWY2pNekROTkFxOVVFU3dYcHFZbjI1bUZsYktLQ010RVZXU2ZoZzh4bkk1Q3V3Z0FhbGc5VS9lYkR3VGROU0NHaS92MGhseHRuNEZPMG5sTmlzb1JaK3VGM25MWmh0WmhXY0NyRE1IRjRkSVRkL1gyWWh1bXZONlZ4cno3b2pjQmtJYkRWZ0dHWmFLU0FhaEhRWXNCcVdoZ2JacEN3b2pYVm9PbEVxdWRLTEMwdW9ObXdzSDh3bWpCL1RnQ2dZWFh1bXRXd0RuTlZmNWJYSDREMU9wV1FxZE5LME96UEdaWnBRUWlDbERMb0paOTBWSmpEaFNDMFBNdEFpb1FBVVZxY015d0hEdGJqaEJuWWQ0ajVBRmdBaE9rN1VnUy9DVVhvOWJNdUxrbGZkUS9CMmxLWXNFOFQ5ZkxBaEVRMkRNYk83ajVzMjBHejBkRHlTMG5MZHBLSXVyTWFBcVloL090TXVscXdLTkIrSVVqcCtNcmZkUnhjV0ZxRUNGdlN6MGk5Ri9ITXZ1NmltMFZ0M3ZLY0tSRFJiU25sTGdHTEp3bFFab2FVRXNvUTZQZTdzQm9OZUo2RWFScnh3cmRCSFRLem1zaTNwTlJuckMxYVJtYndHUW1ZUXNCSURiWUlCbHdZQVZERERpVFJBT2tKTGpGUHExTDJhYnd3OEdTTVh6ZFppQVRHdG8zZHZYMmYyU0JPMURvRnFpUHE3c2Nna0JBd0RBRXpkZTNFdnVsaWhLbC9pWVhQcG1jVng0NkxLNWVXMGJBc0tDVm5abjlXa0xLclJmNlFtYi9jSHgwQVdGVkt2WGNhVDc0S1FKTmNLakRYNjZEVnNMQTN0cVBXaG1tQUlFV3NSNFM4NGdTSEdmS2h4SUVUYnhDTTFCQUt4QXN6cUNBTFhpb1Z0YnJoVkcxVW9oUk9vNmNvc1lvZklabE1IVityWlJuWTJ6M0VlRFNDYVZsYUVDSFpQbHFwb0hNZjVVdktxT3RwcFBLUFQza3JCanpYdzRXbFJaaW1TSENvSndqUVVvOC8xK3NQVDlKdXQyOFMwWHZMRWhycXJJK1p2NitDWVZpd1RBT2U1L3JGYlNxRGUwdjN1b2NSclFtYWxxZ3NKWVR5R3k3b1M5MWtLVVhKREZJTUtWVkVrVVdTalpQbDFHQmtjcmNUYVh5aGlSRHd0bzdqWW45dlB6UHBPa29jWWIzQ1VTWG9NTTV3anlqSXFjMVAyeGQrajY0S1d0RHpKRnJkTnVibStuQmR6NitLRlpoYXhWZkJRVGlPb2NkZmwwY050NVZVNU9BRUFCcEx6R2JUUXF2VmhCZlVrYWVyTzMxelVjWGxFUkFnb1RTVEFNa2thT1ZYZDRhRmRUSmpzQlg4NmxmSkRLR2t2MGh2Nk9Bb1pFYWwxQVJZa1JrRTBCMHN3elJ4ZUhpRWc4RVJETU5NMkxjUlNDY2NkZVZuOFV1R1JLcXRPUUVlKzB0RkpyMzY2U1dySnlVdUxzeGhZYTZQOFhnOFlVYk1Vb0ttWGp0Q2lGdEZmTDJabFUydG5lQzZ6RWhpblFWQTA5OHBwZEJzTkRIWDc4QnhQYlNrU3U2WHl1ZjBKMCs4TUZxaThWa1FobFNLSVpRQ0t3azNHT3cwVUNVQVQvcmdoRksrUk5YQ29YcEpTWmI5cWNJU2xjeEdiaHBvcGNUQjRTR2taSCsxRjYxN1haSC9RNjRIMTVWd1UwRDFBRGdBcE91QnZLaXB6OFRhQm5XMmtPeGZXbHFBN21TZklFRERsN2NNdzdoWENOU1N4YWl1cDczK3FtQ3NRMWVGTFJRYmxvbGV0d1BQY3hNZVo1WmRHTm1Obm95OGZiMmhReGdHRmJZRGRsdzRyZ2NYV2wxOE1QQXVBTmRUOEd3YnNGMG94d1k3VHNReU1EaHVVUjRCa3pVYmxsUGxHbHJnSWRoSEdJVFJ5TWIrMFJCbXRGeW1md0ZLS1VpV21yYjNKd25aZmtJMGpjZHdIQWRqZEtDUGxNdCtEb283dHVIWkk4aXhEZW5ZZ0d2NzJXSUphNVlyNWY5NWpvZjV1WG4wdXAwSXFDZWROUlZNMW5YUDg5eENvQmFWS0JEUnVwVFNBZEE0S1lDbStWdC9JVmNLREhta0tCOGtNL2NEYWtjaG5jbkV3VUpxQXV5NVlOdUI1MHFNQTBta1M2VnhrSVFoSFFkd2JValBCWHRlWEZNUFFGZ1VrLy9wcXRLY2hPbEllek5ER0NZT0JrZndYQmROMHd4NnFZWkdNQU9lQjlZYnhERURudVBYUW8zRzhHd1hRd1pjYlJjYndBaUFITmxnMS9FVHYyV1ErSzFraHZOVlhvdm1lQzZXRnhkZ21nWUc0M0VsOE5WdExwRXo5cXNsSm1neFVBSGNKYUpiWUx3dDBXQ3NnckZjRjlDaGF1MTFPekJNQWNmekl1a1Q4NUljdEIzbFpCOVZUbFpnY3RoeVVVaXdKd0hQaGVNNEdDRmVDMDhIcW1NN1VMWUxlSjV2bjNvcVViV3FWRng4cGNmbEV3Vjh3RVJNSDhFQ2JiYnI0UEJvRUMxSkZDNXZDZUdMZUVwNzdXRTVpWklRNHdIc3d5TWM0U0xHS2lhQ1J3Q09HSkFIQjRCbkE5SUxtSUk4QnFCY3BBNUhZenh5YVJtdFpoTUgrL3NuQXRDc1k0am9hbGxObHprWURJcE80aldhalhVeTZHMnNWRVlUQno0V09OT2ZLMVpZbUp0RHk3SXdzaDM0Tkxkdld5YnlPalBMUC9UTXFXQWZLVUd1NjZ2RHdSQ0RRRjJHNDJncllDQUFiemdDMjJPdzUwRjZYcW9IRldESU9Kc3FLMHMvN0V1S2pHNHBsbUZnZURTQ00zWWdqS3d5RWM0MlRwbkJyZ3VNUjNBT2pyQUhZQkJjdHdzL3kvL0FCdVRCb1YrZ0tDV203c0VaU3VtUmpVc1hsOUZzTkNBOW1aR1pObjBVcWdqTVVzcVZNbUZubG1WR0ViRENqQitwQ3RKcFRBUzlMWGE3M1lEVk1IQTQ5R0NheG1Ra0NKelJ5NG1URWFHd1hiZ2Zhb0ZoaitFTkJqaFF3RWlidUdNQzlobHdCd09RUFlSMGZmWEpRUk9KTUltWlpGQWN5SnhNM2VPNDlwNHoxb3BpQmp4SUhCME5vQkl0SU1zMjhoTmpQQWZranVIdDdtUFhBdzR0WHk0NkRPd0QyQnNvOE40ZXlMVUIxd1hLYU1UQzcveEtpUGw1UDcxUEJwV3JKeFUyVFVubm02VkFiYlZhSldwYlhaTlN6VXlDbGwyMGFWbG9OaHB3UGRmdm9aOU9yOU5xMTBGYTZGU2x2UE9nRVMxNUxzaDE0QjBjWWQ4R0RqdSt5aGNBamdqWWN3RDM0QWltNi9qMnFWUlFTaWJVdWtmQ2IwdWFWbms4MmJoQ0I2a3dCSWFqTVVianNSOUJtbmdZU3RQMVlsSk5leDZrYTBQYzM4TERBZkJ3d1RkVmhnQzJBUnpzSFFIYjk2R2tFOWlsbkhHdXRQclBIa1BwU2ZSN2JjelB6OEYxbk1yTmVxZDFvTFQzMnlFMVZZUXZzMEoxNHNxc0pXaWV6YU9VUUtmVlJyL1hoejIralZhamlXVGFYQ3JWajZEWnFoeEozYWhJVU1KWC9ZNERQTnpCL3NER3cwNFROdnVtM2k2QW5hRUNQOWlCZEd4SXgvVlZxT0pFV3g0RkJndVY2anlkUWU1RFFZVUxqZ1cxUzRQaEVJbzV1L2Rya1JCUkFMdXViNUpzYm1IbndSNDJGaGF3cTRCREJ1NFNjTEMxRGV6dFFvMkNjdW5JOEswdlZqMVhZbUd1and2TEN4Z0hKZEl6QUdHcCttZm1kV2JlTHdOaGxXNFB0L1FjeVdPUit1VTBCVnF0RmhiNlhkaTJnOWd1MWhkVkNKT3QvY1hwVlpSSkh6V3hUKzduT2hEMkNMejNFSHU3QjlpOGVCRUh5ay8zMnlMZzRkNFIxTU50OEhnSVpkc1JVSlVteFlVcC9RZ1lwL3Vpa3I5ZjhEOS9OUjRGRlRoUnJ1TmdQTEt6cFdsQ2RxYStKK0VEM1hQQjR6R3dmUStITjIvajZsc1g4RjBLT0JUQW1nYzRLMnZnb3oyd1BmSVRwcms0TVNWZWxuMXlKNmtrNXZzOUxNN1BCYXV6VEU5RmxhajU5UGRyVll3aHMwTDIvazBpMmlhaWl5Y0ZVUDF6d3lDMDJnMG9NRHdwb3dXVnd4NzU4ZUlTRk1mMGdTaU1pampTN3UvcmVwQ2pFWXk5WFl6WDcySDFiUmR4RTRERnZxb1kzcjBIOGVBQjFHZ0U1WGxSQnowVkFFK0J3WW9nNFBjckZheWl5U0hDcEptRXZlcExmY3N5TUJ5TTRjbkowcHBKVmovbksrbUJ4Z1BRNEFENDExL0gxZmUrRTVqMzFmL2R0VjNRZDc0REdnMEFlMVM5VHl5eVcwMk9QUmVQenZmUmJEYmh1bDVtVTdRcTQxcFVGNVYxRGlLNldxV0N4RXgzOXMwQXozNnoyVndIY1BHNHBRalZaaDNRN1hSZ0NvTHJTZ2lENHByNm9CVTVCUXZlczlKcmt6U1FSanlyZ29JSEdnOUJ3eU9JbDE3QzJqdWZ3SE9YR2pBQXZId0k0SVdYZ09FQnZORUFrRTdjMGhHNlkwWlFMUDJHdTFybWx1U3MybjJmSVhJZEQ2T3hVNjA3b2NoR2xBQkRPV09JMFJIa3k4OWo1ek5md0xmLy9mZkIyN2N4K3ZTbndadTM0UTBQUUo0WFNISlJvdmtGSUxPcHBkSEl4cVVMRjlCc05EQTRPcHhKQy9ReTh5SFFvaXRWc3ZITWlqMkpWZ0c4WnhycFdVY3RoRE5yY1dFZWxta0VWSkdSS3V0Z0FJYVdvS0xacG9pejhLTUNQd1h3MkFZUEQySGN2b0hobjN3WmYvYlRQd3hCZ1B5VGZ3VmN2d3AzZU9pcmZWZW0rclQ2RXBzRVF3aE9KTVZNZEVSSmFHNEIyM2JndWw3UTgwa1VLdjVzUFMyaUVLbzZPZ0FNQStQUGZSYnUyaHA0TUlLNnRRSjJSdURoRWNqei9PVW9LZ3dsZ1RLWDV4d2NqWERsMGpJNm5SWjJkM2N5RTZicitpTVZnVjFOOWZ1UklKUkoxV3VoRFVrRklkV3E2cjNvZUtrVStyMHVUTlBDMkxiUkZKVHFUMHBCeGxDU1U0MDhjcTBMczU5K0o4R3VBem82aENRQit2LytYL0RoSWRBd2dXOTlDMnA0QUhsNDREc3RTcVlTVE1Kd3JBZWx2Q0RWRUpnczQwN0JUeEpHb3dIOG9KNlpDdHhXOWFaOEdBc2x3ZU9SMzJLb05ZVDg4ajJ3SUFoVFFJNkhvTEVOVkY0WmhoSlZFb2tyY1Iwc0w4MzdGYkZLSlZwMlRqT09GZmV6QWR5b0JOUXFPd2toVnRKSnJiT1FvSm52R1dnMm0yZzFHeGdNQjJBMjRxZ1RTNERNeU5NUE01QlVvc0FlMmhLUWdGUU1JVDB3ajMwenpuR0FMejdyTzEydEJ0UjRDQjROd1ZKR3BvUktCUmdvTURtaWRGT2QxNlZZa0NuNGk2ZzVyb1B4MkFZZ3RFTEZJaGVuVUVyNFRwV1UvbVFLQklWaUJmS2sxaXE5NGliRVJJaFZLWWJaYW1GdXJoL1VyQ21RcG1sbnZlcUo5bm9Ed0oxS1FLMjRxc2lOc2d1YmxWbWdsRUs3MVVTdjI4YWRlMXV3TENNcTBXREZJQ05ZOWtZbGE1WEN3Zk96b0ZYczJIQ1FOZVc1Z1BSOHgwTVlQcEQzajZDa0IvSmtuQXZLU0pTU3NHYmZLUUFpQUo3UytxV3BGTzVjMTJkcURXTkcvVHZZTDArQmt0bXdKdFFLSmlnaUtLbWlCZWlVa3VoMlcxaGVYSUxydXFYUnFLcE1RQVV0dTFiMXFxdmFxR3RFWkFOb3pvSTN6VHRHQlV2NDlMdGRMTXoxTVJ5TjBldTA0b1puREFnUjhKeXNOS2Nwem16U0c1UWwxbVFLazdCZDNVdVB6eHRyL0hDVkVZcGk3bnIwU1dxc1F4WmdQT25DOVJ3WUJrNWc0M3JTT0F1bTBmTHFDa3FKSUlTcDBHMjFjT0hDWXJRQ1Nsazh2dzVmbWp2K1ZKelZud0RxT01pU0tkbnVHb1p4RjhEangrRlJxNEJWU29sbXcwSy8xNEgwUENpcGdrUU85b3ZkZ3JhS2VqV3FRa1lVSlpYTUVxYmV4Y3ZiaEFWODJsSjRHZzJHUkdaVWd0V1BIYnNNRUVTWjhTZlN0R3MyNXlReVFGcDZqdXQ1NlBlNzZIYzZjRnluY0h6citDRmxHQ0hRU3RWYnFxcjZPUkRUajgvSzY4ODdQcXg4N1hiYklFRndnNFZzbVNWSUJPWEZTc1VTVkErdmFnVjJ1cE9sNjJsbVNyV0VWUEYrbklJZ0p5TmhaVUJoY0tEMmFXYWdtcmxNWnZMcllyUWVBTGJyNHJHbFJUU2FEVGl1Vzl1RG44WXNETjZ2VkMzak5wdk5acVVkbFZMWG1QbEhpeUpVczNTcUZ1Ym5ZUm9HbE90RlhLb2lEa0RLbVgzMVdXazlvRlFxd1RwU25GSmI5VHRaNnB4WWNGZkZEWDFqekhHQmowTHdQQStTVmUzRmgwOFpxUkJDUUFpQ2toSWdnYVBoQ0pjdlhrQzMyOEhCL3U3TTFIdlplQ3VsYmxTOTdDcVJxUkNZMTZlaEo2YXhXUm5BMHNJOERFUEFsUjRzRm1ENERlNUMyMVFuOXFPc2U2VlRTeW9xeVEvQnFsS2NraDdaQ28wQnhlRzZ1RnhQMnpKTjFmN28xRGNLZThmNVJYOEV3QjdZdUxTOGlHNjdoUWZiM25HOCtEcjc3eG1Hc1ZJWnFEVmFadDg0Y1lCR2RxZEN1OTJDWlptd2JRZlVzSUl1SnJIM0gyTXVrSnlLRXExK0dDTGdQVlZ5MVQzRW5WVjh0VTdhK3FCQmFsOU5lMUNRWDJTbkpFT1FlQlZnbFVDRzRTZnNCQ3RLejgzMXdNendQQzl6SmVsWmp6Y1JyVEh6dURKUXEwb0JJbHFscUlWT2ZhKytMRUVoYmVPMDJ5MzBleDBjSFE1Z0dRYklzSUpRcW9vVGxUblZEcExqQnJ5QVRIVXlTVWFiSWtJOW5aczN4YVpBUWJNR0JvSE9QRkNaQVlPRTM2VmFTVmpOQmhZWEYrQkplU29hTXpRbDY2d09XVmJjcDIrclFvZzlabDQ0TGtETERIRlBLc3ozKzFpYzYyTmxkUjJOaGdYTENGcFNTazZ1NkF5bFZRQkFXeFpINzZBWDJLM3BhL0VYZDBScUllWXBCdDZQcUZGcFc1MHpoRlJCdmwzdEtyU2FKaTVkdUlDdzR2ZzQwY2FxQWtvSXNXb0ZUVGdxQWJYRzdZMFF4UHluQVdPZFpRbWxsT2gwV3Bqdjl6QzBIU3d3KzdSVXNPYjhSQW1JbnJpY2JrT3UxOWhuTE9CN0hJQkdSaC9Mc0tmd3EyTUwwaENKQkdTZ3ZaWVcvS2pVckxSbEJlRjB2YzRsbTVabDFaRWNLeUZRNjY0N1ZEYzZaWmtHT3AxT1VGN2hyN3JuTC9xbDI1UithOGtJdk9GNm9VcVBXT2tSSm4xSmN6cHVpVkhNL2FwWGg4cWZzRlFORTU3bitIVnFyUlpjMXoxUmdLWXdzRnJIK2N6dDVwZE53WWpyVld6VWFRR2FJSU9Kc0RBL0I3ME1YcXFBK2s4M3BGQ2F4RXoxaUVxditCeHlwZ0t2NzQzOThjVFlkdkg0V3hiUjdyUW5hdm1Qbzk1TDNrdlA4NjdWNldadTFteDd2bHJsZ3FZbC9IWFMzekFNWEx5NENDRUVGSWZTVk1aTE5RYi9xdlFpWlFsK05ia21xRklhd1QrekFlZFhLVko5UG5Wb3U3aHdZUW56L1I0ZWJHL2pPRHg1RFNkcm5ZanUxOEZlWW5YcENwNy9pcDYwVU9iRlY1MmRlVUNlNy9aZ1dvMGdyS2szZjFDSm9qb2twR2NpeFNuS2ZFb1M5ck5UMC9RcWxxcUNBRmN5bGhiNmFGZ21YTTJ4UG83WFh3RUgxK3VzelZyWDZ3Y1JyVEN6WkdZanNRakRkSVJ2TGtDVlVuN012OVZFdjllQlV1eG4yRXN0cFE4STgrOWk4aC94K3ZRNkxtT3ErT3pHMzE4aHFNSnFOakEzTitlMzI2eTRBc3B4YUN1bEZFelRYRE5OczdMSEQxU1A5WWZiSm9CYkNHTCt4d21abHRYYVNLVXdQejhIa0lFWFZ0YXhQTi9YY2tDVGlTVktaU1F5UjcwQzBtNzl5UUZMbkduRE4vdStCeHZiV0ZwYWdpREtYWnozdUJ4cVdxQXBwYTdyaVVXVmdDcnFQOTBWSW5wY1Nqa1YrVjkxM1NISGNYRnhlUmsvL3NOL0NkLzEyRG9XKzcxRWoxSUZTdlY0U25sTU9hbys5dm16SFl5eVlZNHVvZW9KaXZhamlyK0htaGRiK1VTTXc2TVIzdlhVRXhpUHh4TVZITE9nb2JJRW1sTHF1bTNidFphRnFoTkNEV2ZjNnBSMFJLM3ZwT2VCaE1CLytoLzlCMmkzTzVPMmFXcVJ1dVFTazV3NXFKek1Uc2xmNDA2YkFBUk10R09QSlRaTjl1clBPcDJHbVdTU0RHY0FqeWV2alZOM1dYYjk2ZnRtem5UN0NBQUpBd2Y3KzlpNmZ4K2gwRG9wZ0ViYVVzcnJkYVZqWGRVZmVmNTVxMldVMmFBVjJydkVNMDlLN08vdlkzOS9QNjd3eEdUVnA0Nkl6SDcrZWY0NmExRFVoWEhpR002dW81bzRWeEpCbkhGTkFDWlhRTW53eHRPcnZXWVhFYWFYMjB5SGs3a1l5Tm8xaGkzUWkrelRXUUEwMkhhRUVMZHJBL1hSUngrdGRjQndPTHkrc2JFeE00Q1dVVnArdWw3MVRuSjE5cXRMcCtVbERwOUFtNXRheHgxMzM3SnEweGtCMUEva1dOYks4dkx5b0xiWC82RVBmYWpXQVU4OTlkVDE3LzNlNzhYQndjSFV0VFhUVUZyNjUxVTd0aFQxTTBvSEY4cU9TMzlYZEh3SmM1SUxrQ3JYVWVYMzhteS9yTjg1amsxYUZhRGhabGtXUnFQUnpZOSs5S1BSOHBVbnhxM016ODkzdi9PZDc5eHlIR2M1dlZabUhjbDFFdEtrS3NOUTlmaXM3NDdUZG5HYTZ6Z3V5WDVDY2ZwYUFBMzN1M3o1TWo3MXFVLzk4cS84eXEvOHJkcXF2KzRCaTR1TEF5SmFaZWJsS3F0ZGxOWFpUTE93MW1rQmRKYk80WEVCZWx5YTZMaUFQZzVBZFVsUFJMVWRLWi94clNsOVI2TVJOamMzYnphYnpYUlh0c1JmR2YyVTl6NTlqdlIzV2Z1V1hVUFYzOG42cmZRNXF0eEhsZVB5N3FQTVJDbzZUNTNyTFR0ZkZ1aXFjcDlaNXlRaWpNZGpiRzV1WHB0R205Y2xVV2xyYXd0ZitjcFhWaGNXRmlyZGNQcm1wZ1ZCRlNEV1BWZmV0UmFkbyt6YWpndlFhWUJlZDlMVThSbU9DMUM5RStSZ01MQ2ZlKzY1MjlPWW5tWWRhUnB1blU3bkdwVkVNbVpoRjFabEM3Sk1qS3BteExUWE9zTzJpMU5kODZ4VS9peWNwS29KMWFacDNteTFXdmVtVWYxbVhaQUN3T0hoNGZVd01sWGtiSncwUUt0SWkxblloQ2ZSZHZHa0FYb2FYbnlkNXM2QjZsOTMvWHJ5Tkw1S2YxRFVCU2tBZk9JVG43aTF1N3RyaDRrRlZlMmVNcnV3cm4xVnBvS3JEdlkwcXJrS3B6cU52VjFtTTgvNnZmNVpGUlZmeDdiWFA1K2ZuOGUzdi8zdGxaV1ZsYW5ZSjNNYU1Ud2VqemN0eTdvMUdBemVYcVlPODlUeU5KNzZyR2lYR2E2UE5QUFY3RTViZWxhVjlsV3ZNKzl6d3pCQVJDc0Z3Q3lVck9ZMEhPdmUzcDUzLy83OVcvMSsvKzJ1NjVhbWhoMjNHOXdzYWFHVDRrRm4xZC8rTkhqUU91cjl1QUFOTjlkMXNiVzFkYTJDQnVjNlFDMFN4YlMydHNaZis5clgxajd3Z1EvZzhQRHd4QVpXWDliSHNpdzBtODNNdFVQOVlzQU9Rc29zL0JzT2g5aloyVUZXN3VPc0FYcGNCMmZhYXdyeU83Rzh2RHdoTUE0UEQrRjVYdFFIUzZYT1h4WWRtZ1ZBZzRwVDJMYU5MMzNwUyt1WWNwdEc5Uk1BN25RNmlTenRrNUJzNGIrV1plSHc4QkRydDlaaG1DWVNHVWJNYURaYjJOeTh0NzY5dlgwZFFDKzBVQjU1NUpISG4zenl5VGVQUnFNeklVRm5RZFNuMzF1V0JkdTI1V2MrODVsdk1MUEx6QUxCQ2tXUFAvN1c5MW9OeS9JWElrNnV6MFZDWUdGK3J2S3E0WFVCbWg1SDB6UzNtczNtN1FwcVB2TTdzNjQwRFYvY3ZYczNhdTQ3NjRWZDAvczBtMDNjdkhrTFgvN3lsOUh1ZEJJUFZ3aUJ1Yms1L05vLytMV1AzTDE5KzlNQTNoUTRpVnNmL09BSGYrNzd2Ly83LzhhdFc3ZU94VEJNQTlCWk1pQkY3OXZ0TnJhM3QzZC84UmQvOFZjQkhBSm93RitQWXZCemYrM25mL1dKSjU1NDk4SEJRYUxYcjIzYnVIamhBdDc4cGpkaU1CZ2N1K2R0MmVlV1pXRnZiKy8yOXZiMmJsMXZQOC9ycndKU0FvRFBmZTV6TjBlalVXNllOTStMcjBMbXAyOWNTb2xXcTRYNStYbDAybTEwT3Azb2IyNXVEcVB4Mk43ZTJub0E0QjBBM2hpQTlmRm1zMm1HTm5UVkNGaFZaNnVxcDE2WEFaa21vbWZiOWhqQUJRQ1BCdmYvR0lENSsxdjNWcnU5TGxxdEpsck4rSzloV1ppZm0wT2owWmdJY2xSeE9PdmF2YjFlRHlzckt6ZHUzTGdSNG9kSzhFWkZFcldTSkExZkU5RnQwelMzbVBseUhiNXpHclVxcFlSbG1UQU1ZeUs1dnRsc1lIMTkvWWJqT0hzQStnQ3NZQUsyOS9iMkhNZHhZQmhHVkxOK1VuSDQ0MGpJNDVnSGhtRmdNQmdNZzhmU0RQNDFBUFJ1M2JwMTA3SDlkYTQ4emJablpvUmRTbzZ6ZmxnZHhzQ3lyT3NhZnFwSTA4UStWVUtvT3ZxRnB2cDNOamMzYjdmYjdXUmozUk1JYy9yclR4a3dER1BDbWJLc0J0WnYzVm9ENEFCb0IwQzFBTFFlUG56b2pzZmphRTNQYWVMaFZlUHdWVGppc3QrdEdzM1MzeHVHZ1lPRGc3RFpXRk83Ly9scjE2OXQ3Tzd1RHN4VWt4Rm1odFV3RTlxd2psU2RKakJ3Ky9idDZ5bk1VUjBCS2FvU3Jxbk51SHIxS2w1KytlVWIvWDYvTmtEclVsaFNTcGltR1MzaXE5dW5qbU5qZmYzV09vQnVNRUJtQ05TTmpRMW5QQjU3V2FxL1NrVHJ0T0x3VlFJWE9iVkhFRUpnZDNjM0JLcWxQWU91a3ZMZy92MzdOOU05Y0JVekdsYkRMNWJNWUZGbUJkQXdJc1hNK1BNLy8vTmJHUUNscXZnVE5lelNDY25hYXJWV3NpVEt0QmxGUlJFVDB6UmhHR1pDWVppbWlmMzlRL3VsbDE2NkY2aDlJeGdrRTBCamMzUFRHdzZIam1FWXRZRnlrZ0NkRnNENlp5SEFpQWdIQndkMk1DWU43ZjZiQU9TZDIrdTNqRlR2QmdKZ21rWXVTR2NCVVAwNHd6REdyVlpyUGNlTXBDb2F2WTdxbnpqNXpaczNWNmQxS3FwOGwzeE5NQzBUU3V0eDBteTFzTFcxZWR0eG5OMkFsckswZ2JLa2xCZ09oeU45T2UrczM5SWRpdU5rWHgwWG9GWHlGM1F6aThqdmNqMFlET3dBbUlhbVVVemZUcjI1UGg2TklJS2VwejV3VEppbUNjbnFXRTVTUmRzVXU3dTdkKy9ldlZ1V05WVW9NRVVkQnlyOTc1Lys2Wi9jTEpwOXg3RjcwZ0FTZ21DYVZtTEpUOU13Y09mTzdkc0JiOWhJRFpJRkFNUGhjSnduVWZOU0VPc0FkQm92ZlpyM2VYRjQxM1V4R0F5Y2xEUTFnci91dFd2WDd1L3Y3dyt0UUtxRzlyNWxXcENlUERHQWhsdW4wOEg2K3ZyTnExZXZPaWxUa3lxQ3ROQ1p5bFA1K2g4TXc3d2poQmpYQVdnVk1HUUJTQkNoWVpuUldxVmh0T1BHalJ2ckFEcXBBVElDb1BMQndZR2Q3cUJjSjRtN3FyTTE2MFNSb3M5MVI4cDFYZXp1N2pxQlJEVlQ1azlIS2JXL3VibTUzbXExd3BQQ05HUEhOSSs2bStVbWhGalZXQ1lxRUg1VUY2aDVLai94L3ZyMTY3ZTJ0clkyd3REbXRGbjdlVkpELzQ2RWdLazFmalZORXdjSEIrTnJWNjl1QlVBMVVtQTFBV0IvZjk4MlRiT1NlcThpVlU1YXZlZE4xanhIeFhHY0VLaFdhcUlhZ1pSVmQrN2N1U09FWHc2dEFvQmJsZ2s5WUROcmNPcVRhWDE5UFV4R01YS2NxRkxwS3FaUitjRy8xdlBQUHorK2NlUEdyVzYzTzVPcy9UeEFoTjZ0WmNaQWJiYWEyTnJhM0FqNDB4Q29JZ1ZVM3R2YlM2UWpWZ1ZJblhLUWFlM05yUFBYeWFiMzE3Vnk4ZURCZzNEUlZhRTloL0IxKythTkczZkdvNkF6aVIvT2hEQU0xT2s3ZGd4cGl1OTg1enMzTTdSeUZXRllTZlhucVh6OUljQTB6ZXZUVWo5MVRBUm0zL01QVlpVZ0EzZnYzTDBMZjBWY0t6VklJVmpGNGVHaEUzcTNSVkk5RHlCMWFiVnB5ejJxU2pWOVB5RUV4dU94dmIrLzcyV1lQaUZ3MjJ0cnE5dDcrM3VEa09RM2czeUowMWpGaFlqUWFEUnVGVkJTbGFScW5SQnFlaDhEQUc3Y3VIRXpMNEU2UzFKTXl3QklxU0xTUDNRaTFtNnMzUTFBcWs4Z29kRnU1dUhob1owT28xWU5sMDVMMUZlMWc1VlN4eTZZR3c2SHRtM2JyS25WOUhOb1Mra2RiRzV0YnJSYXZvbldhRmlGUFE5bXRRVWUvKzdLeXNydERJRkhPUksybHVvdkkyVWpMdldyWC8zcWphd2VxMW04NUhFTCsvd3dxbStySHV6dmpWZFhWdTRIMFNnak5WRGh2K2JlM3A3dGVWNmlyMUpablAyNFJIM1orZXAwc2lzNlp4QStkWmhaYXRwazRoa0FVUGQ4N1JOSVZBdUdSdG1kMU5acXRiQzF0WFhycFpkZTJ0WUVTbDJCbUJ2ckw3TlJFN01ncTQvUVNXVFRLNlVnREFORUFxMW1BemR2M05nY2o4ZDdBWDlLV294Yk4xR00zZDFkeDNWZENDRWdwWnpaV2xoMWppL0xBNmhEdXFjZGxZQkQ5YlN4VEFzZkJtQ3RyYTNldFcwLzM2SFphQVFMb2pIb0JGZklDTTYvRmx4Zk55UE9INzdXZXc2bVgzT2R1Q3VsSWxuaG4vbjg4OC9mMnQ3ZTNrMW40dVJKam1ucmtWZ3BOQ3dya0l5RXUzZnYzQWtlZ0ZHZ0JjU0RCdzlzeDNFcVY4c2VKMnBVdFF5N2p2UXNPcThRSW94S2VUbFJ4dkJadEcvZXZMRzl0N2M3TUN3VGx1WGIrblU2T1U2eitlbVpOOWUwOEc3YXo2a2N2cTlDVHhYOTIveld0NzYxczdHeEVmRjBkV3pRT3VGV0ZhZzYwelRodVI1dTNGamJLSkQwMFFPNWYvKytZOXUyZXFXalNMTUVxSjQ1ZFhSMFpBY09aWkhkMS9BOGIvLysxdGE5cHRWRW1nVTVTUnYxMnJWcnQzS29xVEpOVG5sQXBSTFNYMlM4TmdFTUFheUZNN1JxTmxUVmJDdjlQUkdoM1dsalozZkhYbDFaM1FyczA2eWJqMVRMNGVHaE94d083YXpCZVRVQk5EMkppZnkxVndlRHdUaDEvNXlqQ2VXZE83ZnZHcVkvMmZWR3pDZTFCUUdGV3hrQXpKT3F1YUZWVVpFM3pVTzhCUUJyYTJ1M3NscjhsTmw0ZGNPWFFnaDB1MTFzYlcyRjlta2pZM0QwQVNQYnRsMDlqSG9XQUZwa3g5YjVQSWp6T3lqdUt4Mk41ZHJhMm9ibmViQUNNKzBrTno5aGFGK3VyS3pjMGlKU1phWmxMcTlhdGFVUDVSQzJBZ0NlZi83NW00MUdvNUthcitLZzVFbGNJa0t6MGNUTlc3ZHVBN0JUQTVUK0N4YVRabmMwR3MxRW91WmQ2Nnk4K0xxUzFmTTg3Ty92aHdWaEN2b1NNWk9nYmQrNmVXUHpZRzkvMk85MW8xRDBTZHFuT3pzN2Q3NzV6Vzl1QTJpbHREalY1VlhOSEp1Z0NzOUZtb2hmNzNhN1dGaFlxRVNLMS9GdTlVeWhScU9CM2IxOXJGeTdlamMxS0pRQ3FTNVZ4NDdqOFBMeU12UWs2bW05L2l3dnZveVRMTm8zcXhkcWxlZGltaWFhelNZT0R3L0hBVWhWem1RTlA3ZWtsRHNIQi92M0wxNjg5Tmg0TkFBelRrejk5L3Q5N08vdmJ3UFlDU0tIb2JxWEdUakthSGFma3RCbC9GV0pWQ1VBM2E5OTdXdXJYL3JTbDE2V1VscWU1MUVBem1oLy9YWHdQbkdlMVB2dzJJa1oxdXYxOEkxdmZQM2c5dTNiWWFJMHB3Q3Iwand2QVBtTmIzeGo2L0xseSswSER4NkFtWW1JV1B2ZHlyUlRtWlRMQ3lwTVF6MFZmTThBeURSTkZrSmdZMlBqTUdPaTVnR1h2dld0YjM3OTYxLzdXaDlnZGwwM1BhbDVpdGVjTWpzWUFNL1B6K1ByWC8vNkY1azV6R3hqRFpCNU5CVXlBRXNJVmc0ek1nenZMQ2NxSGZFd2RFSTVuTFZJWnUvb2YxYkdhMHM3eHNvNUxoMFc1T0RHVzlyMXBpTlM2VDlWMFE2ZktrcFlsVlk4TGkyWjg2OStqM2tTVldudmgrRUVUdjE1d1o4RTRHcnZYZTB6Vi92TXkzanRwYzdqQmVPcS80N0t1YTRzOHkwQ3ZsbHhFTW9vQlRPNGlDSjdGa1gwUTg1c1ZkckVDZCtITVd3dlpXTm56ZGdpb0I0WHBIUU1zTTBLckZXQW1nYXNDYisrakF0QWtuZTlSV05KT2Jnb29wMHFsMHliRlI1NldZWkxDQTQ5d3p4UHFtWkoxeXdKbXBhbUloVWlWQm5YSURLQWlnSjdLRzNmMGltRHJzNXZGQTJvU2dGTVpYeWVsbUNHZG41ZHlPU052OGdBcFpHaHpjSnhDaU5sWG9ZQXkyT1F1QXBROCt6UU1pbFlka3pSQUdUWlIra0hTeVhTVjVlNkt1ZWhWcVhienVMcXUxbTBFeGRJVjVXaGtiTEFtdlVuQzZSckZXbUxFbW1iOVIwWFVHcWM1ZlhYVVhOVWNnRlZWVllha0VvREhhZUFpcHlIcG9NMGxMYXlRQlZWYm5od3hqYXU4VXlMMUQvbkFGUldBSE1SOVZWbjRrMGxMTXdhQUozVncrYUNQNVdqaHZSOWpJcVN0QXBJWDAwcjduSU5KNnNNc0NybDJNZ0M2VnBIeXM1S2EweElWM1BLQjFZMG01R2hmb3lNQnlGU0VsVVcvSjZSSVQyTmxQVE1VL24wS3Bha2RZRmFCYXdxQjdReUI3VDYvckpFeW5JRnlUc1ZzTTBaU1VoVVVEK1Vrb1F5cGFyekhEWGRTUklhYUdVR0hWWFhObjAxYjFXRUJESWtZcFlKSUROQUt6TSs1NEx6bGVIaFdBNm9XZUZoVlBHS3VlS2ZibzlTaGpTVkJlY1ZLYURYaXA3bE9JZDh4aVVzVjFDUlhDSmRWY2EvcXNBbVRVdlhLdnluS25DMHVNVE9ybVErbURVZkdrOWhGNGtNQjBkbXFIdE9jWDJNWkRLMHdHUUdPMlVFS3NxTTlpSmJpYzhJV0huSy9iUCtWUVU4cTB6NUJsd0ExRHp6SU8xZkZKSDNSZFFiendxb21ablhVMGhSSGF4WlRwS3U4dFBPRXVWSVV5QTdFWmZPcUtROENWQnppYlRLb3E2S21BQlZBdFlzYWNvNTNDNHFBTGZ3L3N3YVJETlhrTEpadEZLUk04TVo5cWhLa2NsWklOV0JLUXFBV1NlUThXcDJxS3BJMWpyVVZSWWpJQ3NBbUVzQVBEUFZuMVo5ZVZHY2RBS0lLZ0NJS3BqeFJvb1pvQXdwS2twVVBTRS9ORWNsS3AxZUl5RGxIRzJuUDM4VXFPVzBoSlE1d0pVRndGVUZVcHByZ25nQ0syWU9RTXZBbXdad2tiTWtDeWduMWp4NVRnRTFUOVVMSEMrQzlscFcvMFhtUUJHZGxBYVVyQ2hoVllrNXdEV0JXWXZ3WitTWGRuQUJPTE1rTFRJQW5iWmwwaUFWbWhPVlZ2R1U4VHBMYXRMckdLUkZkQlhsQUZibGdGYW0rRlBPQVMyak9CU0xpdTl6Nzhrc1VQZGM0QlhyRWxOZ01ra0VPZVlDWjBoVHhtUTlWaFpUa0VmcUl3VmdmaDJBY3hvN3RVcFFRSlU0VzNtcXZxcjZWeWxoeGhYcHRvUkVMVlAvbkFGT1VYREQ0ZWJsN0pmbkxPVnhwRlc2YXRBWnBKcE9FNkJVa1hoSFJjbGF4ZzdrUmE2eUFnR3FndFRQTldQeWJGUWRoSlRpNUFTeXMrcXp5UG1zSDlaRHFxSUM5VlFsNnZSYWNaaG1JVW1wUkoxeWpwT0ZFamFnU2hnMkQ5eFpRaXlQT3N0VS8wVmVmMXFDWnBrRStvK2xUWUJRZllzTW9DTkRPcWZWZTFuc1BzOG1mYjJxL0NvbUFLRTRKcDluQnRTUnNtVkFyV09iY3RycnIwcE5xUlJ2bVZiLzZka2hNQm1sNGd4ZzFwR2lWYjE2ZWgyRHN5b2prQmR5elNMdWkyaW1vam90VkpnY3BSeXhXWU03VGR0K25BS3J5dUJCT1VNYVMyUTNzNmlqNmxId21sRXZWL2ExQmxUT2VCNVZiVmFVZ0xWSTBxb1NjSmRKVTVSNS9XbEFVb0hkUXltSnFOOVltWXFtak4raERITWdMM2FQblBPa1A2OGlUZWsxS0RtclNGVkNlYlZBbG1Zc3Fod29ZZzFRNEdpWHBRUnlsak5WMVVoUE8xTlptOHFobGFvVTN4VTVTM1hWL0xucUwxZi9xS0NPcStTNTVqRStaWjhYY2I2SjY4empJN1BVckNnQVVKWVRCQlRuaTViWm5sVWJhdUVjcExVa0xpcXlBandsWVBOWWhMTGZLUHE4RWhpeXdGcm01SlNCczhvRUtiTkZ6NEU2UFZDcjJxNVZrbHRRQWNSbGtoTmx6bFdWdW5zcSthNnM4STlxZ3IydUIzOU9SNzF5RXJZS21JOE4waktnb29LM1hRWllZTExlSGpXT25hVWQrbHFMVlBFVTk0OGNOZ2NWUUZNM05Gc0ZvSlZBQ2xRdmZLc2lYVkVUakZXb3BycWdQSmV1MDVzQVpjNVdHVWlyQUhLYWNwVlNvRllGYXhGZ0dkVmo4M1VBZHc3STB3VXYxd0J0K3JPaWhLWEtEUzNxRU9OMTYrU3JnRERySEduNnE0NTA1ZGNoc0xubWhLNUNZWEdPaWNFVjlpOXoxTXJvc21NRHRZNkVuUWJRSnlrOVg2OUFuYld6bFdmZlZvMDA4WlRYemRNVXY5RVVvS01LeDgvQzJUazNDV1lINHFJR2JWVWw0dFFTTkwzdmNSTTVwb2tZemRLVFA5OU9GK0JjOHpnKzVxU0pqakZtQkpSWlpqUE5wTFBHK1RZMU1QbVlvRDZPOU13OWJ0WTltZklTbUY4THZaL090M3FTbG1mNU82ZEpBNTFUVHE5Tkc1ZFA0L2RvaGtBN2QzN09RWHRpNTZWWEliak93WDEyUVhkaTEzQk9CNTF2cjRvSmNwbzI2UGwyRHM0ekI2NXowSjREOHpVRnFITkFuNE93MHZiL0R3RFVURnQ0UmZoYWJRQUFBQUJKUlU1RXJrSmdnZz09XCIiLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4Lmxlc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cbnZhciBleHBvcnRlZCA9IGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB7fTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0ZWQ7IiwiaW1wb3J0IFwiLi9pbmRleC5sZXNzXCJcbi8qXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBhcHAgPSB7XG4gICAgLy8gQXBwbGljYXRpb24gQ29uc3RydWN0b3JcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCB0aGlzLm9uRGV2aWNlUmVhZHkuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICAvLyBkZXZpY2VyZWFkeSBFdmVudCBIYW5kbGVyXG4gICAgLy9cbiAgICAvLyBCaW5kIGFueSBjb3Jkb3ZhIGV2ZW50cyBoZXJlLiBDb21tb24gZXZlbnRzIGFyZTpcbiAgICAvLyAncGF1c2UnLCAncmVzdW1lJywgZXRjLlxuICAgIG9uRGV2aWNlUmVhZHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY2VpdmVkRXZlbnQoJ2RldmljZXJlYWR5Jyk7XG4gICAgfSxcblxuICAgIC8vIFVwZGF0ZSBET00gb24gYSBSZWNlaXZlZCBFdmVudFxuICAgIHJlY2VpdmVkRXZlbnQ6IGZ1bmN0aW9uKGlkIDogYW55KSB7XG4gICAgICAgIHZhciBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuaW5nRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RlbmluZycpO1xuICAgICAgICB2YXIgcmVjZWl2ZWRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucmVjZWl2ZWQnKTtcbiAgICAgICAgaWYgKCFsaXN0ZW5pbmdFbGVtZW50IHx8ICFyZWNlaXZlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5pbmdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lOycpO1xuICAgICAgICByZWNlaXZlZEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OmJsb2NrOycpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBFdmVudDogJyArIGlkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvdWlpaVwiLCBkZXZpY2UubW9kZWwpO1xuICAgIH1cbn07XG5cbmFwcC5pbml0aWFsaXplKCk7XG5jb25zb2xlLmxvZyhcInRlc3QgbHVkb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9