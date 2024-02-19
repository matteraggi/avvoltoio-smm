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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Navbar */ \"(app-pages-browser)/./src/components/Navbar.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ \"(app-pages-browser)/./src/app/shared.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst page = ()=>{\n    _s();\n    const [requests, setRequests] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);\n    const stopLoad = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(false);\n    const size = 8;\n    const pageNum = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(0);\n    const getDbNotification = ()=>{\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/notification/?page=\".concat(pageNum.current, \"&size=\").concat(size);\n        console.log(url);\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            if (!response.ok) {\n                throw response.status;\n            }\n            return response.json();\n        }).then((data)=>{\n            if (data.length === 0) {\n                pageNum.current--;\n                stopLoad.current = true;\n            } else {\n                setRequests((requests)=>[\n                        ...requests,\n                        ...data\n                    ]);\n                stopLoad.current = false;\n            }\n            console.log(data);\n        }).catch((error)=>{\n            console.log(error);\n        });\n    };\n    const loadMore = (e)=>{\n        e.preventDefault();\n        if (!stopLoad.current) {\n            pageNum.current++;\n            getDbNotification();\n        }\n    };\n    function timeDifference(current, previous) {\n        var msPerMinute = 60 * 1000;\n        var msPerHour = msPerMinute * 60;\n        var msPerDay = msPerHour * 24;\n        var msPerMonth = msPerDay * 30;\n        var msPerYear = msPerDay * 365;\n        var elapsed = current - previous;\n        if (elapsed < msPerMinute) {\n            return Math.round(elapsed / 1000) + \" seconds ago\";\n        } else if (elapsed < msPerHour) {\n            return Math.round(elapsed / msPerMinute) + \" minutes ago\";\n        } else if (elapsed < msPerDay) {\n            return Math.round(elapsed / msPerHour) + \" hours ago\";\n        } else if (elapsed < msPerMonth) {\n            return Math.round(elapsed / msPerDay) + \" days ago\";\n        } else if (elapsed < msPerYear) {\n            return \"about \" + Math.round(elapsed / msPerMonth) + \" months ago\";\n        } else {\n            return \"about \" + Math.round(elapsed / msPerYear) + \" years ago\";\n        }\n    }\n    const currentDate = Date.now();\n    const displayNotification = (n)=>{\n        if (n.message) {\n            n = n.message;\n        }\n        let action;\n        if (n.type === \"MESSAGE\") {\n            action = \"ti ha mandato un messaggio\";\n        } else if (n.type === \"SQUEAL\") {\n            action = \"ha postato uno Squeal\";\n        } else if (n.type === \"COMMENT\") {\n            action = 'ha commentato uno tuo Squeal: \"'.concat(n.body, '\"');\n        } else if (n.type === \"REACTION\") {\n            if (n.reaction === \"heart\") {\n                action = \"ha reagito con ❤️ al tuo Squeal\";\n            } else if (n.reaction === \"exploding\") {\n                action = \"ha reagito con \\uD83E\\uDD2F al tuo Squeal\";\n            } else if (n.reaction === \"cold\") {\n                action = \"ha reagito con \\uD83E\\uDD76 al tuo Squeal\";\n            } else if (n.reaction === \"nerd\") {\n                action = \"ha reagito con \\uD83E\\uDD13 al tuo Squeal\";\n            } else if (n.reaction === \"clown\") {\n                action = \"ha reagito con \\uD83E\\uDD21 al tuo Squeal\";\n            } else if (n.reaction === \"bored\") {\n                action = \"ha reagito con \\uD83D\\uDE34 al tuo Squeal\";\n            } else {\n                action = \"ha reagito al tuo Squeal\";\n            }\n        } else {\n            action = \"nuova notifica sconosciuta\";\n        }\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: action.length > 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-row justify-between p-2 bg-white rounded-xl\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"\",\n                        children: \"\".concat(n.username, \" \").concat(action)\n                    }, void 0, false, {\n                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                        lineNumber: 117,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-[12px]\",\n                        children: timeDifference(currentDate, n.timestamp)\n                    }, void 0, false, {\n                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                        lineNumber: 118,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                        lineNumber: 121,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, Math.random(), true, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 113,\n                columnNumber: 11\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n            lineNumber: 111,\n            columnNumber: 7\n        }, undefined);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        getDbNotification();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 134,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center align-middle w-full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center align-middle w-2/5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: \"text-black text-center\",\n                            children: \"Richieste\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 137,\n                            columnNumber: 11\n                        }, undefined),\n                        requests.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center\",\n                            children: \"Non hai nessuna richiesta :(\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 139,\n                            columnNumber: 13\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center border-black border-2 rounded h-[700px] overflow-y-scroll\",\n                            children: [\n                                requests.map((n)=>displayNotification(n)),\n                                requests.length != 0 && !stopLoad.current && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex justify-center\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white\",\n                                        onClick: (e)=>loadMore(e),\n                                        children: \"Load more\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                        lineNumber: 145,\n                                        columnNumber: 19\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                    lineNumber: 144,\n                                    columnNumber: 17\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 141,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 136,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 135,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n        lineNumber: 133,\n        columnNumber: 5\n    }, undefined);\n};\n_s(page, \"yxQUoHcG6wr+lTHzuThjNBbrd2I=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (page);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVxdWVzdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDeUM7QUFDSztBQUNWO0FBRXBDLE1BQU1JLE9BQU87O0lBQ1gsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLHFEQUFjLENBQVEsRUFBRTtJQUN4RCxNQUFNTyxXQUFXUCxtREFBWSxDQUFDO0lBQzlCLE1BQU1TLE9BQU87SUFDYixNQUFNQyxVQUFVVixtREFBWSxDQUFDO0lBRTdCLE1BQU1XLG9CQUFvQjtRQUN4QixNQUFNQyxNQUNKViw0Q0FBT0EsR0FBRywwQkFBa0RPLE9BQXhCQyxRQUFRRyxPQUFPLEVBQUMsVUFBYSxPQUFMSjtRQUM5REssUUFBUUMsR0FBRyxDQUFDSDtRQUVaSSxNQUFNSixLQUFLO1lBQ1RLLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCQyxRQUFRO2dCQUNSQyxlQUFlLFlBQVlDLGFBQWFDLE9BQU8sQ0FBQztZQUNsRDtRQUNGLEdBQ0dDLElBQUksQ0FBQyxDQUFDQztZQUNMLElBQUksQ0FBQ0EsU0FBU0MsRUFBRSxFQUFFO2dCQUNoQixNQUFNRCxTQUFTRSxNQUFNO1lBQ3ZCO1lBQ0EsT0FBT0YsU0FBU0csSUFBSTtRQUN0QixHQUNDSixJQUFJLENBQUMsQ0FBQ0s7WUFDTCxJQUFJQSxLQUFLQyxNQUFNLEtBQUssR0FBRztnQkFDckJuQixRQUFRRyxPQUFPO2dCQUNmTixTQUFTTSxPQUFPLEdBQUc7WUFDckIsT0FBTztnQkFDTFIsWUFBWSxDQUFDRCxXQUFrQjsyQkFBSUE7MkJBQWF3QjtxQkFBSztnQkFDckRyQixTQUFTTSxPQUFPLEdBQUc7WUFDckI7WUFDQUMsUUFBUUMsR0FBRyxDQUFDYTtRQUNkLEdBQ0NFLEtBQUssQ0FBQyxDQUFDQztZQUNOakIsUUFBUUMsR0FBRyxDQUFDZ0I7UUFDZDtJQUNKO0lBRUEsTUFBTUMsV0FBVyxDQUFDQztRQUNoQkEsRUFBRUMsY0FBYztRQUNoQixJQUFJLENBQUMzQixTQUFTTSxPQUFPLEVBQUU7WUFDckJILFFBQVFHLE9BQU87WUFDZkY7UUFDRjtJQUNGO0lBRUEsU0FBU3dCLGVBQWV0QixPQUFZLEVBQUV1QixRQUFhO1FBQ2pELElBQUlDLGNBQWMsS0FBSztRQUN2QixJQUFJQyxZQUFZRCxjQUFjO1FBQzlCLElBQUlFLFdBQVdELFlBQVk7UUFDM0IsSUFBSUUsYUFBYUQsV0FBVztRQUM1QixJQUFJRSxZQUFZRixXQUFXO1FBRTNCLElBQUlHLFVBQVU3QixVQUFVdUI7UUFFeEIsSUFBSU0sVUFBVUwsYUFBYTtZQUN6QixPQUFPTSxLQUFLQyxLQUFLLENBQUNGLFVBQVUsUUFBUTtRQUN0QyxPQUFPLElBQUlBLFVBQVVKLFdBQVc7WUFDOUIsT0FBT0ssS0FBS0MsS0FBSyxDQUFDRixVQUFVTCxlQUFlO1FBQzdDLE9BQU8sSUFBSUssVUFBVUgsVUFBVTtZQUM3QixPQUFPSSxLQUFLQyxLQUFLLENBQUNGLFVBQVVKLGFBQWE7UUFDM0MsT0FBTyxJQUFJSSxVQUFVRixZQUFZO1lBQy9CLE9BQU9HLEtBQUtDLEtBQUssQ0FBQ0YsVUFBVUgsWUFBWTtRQUMxQyxPQUFPLElBQUlHLFVBQVVELFdBQVc7WUFDOUIsT0FBTyxXQUFXRSxLQUFLQyxLQUFLLENBQUNGLFVBQVVGLGNBQWM7UUFDdkQsT0FBTztZQUNMLE9BQU8sV0FBV0csS0FBS0MsS0FBSyxDQUFDRixVQUFVRCxhQUFhO1FBQ3REO0lBQ0Y7SUFFQSxNQUFNSSxjQUFjQyxLQUFLQyxHQUFHO0lBRTVCLE1BQU1DLHNCQUFzQixDQUFDQztRQUMzQixJQUFJQSxFQUFFQyxPQUFPLEVBQUU7WUFDYkQsSUFBSUEsRUFBRUMsT0FBTztRQUNmO1FBQ0EsSUFBSUM7UUFDSixJQUFJRixFQUFFRyxJQUFJLEtBQUssV0FBVztZQUN4QkQsU0FBUztRQUNYLE9BQU8sSUFBSUYsRUFBRUcsSUFBSSxLQUFLLFVBQVU7WUFDOUJELFNBQVM7UUFDWCxPQUFPLElBQUlGLEVBQUVHLElBQUksS0FBSyxXQUFXO1lBQy9CRCxTQUFTLGtDQUF5QyxPQUFQRixFQUFFSSxJQUFJLEVBQUM7UUFDcEQsT0FBTyxJQUFJSixFQUFFRyxJQUFJLEtBQUssWUFBWTtZQUNoQyxJQUFJSCxFQUFFSyxRQUFRLEtBQUssU0FBUztnQkFDMUJILFNBQVM7WUFDWCxPQUFPLElBQUlGLEVBQUVLLFFBQVEsS0FBSyxhQUFhO2dCQUNyQ0gsU0FBUztZQUNYLE9BQU8sSUFBSUYsRUFBRUssUUFBUSxLQUFLLFFBQVE7Z0JBQ2hDSCxTQUFTO1lBQ1gsT0FBTyxJQUFJRixFQUFFSyxRQUFRLEtBQUssUUFBUTtnQkFDaENILFNBQVM7WUFDWCxPQUFPLElBQUlGLEVBQUVLLFFBQVEsS0FBSyxTQUFTO2dCQUNqQ0gsU0FBUztZQUNYLE9BQU8sSUFBSUYsRUFBRUssUUFBUSxLQUFLLFNBQVM7Z0JBQ2pDSCxTQUFTO1lBQ1gsT0FBTztnQkFDTEEsU0FBUztZQUNYO1FBQ0YsT0FBTztZQUNMQSxTQUFTO1FBQ1g7UUFDQSxxQkFDRSw4REFBQ0k7c0JBQ0VKLE9BQU90QixNQUFNLEdBQUcsbUJBQ2YsOERBQUMwQjtnQkFFQ0MsV0FBVTs7a0NBRVYsOERBQUNDO3dCQUFLRCxXQUFVO2tDQUFJLEdBQWlCTCxPQUFkRixFQUFFUyxRQUFRLEVBQUMsS0FBVSxPQUFQUDs7Ozs7O2tDQUNyQyw4REFBQ1E7d0JBQUVILFdBQVU7a0NBQ1ZyQixlQUFlVSxhQUFhSSxFQUFFVyxTQUFTOzs7Ozs7a0NBRTFDLDhEQUFDQzs7Ozs7O2VBUElsQixLQUFLbUIsTUFBTTs7Ozs7Ozs7OztJQVkxQjtJQUVBN0QsZ0RBQVNBLENBQUM7UUFDUlU7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ29EOzswQkFDQyw4REFBQ2hFLDBEQUFNQTs7Ozs7MEJBQ1AsOERBQUN3RDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ0Q7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDUTs0QkFBR1IsV0FBVTtzQ0FBeUI7Ozs7Ozt3QkFDdENwRCxTQUFTeUIsTUFBTSxLQUFLLGtCQUNuQiw4REFBQzhCOzRCQUFFSCxXQUFVO3NDQUFjOzs7OztzREFFM0IsOERBQUNEOzRCQUFJQyxXQUFVOztnQ0FDWnBELFNBQVM2RCxHQUFHLENBQUMsQ0FBQ2hCLElBQVdELG9CQUFvQkM7Z0NBQzdDN0MsU0FBU3lCLE1BQU0sSUFBSSxLQUFLLENBQUN0QixTQUFTTSxPQUFPLGtCQUN4Qyw4REFBQzBDO29DQUFJQyxXQUFVOzhDQUNiLDRFQUFDVTt3Q0FDQ1YsV0FBVTt3Q0FDVlcsU0FBUyxDQUFDbEMsSUFBTUQsU0FBU0M7a0RBQzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV25CO0dBekpNOUI7QUEySk4sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9yZXF1ZXN0cy9wYWdlLnRzeD81ZWJjIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiQC9jb21wb25lbnRzL05hdmJhclwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBiYXNlVXJsIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5jb25zdCBwYWdlID0gKCkgPT4ge1xuICBjb25zdCBbcmVxdWVzdHMsIHNldFJlcXVlc3RzXSA9IFJlYWN0LnVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IHN0b3BMb2FkID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3Qgc2l6ZSA9IDg7XG4gIGNvbnN0IHBhZ2VOdW0gPSBSZWFjdC51c2VSZWYoMCk7XG5cbiAgY29uc3QgZ2V0RGJOb3RpZmljYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgdXJsID1cbiAgICAgIGJhc2VVcmwgKyBgYXBpL25vdGlmaWNhdGlvbi8/cGFnZT0ke3BhZ2VOdW0uY3VycmVudH0mc2l6ZT0ke3NpemV9YDtcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaWRfdG9rZW5cIiksXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHRocm93IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHBhZ2VOdW0uY3VycmVudC0tO1xuICAgICAgICAgIHN0b3BMb2FkLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFJlcXVlc3RzKChyZXF1ZXN0czogYW55KSA9PiBbLi4ucmVxdWVzdHMsIC4uLmRhdGFdKTtcbiAgICAgICAgICBzdG9wTG9hZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsb2FkTW9yZSA9IChlOiBhbnkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFzdG9wTG9hZC5jdXJyZW50KSB7XG4gICAgICBwYWdlTnVtLmN1cnJlbnQrKztcbiAgICAgIGdldERiTm90aWZpY2F0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHRpbWVEaWZmZXJlbmNlKGN1cnJlbnQ6IGFueSwgcHJldmlvdXM6IGFueSkge1xuICAgIHZhciBtc1Blck1pbnV0ZSA9IDYwICogMTAwMDtcbiAgICB2YXIgbXNQZXJIb3VyID0gbXNQZXJNaW51dGUgKiA2MDtcbiAgICB2YXIgbXNQZXJEYXkgPSBtc1BlckhvdXIgKiAyNDtcbiAgICB2YXIgbXNQZXJNb250aCA9IG1zUGVyRGF5ICogMzA7XG4gICAgdmFyIG1zUGVyWWVhciA9IG1zUGVyRGF5ICogMzY1O1xuXG4gICAgdmFyIGVsYXBzZWQgPSBjdXJyZW50IC0gcHJldmlvdXM7XG5cbiAgICBpZiAoZWxhcHNlZCA8IG1zUGVyTWludXRlKSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChlbGFwc2VkIC8gMTAwMCkgKyBcIiBzZWNvbmRzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVySG91cikge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZWxhcHNlZCAvIG1zUGVyTWludXRlKSArIFwiIG1pbnV0ZXMgYWdvXCI7XG4gICAgfSBlbHNlIGlmIChlbGFwc2VkIDwgbXNQZXJEYXkpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1BlckhvdXIpICsgXCIgaG91cnMgYWdvXCI7XG4gICAgfSBlbHNlIGlmIChlbGFwc2VkIDwgbXNQZXJNb250aCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZWxhcHNlZCAvIG1zUGVyRGF5KSArIFwiIGRheXMgYWdvXCI7XG4gICAgfSBlbHNlIGlmIChlbGFwc2VkIDwgbXNQZXJZZWFyKSB7XG4gICAgICByZXR1cm4gXCJhYm91dCBcIiArIE1hdGgucm91bmQoZWxhcHNlZCAvIG1zUGVyTW9udGgpICsgXCIgbW9udGhzIGFnb1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJhYm91dCBcIiArIE1hdGgucm91bmQoZWxhcHNlZCAvIG1zUGVyWWVhcikgKyBcIiB5ZWFycyBhZ29cIjtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjdXJyZW50RGF0ZSA9IERhdGUubm93KCk7XG5cbiAgY29uc3QgZGlzcGxheU5vdGlmaWNhdGlvbiA9IChuOiBhbnkpID0+IHtcbiAgICBpZiAobi5tZXNzYWdlKSB7XG4gICAgICBuID0gbi5tZXNzYWdlO1xuICAgIH1cbiAgICBsZXQgYWN0aW9uO1xuICAgIGlmIChuLnR5cGUgPT09IFwiTUVTU0FHRVwiKSB7XG4gICAgICBhY3Rpb24gPSBcInRpIGhhIG1hbmRhdG8gdW4gbWVzc2FnZ2lvXCI7XG4gICAgfSBlbHNlIGlmIChuLnR5cGUgPT09IFwiU1FVRUFMXCIpIHtcbiAgICAgIGFjdGlvbiA9IFwiaGEgcG9zdGF0byB1bm8gU3F1ZWFsXCI7XG4gICAgfSBlbHNlIGlmIChuLnR5cGUgPT09IFwiQ09NTUVOVFwiKSB7XG4gICAgICBhY3Rpb24gPSBgaGEgY29tbWVudGF0byB1bm8gdHVvIFNxdWVhbDogXCIke24uYm9keX1cImA7XG4gICAgfSBlbHNlIGlmIChuLnR5cGUgPT09IFwiUkVBQ1RJT05cIikge1xuICAgICAgaWYgKG4ucmVhY3Rpb24gPT09IFwiaGVhcnRcIikge1xuICAgICAgICBhY3Rpb24gPSBcImhhIHJlYWdpdG8gY29uIOKdpO+4jyBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwiZXhwbG9kaW5nXCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDwn6SvIGFsIHR1byBTcXVlYWxcIjtcbiAgICAgIH0gZWxzZSBpZiAobi5yZWFjdGlvbiA9PT0gXCJjb2xkXCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDwn6W2IGFsIHR1byBTcXVlYWxcIjtcbiAgICAgIH0gZWxzZSBpZiAobi5yZWFjdGlvbiA9PT0gXCJuZXJkXCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDwn6STIGFsIHR1byBTcXVlYWxcIjtcbiAgICAgIH0gZWxzZSBpZiAobi5yZWFjdGlvbiA9PT0gXCJjbG93blwiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+koSBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwiYm9yZWRcIikge1xuICAgICAgICBhY3Rpb24gPSBcImhhIHJlYWdpdG8gY29uIPCfmLQgYWwgdHVvIFNxdWVhbFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGFsIHR1byBTcXVlYWxcIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9uID0gXCJudW92YSBub3RpZmljYSBzY29ub3NjaXV0YVwiO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2FjdGlvbi5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBwLTIgYmctd2hpdGUgcm91bmRlZC14bFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiXCI+e2Ake24udXNlcm5hbWV9ICR7YWN0aW9ufWB9PC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF1cIj5cbiAgICAgICAgICAgICAge3RpbWVEaWZmZXJlbmNlKGN1cnJlbnREYXRlLCBuLnRpbWVzdGFtcCl9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXREYk5vdGlmaWNhdGlvbigpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxOYXZiYXIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1taWRkbGUgdy1mdWxsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1taWRkbGUgdy0yLzVcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB0ZXh0LWNlbnRlclwiPlJpY2hpZXN0ZTwvaDE+XG4gICAgICAgICAge3JlcXVlc3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Tm9uIGhhaSBuZXNzdW5hIHJpY2hpZXN0YSA6KDwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBib3JkZXItYmxhY2sgYm9yZGVyLTIgcm91bmRlZCBoLVs3MDBweF0gb3ZlcmZsb3cteS1zY3JvbGxcIj5cbiAgICAgICAgICAgICAge3JlcXVlc3RzLm1hcCgobjogYW55KSA9PiBkaXNwbGF5Tm90aWZpY2F0aW9uKG4pKX1cbiAgICAgICAgICAgICAge3JlcXVlc3RzLmxlbmd0aCAhPSAwICYmICFzdG9wTG9hZC5jdXJyZW50ICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtMyBoLTggdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIGJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1ncmF5LTEwMCBob3Zlcjp0ZXh0LWdyYXktNzAwIGRhcms6YmctZ3JheS04MDAgZGFyazpib3JkZXItZ3JheS03MDAgZGFyazp0ZXh0LWdyYXktNDAwIGRhcms6aG92ZXI6YmctZ3JheS03MDAgZGFyazpob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGxvYWRNb3JlKGUpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBMb2FkIG1vcmVcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYWdlO1xuIl0sIm5hbWVzIjpbIk5hdmJhciIsIlJlYWN0IiwidXNlRWZmZWN0IiwiYmFzZVVybCIsInBhZ2UiLCJyZXF1ZXN0cyIsInNldFJlcXVlc3RzIiwidXNlU3RhdGUiLCJzdG9wTG9hZCIsInVzZVJlZiIsInNpemUiLCJwYWdlTnVtIiwiZ2V0RGJOb3RpZmljYXRpb24iLCJ1cmwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJzdGF0dXMiLCJqc29uIiwiZGF0YSIsImxlbmd0aCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkTW9yZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWVEaWZmZXJlbmNlIiwicHJldmlvdXMiLCJtc1Blck1pbnV0ZSIsIm1zUGVySG91ciIsIm1zUGVyRGF5IiwibXNQZXJNb250aCIsIm1zUGVyWWVhciIsImVsYXBzZWQiLCJNYXRoIiwicm91bmQiLCJjdXJyZW50RGF0ZSIsIkRhdGUiLCJub3ciLCJkaXNwbGF5Tm90aWZpY2F0aW9uIiwibiIsIm1lc3NhZ2UiLCJhY3Rpb24iLCJ0eXBlIiwiYm9keSIsInJlYWN0aW9uIiwiZGl2IiwiY2xhc3NOYW1lIiwic3BhbiIsInVzZXJuYW1lIiwicCIsInRpbWVzdGFtcCIsImJyIiwicmFuZG9tIiwic2VjdGlvbiIsImgxIiwibWFwIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/requests/page.tsx\n"));

/***/ })

});