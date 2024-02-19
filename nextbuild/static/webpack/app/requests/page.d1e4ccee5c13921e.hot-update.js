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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Navbar */ \"(app-pages-browser)/./src/components/Navbar.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ \"(app-pages-browser)/./src/app/shared.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst page = ()=>{\n    _s();\n    const [requests, setRequests] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);\n    const [clicked, setClicked] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false);\n    const stopLoad = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(false);\n    const size = 8;\n    const pageNum = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(0);\n    const getDbNotification = ()=>{\n        const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/notification/?page=\".concat(pageNum.current, \"&size=\").concat(size);\n        console.log(url);\n        fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                Accept: \"application/json\",\n                Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n            }\n        }).then((response)=>{\n            if (!response.ok) {\n                throw response.status;\n            }\n            return response.json();\n        }).then((data)=>{\n            if (data.length === 0) {\n                pageNum.current--;\n                stopLoad.current = true;\n            } else {\n                setRequests((requests)=>[\n                        ...requests,\n                        ...data\n                    ]);\n                stopLoad.current = false;\n            }\n            console.log(data);\n        }).catch((error)=>{\n            console.log(error);\n        });\n    };\n    const loadMore = (e)=>{\n        e.preventDefault();\n        if (!stopLoad.current) {\n            pageNum.current++;\n            getDbNotification();\n        }\n    };\n    function timeDifference(current, previous) {\n        var msPerMinute = 60 * 1000;\n        var msPerHour = msPerMinute * 60;\n        var msPerDay = msPerHour * 24;\n        var msPerMonth = msPerDay * 30;\n        var msPerYear = msPerDay * 365;\n        var elapsed = current - previous;\n        if (elapsed < msPerMinute) {\n            return Math.round(elapsed / 1000) + \" seconds ago\";\n        } else if (elapsed < msPerHour) {\n            return Math.round(elapsed / msPerMinute) + \" minutes ago\";\n        } else if (elapsed < msPerDay) {\n            return Math.round(elapsed / msPerHour) + \" hours ago\";\n        } else if (elapsed < msPerMonth) {\n            return Math.round(elapsed / msPerDay) + \" days ago\";\n        } else if (elapsed < msPerYear) {\n            return \"about \" + Math.round(elapsed / msPerMonth) + \" months ago\";\n        } else {\n            return \"about \" + Math.round(elapsed / msPerYear) + \" years ago\";\n        }\n    }\n    const currentDate = Date.now();\n    const displayNotification = (n)=>{\n        if (n.message) {\n            n = n.message;\n        }\n        let action;\n        if (n.type === \"MESSAGE\") {\n            action = \"ti ha mandato un messaggio\";\n        } else if (n.type === \"SMM\") {\n            action = \"vuole diventare tuo cliente\";\n        } else if (n.type === \"SQUEAL\") {\n            action = \"ha postato uno Squeal\";\n        } else if (n.type === \"COMMENT\") {\n            action = 'ha commentato uno tuo Squeal: \"'.concat(n.body, '\"');\n        } else if (n.type === \"REACTION\") {\n            if (n.reaction === \"heart\") {\n                action = \"ha reagito con ❤️ al tuo Squeal\";\n            } else if (n.reaction === \"exploding\") {\n                action = \"ha reagito con \\uD83E\\uDD2F al tuo Squeal\";\n            } else if (n.reaction === \"cold\") {\n                action = \"ha reagito con \\uD83E\\uDD76 al tuo Squeal\";\n            } else if (n.reaction === \"nerd\") {\n                action = \"ha reagito con \\uD83E\\uDD13 al tuo Squeal\";\n            } else if (n.reaction === \"clown\") {\n                action = \"ha reagito con \\uD83E\\uDD21 al tuo Squeal\";\n            } else if (n.reaction === \"bored\") {\n                action = \"ha reagito con \\uD83D\\uDE34 al tuo Squeal\";\n            } else {\n                action = \"ha reagito al tuo Squeal\";\n            }\n        } else {\n            action = \"nuova notifica sconosciuta\";\n        }\n        const addClient = (clientUsername)=>{\n            const url = _shared__WEBPACK_IMPORTED_MODULE_3__.baseUrl + \"api/account/add-client/?client=\".concat(clientUsername);\n            console.log(url);\n            fetch(url, {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Accept: \"application/json\",\n                    Authorization: \"Bearer \" + localStorage.getItem(\"id_token\")\n                }\n            }).then((response)=>{\n                if (!response.ok) {\n                    throw response.status;\n                }\n                setClicked(true);\n                return response.json();\n            }).then((data)=>{\n                console.log(data);\n            }).catch((error)=>{\n                alert(\"Errore: \" + error);\n                console.log(error);\n            });\n        };\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: action.length > 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-row justify-between p-2 bg-white rounded-xl\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"\",\n                        children: \"\".concat(n.username, \" \").concat(action)\n                    }, void 0, false, {\n                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                        lineNumber: 148,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-[12px]\",\n                        children: [\n                            n.type === \"SMM\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: clicked ? \"mx-4 rounded bg-green-700 text-white font-bold p-1\" : \"mx-4 rounded bg-red-700 text-white font-bold p-1\",\n                                onClick: ()=>addClient(n.username),\n                                children: clicked ? \"Richiesta Accettata!\" : \"Accetta\"\n                            }, void 0, false, {\n                                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                lineNumber: 151,\n                                columnNumber: 17\n                            }, undefined),\n                            timeDifference(currentDate, n.timestamp)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                        lineNumber: 149,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, Math.random(), true, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 144,\n                columnNumber: 11\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n            lineNumber: 142,\n            columnNumber: 7\n        }, undefined);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        getDbNotification();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 176,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center align-middle w-full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center align-middle w-3/5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: \"text-black text-center\",\n                            children: \"Richieste\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 179,\n                            columnNumber: 11\n                        }, undefined),\n                        requests.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center\",\n                            children: \"Non hai nessuna richiesta :(\"\n                        }, void 0, false, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 181,\n                            columnNumber: 13\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center border-black border-2 rounded h-[700px] overflow-y-scroll\",\n                            children: [\n                                requests.map((n)=>displayNotification(n)),\n                                requests.length != 0 && !stopLoad.current && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex justify-center\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white\",\n                                        onClick: (e)=>loadMore(e),\n                                        children: \"Load more\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                        lineNumber: 187,\n                                        columnNumber: 19\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                                    lineNumber: 186,\n                                    columnNumber: 17\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                            lineNumber: 183,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                    lineNumber: 178,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n                lineNumber: 177,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/matteoraggi/Dev/avvoltoio-smm/src/app/requests/page.tsx\",\n        lineNumber: 175,\n        columnNumber: 5\n    }, undefined);\n};\n_s(page, \"LhBbZ7zJ/i8cKNUX9DXoPVQLXYY=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (page);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVxdWVzdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDeUM7QUFDSztBQUNWO0FBRXBDLE1BQU1JLE9BQU87O0lBQ1gsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLHFEQUFjLENBQVEsRUFBRTtJQUN4RCxNQUFNLENBQUNPLFNBQVNDLFdBQVcsR0FBR1IscURBQWMsQ0FBQztJQUM3QyxNQUFNUyxXQUFXVCxtREFBWSxDQUFDO0lBQzlCLE1BQU1XLE9BQU87SUFDYixNQUFNQyxVQUFVWixtREFBWSxDQUFDO0lBRTdCLE1BQU1hLG9CQUFvQjtRQUN4QixNQUFNQyxNQUNKWiw0Q0FBT0EsR0FBRywwQkFBa0RTLE9BQXhCQyxRQUFRRyxPQUFPLEVBQUMsVUFBYSxPQUFMSjtRQUM5REssUUFBUUMsR0FBRyxDQUFDSDtRQUVaSSxNQUFNSixLQUFLO1lBQ1RLLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCQyxRQUFRO2dCQUNSQyxlQUFlLFlBQVlDLGFBQWFDLE9BQU8sQ0FBQztZQUNsRDtRQUNGLEdBQ0dDLElBQUksQ0FBQyxDQUFDQztZQUNMLElBQUksQ0FBQ0EsU0FBU0MsRUFBRSxFQUFFO2dCQUNoQixNQUFNRCxTQUFTRSxNQUFNO1lBQ3ZCO1lBQ0EsT0FBT0YsU0FBU0csSUFBSTtRQUN0QixHQUNDSixJQUFJLENBQUMsQ0FBQ0s7WUFDTCxJQUFJQSxLQUFLQyxNQUFNLEtBQUssR0FBRztnQkFDckJuQixRQUFRRyxPQUFPO2dCQUNmTixTQUFTTSxPQUFPLEdBQUc7WUFDckIsT0FBTztnQkFDTFYsWUFBWSxDQUFDRCxXQUFrQjsyQkFBSUE7MkJBQWEwQjtxQkFBSztnQkFDckRyQixTQUFTTSxPQUFPLEdBQUc7WUFDckI7WUFDQUMsUUFBUUMsR0FBRyxDQUFDYTtRQUNkLEdBQ0NFLEtBQUssQ0FBQyxDQUFDQztZQUNOakIsUUFBUUMsR0FBRyxDQUFDZ0I7UUFDZDtJQUNKO0lB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXbkI7R0FuTU1oQztBQXFNTiwrREFBZUEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3JlcXVlc3RzL3BhZ2UudHN4PzVlYmMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgTmF2YmFyIGZyb20gXCJAL2NvbXBvbmVudHMvTmF2YmFyXCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmNvbnN0IHBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IFtyZXF1ZXN0cywgc2V0UmVxdWVzdHNdID0gUmVhY3QudXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW2NsaWNrZWQsIHNldENsaWNrZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBzdG9wTG9hZCA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHNpemUgPSA4O1xuICBjb25zdCBwYWdlTnVtID0gUmVhY3QudXNlUmVmKDApO1xuXG4gIGNvbnN0IGdldERiTm90aWZpY2F0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9XG4gICAgICBiYXNlVXJsICsgYGFwaS9ub3RpZmljYXRpb24vP3BhZ2U9JHtwYWdlTnVtLmN1cnJlbnR9JnNpemU9JHtzaXplfWA7XG4gICAgY29uc29sZS5sb2codXJsKTtcblxuICAgIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpLFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICB0aHJvdyByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBwYWdlTnVtLmN1cnJlbnQtLTtcbiAgICAgICAgICBzdG9wTG9hZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRSZXF1ZXN0cygocmVxdWVzdHM6IGFueSkgPT4gWy4uLnJlcXVlc3RzLCAuLi5kYXRhXSk7XG4gICAgICAgICAgc3RvcExvYWQuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmUgPSAoZTogYW55KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghc3RvcExvYWQuY3VycmVudCkge1xuICAgICAgcGFnZU51bS5jdXJyZW50Kys7XG4gICAgICBnZXREYk5vdGlmaWNhdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiB0aW1lRGlmZmVyZW5jZShjdXJyZW50OiBhbnksIHByZXZpb3VzOiBhbnkpIHtcbiAgICB2YXIgbXNQZXJNaW51dGUgPSA2MCAqIDEwMDA7XG4gICAgdmFyIG1zUGVySG91ciA9IG1zUGVyTWludXRlICogNjA7XG4gICAgdmFyIG1zUGVyRGF5ID0gbXNQZXJIb3VyICogMjQ7XG4gICAgdmFyIG1zUGVyTW9udGggPSBtc1BlckRheSAqIDMwO1xuICAgIHZhciBtc1BlclllYXIgPSBtc1BlckRheSAqIDM2NTtcblxuICAgIHZhciBlbGFwc2VkID0gY3VycmVudCAtIHByZXZpb3VzO1xuXG4gICAgaWYgKGVsYXBzZWQgPCBtc1Blck1pbnV0ZSkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZWxhcHNlZCAvIDEwMDApICsgXCIgc2Vjb25kcyBhZ29cIjtcbiAgICB9IGVsc2UgaWYgKGVsYXBzZWQgPCBtc1BlckhvdXIpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1Blck1pbnV0ZSkgKyBcIiBtaW51dGVzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVyRGF5KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChlbGFwc2VkIC8gbXNQZXJIb3VyKSArIFwiIGhvdXJzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVyTW9udGgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1BlckRheSkgKyBcIiBkYXlzIGFnb1wiO1xuICAgIH0gZWxzZSBpZiAoZWxhcHNlZCA8IG1zUGVyWWVhcikge1xuICAgICAgcmV0dXJuIFwiYWJvdXQgXCIgKyBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1Blck1vbnRoKSArIFwiIG1vbnRocyBhZ29cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiYWJvdXQgXCIgKyBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtc1BlclllYXIpICsgXCIgeWVhcnMgYWdvXCI7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY3VycmVudERhdGUgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0IGRpc3BsYXlOb3RpZmljYXRpb24gPSAobjogYW55KSA9PiB7XG4gICAgaWYgKG4ubWVzc2FnZSkge1xuICAgICAgbiA9IG4ubWVzc2FnZTtcbiAgICB9XG4gICAgbGV0IGFjdGlvbjtcbiAgICBpZiAobi50eXBlID09PSBcIk1FU1NBR0VcIikge1xuICAgICAgYWN0aW9uID0gXCJ0aSBoYSBtYW5kYXRvIHVuIG1lc3NhZ2dpb1wiO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIlNNTVwiKSB7XG4gICAgICBhY3Rpb24gPSBcInZ1b2xlIGRpdmVudGFyZSB0dW8gY2xpZW50ZVwiO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIlNRVUVBTFwiKSB7XG4gICAgICBhY3Rpb24gPSBcImhhIHBvc3RhdG8gdW5vIFNxdWVhbFwiO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIkNPTU1FTlRcIikge1xuICAgICAgYWN0aW9uID0gYGhhIGNvbW1lbnRhdG8gdW5vIHR1byBTcXVlYWw6IFwiJHtuLmJvZHl9XCJgO1xuICAgIH0gZWxzZSBpZiAobi50eXBlID09PSBcIlJFQUNUSU9OXCIpIHtcbiAgICAgIGlmIChuLnJlYWN0aW9uID09PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDinaTvuI8gYWwgdHVvIFNxdWVhbFwiO1xuICAgICAgfSBlbHNlIGlmIChuLnJlYWN0aW9uID09PSBcImV4cGxvZGluZ1wiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+kryBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwiY29sZFwiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+ltiBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwibmVyZFwiKSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBjb24g8J+kkyBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9IGVsc2UgaWYgKG4ucmVhY3Rpb24gPT09IFwiY2xvd25cIikge1xuICAgICAgICBhY3Rpb24gPSBcImhhIHJlYWdpdG8gY29uIPCfpKEgYWwgdHVvIFNxdWVhbFwiO1xuICAgICAgfSBlbHNlIGlmIChuLnJlYWN0aW9uID09PSBcImJvcmVkXCIpIHtcbiAgICAgICAgYWN0aW9uID0gXCJoYSByZWFnaXRvIGNvbiDwn5i0IGFsIHR1byBTcXVlYWxcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGlvbiA9IFwiaGEgcmVhZ2l0byBhbCB0dW8gU3F1ZWFsXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGlvbiA9IFwibnVvdmEgbm90aWZpY2Egc2Nvbm9zY2l1dGFcIjtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRDbGllbnQgPSAoY2xpZW50VXNlcm5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdXJsID0gYmFzZVVybCArIGBhcGkvYWNjb3VudC9hZGQtY2xpZW50Lz9jbGllbnQ9JHtjbGllbnRVc2VybmFtZX1gO1xuICAgICAgY29uc29sZS5sb2codXJsKTtcblxuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0Q2xpY2tlZCh0cnVlKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgYWxlcnQoXCJFcnJvcmU6IFwiICsgZXJyb3IpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2FjdGlvbi5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBwLTIgYmctd2hpdGUgcm91bmRlZC14bFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiXCI+e2Ake24udXNlcm5hbWV9ICR7YWN0aW9ufWB9PC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF1cIj5cbiAgICAgICAgICAgICAge24udHlwZSA9PT0gXCJTTU1cIiAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tlZFxuICAgICAgICAgICAgICAgICAgICAgID8gXCJteC00IHJvdW5kZWQgYmctZ3JlZW4tNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgOiBcIm14LTQgcm91bmRlZCBiZy1yZWQtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHAtMVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhZGRDbGllbnQobi51c2VybmFtZSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NsaWNrZWQgPyBcIlJpY2hpZXN0YSBBY2NldHRhdGEhXCIgOiBcIkFjY2V0dGFcIn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3RpbWVEaWZmZXJlbmNlKGN1cnJlbnREYXRlLCBuLnRpbWVzdGFtcCl9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZ2V0RGJOb3RpZmljYXRpb24oKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24+XG4gICAgICA8TmF2YmFyIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgYWxpZ24tbWlkZGxlIHctZnVsbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgYWxpZ24tbWlkZGxlIHctMy81XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdGV4dC1jZW50ZXJcIj5SaWNoaWVzdGU8L2gxPlxuICAgICAgICAgIHtyZXF1ZXN0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPk5vbiBoYWkgbmVzc3VuYSByaWNoaWVzdGEgOig8L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgYm9yZGVyLWJsYWNrIGJvcmRlci0yIHJvdW5kZWQgaC1bNzAwcHhdIG92ZXJmbG93LXktc2Nyb2xsXCI+XG4gICAgICAgICAgICAgIHtyZXF1ZXN0cy5tYXAoKG46IGFueSkgPT4gZGlzcGxheU5vdGlmaWNhdGlvbihuKSl9XG4gICAgICAgICAgICAgIHtyZXF1ZXN0cy5sZW5ndGggIT0gMCAmJiAhc3RvcExvYWQuY3VycmVudCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTMgaC04IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS0xMDAgaG92ZXI6dGV4dC1ncmF5LTcwMCBkYXJrOmJnLWdyYXktODAwIGRhcms6Ym9yZGVyLWdyYXktNzAwIGRhcms6dGV4dC1ncmF5LTQwMCBkYXJrOmhvdmVyOmJnLWdyYXktNzAwIGRhcms6aG92ZXI6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBsb2FkTW9yZShlKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgTG9hZCBtb3JlXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnZTtcbiJdLCJuYW1lcyI6WyJOYXZiYXIiLCJSZWFjdCIsInVzZUVmZmVjdCIsImJhc2VVcmwiLCJwYWdlIiwicmVxdWVzdHMiLCJzZXRSZXF1ZXN0cyIsInVzZVN0YXRlIiwiY2xpY2tlZCIsInNldENsaWNrZWQiLCJzdG9wTG9hZCIsInVzZVJlZiIsInNpemUiLCJwYWdlTnVtIiwiZ2V0RGJOb3RpZmljYXRpb24iLCJ1cmwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJzdGF0dXMiLCJqc29uIiwiZGF0YSIsImxlbmd0aCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkTW9yZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWVEaWZmZXJlbmNlIiwicHJldmlvdXMiLCJtc1Blck1pbnV0ZSIsIm1zUGVySG91ciIsIm1zUGVyRGF5IiwibXNQZXJNb250aCIsIm1zUGVyWWVhciIsImVsYXBzZWQiLCJNYXRoIiwicm91bmQiLCJjdXJyZW50RGF0ZSIsIkRhdGUiLCJub3ciLCJkaXNwbGF5Tm90aWZpY2F0aW9uIiwibiIsIm1lc3NhZ2UiLCJhY3Rpb24iLCJ0eXBlIiwiYm9keSIsInJlYWN0aW9uIiwiYWRkQ2xpZW50IiwiY2xpZW50VXNlcm5hbWUiLCJhbGVydCIsImRpdiIsImNsYXNzTmFtZSIsInNwYW4iLCJ1c2VybmFtZSIsInAiLCJidXR0b24iLCJvbkNsaWNrIiwidGltZXN0YW1wIiwicmFuZG9tIiwic2VjdGlvbiIsImgxIiwibWFwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/requests/page.tsx\n"));

/***/ })

});