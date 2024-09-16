"use strict";
exports.id = 775;
exports.ids = [775];
exports.modules = {

/***/ 233:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ NotFoundContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7402);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9679);
/* harmony import */ var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3020);
/* harmony import */ var _theme_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6730);




function NotFoundContent({ className }) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)("container margin-vert--xl", className) }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "row" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "col col--6 col--offset-3" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_theme_Heading__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, { as: "h1", className: "hero__title" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A,
    {
      id: "theme.NotFound.title",
      description: "The title of the 404 page"
    },
    "Page Not Found"
  )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A,
    {
      id: "theme.NotFound.p1",
      description: "The first paragraph of the 404 page"
    },
    "We could not find what you were looking for."
  )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A,
    {
      id: "theme.NotFound.p2",
      description: "The 2nd paragraph of the 404 page"
    },
    "Please contact the owner of the site that linked you to the original URL and let them know their link is broken."
  )))));
}


/***/ }),

/***/ 2775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Index)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7402);
/* harmony import */ var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3020);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1731);
/* harmony import */ var _theme_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8663);
/* harmony import */ var _theme_NotFound_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(233);





function Index() {
  const title = (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .T)({
    id: "theme.NotFound.title",
    message: "Page Not Found"
  });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__/* .PageMetadata */ .be, { title }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_theme_Layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_theme_NotFound_Content__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, null)));
}


/***/ })

};
;