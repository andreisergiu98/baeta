"use strict";
exports.id = 518;
exports.ids = [518];
exports.modules = {

/***/ 9642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DocVersionRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3900);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6521);
/* harmony import */ var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);
/* harmony import */ var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5829);
/* harmony import */ var _docusaurus_renderRoutes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2572);
/* harmony import */ var _theme_SearchMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9159);





function DocVersionRootMetadata(props) {
  const { version } = props;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _theme_SearchMetadata__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    {
      version: version.version,
      tag: (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_2__/* .docVersionSearchTag */ .os)(version.pluginId, version.version)
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_3__/* .PageMetadata */ .d, null, version.noIndex && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { name: "robots", content: "noindex, nofollow" })));
}
function DocVersionRootContent(props) {
  const { version, route } = props;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_3__/* .HtmlClassNameProvider */ .FG, { className: version.className }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_4__/* .DocsVersionProvider */ .q, { version }, (0,_docusaurus_renderRoutes__WEBPACK_IMPORTED_MODULE_5__/* .renderRoutes */ .H)(route.routes)));
}
function DocVersionRoot(props) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DocVersionRootMetadata, { ...props }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DocVersionRootContent, { ...props }));
}


/***/ })

};
;