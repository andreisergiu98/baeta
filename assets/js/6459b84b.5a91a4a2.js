exports.id = 868;
exports.ids = [868];
exports.modules = {

/***/ 993:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* binding */ metadata),
  toc: () => (/* binding */ toc)
});

// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(966);
// EXTERNAL MODULE: ../.yarn/__virtual__/@mdx-js-react-virtual-c912a2a9a1/0/cache/@mdx-js-react-npm-3.0.1-1ce14f6273-d566407af1.zip/node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(1503);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/index.js + 14 modules
var CodeBlock = __webpack_require__(879);
// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js
var react = __webpack_require__(3900);
// EXTERNAL MODULE: ../.yarn/cache/clsx-npm-2.0.0-afafbbe44a-943766d1b0.zip/node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(9275);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/TabItem/styles.module.css
var styles_module = __webpack_require__(2294);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/TabItem/index.js



function TabItem({ children, hidden, className }) {
  return /* @__PURE__ */ react.createElement(
    "div",
    {
      role: "tabpanel",
      className: (0,clsx/* default */.Z)((styles_module_default()).tabItem, className),
      ...{ hidden }
    },
    children
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/scrollUtils.js
var scrollUtils = __webpack_require__(7062);
// EXTERNAL MODULE: ../.yarn/__virtual__/react-router-virtual-6c21c5eecc/0/cache/react-router-npm-5.3.4-cc0757f6df-99d54a99af.zip/node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(4721);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-13364ff850/0/cache/@docusaurus-core-npm-3.2.0-d5d6b2daee-e56de94b1a.zip/node_modules/@docusaurus/core/lib/client/exports/useIsomorphicLayoutEffect.js
var useIsomorphicLayoutEffect = __webpack_require__(232);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/historyUtils.js
var historyUtils = __webpack_require__(3561);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/jsUtils.js
var jsUtils = __webpack_require__(266);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/storageUtils.js
var storageUtils = __webpack_require__(6522);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/tabsUtils.js





function isTabItem(comp) {
  const { props } = comp;
  return !!props && typeof props === "object" && "value" in props;
}
function sanitizeTabsChildren(children) {
  var _a, _b;
  return (_b = (_a = react.Children.toArray(children).filter((child) => child !== "\n").map((child) => {
    if (!child || (0,react.isValidElement)(child) && isTabItem(child)) {
      return child;
    }
    throw new Error(`Docusaurus error: Bad <Tabs> child <${// @ts-expect-error: guarding against unexpected cases
    typeof child.type === "string" ? child.type : child.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`);
  })) == null ? void 0 : _a.filter(Boolean)) != null ? _b : [];
}
function extractChildrenTabValues(children) {
  return sanitizeTabsChildren(children).map(({ props: { value, label, attributes, default: isDefault } }) => ({
    value,
    label,
    attributes,
    default: isDefault
  }));
}
function ensureNoDuplicateValue(values) {
  const dup = (0,jsUtils/* duplicates */.l)(values, (a, b) => a.value === b.value);
  if (dup.length > 0) {
    throw new Error(`Docusaurus error: Duplicate values "${dup.map((a) => a.value).join(", ")}" found in <Tabs>. Every value needs to be unique.`);
  }
}
function useTabValues(props) {
  const { values: valuesProp, children } = props;
  return (0,react.useMemo)(() => {
    const values = valuesProp != null ? valuesProp : extractChildrenTabValues(children);
    ensureNoDuplicateValue(values);
    return values;
  }, [valuesProp, children]);
}
function isValidValue({ value, tabValues }) {
  return tabValues.some((a) => a.value === value);
}
function getInitialStateValue({ defaultValue, tabValues }) {
  var _a;
  if (tabValues.length === 0) {
    throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");
  }
  if (defaultValue) {
    if (!isValidValue({ value: defaultValue, tabValues })) {
      throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${defaultValue}" but none of its children has the corresponding value. Available values are: ${tabValues.map((a) => a.value).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);
    }
    return defaultValue;
  }
  const defaultTabValue = (_a = tabValues.find((tabValue) => tabValue.default)) != null ? _a : tabValues[0];
  if (!defaultTabValue) {
    throw new Error("Unexpected error: 0 tabValues");
  }
  return defaultTabValue.value;
}
function getStorageKey(groupId) {
  if (!groupId) {
    return null;
  }
  return `docusaurus.tab.${groupId}`;
}
function getQueryStringKey({ queryString = false, groupId }) {
  if (typeof queryString === "string") {
    return queryString;
  }
  if (queryString === false) {
    return null;
  }
  if (queryString === true && !groupId) {
    throw new Error(`Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".`);
  }
  return groupId != null ? groupId : null;
}
function useTabQueryString({ queryString = false, groupId }) {
  const history = (0,react_router/* useHistory */.k6)();
  const key = getQueryStringKey({ queryString, groupId });
  const value = (0,historyUtils/* useQueryStringValue */._X)(key);
  const setValue = (0,react.useCallback)((newValue) => {
    if (!key) {
      return;
    }
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.set(key, newValue);
    history.replace({ ...history.location, search: searchParams.toString() });
  }, [key, history]);
  return [value, setValue];
}
function useTabStorage({ groupId }) {
  const key = getStorageKey(groupId);
  const [value, storageSlot] = (0,storageUtils/* useStorageSlot */.Nk)(key);
  const setValue = (0,react.useCallback)((newValue) => {
    if (!key) {
      return;
    }
    storageSlot.set(newValue);
  }, [key, storageSlot]);
  return [value, setValue];
}
function useTabs(props) {
  const { defaultValue, queryString = false, groupId } = props;
  const tabValues = useTabValues(props);
  const [selectedValue, setSelectedValue] = (0,react.useState)(() => getInitialStateValue({ defaultValue, tabValues }));
  const [queryStringValue, setQueryString] = useTabQueryString({
    queryString,
    groupId
  });
  const [storageValue, setStorageValue] = useTabStorage({
    groupId
  });
  const valueToSync = (() => {
    const value = queryStringValue != null ? queryStringValue : storageValue;
    if (!isValidValue({ value, tabValues })) {
      return null;
    }
    return value;
  })();
  (0,useIsomorphicLayoutEffect/* default */.Z)(() => {
    if (valueToSync) {
      setSelectedValue(valueToSync);
    }
  }, [valueToSync]);
  const selectValue = (0,react.useCallback)((newValue) => {
    if (!isValidValue({ value: newValue, tabValues })) {
      throw new Error(`Can't select invalid tab value=${newValue}`);
    }
    setSelectedValue(newValue);
    setQueryString(newValue);
    setStorageValue(newValue);
  }, [setQueryString, setStorageValue, tabValues]);
  return { selectedValue, selectValue, tabValues };
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-13364ff850/0/cache/@docusaurus-core-npm-3.2.0-d5d6b2daee-e56de94b1a.zip/node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js
var useIsBrowser = __webpack_require__(6690);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/Tabs/styles.module.css
var Tabs_styles_module = __webpack_require__(1899);
var Tabs_styles_module_default = /*#__PURE__*/__webpack_require__.n(Tabs_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/Tabs/index.js





function TabList({ className, block, selectedValue, selectValue, tabValues }) {
  const tabRefs = [];
  const { blockElementScrollPositionUntilNextRender } = (0,scrollUtils/* useScrollPositionBlocker */.o5)();
  const handleTabChange = (event) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex].value;
    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
  };
  const handleKeydown = (event) => {
    var _a, _b;
    let focusElement = null;
    switch (event.key) {
      case "Enter": {
        handleTabChange(event);
        break;
      }
      case "ArrowRight": {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = (_a = tabRefs[nextTab]) != null ? _a : tabRefs[0];
        break;
      }
      case "ArrowLeft": {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = (_b = tabRefs[prevTab]) != null ? _b : tabRefs[tabRefs.length - 1];
        break;
      }
      default:
        break;
    }
    focusElement == null ? void 0 : focusElement.focus();
  };
  return /* @__PURE__ */ react.createElement(
    "ul",
    {
      role: "tablist",
      "aria-orientation": "horizontal",
      className: (0,clsx/* default */.Z)(
        "tabs",
        {
          "tabs--block": block
        },
        className
      )
    },
    tabValues.map(({ value, label, attributes }) => /* @__PURE__ */ react.createElement(
      "li",
      {
        role: "tab",
        tabIndex: selectedValue === value ? 0 : -1,
        "aria-selected": selectedValue === value,
        key: value,
        ref: (tabControl) => tabRefs.push(tabControl),
        onKeyDown: handleKeydown,
        onClick: handleTabChange,
        ...attributes,
        className: (0,clsx/* default */.Z)("tabs__item", (Tabs_styles_module_default()).tabItem, attributes == null ? void 0 : attributes.className, {
          "tabs__item--active": selectedValue === value
        })
      },
      label != null ? label : value
    ))
  );
}
function TabContent({ lazy, children, selectedValue }) {
  const childTabs = (Array.isArray(children) ? children : [children]).filter(
    Boolean
  );
  if (lazy) {
    const selectedTabItem = childTabs.find(
      (tabItem) => tabItem.props.value === selectedValue
    );
    if (!selectedTabItem) {
      return null;
    }
    return (0,react.cloneElement)(selectedTabItem, { className: "margin-top--md" });
  }
  return /* @__PURE__ */ react.createElement("div", { className: "margin-top--md" }, childTabs.map(
    (tabItem, i) => (0,react.cloneElement)(tabItem, {
      key: i,
      hidden: tabItem.props.value !== selectedValue
    })
  ));
}
function TabsComponent(props) {
  const tabs = useTabs(props);
  return /* @__PURE__ */ react.createElement("div", { className: (0,clsx/* default */.Z)("tabs-container", (Tabs_styles_module_default()).tabList) }, /* @__PURE__ */ react.createElement(TabList, { ...props, ...tabs }), /* @__PURE__ */ react.createElement(TabContent, { ...props, ...tabs }));
}
function Tabs(props) {
  const isBrowser = (0,useIsBrowser/* default */.Z)();
  return /* @__PURE__ */ react.createElement(
    TabsComponent,
    {
      key: String(isBrowser),
      ...props
    },
    sanitizeTabsChildren(props.children)
  );
}

;// CONCATENATED MODULE: ./components/package-manager/package-manager-add.tsx




function PackageManagerAdd(props) {
  return /* @__PURE__ */ react.createElement(Tabs, { groupId: "package-manager" }, /* @__PURE__ */ react.createElement(TabItem, { value: "yarn" }, /* @__PURE__ */ react.createElement(CodeBlock/* default */.Z, { language: "bash" }, "yarn add ", props.package, props.dev ? " -D" : "")), /* @__PURE__ */ react.createElement(TabItem, { value: "npm" }, /* @__PURE__ */ react.createElement(CodeBlock/* default */.Z, { language: "bash" }, "npm install ", props.package, props.dev ? " --save-dev" : "")), /* @__PURE__ */ react.createElement(TabItem, { value: "pnpm" }, /* @__PURE__ */ react.createElement(CodeBlock/* default */.Z, { language: "bash" }, "pnpm add ", props.package, props.dev ? " -D" : "")));
}

;// CONCATENATED MODULE: ./components/package-manager/index.ts


;// CONCATENATED MODULE: ./docs/getting-started/installation.mdx


const frontMatter = {
	sidebar_position: 1,
	description: ''
};
const contentTitle = 'Installation';
const metadata = {
  "id": "getting-started/installation",
  "title": "Installation",
  "description": "",
  "source": "@site/docs/getting-started/installation.mdx",
  "sourceDirName": "getting-started",
  "slug": "/getting-started/installation",
  "permalink": "/docs/getting-started/installation",
  "draft": false,
  "unlisted": false,
  "tags": [],
  "version": "current",
  "sidebarPosition": 1,
  "frontMatter": {
    "sidebar_position": 1,
    "description": ""
  },
  "sidebar": "tutorialSidebar",
  "previous": {
    "title": "Getting Started",
    "permalink": "/docs/category/getting-started"
  },
  "next": {
    "title": "Configuration",
    "permalink": "/docs/getting-started/configuration"
  }
};
const assets = {

};




const toc = [{
  "value": "Requirements",
  "id": "requirements",
  "level": 2
}, {
  "value": "Setup",
  "id": "setup",
  "level": 2
}, {
  "value": "Runtime",
  "id": "runtime",
  "level": 3
}, {
  "value": "CLI and Compiler",
  "id": "cli-and-compiler",
  "level": 3
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    ul: "ul",
    ...(0,lib/* useMDXComponents */.a)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(_components.h1, {
      id: "installation",
      children: "Installation"
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "requirements",
      children: "Requirements"
    }), "\n", (0,jsx_runtime.jsxs)(_components.ul, {
      children: ["\n", (0,jsx_runtime.jsxs)(_components.li, {
        children: [(0,jsx_runtime.jsx)(_components.a, {
          href: "https://nodejs.org",
          children: "Node.js"
        }), " version 18 or above."]
      }), "\n", (0,jsx_runtime.jsxs)(_components.li, {
        children: [(0,jsx_runtime.jsx)(_components.a, {
          href: "https://www.typescriptlang.org",
          children: "TypeScript"
        }), " version 4.9 or above."]
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "Any package manager."
      }), "\n"]
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "setup",
      children: "Setup"
    }), "\n", (0,jsx_runtime.jsx)(_components.h3, {
      id: "runtime",
      children: "Runtime"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Install the core package."
    }), "\n", "\n", (0,jsx_runtime.jsx)(PackageManagerAdd, {
      package: "@baeta/core"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "This is the only package required at runtime for a basic installation."
    }), "\n", (0,jsx_runtime.jsx)(_components.h3, {
      id: "cli-and-compiler",
      children: "CLI and Compiler"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Now add the cli and compiler. The compiler is optional, but highly recommended, as it will provide a more seamless integration and allow you to write configuration files in TypeScript."
    }), "\n", (0,jsx_runtime.jsx)(PackageManagerAdd, {
      dev: true,
      package: "@baeta/cli @baeta/compiler"
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ...(0,lib/* useMDXComponents */.a)(),
    ...props.components
  };
  return MDXLayout ? (0,jsx_runtime.jsx)(MDXLayout, {
    ...props,
    children: (0,jsx_runtime.jsx)(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}



/***/ }),

/***/ 4565:
/***/ ((module) => {

// Exports
module.exports = {
	"codeBlockContainer": `codeBlockContainer_LW_B`
};


/***/ }),

/***/ 8094:
/***/ ((module) => {

// Exports
module.exports = {
	"codeBlockContent": `codeBlockContent_qTa_`,
	"codeBlockTitle": `codeBlockTitle_fyQo`,
	"codeBlock": `codeBlock_NHG3`,
	"codeBlockStandalone": `codeBlockStandalone_hyzj`,
	"codeBlockLines": `codeBlockLines_p0Ut`,
	"codeBlockLinesWithNumbering": `codeBlockLinesWithNumbering_Qhab`,
	"buttonGroup": `buttonGroup_fef2`
};


/***/ }),

/***/ 7163:
/***/ ((module) => {

// Exports
module.exports = {
	"copyButtonCopied": `copyButtonCopied_Uyng`,
	"copyButtonIcons": `copyButtonIcons_WMOh`,
	"copyButtonIcon": `copyButtonIcon_UP3J`,
	"copyButtonSuccessIcon": `copyButtonSuccessIcon_iNKe`
};


/***/ }),

/***/ 3162:
/***/ ((module) => {

// Exports
module.exports = {
	"codeLine": `codeLine_DxCu`,
	"codeLineNumber": `codeLineNumber_M8F0`,
	"codeLineContent": `codeLineContent_AuV2`
};


/***/ }),

/***/ 6531:
/***/ ((module) => {

// Exports
module.exports = {
	"wordWrapButtonIcon": `wordWrapButtonIcon_hwk8`,
	"wordWrapButtonEnabled": `wordWrapButtonEnabled_Ndgo`
};


/***/ }),

/***/ 2294:
/***/ ((module) => {

// Exports
module.exports = {
	"tabItem": `tabItem_Uueg`
};


/***/ }),

/***/ 1899:
/***/ ((module) => {

// Exports
module.exports = {
	"tabList": `tabList_Pa3Q`,
	"tabItem": `tabItem_HZWm`
};


/***/ }),

/***/ 879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ CodeBlock)
});

// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js
var react = __webpack_require__(3900);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-13364ff850/0/cache/@docusaurus-core-npm-3.2.0-d5d6b2daee-e56de94b1a.zip/node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js
var useIsBrowser = __webpack_require__(6690);
// EXTERNAL MODULE: ../.yarn/cache/clsx-npm-2.0.0-afafbbe44a-943766d1b0.zip/node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(9275);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/contexts/colorMode.js
var contexts_colorMode = __webpack_require__(6914);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/useThemeConfig.js
var useThemeConfig = __webpack_require__(7739);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/hooks/usePrismTheme.js


function usePrismTheme() {
  const { prism } = (0,useThemeConfig/* useThemeConfig */.L)();
  const { colorMode } = (0,contexts_colorMode/* useColorMode */.I)();
  const lightModeTheme = prism.theme;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = colorMode === "dark" ? darkModeTheme : lightModeTheme;
  return prismTheme;
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(7498);
// EXTERNAL MODULE: ../.yarn/cache/parse-numeric-range-npm-1.3.0-71baf377a4-289ca126d5.zip/node_modules/parse-numeric-range/index.js
var parse_numeric_range = __webpack_require__(8485);
var parse_numeric_range_default = /*#__PURE__*/__webpack_require__.n(parse_numeric_range);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/codeBlockUtils.js

const codeBlockTitleRegex = /title=(?<quote>["'])(?<title>.*?)\1/;
const metastringLinesRangeRegex = /\{(?<range>[\d,-]+)\}/;
const popularCommentPatterns = {
  js: { start: "\\/\\/", end: "" },
  jsBlock: { start: "\\/\\*", end: "\\*\\/" },
  jsx: { start: "\\{\\s*\\/\\*", end: "\\*\\/\\s*\\}" },
  bash: { start: "#", end: "" },
  html: { start: "<!--", end: "-->" }
};
const commentPatterns = {
  ...popularCommentPatterns,
  // minor comment styles
  lua: { start: "--", end: "" },
  wasm: { start: "\\;\\;", end: "" },
  tex: { start: "%", end: "" },
  vb: { start: "['\u2018\u2019]", end: "" },
  vbnet: { start: "(?:_\\s*)?['\u2018\u2019]", end: "" },
  rem: { start: "[Rr][Ee][Mm]\\b", end: "" },
  f90: { start: "!", end: "" },
  ml: { start: "\\(\\*", end: "\\*\\)" },
  cobol: { start: "\\*>", end: "" }
  // Free format only
};
const popularCommentTypes = Object.keys(popularCommentPatterns);
function getCommentPattern(languages, magicCommentDirectives) {
  const commentPattern = languages.map((lang) => {
    const { start, end } = commentPatterns[lang];
    return `(?:${start}\\s*(${magicCommentDirectives.flatMap((d) => {
      var _a, _b;
      return [d.line, (_a = d.block) == null ? void 0 : _a.start, (_b = d.block) == null ? void 0 : _b.end].filter(Boolean);
    }).join("|")})\\s*${end})`;
  }).join("|");
  return new RegExp(`^\\s*(?:${commentPattern})\\s*$`);
}
function getAllMagicCommentDirectiveStyles(lang, magicCommentDirectives) {
  switch (lang) {
    case "js":
    case "javascript":
    case "ts":
    case "typescript":
      return getCommentPattern(["js", "jsBlock"], magicCommentDirectives);
    case "jsx":
    case "tsx":
      return getCommentPattern(["js", "jsBlock", "jsx"], magicCommentDirectives);
    case "html":
      return getCommentPattern(["js", "jsBlock", "html"], magicCommentDirectives);
    case "python":
    case "py":
    case "bash":
      return getCommentPattern(["bash"], magicCommentDirectives);
    case "markdown":
    case "md":
      return getCommentPattern(["html", "jsx", "bash"], magicCommentDirectives);
    case "tex":
    case "latex":
    case "matlab":
      return getCommentPattern(["tex"], magicCommentDirectives);
    case "lua":
    case "haskell":
    case "sql":
      return getCommentPattern(["lua"], magicCommentDirectives);
    case "wasm":
      return getCommentPattern(["wasm"], magicCommentDirectives);
    case "vb":
    case "vba":
    case "visual-basic":
      return getCommentPattern(["vb", "rem"], magicCommentDirectives);
    case "vbnet":
      return getCommentPattern(["vbnet", "rem"], magicCommentDirectives);
    case "batch":
      return getCommentPattern(["rem"], magicCommentDirectives);
    case "basic":
      return getCommentPattern(["rem", "f90"], magicCommentDirectives);
    case "fsharp":
      return getCommentPattern(["js", "ml"], magicCommentDirectives);
    case "ocaml":
    case "sml":
      return getCommentPattern(["ml"], magicCommentDirectives);
    case "fortran":
      return getCommentPattern(["f90"], magicCommentDirectives);
    case "cobol":
      return getCommentPattern(["cobol"], magicCommentDirectives);
    default:
      return getCommentPattern(popularCommentTypes, magicCommentDirectives);
  }
}
function parseCodeBlockTitle(metastring) {
  var _a, _b;
  return (_b = (_a = metastring == null ? void 0 : metastring.match(codeBlockTitleRegex)) == null ? void 0 : _a.groups.title) != null ? _b : "";
}
function containsLineNumbers(metastring) {
  return Boolean(metastring == null ? void 0 : metastring.includes("showLineNumbers"));
}
function parseLanguage(className) {
  const languageClassName = className.split(" ").find((str) => str.startsWith("language-"));
  return languageClassName == null ? void 0 : languageClassName.replace(/language-/, "");
}
function parseLines(content, options) {
  let code = content.replace(/\n$/, "");
  const { language, magicComments, metastring } = options;
  if (metastring && metastringLinesRangeRegex.test(metastring)) {
    const linesRange = metastring.match(metastringLinesRangeRegex).groups.range;
    if (magicComments.length === 0) {
      throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${metastring}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);
    }
    const metastringRangeClassName = magicComments[0].className;
    const lines2 = parse_numeric_range_default()(linesRange).filter((n) => n > 0).map((n) => [n - 1, [metastringRangeClassName]]);
    return { lineClassNames: Object.fromEntries(lines2), code };
  }
  if (language === void 0) {
    return { lineClassNames: {}, code };
  }
  const directiveRegex = getAllMagicCommentDirectiveStyles(language, magicComments);
  const lines = code.split("\n");
  const blocks = Object.fromEntries(magicComments.map((d) => [d.className, { start: 0, range: "" }]));
  const lineToClassName = Object.fromEntries(magicComments.filter((d) => d.line).map(({ className, line }) => [line, className]));
  const blockStartToClassName = Object.fromEntries(magicComments.filter((d) => d.block).map(({ className, block }) => [block.start, className]));
  const blockEndToClassName = Object.fromEntries(magicComments.filter((d) => d.block).map(({ className, block }) => [block.end, className]));
  for (let lineNumber = 0; lineNumber < lines.length; ) {
    const line = lines[lineNumber];
    const match = line.match(directiveRegex);
    if (!match) {
      lineNumber += 1;
      continue;
    }
    const directive = match.slice(1).find((item) => item !== void 0);
    if (lineToClassName[directive]) {
      blocks[lineToClassName[directive]].range += `${lineNumber},`;
    } else if (blockStartToClassName[directive]) {
      blocks[blockStartToClassName[directive]].start = lineNumber;
    } else if (blockEndToClassName[directive]) {
      blocks[blockEndToClassName[directive]].range += `${blocks[blockEndToClassName[directive]].start}-${lineNumber - 1},`;
    }
    lines.splice(lineNumber, 1);
  }
  code = lines.join("\n");
  const lineClassNames = {};
  Object.entries(blocks).forEach(([className, { range }]) => {
    parse_numeric_range_default()(range).forEach((l) => {
      var _a;
      (_a = lineClassNames[l]) != null ? _a : lineClassNames[l] = [];
      lineClassNames[l].push(className);
    });
  });
  return { lineClassNames, code };
}
function getPrismCssVariables(prismTheme) {
  const mapping = {
    color: "--prism-color",
    backgroundColor: "--prism-background-color"
  };
  const properties = {};
  Object.entries(prismTheme.plain).forEach(([key, value]) => {
    const varName = mapping[key];
    if (varName && typeof value === "string") {
      properties[varName] = value;
    }
  });
  return properties;
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Container/styles.module.css
var styles_module = __webpack_require__(4565);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Container/index.js





function CodeBlockContainer({ as: As, ...props }) {
  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);
  return /* @__PURE__ */ react.createElement(
    As,
    {
      ...props,
      style: prismCssVariables,
      className: (0,clsx/* default */.Z)(
        props.className,
        (styles_module_default()).codeBlockContainer,
        ThemeClassNames/* ThemeClassNames */.k.common.codeBlock
      )
    }
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/styles.module.css
var Content_styles_module = __webpack_require__(8094);
var Content_styles_module_default = /*#__PURE__*/__webpack_require__.n(Content_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/Element.js




function CodeBlockJSX({ children, className }) {
  return /* @__PURE__ */ react.createElement(
    CodeBlockContainer,
    {
      as: "pre",
      tabIndex: 0,
      className: (0,clsx/* default */.Z)((Content_styles_module_default()).codeBlockStandalone, "thin-scrollbar", className)
    },
    /* @__PURE__ */ react.createElement("code", { className: (Content_styles_module_default()).codeBlockLines }, children)
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/utils/reactUtils.js
var reactUtils = __webpack_require__(3700);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/hooks/useMutationObserver.js


const DefaultOptions = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};
function useMutationObserver(target, callback, options = DefaultOptions) {
  const stableCallback = (0,reactUtils/* useEvent */.zX)(callback);
  const stableOptions = (0,reactUtils/* useShallowMemoObject */.Ql)(options);
  (0,react.useEffect)(() => {
    const observer = new MutationObserver(stableCallback);
    if (target) {
      observer.observe(target, stableOptions);
    }
    return () => observer.disconnect();
  }, [target, stableCallback, stableOptions]);
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-329cb861ac/0/cache/@docusaurus-theme-common-npm-3.2.0-026d95b10a-403c4e3111.zip/node_modules/@docusaurus/theme-common/lib/hooks/useCodeWordWrap.js


function useTabBecameVisibleCallback(codeBlockRef, callback) {
  const [hiddenTabElement, setHiddenTabElement] = (0,react.useState)();
  const updateHiddenTabElement = (0,react.useCallback)(() => {
    var _a;
    setHiddenTabElement((_a = codeBlockRef.current) == null ? void 0 : _a.closest("[role=tabpanel][hidden]"));
  }, [codeBlockRef, setHiddenTabElement]);
  (0,react.useEffect)(() => {
    updateHiddenTabElement();
  }, [updateHiddenTabElement]);
  useMutationObserver(hiddenTabElement, (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
        callback();
        updateHiddenTabElement();
      }
    });
  }, {
    attributes: true,
    characterData: false,
    childList: false,
    subtree: false
  });
}
function useCodeWordWrap() {
  const [isEnabled, setIsEnabled] = (0,react.useState)(false);
  const [isCodeScrollable, setIsCodeScrollable] = (0,react.useState)(false);
  const codeBlockRef = (0,react.useRef)(null);
  const toggle = (0,react.useCallback)(() => {
    const codeElement = codeBlockRef.current.querySelector("code");
    if (isEnabled) {
      codeElement.removeAttribute("style");
    } else {
      codeElement.style.whiteSpace = "pre-wrap";
      codeElement.style.overflowWrap = "anywhere";
    }
    setIsEnabled((value) => !value);
  }, [codeBlockRef, isEnabled]);
  const updateCodeIsScrollable = (0,react.useCallback)(() => {
    const { scrollWidth, clientWidth } = codeBlockRef.current;
    const isScrollable = scrollWidth > clientWidth || codeBlockRef.current.querySelector("code").hasAttribute("style");
    setIsCodeScrollable(isScrollable);
  }, [codeBlockRef]);
  useTabBecameVisibleCallback(codeBlockRef, updateCodeIsScrollable);
  (0,react.useEffect)(() => {
    updateCodeIsScrollable();
  }, [isEnabled, updateCodeIsScrollable]);
  (0,react.useEffect)(() => {
    window.addEventListener("resize", updateCodeIsScrollable, {
      passive: true
    });
    return () => {
      window.removeEventListener("resize", updateCodeIsScrollable);
    };
  }, [updateCodeIsScrollable]);
  return { codeBlockRef, isEnabled, isCodeScrollable, toggle };
}

// EXTERNAL MODULE: ../.yarn/__virtual__/prism-react-renderer-virtual-ced36dc8d1/0/cache/prism-react-renderer-npm-2.3.0-47266bd402-f582e0de68.zip/node_modules/prism-react-renderer/dist/index.mjs
var dist = __webpack_require__(5081);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/styles.module.css
var Line_styles_module = __webpack_require__(3162);
var Line_styles_module_default = /*#__PURE__*/__webpack_require__.n(Line_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/index.js



function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps
}) {
  if (line.length === 1 && line[0].content === "\n") {
    line[0].content = "";
  }
  const lineProps = getLineProps({
    line,
    className: (0,clsx/* default */.Z)(classNames, showLineNumbers && (Line_styles_module_default()).codeLine)
  });
  const lineTokens = line.map((token, key) => /* @__PURE__ */ react.createElement("span", { key, ...getTokenProps({ token, key }) }));
  return /* @__PURE__ */ react.createElement("span", { ...lineProps }, showLineNumbers ? /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("span", { className: (Line_styles_module_default()).codeLineNumber }), /* @__PURE__ */ react.createElement("span", { className: (Line_styles_module_default()).codeLineContent }, lineTokens)) : lineTokens, /* @__PURE__ */ react.createElement("br", null));
}

;// CONCATENATED MODULE: ../.yarn/cache/copy-text-to-clipboard-npm-3.2.0-46c47374b9-df7115c197.zip/node_modules/copy-text-to-clipboard/index.js
function copyTextToClipboard(text, { target = document.body } = {}) {
  if (typeof text !== "string") {
    throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof text}\`.`);
  }
  const element = document.createElement("textarea");
  const previouslyFocusedElement = document.activeElement;
  element.value = text;
  element.setAttribute("readonly", "");
  element.style.contain = "strict";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.fontSize = "12pt";
  const selection = document.getSelection();
  const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0);
  target.append(element);
  element.select();
  element.selectionStart = 0;
  element.selectionEnd = text.length;
  let isSuccess = false;
  try {
    isSuccess = document.execCommand("copy");
  } catch {
  }
  element.remove();
  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
  return isSuccess;
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-13364ff850/0/cache/@docusaurus-core-npm-3.2.0-d5d6b2daee-e56de94b1a.zip/node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(5035);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/Copy/index.js

function IconCopy(props) {
  return /* @__PURE__ */ react.createElement("svg", { viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ react.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
    }
  ));
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/Success/index.js

function IconSuccess(props) {
  return /* @__PURE__ */ react.createElement("svg", { viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ react.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
    }
  ));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/CopyButton/styles.module.css
var CopyButton_styles_module = __webpack_require__(7163);
var CopyButton_styles_module_default = /*#__PURE__*/__webpack_require__.n(CopyButton_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/CopyButton/index.js







function CopyButton({ code, className }) {
  const [isCopied, setIsCopied] = (0,react.useState)(false);
  const copyTimeout = (0,react.useRef)(void 0);
  const handleCopyCode = (0,react.useCallback)(() => {
    copyTextToClipboard(code);
    setIsCopied(true);
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 1e3);
  }, [code]);
  (0,react.useEffect)(() => () => window.clearTimeout(copyTimeout.current), []);
  return /* @__PURE__ */ react.createElement(
    "button",
    {
      type: "button",
      "aria-label": isCopied ? (0,Translate/* translate */.I)({
        id: "theme.CodeBlock.copied",
        message: "Copied",
        description: "The copied button label on code blocks"
      }) : (0,Translate/* translate */.I)({
        id: "theme.CodeBlock.copyButtonAriaLabel",
        message: "Copy code to clipboard",
        description: "The ARIA label for copy code blocks button"
      }),
      title: (0,Translate/* translate */.I)({
        id: "theme.CodeBlock.copy",
        message: "Copy",
        description: "The copy button label on code blocks"
      }),
      className: (0,clsx/* default */.Z)(
        "clean-btn",
        className,
        (CopyButton_styles_module_default()).copyButton,
        isCopied && (CopyButton_styles_module_default()).copyButtonCopied
      ),
      onClick: handleCopyCode
    },
    /* @__PURE__ */ react.createElement("span", { className: (CopyButton_styles_module_default()).copyButtonIcons, "aria-hidden": "true" }, /* @__PURE__ */ react.createElement(IconCopy, { className: (CopyButton_styles_module_default()).copyButtonIcon }), /* @__PURE__ */ react.createElement(IconSuccess, { className: (CopyButton_styles_module_default()).copyButtonSuccessIcon }))
  );
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/WordWrap/index.js

function IconWordWrap(props) {
  return /* @__PURE__ */ react.createElement("svg", { viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ react.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
    }
  ));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/WordWrapButton/styles.module.css
var WordWrapButton_styles_module = __webpack_require__(6531);
var WordWrapButton_styles_module_default = /*#__PURE__*/__webpack_require__.n(WordWrapButton_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/WordWrapButton/index.js





function WordWrapButton({ className, onClick, isEnabled }) {
  const title = (0,Translate/* translate */.I)({
    id: "theme.CodeBlock.wordWrapToggle",
    message: "Toggle word wrap",
    description: "The title attribute for toggle word wrapping button of code block lines"
  });
  return /* @__PURE__ */ react.createElement(
    "button",
    {
      type: "button",
      onClick,
      className: (0,clsx/* default */.Z)(
        "clean-btn",
        className,
        isEnabled && (WordWrapButton_styles_module_default()).wordWrapButtonEnabled
      ),
      "aria-label": title,
      title
    },
    /* @__PURE__ */ react.createElement(IconWordWrap, { className: (WordWrapButton_styles_module_default()).wordWrapButtonIcon, "aria-hidden": "true" })
  );
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/String.js










function normalizeLanguage(language) {
  return language == null ? void 0 : language.toLowerCase();
}
function CodeBlockString({
  children,
  className: blockClassName = "",
  metastring,
  title: titleProp,
  showLineNumbers: showLineNumbersProp,
  language: languageProp
}) {
  var _a;
  const {
    prism: { defaultLanguage, magicComments }
  } = (0,useThemeConfig/* useThemeConfig */.L)();
  const language = normalizeLanguage(
    (_a = languageProp != null ? languageProp : parseLanguage(blockClassName)) != null ? _a : defaultLanguage
  );
  const prismTheme = usePrismTheme();
  const wordWrap = useCodeWordWrap();
  const title = parseCodeBlockTitle(metastring) || titleProp;
  const { lineClassNames, code } = parseLines(children, {
    metastring,
    language,
    magicComments
  });
  const showLineNumbers = showLineNumbersProp != null ? showLineNumbersProp : containsLineNumbers(metastring);
  return /* @__PURE__ */ react.createElement(
    CodeBlockContainer,
    {
      as: "div",
      className: (0,clsx/* default */.Z)(
        blockClassName,
        language && !blockClassName.includes(`language-${language}`) && `language-${language}`
      )
    },
    title && /* @__PURE__ */ react.createElement("div", { className: (Content_styles_module_default()).codeBlockTitle }, title),
    /* @__PURE__ */ react.createElement("div", { className: (Content_styles_module_default()).codeBlockContent }, /* @__PURE__ */ react.createElement(dist/* Highlight */.y$, { theme: prismTheme, code, language: language != null ? language : "text" }, ({ className, style, tokens, getLineProps, getTokenProps }) => /* @__PURE__ */ react.createElement(
      "pre",
      {
        tabIndex: 0,
        ref: wordWrap.codeBlockRef,
        className: (0,clsx/* default */.Z)(className, (Content_styles_module_default()).codeBlock, "thin-scrollbar"),
        style
      },
      /* @__PURE__ */ react.createElement(
        "code",
        {
          className: (0,clsx/* default */.Z)(
            (Content_styles_module_default()).codeBlockLines,
            showLineNumbers && (Content_styles_module_default()).codeBlockLinesWithNumbering
          )
        },
        tokens.map((line, i) => /* @__PURE__ */ react.createElement(
          CodeBlockLine,
          {
            key: i,
            line,
            getLineProps,
            getTokenProps,
            classNames: lineClassNames[i],
            showLineNumbers
          }
        ))
      )
    )), /* @__PURE__ */ react.createElement("div", { className: (Content_styles_module_default()).buttonGroup }, (wordWrap.isEnabled || wordWrap.isCodeScrollable) && /* @__PURE__ */ react.createElement(
      WordWrapButton,
      {
        className: (Content_styles_module_default()).codeButton,
        onClick: () => wordWrap.toggle(),
        isEnabled: wordWrap.isEnabled
      }
    ), /* @__PURE__ */ react.createElement(CopyButton, { className: (Content_styles_module_default()).codeButton, code })))
  );
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-3879887ca7/0/cache/@docusaurus-theme-classic-npm-3.2.0-c2b1fb49a4-9905431e11.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/index.js




function maybeStringifyChildren(children) {
  if (react.Children.toArray(children).some((el) => (0,react.isValidElement)(el))) {
    return children;
  }
  return Array.isArray(children) ? children.join("") : children;
}
function CodeBlock({ children: rawChildren, ...props }) {
  const isBrowser = (0,useIsBrowser/* default */.Z)();
  const children = maybeStringifyChildren(rawChildren);
  const CodeBlockComp = typeof children === "string" ? CodeBlockString : CodeBlockJSX;
  return /* @__PURE__ */ react.createElement(CodeBlockComp, { key: String(isBrowser), ...props }, children);
}


/***/ }),

/***/ 8485:
/***/ ((module, exports) => {

/**
 * @param {string} string    The string to parse
 * @returns {Array<number>}  Returns an energetic array.
 */
function parsePart(string) {
  let res = [];
  let m;

  for (let str of string.split(",").map((str) => str.trim())) {
    // just a number
    if (/^-?\d+$/.test(str)) {
      res.push(parseInt(str, 10));
    } else if (
      (m = str.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
    ) {
      // 1-5 or 1..5 (equivalent) or 1...5 (doesn't include 5)
      let [_, lhs, sep, rhs] = m;

      if (lhs && rhs) {
        lhs = parseInt(lhs);
        rhs = parseInt(rhs);
        const incr = lhs < rhs ? 1 : -1;

        // Make it inclusive by moving the right 'stop-point' away by one.
        if (sep === "-" || sep === ".." || sep === "\u2025") rhs += incr;

        for (let i = lhs; i !== rhs; i += incr) res.push(i);
      }
    }
  }

  return res;
}

exports["default"] = parsePart;
module.exports = parsePart;


/***/ }),

/***/ 3407:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(3900),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(3407);
} else {}


/***/ }),

/***/ 1503:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useMDXComponents)
/* harmony export */ });
/* unused harmony export MDXProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3900);
/**
 * @typedef {import('mdx/types.js').MDXComponents} MDXComponents
 * @typedef {import('react').Component<{}, {}, unknown>} Component
 * @typedef {import('react').ReactNode} ReactNode
 */

/**
 * @callback MergeComponents
 *   Custom merge function.
 * @param {Readonly<MDXComponents>} currentComponents
 *   Current components from the context.
 * @returns {MDXComponents}
 *   Additional components.
 *
 * @typedef Props
 *   Configuration for `MDXProvider`.
 * @property {ReactNode | null | undefined} [children]
 *   Children (optional).
 * @property {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @property {boolean | null | undefined} [disableParentContext=false]
 *   Turn off outer component context (default: `false`).
 */



/** @type {Readonly<MDXComponents>} */
const emptyComponents = {}

const MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents)

/**
 * Get current components from the MDX Context.
 *
 * @param {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @returns {MDXComponents}
 *   Current components.
 */
function useMDXComponents(components) {
  const contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext)

  // Memoize to avoid unnecessary top-level context changes
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    function () {
      // Custom merge via a function prop
      if (typeof components === 'function') {
        return components(contextComponents)
      }

      return {...contextComponents, ...components}
    },
    [contextComponents, components]
  )
}

/**
 * Provider for MDX context.
 *
 * @param {Readonly<Props>} properties
 *   Properties.
 * @returns {JSX.Element}
 *   Element.
 * @satisfies {Component}
 */
function MDXProvider(properties) {
  /** @type {Readonly<MDXComponents>} */
  let allComponents

  if (properties.disableParentContext) {
    allComponents =
      typeof properties.components === 'function'
        ? properties.components(emptyComponents)
        : properties.components || emptyComponents
  } else {
    allComponents = useMDXComponents(properties.components)
  }

  return React.createElement(
    MDXContext.Provider,
    {value: allComponents},
    properties.children
  )
}


/***/ })

};
;