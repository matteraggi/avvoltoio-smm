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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Navbar */ \"(app-pages-browser)/./src/components/Navbar.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ \"(app-pages-browser)/./src/app/shared.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst page = ()=>{\n    _s();\n    const [requests, setRequests] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);\n    const stopLoad = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(false);\n    const size = 8;\n    const pageNum = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(0);\n    const myAccountInfo = ()=>{\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/account\";\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            return response.json();\n        }).then((data)=>{\n            console.log(data);\n            return data;\n        }).catch((error)=>{\n            console.log(\"Authorization failed : \" + error.message);\n        });\n    };\n    const getDbNotification = ()=>{\n        const id = myAccountInfo();\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/notification/?page=\".concat(pageNum.current, \"&size=\").concat(size);\n        console.log(url);\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            if (!response.ok) {\n                throw response.status;\n            }\n            return response.json();\n        }).then((data)=>{\n            if (data.length === 0) {\n                pageNum.current--;\n                stopLoad.current = true;\n            } else {\n                setRequests((requests)=>[\n                        ...requests,\n                        ...data\n                    ]);\n                stopLoad.current = false;\n            }\n            console.log(data);\n        }).catch((error)=>{\n            console.log(error);\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        getDbNotification();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 76,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center align-middle w-full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center align-middle h-fit w-2/5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: \"text-black text-center\",\n                            children: \"Richieste\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 79,\n                            columnNumber: 11\n                        }, undefined),\n                        requests.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center\",\n                            children: \"Non hai nessuna richiesta :(\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 81,\n                            columnNumber: 13\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center border-black border-2 rounded max-h-[700px] overflow-y-scroll\",\n                            children: requests.map((request)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex justify-between\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"p1\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                            lineNumber: 86,\n                                            columnNumber: 19\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"p2\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                            lineNumber: 87,\n                                            columnNumber: 19\n                                        }, undefined)\n                                    ]\n                                }, \"1\", true, {\n                                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 17\n                                }, undefined))\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 83,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 78,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n        lineNumber: 75,\n        columnNumber: 5\n    }, undefined);\n};\n_s(page, \"yxQUoHcG6wr+lTHzuThjNBbrd2I=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (page);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVxdWVzdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDeUM7QUFDSztBQUNWO0FBRXBDLE1BQU1JLE9BQU87O0lBQ1gsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLHFEQUFjLENBQVEsRUFBRTtJQUN4RCxNQUFNTyxXQUFXUCxtREFBWSxDQUFDO0lBQzlCLE1BQU1TLE9BQU87SUFDYixNQUFNQyxVQUFVVixtREFBWSxDQUFDO0lBRTdCLE1BQU1XLGdCQUFnQjtRQUNwQixNQUFNQyxNQUFNViw0Q0FBT0EsR0FBRztRQUV0QlcsTUFBTUQsS0FBSztZQUNURSxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO2dCQUNoQkMsUUFBUTtnQkFDUkMsZUFBZSxZQUFZQyxhQUFhQyxPQUFPLENBQUM7WUFDbEQ7UUFDRixHQUNHQyxJQUFJLENBQUMsQ0FBQ0M7WUFDTCxPQUFPQSxTQUFTQyxJQUFJO1FBQ3RCLEdBQ0NGLElBQUksQ0FBQyxDQUFDRztZQUNMQyxRQUFRQyxHQUFHLENBQUNGO1lBQ1osT0FBT0E7UUFDVCxHQUNDRyxLQUFLLENBQUMsQ0FBQ0M7WUFDTkgsUUFBUUMsR0FBRyxDQUFDLDRCQUE0QkUsTUFBTUMsT0FBTztRQUN2RDtJQUNKO0lBRUEsTUFBTUMsb0JBQW9CO1FBQ3hCLE1BQU1DLEtBQUtuQjtRQUNYLE1BQU1DLE1BQ0pWLDRDQUFPQSxHQUFHLDBCQUFrRE8sT0FBeEJDLFFBQVFxQixPQUFPLEVBQUMsVUFBYSxPQUFMdEI7UUFDOURlLFFBQVFDLEdBQUcsQ0FBQ2I7UUFFWkMsTUFBTUQsS0FBSztZQUNURSxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO2dCQUNoQkMsUUFBUTtnQkFDUkMsZUFBZSxZQUFZQyxhQUFhQyxPQUFPLENBQUM7WUFDbEQ7UUFDRixHQUNHQyxJQUFJLENBQUMsQ0FBQ0M7WUFDTCxJQUFJLENBQUNBLFNBQVNXLEVBQUUsRUFBRTtnQkFDaEIsTUFBTVgsU0FBU1ksTUFBTTtZQUN2QjtZQUNBLE9BQU9aLFNBQVNDLElBQUk7UUFDdEIsR0FDQ0YsSUFBSSxDQUFDLENBQUNHO1lBQ0wsSUFBSUEsS0FBS1csTUFBTSxLQUFLLEdBQUc7Z0JBQ3JCeEIsUUFBUXFCLE9BQU87Z0JBQ2Z4QixTQUFTd0IsT0FBTyxHQUFHO1lBQ3JCLE9BQU87Z0JBQ0wxQixZQUFZLENBQUNELFdBQWtCOzJCQUFJQTsyQkFBYW1CO3FCQUFLO2dCQUNyRGhCLFNBQVN3QixPQUFPLEdBQUc7WUFDckI7WUFDQVAsUUFBUUMsR0FBRyxDQUFDRjtRQUNkLEdBQ0NHLEtBQUssQ0FBQyxDQUFDQztZQUNOSCxRQUFRQyxHQUFHLENBQUNFO1FBQ2Q7SUFDSjtJQUVBMUIsZ0RBQVNBLENBQUM7UUFDUjRCO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNNOzswQkFDQyw4REFBQ3BDLDBEQUFNQTs7Ozs7MEJBQ1AsOERBQUNxQztnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ0Q7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDQzs0QkFBR0QsV0FBVTtzQ0FBeUI7Ozs7Ozt3QkFDdENqQyxTQUFTOEIsTUFBTSxLQUFLLGtCQUNuQiw4REFBQ0s7NEJBQUVGLFdBQVU7c0NBQWM7Ozs7O3NEQUUzQiw4REFBQ0Q7NEJBQUlDLFdBQVU7c0NBQ1pqQyxTQUFTb0MsR0FBRyxDQUFDLENBQUNDLHdCQUNiLDhEQUFDTDtvQ0FBWUMsV0FBVTs7c0RBQ3JCLDhEQUFDRTtzREFBRTs7Ozs7O3NEQUNILDhEQUFDQTtzREFBRTs7Ozs7OzttQ0FGSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV3pCO0dBMUZNcEM7QUE0Rk4sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9yZXF1ZXN0cy9wYWdlLnRzeD81ZWJjIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiQC9jb21wb25lbnRzL05hdmJhclwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBiYXNlVXJsIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5jb25zdCBwYWdlID0gKCkgPT4ge1xuICBjb25zdCBbcmVxdWVzdHMsIHNldFJlcXVlc3RzXSA9IFJlYWN0LnVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IHN0b3BMb2FkID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3Qgc2l6ZSA9IDg7XG4gIGNvbnN0IHBhZ2VOdW0gPSBSZWFjdC51c2VSZWYoMCk7XG5cbiAgY29uc3QgbXlBY2NvdW50SW5mbyA9ICgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsICsgXCJhcGkvYWNjb3VudFwiO1xuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaWRfdG9rZW5cIiksXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1dGhvcml6YXRpb24gZmFpbGVkIDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGdldERiTm90aWZpY2F0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gbXlBY2NvdW50SW5mbygpO1xuICAgIGNvbnN0IHVybCA9XG4gICAgICBiYXNlVXJsICsgYGFwaS9ub3RpZmljYXRpb24vP3BhZ2U9JHtwYWdlTnVtLmN1cnJlbnR9JnNpemU9JHtzaXplfWA7XG4gICAgY29uc29sZS5sb2codXJsKTtcblxuICAgIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpLFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICB0aHJvdyByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBwYWdlTnVtLmN1cnJlbnQtLTtcbiAgICAgICAgICBzdG9wTG9hZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRSZXF1ZXN0cygocmVxdWVzdHM6IGFueSkgPT4gWy4uLnJlcXVlc3RzLCAuLi5kYXRhXSk7XG4gICAgICAgICAgc3RvcExvYWQuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXREYk5vdGlmaWNhdGlvbigpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxOYXZiYXIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1taWRkbGUgdy1mdWxsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1taWRkbGUgaC1maXQgdy0yLzVcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB0ZXh0LWNlbnRlclwiPlJpY2hpZXN0ZTwvaDE+XG4gICAgICAgICAge3JlcXVlc3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Tm9uIGhhaSBuZXNzdW5hIHJpY2hpZXN0YSA6KDwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBib3JkZXItYmxhY2sgYm9yZGVyLTIgcm91bmRlZCBtYXgtaC1bNzAwcHhdIG92ZXJmbG93LXktc2Nyb2xsXCI+XG4gICAgICAgICAgICAgIHtyZXF1ZXN0cy5tYXAoKHJlcXVlc3QpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT1cIjFcIiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPHA+cDE8L3A+XG4gICAgICAgICAgICAgICAgICA8cD5wMjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2U7XG4iXSwibmFtZXMiOlsiTmF2YmFyIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJiYXNlVXJsIiwicGFnZSIsInJlcXVlc3RzIiwic2V0UmVxdWVzdHMiLCJ1c2VTdGF0ZSIsInN0b3BMb2FkIiwidXNlUmVmIiwic2l6ZSIsInBhZ2VOdW0iLCJteUFjY291bnRJbmZvIiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQWNjZXB0IiwiQXV0aG9yaXphdGlvbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwibWVzc2FnZSIsImdldERiTm90aWZpY2F0aW9uIiwiaWQiLCJjdXJyZW50Iiwib2siLCJzdGF0dXMiLCJsZW5ndGgiLCJzZWN0aW9uIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJwIiwibWFwIiwicmVxdWVzdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/requests/page.tsx\n"));

/***/ })

});