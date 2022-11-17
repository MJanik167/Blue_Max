/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar Game = /** @class */ (function () {\r\n    function Game(canvas, ctx) {\r\n        var _this = this;\r\n        this.createInstance = function (object, image, isEntity, positionX, positionY) {\r\n            if (isEntity)\r\n                _this.entities.push(new object(_this.ctx, image, positionX, positionY));\r\n            else\r\n                _this.objects.push(new object(_this.ctx, image, positionX, positionY));\r\n        };\r\n        this.frame = function () { return __awaiter(_this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n                this.objects.forEach(function (e) { return e.render(); });\r\n                this.entities.forEach(function (e) { return e.render(); });\r\n                requestAnimationFrame(this.frame);\r\n                return [2 /*return*/];\r\n            });\r\n        }); };\r\n        this.speed = 0;\r\n        this.score = 0;\r\n        this.playerInfo = {\r\n            fuel: 300,\r\n            bombs: 0,\r\n            altitude: 0\r\n        };\r\n        this.canvas = canvas;\r\n        this.ctx = ctx;\r\n        this.entities = [];\r\n        this.objects = [];\r\n        this.frame();\r\n    }\r\n    return Game;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\r\n\n\n//# sourceURL=webpack://blue_max/./src/Game.ts?");

/***/ }),

/***/ "./src/ObjectRender.ts":
/*!*****************************!*\
  !*** ./src/ObjectRender.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ObjectRender = /** @class */ (function () {\r\n    function ObjectRender(ctx, texture, positionX, positionY) {\r\n        var _this = this;\r\n        this.render = function () {\r\n            _this.ctx.drawImage(_this.texture, _this.coordinates.x, _this.coordinates.y);\r\n        };\r\n        this.ctx = ctx;\r\n        this.texture = document.createElement(\"img\");\r\n        this.texture.setAttribute(\"src\", \"../assets/\".concat(texture, \".png\"));\r\n        this.coordinates = {\r\n            x: positionX,\r\n            y: positionY\r\n        };\r\n    }\r\n    return ObjectRender;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObjectRender);\r\n\n\n//# sourceURL=webpack://blue_max/./src/ObjectRender.ts?");

/***/ }),

/***/ "./src/Plane.ts":
/*!**********************!*\
  !*** ./src/Plane.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ObjectRender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectRender */ \"./src/ObjectRender.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar directions = {\r\n    left: [\"ArrowLeft\", \"a\", \"A\"],\r\n    right: [\"ArrowRight\", \"d\", \"D\"],\r\n    up: [\"ArrowUp\", \"w\", \"W\"],\r\n    down: [\"ArrowDown\", \"s\", \"S\"],\r\n};\r\nvar angles = {\r\n    left: Math.PI * 1.05,\r\n    right: Math.PI * 0.05,\r\n    up: Math.PI * 1.5,\r\n    down: Math.PI * 0.5\r\n};\r\nvar Plane = /** @class */ (function (_super) {\r\n    __extends(Plane, _super);\r\n    function Plane(ctx, texture, positionX, positionY) {\r\n        var _this = _super.call(this, ctx, texture, positionX, positionY) || this;\r\n        _this.press = function (event) {\r\n            console.log(event.key);\r\n            for (var direction in directions) {\r\n                if (directions[direction].includes(event.key))\r\n                    if (_this.pressedKeys.includes(direction)) {\r\n                        return;\r\n                    }\r\n                    else\r\n                        _this.pressedKeys.push(direction);\r\n            }\r\n        };\r\n        _this.release = function (event) {\r\n            for (var direction in directions) {\r\n                if (directions[direction].includes(event.key))\r\n                    if (_this.pressedKeys.includes(direction))\r\n                        _this.pressedKeys.splice(_this.pressedKeys.indexOf(direction));\r\n            }\r\n        };\r\n        _this.render = function () {\r\n            if (_this.pressedKeys.length != 0) {\r\n                _this.pressedKeys.forEach(function (e) {\r\n                    return _this.coordinates = {\r\n                        x: _this.coordinates.x + _this.sensitivity * Math.cos(angles[e]),\r\n                        y: _this.coordinates.y + _this.sensitivity * Math.sin(angles[e])\r\n                    };\r\n                });\r\n            }\r\n            _this.ctx.drawImage(_this.texture, _this.coordinates.x, _this.coordinates.y);\r\n        };\r\n        _this.sensitivity = 5;\r\n        _this.coordinates = {\r\n            x: 350,\r\n            y: 350\r\n        };\r\n        _this.pressedKeys = [];\r\n        window.addEventListener(\"keydown\", _this.press);\r\n        window.addEventListener(\"keyup\", _this.release);\r\n        return _this;\r\n    }\r\n    return Plane;\r\n}(_ObjectRender__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Plane);\r\n\n\n//# sourceURL=webpack://blue_max/./src/Plane.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n/* harmony import */ var _ObjectRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ObjectRender */ \"./src/ObjectRender.ts\");\n/* harmony import */ var _Plane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Plane */ \"./src/Plane.ts\");\n\r\n\r\n\r\nvar canvas = document.getElementById(\"canvas\");\r\nvar ctx = canvas.getContext(\"2d\");\r\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx);\r\ngame.createInstance(_Plane__WEBPACK_IMPORTED_MODULE_2__[\"default\"], \"plane2\", true);\r\ngame.createInstance(_ObjectRender__WEBPACK_IMPORTED_MODULE_1__[\"default\"], \"tree1\", false, 400, 300);\r\nfor (var i = 0; i < 50; i++)\r\n    game.createInstance(_ObjectRender__WEBPACK_IMPORTED_MODULE_1__[\"default\"], \"tree1\", false, Math.floor(Math.random() * 640), Math.floor(Math.random() * 480));\r\n\n\n//# sourceURL=webpack://blue_max/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;