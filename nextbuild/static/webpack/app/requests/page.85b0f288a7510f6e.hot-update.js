"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/requests/page",{

/***/ "(app-pages-browser)/./src/app/requests/page.tsx":
/*!***********************************!*\
  !*** ./src/app/requests/page.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Navbar */ \"(app-pages-browser)/./src/components/Navbar.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ \"(app-pages-browser)/./src/app/shared.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst page = ()=>{\n    _s();\n    const [requests, setRequests] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);\n    const stopLoad = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(false);\n    const size = 8;\n    const pageNum = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(0);\n    const myAccountInfo = ()=>{\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/account\";\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            return response.json();\n        }).then((data)=>{\n            console.log(data);\n            return data;\n        }).catch((error)=>{\n            console.log(\"Authorization failed : \" + error.message);\n        });\n    };\n    const getDbNotification = ()=>{\n        const id = myAccountInfo();\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/notification/smm/\".concat(id, \"/?page=\").concat(pageNum.current, \"&size=\").concat(size);\n        console.log(url);\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            if (!response.ok) {\n                throw response.status;\n            }\n            return response.json();\n        }).then((data)=>{\n            if (data.length === 0) {\n                pageNum.current--;\n                stopLoad.current = true;\n            } else {\n                setRequests((requests)=>[\n                        ...requests,\n                        ...data\n                    ]);\n                stopLoad.current = false;\n            }\n            console.log(data);\n        }).catch((error)=>{\n            console.log(error);\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        getDbNotification();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center align-middle w-full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center align-middle h-fit w-2/5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: \"text-black text-center\",\n                            children: \"Richieste\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 80,\n                            columnNumber: 11\n                        }, undefined),\n                        requests.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center\",\n                            children: \"Non hai nessuna richiesta :(\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 82,\n                            columnNumber: 13\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center border-black border-2 rounded max-h-[700px] overflow-y-scroll\",\n                            children: requests.map((request)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex justify-between\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"p1\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                            lineNumber: 87,\n                                            columnNumber: 19\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"p2\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                            lineNumber: 88,\n                                            columnNumber: 19\n                                        }, undefined)\n                                    ]\n                                }, \"1\", true, {\n                                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                    lineNumber: 86,\n                                    columnNumber: 17\n                                }, undefined))\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 84,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 79,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 78,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n        lineNumber: 76,\n        columnNumber: 5\n    }, undefined);\n};\n_s(page, \"yxQUoHcG6wr+lTHzuThjNBbrd2I=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (page);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVxdWVzdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDeUM7QUFDSztBQUNWO0FBRXBDLE1BQU1JLE9BQU87O0lBQ1gsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLHFEQUFjLENBQVEsRUFBRTtJQUN4RCxNQUFNTyxXQUFXUCxtREFBWSxDQUFDO0lBQzlCLE1BQU1TLE9BQU87SUFDYixNQUFNQyxVQUFVVixtREFBWSxDQUFDO0lBRTdCLE1BQU1XLGdCQUFnQjtRQUNwQixNQUFNQyxNQUFNViw0Q0FBT0EsR0FBRztRQUV0QlcsTUFBTUQsS0FBSztZQUNURSxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO2dCQUNoQkMsUUFBUTtnQkFDUkMsZUFBZSxZQUFZQyxhQUFhQyxPQUFPLENBQUM7WUFDbEQ7UUFDRixHQUNHQyxJQUFJLENBQUMsQ0FBQ0M7WUFDTCxPQUFPQSxTQUFTQyxJQUFJO1FBQ3RCLEdBQ0NGLElBQUksQ0FBQyxDQUFDRztZQUNMQyxRQUFRQyxHQUFHLENBQUNGO1lBQ1osT0FBT0E7UUFDVCxHQUNDRyxLQUFLLENBQUMsQ0FBQ0M7WUFDTkgsUUFBUUMsR0FBRyxDQUFDLDRCQUE0QkUsTUFBTUMsT0FBTztRQUN2RDtJQUNKO0lBRUEsTUFBTUMsb0JBQW9CO1FBQ3hCLE1BQU1DLEtBQUtuQjtRQUNYLE1BQU1DLE1BQ0pWLDRDQUFPQSxHQUNQLHdCQUFvQ1EsT0FBWm9CLElBQUcsV0FBaUNyQixPQUF4QkMsUUFBUXFCLE9BQU8sRUFBQyxVQUFhLE9BQUx0QjtRQUM5RGUsUUFBUUMsR0FBRyxDQUFDYjtRQUVaQyxNQUFNRCxLQUFLO1lBQ1RFLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCQyxRQUFRO2dCQUNSQyxlQUFlLFlBQVlDLGFBQWFDLE9BQU8sQ0FBQztZQUNsRDtRQUNGLEdBQ0dDLElBQUksQ0FBQyxDQUFDQztZQUNMLElBQUksQ0FBQ0EsU0FBU1csRUFBRSxFQUFFO2dCQUNoQixNQUFNWCxTQUFTWSxNQUFNO1lBQ3ZCO1lBQ0EsT0FBT1osU0FBU0MsSUFBSTtRQUN0QixHQUNDRixJQUFJLENBQUMsQ0FBQ0c7WUFDTCxJQUFJQSxLQUFLVyxNQUFNLEtBQUssR0FBRztnQkFDckJ4QixRQUFRcUIsT0FBTztnQkFDZnhCLFNBQVN3QixPQUFPLEdBQUc7WUFDckIsT0FBTztnQkFDTDFCLFlBQVksQ0FBQ0QsV0FBa0I7MkJBQUlBOzJCQUFhbUI7cUJBQUs7Z0JBQ3JEaEIsU0FBU3dCLE9BQU8sR0FBRztZQUNyQjtZQUNBUCxRQUFRQyxHQUFHLENBQUNGO1FBQ2QsR0FDQ0csS0FBSyxDQUFDLENBQUNDO1lBQ05ILFFBQVFDLEdBQUcsQ0FBQ0U7UUFDZDtJQUNKO0lBRUExQixnREFBU0EsQ0FBQztRQUNSNEI7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ007OzBCQUNDLDhEQUFDcEMsMERBQU1BOzs7OzswQkFDUCw4REFBQ3FDO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDRDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNDOzRCQUFHRCxXQUFVO3NDQUF5Qjs7Ozs7O3dCQUN0Q2pDLFNBQVM4QixNQUFNLEtBQUssa0JBQ25CLDhEQUFDSzs0QkFBRUYsV0FBVTtzQ0FBYzs7Ozs7c0RBRTNCLDhEQUFDRDs0QkFBSUMsV0FBVTtzQ0FDWmpDLFNBQVNvQyxHQUFHLENBQUMsQ0FBQ0Msd0JBQ2IsOERBQUNMO29DQUFZQyxXQUFVOztzREFDckIsOERBQUNFO3NEQUFFOzs7Ozs7c0RBQ0gsOERBQUNBO3NEQUFFOzs7Ozs7O21DQUZJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXekI7R0EzRk1wQztBQTZGTiwrREFBZUEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3JlcXVlc3RzL3BhZ2UudHN4PzVlYmMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgTmF2YmFyIGZyb20gXCJAL2NvbXBvbmVudHMvTmF2YmFyXCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmNvbnN0IHBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IFtyZXF1ZXN0cywgc2V0UmVxdWVzdHNdID0gUmVhY3QudXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3Qgc3RvcExvYWQgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBzaXplID0gODtcbiAgY29uc3QgcGFnZU51bSA9IFJlYWN0LnVzZVJlZigwKTtcblxuICBjb25zdCBteUFjY291bnRJbmZvID0gKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgKyBcImFwaS9hY2NvdW50XCI7XG5cbiAgICBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKSxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aG9yaXphdGlvbiBmYWlsZWQgOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0RGJOb3RpZmljYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgaWQgPSBteUFjY291bnRJbmZvKCk7XG4gICAgY29uc3QgdXJsID1cbiAgICAgIGJhc2VVcmwgK1xuICAgICAgYGFwaS9ub3RpZmljYXRpb24vc21tLyR7aWR9Lz9wYWdlPSR7cGFnZU51bS5jdXJyZW50fSZzaXplPSR7c2l6ZX1gO1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG5cbiAgICBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKSxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgdGhyb3cgcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcGFnZU51bS5jdXJyZW50LS07XG4gICAgICAgICAgc3RvcExvYWQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0UmVxdWVzdHMoKHJlcXVlc3RzOiBhbnkpID0+IFsuLi5yZXF1ZXN0cywgLi4uZGF0YV0pO1xuICAgICAgICAgIHN0b3BMb2FkLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZ2V0RGJOb3RpZmljYXRpb24oKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24+XG4gICAgICA8TmF2YmFyIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgYWxpZ24tbWlkZGxlIHctZnVsbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgYWxpZ24tbWlkZGxlIGgtZml0IHctMi81XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdGV4dC1jZW50ZXJcIj5SaWNoaWVzdGU8L2gxPlxuICAgICAgICAgIHtyZXF1ZXN0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPk5vbiBoYWkgbmVzc3VuYSByaWNoaWVzdGEgOig8L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgYm9yZGVyLWJsYWNrIGJvcmRlci0yIHJvdW5kZWQgbWF4LWgtWzcwMHB4XSBvdmVyZmxvdy15LXNjcm9sbFwiPlxuICAgICAgICAgICAgICB7cmVxdWVzdHMubWFwKChyZXF1ZXN0KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9XCIxXCIgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxwPnAxPC9wPlxuICAgICAgICAgICAgICAgICAgPHA+cDI8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYWdlO1xuIl0sIm5hbWVzIjpbIk5hdmJhciIsIlJlYWN0IiwidXNlRWZmZWN0IiwiYmFzZVVybCIsInBhZ2UiLCJyZXF1ZXN0cyIsInNldFJlcXVlc3RzIiwidXNlU3RhdGUiLCJzdG9wTG9hZCIsInVzZVJlZiIsInNpemUiLCJwYWdlTnVtIiwibXlBY2NvdW50SW5mbyIsInVybCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnJvciIsIm1lc3NhZ2UiLCJnZXREYk5vdGlmaWNhdGlvbiIsImlkIiwiY3VycmVudCIsIm9rIiwic3RhdHVzIiwibGVuZ3RoIiwic2VjdGlvbiIsImRpdiIsImNsYXNzTmFtZSIsImgxIiwicCIsIm1hcCIsInJlcXVlc3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/requests/page.tsx\n"));

/***/ })

});