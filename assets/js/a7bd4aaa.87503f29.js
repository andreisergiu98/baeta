"use strict";
exports.id = 98;
exports.ids = [98];
exports.modules = {

/***/ 4574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DocVersionRoot)
});

// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.3.1-af38f3c1ae-261137d3f3.zip/node_modules/react/index.js
var react = __webpack_require__(7402);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-2eb87fd520/0/cache/@docusaurus-theme-common-npm-3.5.2-dcff6c65ad-1cb8f97516.zip/node_modules/@docusaurus/theme-common/lib/utils/metadataUtils.js + 2 modules
var metadataUtils = __webpack_require__(1731);
;// ../.yarn/__virtual__/@docusaurus-plugin-content-docs-virtual-384f500a1c/0/cache/@docusaurus-plugin-content-docs-npm-3.5.2-d08c3edec6-100250c4e9.zip/node_modules/@docusaurus/plugin-content-docs/lib/client/docsSearch.js


function getDocsVersionSearchTag(pluginId, versionName) {
  return `docs-${pluginId}-${versionName}`;
}
function useDocsContextualSearchTags() {
  const allDocsData = useAllDocsData();
  const activePluginAndVersion = useActivePluginAndVersion();
  const docsPreferredVersionByPluginId = useDocsPreferredVersionByPluginId();
  function getDocPluginTags(pluginId) {
    var _a;
    const activeVersion = (activePluginAndVersion == null ? void 0 : activePluginAndVersion.activePlugin.pluginId) === pluginId ? activePluginAndVersion.activeVersion : void 0;
    const preferredVersion = docsPreferredVersionByPluginId[pluginId];
    const latestVersion = allDocsData[pluginId].versions.find((v) => v.isLast);
    const version = (_a = activeVersion != null ? activeVersion : preferredVersion) != null ? _a : latestVersion;
    return getDocsVersionSearchTag(pluginId, version.name);
  }
  return [...Object.keys(allDocsData).map(getDocPluginTags)];
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-plugin-content-docs-virtual-384f500a1c/0/cache/@docusaurus-plugin-content-docs-npm-3.5.2-d08c3edec6-100250c4e9.zip/node_modules/@docusaurus/plugin-content-docs/lib/client/docsVersion.js
var docsVersion = __webpack_require__(8216);
// EXTERNAL MODULE: ../.yarn/__virtual__/react-router-config-virtual-844e9cd5a2/0/cache/react-router-config-npm-5.1.1-671f936b6b-f7f0786658.zip/node_modules/react-router-config/esm/react-router-config.js
var react_router_config = __webpack_require__(822);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-e59815984d/0/cache/@docusaurus-theme-classic-npm-3.5.2-6a9884ef88-74a4bf64ba.zip/node_modules/@docusaurus/theme-classic/lib/theme/SearchMetadata/index.js
var SearchMetadata = __webpack_require__(5985);
;// ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-e59815984d/0/cache/@docusaurus-theme-classic-npm-3.5.2-6a9884ef88-74a4bf64ba.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocVersionRoot/index.js





function DocVersionRootMetadata(props) {
  const { version } = props;
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(
    SearchMetadata/* default */.A,
    {
      version: version.version,
      tag: getDocsVersionSearchTag(version.pluginId, version.version)
    }
  ), /* @__PURE__ */ react.createElement(metadataUtils/* PageMetadata */.be, null, version.noIndex && /* @__PURE__ */ react.createElement("meta", { name: "robots", content: "noindex, nofollow" })));
}
function DocVersionRootContent(props) {
  const { version, route } = props;
  return /* @__PURE__ */ react.createElement(metadataUtils/* HtmlClassNameProvider */.e3, { className: version.className }, /* @__PURE__ */ react.createElement(docsVersion/* DocsVersionProvider */.n, { version }, (0,react_router_config/* renderRoutes */.v)(route.routes)));
}
function DocVersionRoot(props) {
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(DocVersionRootMetadata, { ...props }), /* @__PURE__ */ react.createElement(DocVersionRootContent, { ...props }));
}


/***/ })

};
;