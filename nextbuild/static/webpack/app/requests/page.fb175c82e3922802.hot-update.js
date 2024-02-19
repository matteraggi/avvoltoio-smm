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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Navbar */ \"(app-pages-browser)/./src/components/Navbar.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ \"(app-pages-browser)/./src/app/shared.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst page = ()=>{\n    _s();\n    const [requests, setRequests] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);\n    const stopLoad = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(false);\n    const size = 8;\n    const pageNum = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(0);\n    const getDbNotification = ()=>{\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/notification/?page=\".concat(pageNum.current, \"&size=\").concat(size);\n        console.log(url);\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            if (!response.ok) {\n                throw response.status;\n            }\n            return response.json();\n        }).then((data)=>{\n            if (data.length === 0) {\n                pageNum.current--;\n                stopLoad.current = true;\n            } else {\n                setRequests((requests)=>[\n                        ...requests,\n                        ...data\n                    ]);\n                stopLoad.current = false;\n            }\n            console.log(data);\n        }).catch((error)=>{\n            console.log(error);\n        });\n    };\n    const loadMore = (e)=>{\n        e.preventDefault();\n        if (!stopLoad.current) {\n            pageNum.current++;\n            getDbNotification();\n        }\n    };\n    function timeDifference(current, previous) {\n        var msPerMinute = 60 * 1000;\n        var msPerHour = msPerMinute * 60;\n        var msPerDay = msPerHour * 24;\n        var msPerMonth = msPerDay * 30;\n        var msPerYear = msPerDay * 365;\n        var elapsed = current - previous;\n        if (elapsed < msPerMinute) {\n            return Math.round(elapsed / 1000) + \" seconds ago\";\n        } else if (elapsed < msPerHour) {\n            return Math.round(elapsed / msPerMinute) + \" minutes ago\";\n        } else if (elapsed < msPerDay) {\n            return Math.round(elapsed / msPerHour) + \" hours ago\";\n        } else if (elapsed < msPerMonth) {\n            return Math.round(elapsed / msPerDay) + \" days ago\";\n        } else if (elapsed < msPerYear) {\n            return \"about \" + Math.round(elapsed / msPerMonth) + \" months ago\";\n        } else {\n            return \"about \" + Math.round(elapsed / msPerYear) + \" years ago\";\n        }\n    }\n    const currentDate = Date.now();\n    const displayNotification = (n)=>{\n        if (n.message) {\n            n = n.message;\n        }\n        let action;\n        if (n.type === \"MESSAGE\") {\n            action = \"ti ha mandato un messaggio\";\n        } else if (n.type === \"SQUEAL\") {\n            action = \"ha postato uno Squeal\";\n        } else if (n.type === \"COMMENT\") {\n            action = 'ha commentato uno tuo Squeal: \"'.concat(n.body, '\"');\n        } else if (n.type === \"REACTION\") {\n            if (n.reaction === \"heart\") {\n                action = \"ha reagito con ❤️ al tuo Squeal\";\n            } else if (n.reaction === \"exploding\") {\n                action = \"ha reagito con \\uD83E\\uDD2F al tuo Squeal\";\n            } else if (n.reaction === \"cold\") {\n                action = \"ha reagito con \\uD83E\\uDD76 al tuo Squeal\";\n            } else if (n.reaction === \"nerd\") {\n                action = \"ha reagito con \\uD83E\\uDD13 al tuo Squeal\";\n            } else if (n.reaction === \"clown\") {\n                action = \"ha reagito con \\uD83E\\uDD21 al tuo Squeal\";\n            } else if (n.reaction === \"bored\") {\n                action = \"ha reagito con \\uD83D\\uDE34 al tuo Squeal\";\n            } else {\n                action = \"ha reagito al tuo Squeal\";\n            }\n        } else {\n            action = \"nuova notifica sconosciuta\";\n        }\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-row justify-between p-2 bg-white rounded-xl\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"\",\n                    children: \"\".concat(n.username, \" \").concat(action)\n                }, void 0, false, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 115,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-[12px]\",\n                    children: timeDifference(currentDate, n.timestamp)\n                }, void 0, false, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 116,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 119,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, Math.random(), true, {\n            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n            lineNumber: 111,\n            columnNumber: 7\n        }, undefined);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        getDbNotification();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 130,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center align-middle w-full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center align-middle w-2/5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: \"text-black text-center\",\n                            children: \"Richieste\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 133,\n                            columnNumber: 11\n                        }, undefined),\n                        requests.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center\",\n                            children: \"Non hai nessuna richiesta :(\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 135,\n                            columnNumber: 13\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center border-black border-2 rounded h-[700px] overflow-y-scroll\",\n                            children: [\n                                requests.map((n)=>displayNotification(n)),\n                                requests.length != 0 && !stopLoad.current && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white\",\n                                        onClick: (e)=>loadMore(e),\n                                        children: \"Load more\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                        lineNumber: 141,\n                                        columnNumber: 15\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                    lineNumber: 140,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 137,\n                            columnNumber: 13\n                        }, undefined),\n                        requests.length != 0 && !stopLoad.current && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white\",\n                                onClick: (e)=>loadMore(e),\n                                children: \"Load more\"\n                            }, void 0, false, {\n                                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                lineNumber: 153,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 152,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 132,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 131,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n        lineNumber: 129,\n        columnNumber: 5\n    }, undefined);\n};\n_s(page, \"yxQUoHcG6wr+lTHzuThjNBbrd2I=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (page);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVxdWVzdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDeUM7QUFDSztBQUNWO0FBRXBDLE1BQU1JLE9BQU87O0lBQ1gsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLHFEQUFjLENBQVEsRUFBRTtJQUN4RCxNQUFNTyxXQUFXUCxtREFBWSxDQUFDO0lBQzlCLE1BQU1TLE9BQU87SUFDYixNQUFNQyxVQUFVVixtREFBWSxDQUFDO0lBRTdCLE1BQU1XLG9CQUFvQjtRQUN4QixNQUFNQyxNQUNKViw0Q0FBT0EsR0FBRywwQkFBa0RPLE9BQXhCQyxRQUFRRyxPQUFPLEVBQUMsVUFBYSxPQUFMSjtRQUM5REssUUFBUUMsR0FBRyxDQUFDSDtRQUVaSSxNQUFNSixLQUFLO1lBQ1RLLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCQyxRQUFRO2dCQUNSQyxlQUFlLFlBQVlDLGFBQWFDLE9BQU8sQ0FBQztZQUNsRDtRQUNGLEdBQ0dDLElBQUksQ0FBQyxDQUFDQztZQUNMLElBQUksQ0FBQ0EsU0FBU0MsRUFBRSxFQUFFO2dCQUNoQixNQUFNRCxTQUFTRSxNQUFNO1lBQ3ZCO1lBQ0EsT0FBT0YsU0FBU0csSUFBSTtRQUN0QixHQUNDSixJQUFJLENBQUMsQ0FBQ0s7WUFDTCxJQUFJQSxLQUFLQyxNQUFNLEtBQUssR0FBRztnQkFDckJuQixRQUFRRyxPQUFPO2dCQUNmTixTQUFTTSxPQUFPLEdBQUc7WUFDckIsT0FBTztnQkFDTFIsWUFBWSxDQUFDRCxXQUFrQjsyQkFBSUE7MkJBQWF3QjtxQkFBSztnQkFDckRyQixTQUFTTSxPQUFPLEdBQUc7WUFDckI7WUFDQUMsUUFBUUMsR0FBRyxDQUFDYTtRQUNkLEdBQ0NFLEtBQUssQ0FBQyxDQUFDQztZQUNOakIsUUFBUUMsR0FBRyxDQUFDZ0I7UUFDZDtJQUNKO0lBRUEsTUFBTUMsV0FBVyxDQUFDQztRQUNoQkEsRUFBRUMsY0FBYztRQUNoQixJ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Z0NBQ1pwRCxTQUFTNkQsR0FBRyxDQUFDLENBQUNoQixJQUFXRCxvQkFBb0JDO2dDQUM3QzdDLFNBQVN5QixNQUFNLElBQUksS0FBSyxDQUFDdEIsU0FBU00sT0FBTyxrQkFDNUMsOERBQUMwQztvQ0FBSUMsV0FBVTs4Q0FDYiw0RUFBQ1U7d0NBQ0NWLFdBQVU7d0NBQ1ZXLFNBQVMsQ0FBQ2xDLElBQU1ELFNBQVNDO2tEQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBT0o3QixTQUFTeUIsTUFBTSxJQUFJLEtBQUssQ0FBQ3RCLFNBQVNNLE9BQU8sa0JBQ3hDLDhEQUFDMEM7NEJBQUlDLFdBQVU7c0NBQ2IsNEVBQUNVO2dDQUNDVixXQUFVO2dDQUNWVyxTQUFTLENBQUNsQyxJQUFNRCxTQUFTQzswQ0FDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTZjtHQS9KTTlCO0FBaUtOLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcmVxdWVzdHMvcGFnZS50c3g/NWViYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCBOYXZiYXIgZnJvbSBcIkAvY29tcG9uZW50cy9OYXZiYXJcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2UsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgYmFzZVVybCB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuY29uc3QgcGFnZSA9ICgpID0+IHtcbiAgY29uc3QgW3JlcXVlc3RzLCBzZXRSZXF1ZXN0c10gPSBSZWFjdC51c2VTdGF0ZTxhbnlbXT4oW10pO1xuICBjb25zdCBzdG9wTG9hZCA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHNpemUgPSA4O1xuICBjb25zdCBwYWdlTnVtID0gUmVhY3QudXNlUmVmKDApO1xuXG4gIGNvbnN0IGdldERiTm90aWZpY2F0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9XG4gICAgICBiYXNlVXJsICsgYGFwaS9ub3RpZmljYXRpb24vP3BhZ2U9JHtwYWdlTnVtLmN1cnJlbnR9JnNpemU9JHtzaXplfWA7XG4gICAgY29uc29sZS5sb2codXJsKTtcblxuICAgIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpLFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICB0aHJvdyByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBwYWdlTnVtLmN1cnJlbnQtLTtcbiAgICAgICAgICBzdG9wTG9hZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRSZXF1ZXN0cygocmVxdWVzdHM6IGFueSkgPT4gWy4uLnJlcXVlc3RzLCAuLi5kYXRhXSk7XG4gICAgICAgICAgc3RvcExvYWQuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmUgPSAoZTogYW55KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghc3RvcExvYWQuY3VycmVudCkge1xuICAgICAgcGFnZU51bS5jdXJyZW50Kys7XG4gICAgICBnZXREYk5vdGlmaWNhdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiB0aW1lRGlmZmVyZW5jZShjdXJyZW50OiBhbnksIHByZXZpb3VzOiBhbnkpIHtcbiAgICB2YXIgbXNQZXJNaW51dGUgPSA2MCAqIDEwMDA7XG4gICAgdmFyIG1zUGVySG91ciA9IG1zUGVyTWludXRlICogNjA7XG4gICAgdmFyIG1zUGVyRGF5ID0gbXNQZXJIb3VyICogMjQ7XG4gICAgdmFyIG1zUGVyTW9udGggPSBtc1BlckRheSAqIDMwO1xuICAgIHZhciBtc1BlclllYXIgPSBtc1BlckRheSAqIDM2NTtcblxuICAgIHZhciBlbGFwc2VkID0gY3VycmVudCAtIHByZXZpb3VzO1xuXG4gICAgaWYgKGVsYXBzZWQgPCBtc1Blck1pbnV0ZSkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZWxhcHNlZCAvIDEwMDApICsgXCIgc2Vjb25kcyBhZ29cIjtcbiAgICB9IGVsc2UgaWYgKGVsYXBzZWQgPCBtc1BlckhvdXIpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1Blck1pbnV0ZSkgKyBcIiBtaW51dGVzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVyRGF5KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChlbGFwc2VkIC8gbXNQZXJIb3VyKSArIFwiIGhvdXJzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVyTW9udGgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1BlckRheSkgKyBcIiBkYXlzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVyWWVhcikge1xuICAgICAgcmV0dXJuIFwiYWJvdXQgXCIgKyBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1Blck1vbnRoKSArIFwiIG1vbnRocyBhZ29cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiYWJvdXQgXCIgKyBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1BlclllYXIpICsgXCIgeWVhcnMgYWdvXCI7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY3VycmVudERhdGUgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0IGRpc3BsYXlOb3RpZmljYXRpb24gPSAobjogYW55KSA9PiB7XG4gICAgaWYgKG4ubWVzc2FnZSkge1xuICAgICAgbiA9IG4ubWVzc2FnZTtcbiAgICB9XG4gICAgbGV0IGFjdGlvbjtcbiAgICBpZiAobi50eXBlID09PSBcIk1FU1NBR0VcIikge1xuICAgICAgYWN0aW9uID0gXCJ0aSBoYSBtYW5kYXRvIHVuIG1lc3NhZ2dpb1wiO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIlNRVUVBTFwiKSB7XG4gICAgICBhY3Rpb24gPSBcImhhIHBvc3RhdG8gdW5vIFNxdWVhbFwiO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIkNPTU1FTlRcIikge1xuICAgICAgYWN0aW9uID0gYGhhIGNvbW1lbnRhdG8gdW5vIHR1byBTcXVlYWw6IFwiJHtuLmJvZHl9XCJgO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIlJFQUNUSU9OXCIpIHtcbiAgICAgIGlmIChuLnJlYWN0aW9uID09PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDinaTvuI8gYWwgdHVvIFNxdWVhbFwiO1xuICAgICAgfSBlbHNlIGlmIChuLnJlYWN0aW9uID09PSBcImV4cGxvZGluZ1wiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+kryBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwiY29sZFwiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+ltiBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwibmVyZFwiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+kkyBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwiY2xvd25cIikge1xuICAgICAgICBhY3Rpb24gPSBcImhhIHJlYWdpdG8gY29uIPCfpKEgYWwgdHVvIFNxdWVhbFwiO1xuICAgICAgfSBlbHNlIGlmIChuLnJlYWN0aW9uID09PSBcImJvcmVkXCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDwn5i0IGFsIHR1byBTcXVlYWxcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGlvbiA9IFwibnVvdmEgbm90aWZpY2Egc2Nvbm9zY2l1dGFcIjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBwLTIgYmctd2hpdGUgcm91bmRlZC14bFwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIlwiPntgJHtuLnVzZXJuYW1lfSAke2FjdGlvbn1gfTwvc3Bhbj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF1cIj5cbiAgICAgICAgICB7dGltZURpZmZlcmVuY2UoY3VycmVudERhdGUsIG4udGltZXN0YW1wKX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8YnIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXREYk5vdGlmaWNhdGlvbigpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxOYXZiYXIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1taWRkbGUgdy1mdWxsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1taWRkbGUgdy0yLzVcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB0ZXh0LWNlbnRlclwiPlJpY2hpZXN0ZTwvaDE+XG4gICAgICAgICAge3JlcXVlc3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Tm9uIGhhaSBuZXNzdW5hIHJpY2hpZXN0YSA6KDwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBib3JkZXItYmxhY2sgYm9yZGVyLTIgcm91bmRlZCBoLVs3MDBweF0gb3ZlcmZsb3cteS1zY3JvbGxcIj5cbiAgICAgICAgICAgICAge3JlcXVlc3RzLm1hcCgobjogYW55KSA9PiBkaXNwbGF5Tm90aWZpY2F0aW9uKG4pKX1cbiAgICAgICAgICAgICAge3JlcXVlc3RzLmxlbmd0aCAhPSAwICYmICFzdG9wTG9hZC5jdXJyZW50ICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtMyBoLTggdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIGJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1ncmF5LTEwMCBob3Zlcjp0ZXh0LWdyYXktNzAwIGRhcms6YmctZ3JheS04MDAgZGFyazpib3JkZXItZ3JheS03MDAgZGFyazp0ZXh0LWdyYXktNDAwIGRhcms6aG92ZXI6YmctZ3JheS03MDAgZGFyazpob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gbG9hZE1vcmUoZSl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBMb2FkIG1vcmVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7cmVxdWVzdHMubGVuZ3RoICE9IDAgJiYgIXN0b3BMb2FkLmN1cnJlbnQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC0zIGgtOCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGhvdmVyOmJnLWdyYXktMTAwIGhvdmVyOnRleHQtZ3JheS03MDAgZGFyazpiZy1ncmF5LTgwMCBkYXJrOmJvcmRlci1ncmF5LTcwMCBkYXJrOnRleHQtZ3JheS00MDAgZGFyazpob3ZlcjpiZy1ncmF5LTcwMCBkYXJrOmhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBsb2FkTW9yZShlKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIExvYWQgbW9yZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnZTtcbiJdLCJuYW1lcyI6WyJOYXZiYXIiLCJSZWFjdCIsInVzZUVmZmVjdCIsImJhc2VVcmwiLCJwYWdlIiwicmVxdWVzdHMiLCJzZXRSZXF1ZXN0cyIsInVzZVN0YXRlIiwic3RvcExvYWQiLCJ1c2VSZWYiLCJzaXplIiwicGFnZU51bSIsImdldERiTm90aWZpY2F0aW9uIiwidXJsIiwiY3VycmVudCIsImNvbnNvbGUiLCJsb2ciLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJBdXRob3JpemF0aW9uIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJsZW5ndGgiLCJjYXRjaCIsImVycm9yIiwibG9hZE1vcmUiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0aW1lRGlmZmVyZW5jZSIsInByZXZpb3VzIiwibXNQZXJNaW51dGUiLCJtc1BlckhvdXIiLCJtc1BlckRheSIsIm1zUGVyTW9udGgiLCJtc1BlclllYXIiLCJlbGFwc2VkIiwiTWF0aCIsInJvdW5kIiwiY3VycmVudERhdGUiLCJEYXRlIiwibm93IiwiZGlzcGxheU5vdGlmaWNhdGlvbiIsIm4iLCJtZXNzYWdlIiwiYWN0aW9uIiwidHlwZSIsImJvZHkiLCJyZWFjdGlvbiIsImRpdiIsImNsYXNzTmFtZSIsInNwYW4iLCJ1c2VybmFtZSIsInAiLCJ0aW1lc3RhbXAiLCJiciIsInJhbmRvbSIsInNlY3Rpb24iLCJoMSIsIm1hcCIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/requests/page.tsx\n"));

/***/ })

});