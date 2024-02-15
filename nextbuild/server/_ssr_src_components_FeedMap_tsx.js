"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_src_components_FeedMap_tsx";
exports.ids = ["_ssr_src_components_FeedMap_tsx"];
exports.modules = {

/***/ "(ssr)/./src/components/FeedMap.tsx":
/*!************************************!*\
  !*** ./src/components/FeedMap.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/shared/react-jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-google-maps/api */ \"(ssr)/./node_modules/@react-google-maps/api/dist/cjs.js\");\n\n\n\nfunction FeedMap(props) {\n    const latSqueal = props.lat;\n    const lngSqueal = props.lng;\n    const mapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();\n    const center = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({\n            lat: parseFloat(latSqueal),\n            lng: parseFloat(lngSqueal)\n        }), []);\n    const options = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({\n            streetViewControl: false,\n            mapTypeControl: false\n        }), []);\n    const onLoad = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((map)=>mapRef.current = map, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__.GoogleMap, {\n        zoom: 14,\n        center: center,\n        mapContainerClassName: \"h-[600px] w-full\",\n        onLoad: onLoad,\n        options: options,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__.MarkerF, {\n            position: {\n                lat: parseFloat(latSqueal),\n                lng: parseFloat(lngSqueal)\n            }\n        }, void 0, false, {\n            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/components/FeedMap.tsx\",\n            lineNumber: 33,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/components/FeedMap.tsx\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedMap);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9zcmMvY29tcG9uZW50cy9GZWVkTWFwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTREO0FBQ0E7QUFLNUQsU0FBU00sUUFBUUMsS0FBVTtJQUN6QixNQUFNQyxZQUFZRCxNQUFNRSxHQUFHO0lBQzNCLE1BQU1DLFlBQVlILE1BQU1JLEdBQUc7SUFDM0IsTUFBTUMsU0FBU1QsNkNBQU1BO0lBQ3JCLE1BQU1VLFNBQVNYLDhDQUFPQSxDQUNwQixJQUFPO1lBQUVPLEtBQUtLLFdBQVdOO1lBQVlHLEtBQUtHLFdBQVdKO1FBQVcsSUFDaEUsRUFBRTtJQUVKLE1BQU1LLFVBQVViLDhDQUFPQSxDQUNyQixJQUFPO1lBQ0xjLG1CQUFtQjtZQUNuQkMsZ0JBQWdCO1FBQ2xCLElBQ0EsRUFBRTtJQUdKLE1BQU1DLFNBQVNqQixrREFBV0EsQ0FBQyxDQUFDa0IsTUFBY1AsT0FBT1EsT0FBTyxHQUFHRCxLQUFNLEVBQUU7SUFFbkUscUJBQ0UsOERBQUNmLDZEQUFTQTtRQUNSaUIsTUFBTTtRQUNOUixRQUFRQTtRQUNSUyx1QkFBc0I7UUFDdEJKLFFBQVFBO1FBQ1JILFNBQVNBO2tCQUVULDRFQUFDViwyREFBT0E7WUFDTmtCLFVBQVU7Z0JBQ1JkLEtBQUtLLFdBQVdOO2dCQUNoQkcsS0FBS0csV0FBV0o7WUFDbEI7Ozs7Ozs7Ozs7O0FBSVI7QUFFQSxpRUFBZUosT0FBT0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2F2dm9sdG9pby1zbW0vLi9zcmMvY29tcG9uZW50cy9GZWVkTWFwLnRzeD83YzRjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBHb29nbGVNYXAsIE1hcmtlckYgfSBmcm9tIFwiQHJlYWN0LWdvb2dsZS1tYXBzL2FwaVwiO1xuXG50eXBlIExhcnRMbmdMaXRlcmFsID0gZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbDtcbnR5cGUgTWFwT3B0aW9ucyA9IGdvb2dsZS5tYXBzLk1hcE9wdGlvbnM7XG5cbmZ1bmN0aW9uIEZlZWRNYXAocHJvcHM6IGFueSkge1xuICBjb25zdCBsYXRTcXVlYWwgPSBwcm9wcy5sYXQ7XG4gIGNvbnN0IGxuZ1NxdWVhbCA9IHByb3BzLmxuZztcbiAgY29uc3QgbWFwUmVmID0gdXNlUmVmPEdvb2dsZU1hcD4oKTtcbiAgY29uc3QgY2VudGVyID0gdXNlTWVtbzxMYXJ0TG5nTGl0ZXJhbD4oXG4gICAgKCkgPT4gKHsgbGF0OiBwYXJzZUZsb2F0KGxhdFNxdWVhbCksIGxuZzogcGFyc2VGbG9hdChsbmdTcXVlYWwpIH0pLFxuICAgIFtdXG4gICk7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPE1hcE9wdGlvbnM+KFxuICAgICgpID0+ICh7XG4gICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgfSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBvbkxvYWQgPSB1c2VDYWxsYmFjaygobWFwOiBhbnkpID0+IChtYXBSZWYuY3VycmVudCA9IG1hcCksIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxHb29nbGVNYXBcbiAgICAgIHpvb209ezE0fVxuICAgICAgY2VudGVyPXtjZW50ZXJ9XG4gICAgICBtYXBDb250YWluZXJDbGFzc05hbWU9XCJoLVs2MDBweF0gdy1mdWxsXCJcbiAgICAgIG9uTG9hZD17b25Mb2FkfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICA+XG4gICAgICA8TWFya2VyRlxuICAgICAgICBwb3NpdGlvbj17e1xuICAgICAgICAgIGxhdDogcGFyc2VGbG9hdChsYXRTcXVlYWwpLFxuICAgICAgICAgIGxuZzogcGFyc2VGbG9hdChsbmdTcXVlYWwpLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L0dvb2dsZU1hcD5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmVlZE1hcDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUNhbGxiYWNrIiwidXNlTWVtbyIsInVzZVJlZiIsIkdvb2dsZU1hcCIsIk1hcmtlckYiLCJGZWVkTWFwIiwicHJvcHMiLCJsYXRTcXVlYWwiLCJsYXQiLCJsbmdTcXVlYWwiLCJsbmciLCJtYXBSZWYiLCJjZW50ZXIiLCJwYXJzZUZsb2F0Iiwib3B0aW9ucyIsInN0cmVldFZpZXdDb250cm9sIiwibWFwVHlwZUNvbnRyb2wiLCJvbkxvYWQiLCJtYXAiLCJjdXJyZW50Iiwiem9vbSIsIm1hcENvbnRhaW5lckNsYXNzTmFtZSIsInBvc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./src/components/FeedMap.tsx\n");

/***/ })

};
;