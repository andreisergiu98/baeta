exports.id = 368;
exports.ids = [368];
exports.modules = {

/***/ 7983:
/***/ ((module) => {

// Exports
module.exports = {
	"backToTopButton": `backToTopButton_BSQ8`,
	"backToTopButtonShow": `backToTopButtonShow_vtwd`
};


/***/ }),

/***/ 5379:
/***/ ((module) => {

// Exports
module.exports = {
	"docMainContainer": `docMainContainer_qbDH`,
	"docMainContainerEnhanced": `docMainContainerEnhanced_Gxdv`,
	"docItemWrapperEnhanced": `docItemWrapperEnhanced_d5p5`
};


/***/ }),

/***/ 9667:
/***/ ((module) => {

// Exports
module.exports = {
	"expandButton": `expandButton_wm4e`,
	"expandButtonIcon": `expandButtonIcon_WVrQ`
};


/***/ }),

/***/ 4241:
/***/ ((module) => {

// Exports
module.exports = {
	"docSidebarContainer": `docSidebarContainer_Nj6H`,
	"docSidebarContainerHidden": `docSidebarContainerHidden_zcDX`,
	"sidebarViewport": `sidebarViewport_EX95`
};


/***/ }),

/***/ 9277:
/***/ ((module) => {

// Exports
module.exports = {
	"docRoot": `docRoot_V8Yh`,
	"docsWrapper": `docsWrapper_MtiA`
};


/***/ }),

/***/ 3609:
/***/ ((module) => {

// Exports
module.exports = {
	"collapseSidebarButton": `collapseSidebarButton_ZGII`,
	"collapseSidebarButtonIcon": `collapseSidebarButtonIcon_OP7s`
};


/***/ }),

/***/ 4245:
/***/ ((module) => {

// Exports
module.exports = {
	"menu": `menu_qvt0`,
	"menuWithAnnouncementBar": `menuWithAnnouncementBar_uoq7`
};


/***/ }),

/***/ 2506:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar": `sidebar_kEA0`,
	"sidebarWithHideableNavbar": `sidebarWithHideableNavbar_rcwn`,
	"sidebarHidden": `sidebarHidden_t8yy`,
	"sidebarLogo": `sidebarLogo_RKXh`
};


/***/ }),

/***/ 131:
/***/ ((module) => {

// Exports
module.exports = {
	"menuHtmlItem": `menuHtmlItem_Lv39`
};


/***/ }),

/***/ 7691:
/***/ ((module) => {

// Exports
module.exports = {
	"menuExternalLink": `menuExternalLink_Aj6N`
};


/***/ }),

/***/ 9249:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DocRoot)
});

// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js
var react = __webpack_require__(3900);
// EXTERNAL MODULE: ../.yarn/cache/clsx-npm-2.0.0-afafbbe44a-943766d1b0.zip/node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(9275);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/metadataUtils.js + 2 modules
var metadataUtils = __webpack_require__(7530);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(8515);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/docsUtils.js
var docsUtils = __webpack_require__(4673);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/contexts/docsSidebar.js
var docsSidebar = __webpack_require__(3846);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(2472);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/scrollUtils.js
var scrollUtils = __webpack_require__(3840);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/useLocationChange.js
var useLocationChange = __webpack_require__(5898);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/hooks/useBackToTopButton.js



function useBackToTopButton({ threshold }) {
  const [shown, setShown] = (0,react.useState)(false);
  const isFocusedAnchor = (0,react.useRef)(false);
  const { startScroll, cancelScroll } = (0,scrollUtils/* useSmoothScrollTo */.Ct)();
  (0,scrollUtils/* useScrollPosition */.RF)(({ scrollY: scrollTop }, lastPosition) => {
    const lastScrollTop = lastPosition == null ? void 0 : lastPosition.scrollY;
    if (!lastScrollTop) {
      return;
    }
    if (isFocusedAnchor.current) {
      isFocusedAnchor.current = false;
    } else if (scrollTop >= lastScrollTop) {
      cancelScroll();
      setShown(false);
    } else if (scrollTop < threshold) {
      setShown(false);
    } else if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
      setShown(true);
    }
  });
  (0,useLocationChange/* useLocationChange */.S)((locationChangeEvent) => {
    if (locationChangeEvent.location.hash) {
      isFocusedAnchor.current = true;
      setShown(false);
    }
  });
  return { shown, scrollToTop: () => startScroll(0) };
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/BackToTopButton/styles.module.css
var styles_module = __webpack_require__(7983);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/BackToTopButton/index.js






function BackToTopButton() {
  const { shown, scrollToTop } = useBackToTopButton({ threshold: 300 });
  return /* @__PURE__ */ react.createElement(
    "button",
    {
      "aria-label": (0,Translate/* translate */.I)({
        id: "theme.BackToTopButton.buttonAriaLabel",
        message: "Scroll back to top",
        description: "The ARIA label for the back to top button"
      }),
      className: (0,clsx/* default */.Z)(
        "clean-btn",
        ThemeClassNames/* ThemeClassNames */.k.common.backToTopButton,
        (styles_module_default()).backToTopButton,
        shown && (styles_module_default()).backToTopButtonShow
      ),
      type: "button",
      onClick: scrollToTop
    }
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/accessibilityUtils.js
var accessibilityUtils = __webpack_require__(7495);
// EXTERNAL MODULE: ../.yarn/__virtual__/react-router-virtual-720e1e95fe/0/cache/react-router-npm-5.3.4-cc0757f6df-99d54a99af.zip/node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(5565);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/hooks/useWindowSize.js
var useWindowSize = __webpack_require__(9969);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/useThemeConfig.js
var useThemeConfig = __webpack_require__(921);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Logo/index.js
var Logo = __webpack_require__(2120);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/Arrow/index.js

function IconArrow(props) {
  return /* @__PURE__ */ react.createElement("svg", { width: "20", height: "20", "aria-hidden": "true", ...props }, /* @__PURE__ */ react.createElement("g", { fill: "#7a7a7a" }, /* @__PURE__ */ react.createElement("path", { d: "M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0" }), /* @__PURE__ */ react.createElement("path", { d: "M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0" })));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/CollapseButton/styles.module.css
var CollapseButton_styles_module = __webpack_require__(3609);
var CollapseButton_styles_module_default = /*#__PURE__*/__webpack_require__.n(CollapseButton_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/CollapseButton/index.js





function CollapseButton({ onClick }) {
  return /* @__PURE__ */ react.createElement(
    "button",
    {
      type: "button",
      title: (0,Translate/* translate */.I)({
        id: "theme.docs.sidebar.collapseButtonTitle",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar"
      }),
      "aria-label": (0,Translate/* translate */.I)({
        id: "theme.docs.sidebar.collapseButtonAriaLabel",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar"
      }),
      className: (0,clsx/* default */.Z)(
        "button button--secondary button--outline",
        (CollapseButton_styles_module_default()).collapseSidebarButton
      ),
      onClick
    },
    /* @__PURE__ */ react.createElement(IconArrow, { className: (CollapseButton_styles_module_default()).collapseSidebarButtonIcon })
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/contexts/announcementBar.js
var announcementBar = __webpack_require__(9183);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/reactUtils.js
var reactUtils = __webpack_require__(8803);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/contexts/docSidebarItemsExpandedState.js


const EmptyContext = Symbol("EmptyContext");
const Context = react.createContext(EmptyContext);
function DocSidebarItemsExpandedStateProvider({ children }) {
  const [expandedItem, setExpandedItem] = (0,react.useState)(null);
  const contextValue = (0,react.useMemo)(() => ({ expandedItem, setExpandedItem }), [expandedItem]);
  return /* @__PURE__ */ react.createElement(Context.Provider, { value: contextValue }, children);
}
function useDocSidebarItemsExpandedState() {
  const value = (0,react.useContext)(Context);
  if (value === EmptyContext) {
    throw new reactUtils/* ReactContextError */.i6("DocSidebarItemsExpandedStateProvider");
  }
  return value;
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/components/Collapsible/index.js
var Collapsible = __webpack_require__(3070);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/routesUtils.js
var routesUtils = __webpack_require__(9695);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/Link.js + 1 modules
var Link = __webpack_require__(3262);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js
var useIsBrowser = __webpack_require__(8310);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Category/index.js








function useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed }) {
  const wasActive = (0,reactUtils/* usePrevious */.D9)(isActive);
  (0,react.useEffect)(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}
function useCategoryHrefWithSSRFallback(item) {
  const isBrowser = (0,useIsBrowser/* default */.Z)();
  return (0,react.useMemo)(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    if (isBrowser || !item.collapsible) {
      return void 0;
    }
    return (0,docsUtils/* findFirstSidebarItemLink */.LM)(item);
  }, [item, isBrowser]);
}
function Category_CollapseButton({ collapsed, categoryLabel, onClick }) {
  return /* @__PURE__ */ react.createElement(
    "button",
    {
      "aria-label": collapsed ? (0,Translate/* translate */.I)(
        {
          id: "theme.DocSidebarItem.expandCategoryAriaLabel",
          message: "Expand sidebar category '{label}'",
          description: "The ARIA label to expand the sidebar category"
        },
        { label: categoryLabel }
      ) : (0,Translate/* translate */.I)(
        {
          id: "theme.DocSidebarItem.collapseCategoryAriaLabel",
          message: "Collapse sidebar category '{label}'",
          description: "The ARIA label to collapse the sidebar category"
        },
        { label: categoryLabel }
      ),
      "aria-expanded": !collapsed,
      type: "button",
      className: "clean-btn menu__caret",
      onClick
    }
  );
}
function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const { items, label, collapsible, className, href } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories }
    }
  } = (0,useThemeConfig/* useThemeConfig */.L)();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = (0,docsUtils/* isActiveSidebarItem */._F)(item, activePath);
  const isCurrentPage = (0,routesUtils/* isSamePath */.Mg)(href, activePath);
  const { collapsed, setCollapsed } = (0,Collapsible/* useCollapsible */.u)({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    }
  });
  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  const updateCollapsed = (toCollapsed = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed });
  (0,react.useEffect)(() => {
    if (collapsible && expandedItem != null && expandedItem !== index && autoCollapseCategories) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);
  return /* @__PURE__ */ react.createElement(
    "li",
    {
      className: (0,clsx/* default */.Z)(
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarItemCategory,
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarItemCategoryLevel(level),
        "menu__list-item",
        {
          "menu__list-item--collapsed": collapsed
        },
        className
      )
    },
    /* @__PURE__ */ react.createElement(
      "div",
      {
        className: (0,clsx/* default */.Z)("menu__list-item-collapsible", {
          "menu__list-item-collapsible--active": isCurrentPage
        })
      },
      /* @__PURE__ */ react.createElement(
        Link/* default */.Z,
        {
          className: (0,clsx/* default */.Z)("menu__link", {
            "menu__link--sublist": collapsible,
            "menu__link--sublist-caret": !href && collapsible,
            "menu__link--active": isActive
          }),
          onClick: collapsible ? (e) => {
            onItemClick == null ? void 0 : onItemClick(item);
            if (href) {
              updateCollapsed(false);
            } else {
              e.preventDefault();
              updateCollapsed();
            }
          } : () => {
            onItemClick == null ? void 0 : onItemClick(item);
          },
          "aria-current": isCurrentPage ? "page" : void 0,
          role: collapsible && !href ? "button" : void 0,
          "aria-expanded": collapsible && !href ? !collapsed : void 0,
          href: collapsible ? hrefWithSSRFallback != null ? hrefWithSSRFallback : "#" : hrefWithSSRFallback,
          ...props
        },
        label
      ),
      href && collapsible && /* @__PURE__ */ react.createElement(
        Category_CollapseButton,
        {
          collapsed,
          categoryLabel: label,
          onClick: (e) => {
            e.preventDefault();
            updateCollapsed();
          }
        }
      )
    ),
    /* @__PURE__ */ react.createElement(Collapsible/* Collapsible */.z, { lazy: true, as: "ul", className: "menu__list", collapsed }, /* @__PURE__ */ react.createElement(
      theme_DocSidebarItems,
      {
        items,
        tabIndex: collapsed ? -1 : 0,
        onItemClick,
        activePath,
        level: level + 1
      }
    ))
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/isInternalUrl.js
var isInternalUrl = __webpack_require__(1368);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/ExternalLink/index.js
var ExternalLink = __webpack_require__(908);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Link/styles.module.css
var Link_styles_module = __webpack_require__(7691);
var Link_styles_module_default = /*#__PURE__*/__webpack_require__.n(Link_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Link/index.js








function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = (0,docsUtils/* isActiveSidebarItem */._F)(item, activePath);
  const isInternalLink = (0,isInternalUrl/* default */.Z)(href);
  return /* @__PURE__ */ react.createElement(
    "li",
    {
      className: (0,clsx/* default */.Z)(
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarItemLink,
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarItemLinkLevel(level),
        "menu__list-item",
        className
      ),
      key: label
    },
    /* @__PURE__ */ react.createElement(
      Link/* default */.Z,
      {
        className: (0,clsx/* default */.Z)(
          "menu__link",
          !isInternalLink && (Link_styles_module_default()).menuExternalLink,
          {
            "menu__link--active": isActive
          }
        ),
        autoAddBaseUrl,
        "aria-current": isActive ? "page" : void 0,
        to: href,
        ...isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : void 0
        },
        ...props
      },
      label,
      !isInternalLink && /* @__PURE__ */ react.createElement(ExternalLink/* default */.Z, null)
    )
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Html/styles.module.css
var Html_styles_module = __webpack_require__(131);
var Html_styles_module_default = /*#__PURE__*/__webpack_require__.n(Html_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Html/index.js




function DocSidebarItemHtml({ item, level, index }) {
  const { value, defaultStyle, className } = item;
  return /* @__PURE__ */ react.createElement(
    "li",
    {
      className: (0,clsx/* default */.Z)(
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarItemLink,
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarItemLinkLevel(level),
        defaultStyle && [(Html_styles_module_default()).menuHtmlItem, "menu__list-item"],
        className
      ),
      key: index,
      dangerouslySetInnerHTML: { __html: value }
    }
  );
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/index.js




function DocSidebarItem({ item, ...props }) {
  switch (item.type) {
    case "category":
      return /* @__PURE__ */ react.createElement(DocSidebarItemCategory, { item, ...props });
    case "html":
      return /* @__PURE__ */ react.createElement(DocSidebarItemHtml, { item, ...props });
    case "link":
    default:
      return /* @__PURE__ */ react.createElement(DocSidebarItemLink, { item, ...props });
  }
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItems/index.js



function DocSidebarItems({ items, ...props }) {
  const visibleItems = (0,docsUtils/* useVisibleSidebarItems */.f)(items, props.activePath);
  return /* @__PURE__ */ react.createElement(DocSidebarItemsExpandedStateProvider, null, visibleItems.map((item, index) => /* @__PURE__ */ react.createElement(DocSidebarItem, { key: index, item, index, ...props })));
}
/* harmony default export */ const theme_DocSidebarItems = ((0,react.memo)(DocSidebarItems));

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/Content/styles.module.css
var Content_styles_module = __webpack_require__(4245);
var Content_styles_module_default = /*#__PURE__*/__webpack_require__.n(Content_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/Content/index.js







function useShowAnnouncementBar() {
  const { isActive } = (0,announcementBar/* useAnnouncementBar */.nT)();
  const [showAnnouncementBar, setShowAnnouncementBar] = (0,react.useState)(isActive);
  (0,scrollUtils/* useScrollPosition */.RF)(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}
function DocSidebarDesktopContent({ path, sidebar, className }) {
  const showAnnouncementBar = useShowAnnouncementBar();
  return /* @__PURE__ */ react.createElement(
    "nav",
    {
      "aria-label": (0,Translate/* translate */.I)({
        id: "theme.docs.sidebar.navAriaLabel",
        message: "Docs sidebar",
        description: "The ARIA label for the sidebar navigation"
      }),
      className: (0,clsx/* default */.Z)(
        "menu thin-scrollbar",
        (Content_styles_module_default()).menu,
        showAnnouncementBar && (Content_styles_module_default()).menuWithAnnouncementBar,
        className
      )
    },
    /* @__PURE__ */ react.createElement("ul", { className: (0,clsx/* default */.Z)(ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarMenu, "menu__list") }, /* @__PURE__ */ react.createElement(theme_DocSidebarItems, { items: sidebar, activePath: path, level: 1 }))
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/styles.module.css
var Desktop_styles_module = __webpack_require__(2506);
var Desktop_styles_module_default = /*#__PURE__*/__webpack_require__.n(Desktop_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/index.js







function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable }
    }
  } = (0,useThemeConfig/* useThemeConfig */.L)();
  return /* @__PURE__ */ react.createElement(
    "div",
    {
      className: (0,clsx/* default */.Z)(
        (Desktop_styles_module_default()).sidebar,
        hideOnScroll && (Desktop_styles_module_default()).sidebarWithHideableNavbar,
        isHidden && (Desktop_styles_module_default()).sidebarHidden
      )
    },
    hideOnScroll && /* @__PURE__ */ react.createElement(Logo/* default */.Z, { tabIndex: -1, className: (Desktop_styles_module_default()).sidebarLogo }),
    /* @__PURE__ */ react.createElement(DocSidebarDesktopContent, { path, sidebar }),
    hideable && /* @__PURE__ */ react.createElement(CollapseButton, { onClick: onCollapse })
  );
}
/* harmony default export */ const Desktop = (react.memo(DocSidebarDesktop));

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/contexts/navbarSecondaryMenu/content.js
var content = __webpack_require__(5876);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/contexts/navbarMobileSidebar.js
var navbarMobileSidebar = __webpack_require__(3);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Mobile/index.js





const DocSidebarMobileSecondaryMenu = ({ sidebar, path }) => {
  const mobileSidebar = (0,navbarMobileSidebar/* useNavbarMobileSidebar */.e)();
  return /* @__PURE__ */ react.createElement("ul", { className: (0,clsx/* default */.Z)(ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarMenu, "menu__list") }, /* @__PURE__ */ react.createElement(
    theme_DocSidebarItems,
    {
      items: sidebar,
      activePath: path,
      onItemClick: (item) => {
        if (item.type === "category" && item.href) {
          mobileSidebar.toggle();
        }
        if (item.type === "link") {
          mobileSidebar.toggle();
        }
      },
      level: 1
    }
  ));
};
function DocSidebarMobile(props) {
  return /* @__PURE__ */ react.createElement(
    content/* NavbarSecondaryMenuFiller */.Zo,
    {
      component: DocSidebarMobileSecondaryMenu,
      props
    }
  );
}
/* harmony default export */ const Mobile = (react.memo(DocSidebarMobile));

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/index.js




function DocSidebar(props) {
  const windowSize = (0,useWindowSize/* useWindowSize */.i)();
  const shouldRenderSidebarDesktop = windowSize === "desktop" || windowSize === "ssr";
  const shouldRenderSidebarMobile = windowSize === "mobile";
  return /* @__PURE__ */ react.createElement(react.Fragment, null, shouldRenderSidebarDesktop && /* @__PURE__ */ react.createElement(Desktop, { ...props }), shouldRenderSidebarMobile && /* @__PURE__ */ react.createElement(Mobile, { ...props }));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Sidebar/ExpandButton/styles.module.css
var ExpandButton_styles_module = __webpack_require__(9667);
var ExpandButton_styles_module_default = /*#__PURE__*/__webpack_require__.n(ExpandButton_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Sidebar/ExpandButton/index.js




function DocRootLayoutSidebarExpandButton({ toggleSidebar }) {
  return /* @__PURE__ */ react.createElement(
    "div",
    {
      className: (ExpandButton_styles_module_default()).expandButton,
      title: (0,Translate/* translate */.I)({
        id: "theme.docs.sidebar.expandButtonTitle",
        message: "Expand sidebar",
        description: "The ARIA label and title attribute for expand button of doc sidebar"
      }),
      "aria-label": (0,Translate/* translate */.I)({
        id: "theme.docs.sidebar.expandButtonAriaLabel",
        message: "Expand sidebar",
        description: "The ARIA label and title attribute for expand button of doc sidebar"
      }),
      tabIndex: 0,
      role: "button",
      onKeyDown: toggleSidebar,
      onClick: toggleSidebar
    },
    /* @__PURE__ */ react.createElement(IconArrow, { className: (ExpandButton_styles_module_default()).expandButtonIcon })
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Sidebar/styles.module.css
var Sidebar_styles_module = __webpack_require__(4241);
var Sidebar_styles_module_default = /*#__PURE__*/__webpack_require__.n(Sidebar_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Sidebar/index.js








function ResetOnSidebarChange({ children }) {
  var _a;
  const sidebar = (0,docsSidebar/* useDocsSidebar */.V)();
  return /* @__PURE__ */ react.createElement(react.Fragment, { key: (_a = sidebar == null ? void 0 : sidebar.name) != null ? _a : "noSidebar" }, children);
}
function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer
}) {
  const { pathname } = (0,react_router/* useLocation */.TH)();
  const [hiddenSidebar, setHiddenSidebar] = (0,react.useState)(false);
  const toggleSidebar = (0,react.useCallback)(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    if (!hiddenSidebar && (0,accessibilityUtils/* prefersReducedMotion */.n)()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);
  return /* @__PURE__ */ react.createElement(
    "aside",
    {
      className: (0,clsx/* default */.Z)(
        ThemeClassNames/* ThemeClassNames */.k.docs.docSidebarContainer,
        (Sidebar_styles_module_default()).docSidebarContainer,
        hiddenSidebarContainer && (Sidebar_styles_module_default()).docSidebarContainerHidden
      ),
      onTransitionEnd: (e) => {
        if (!e.currentTarget.classList.contains((Sidebar_styles_module_default()).docSidebarContainer)) {
          return;
        }
        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }
    },
    /* @__PURE__ */ react.createElement(ResetOnSidebarChange, null, /* @__PURE__ */ react.createElement(
      "div",
      {
        className: (0,clsx/* default */.Z)(
          (Sidebar_styles_module_default()).sidebarViewport,
          hiddenSidebar && (Sidebar_styles_module_default()).sidebarViewportHidden
        )
      },
      /* @__PURE__ */ react.createElement(
        DocSidebar,
        {
          sidebar,
          path: pathname,
          onCollapse: toggleSidebar,
          isHidden: hiddenSidebar
        }
      ),
      hiddenSidebar && /* @__PURE__ */ react.createElement(DocRootLayoutSidebarExpandButton, { toggleSidebar })
    ))
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Main/styles.module.css
var Main_styles_module = __webpack_require__(5379);
var Main_styles_module_default = /*#__PURE__*/__webpack_require__.n(Main_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Main/index.js




function DocRootLayoutMain({ hiddenSidebarContainer, children }) {
  const sidebar = (0,docsSidebar/* useDocsSidebar */.V)();
  return /* @__PURE__ */ react.createElement(
    "main",
    {
      className: (0,clsx/* default */.Z)(
        (Main_styles_module_default()).docMainContainer,
        (hiddenSidebarContainer || !sidebar) && (Main_styles_module_default()).docMainContainerEnhanced
      )
    },
    /* @__PURE__ */ react.createElement(
      "div",
      {
        className: (0,clsx/* default */.Z)(
          "container padding-top--md padding-bottom--lg",
          (Main_styles_module_default()).docItemWrapper,
          hiddenSidebarContainer && (Main_styles_module_default()).docItemWrapperEnhanced
        )
      },
      children
    )
  );
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/styles.module.css
var Layout_styles_module = __webpack_require__(9277);
var Layout_styles_module_default = /*#__PURE__*/__webpack_require__.n(Layout_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/index.js






function DocRootLayout({ children }) {
  const sidebar = (0,docsSidebar/* useDocsSidebar */.V)();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = (0,react.useState)(false);
  return /* @__PURE__ */ react.createElement("div", { className: (Layout_styles_module_default()).docsWrapper }, /* @__PURE__ */ react.createElement(BackToTopButton, null), /* @__PURE__ */ react.createElement("div", { className: (Layout_styles_module_default()).docRoot }, sidebar && /* @__PURE__ */ react.createElement(
    DocRootLayoutSidebar,
    {
      sidebar: sidebar.items,
      hiddenSidebarContainer,
      setHiddenSidebarContainer
    }
  ), /* @__PURE__ */ react.createElement(DocRootLayoutMain, { hiddenSidebarContainer }, children)));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/NotFound/Content/index.js
var Content = __webpack_require__(8466);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/index.js






function DocRoot(props) {
  const currentDocRouteMetadata = (0,docsUtils/* useDocRootMetadata */.SN)(props);
  if (!currentDocRouteMetadata) {
    return /* @__PURE__ */ react.createElement(Content/* default */.Z, null);
  }
  const { docElement, sidebarName, sidebarItems } = currentDocRouteMetadata;
  return /* @__PURE__ */ react.createElement(metadataUtils/* HtmlClassNameProvider */.FG, { className: (0,clsx/* default */.Z)(ThemeClassNames/* ThemeClassNames */.k.page.docsDocPage) }, /* @__PURE__ */ react.createElement(docsSidebar/* DocsSidebarProvider */.b, { name: sidebarName, items: sidebarItems }, /* @__PURE__ */ react.createElement(DocRootLayout, null, docElement)));
}


/***/ }),

/***/ 8466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ NotFoundContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3900);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9275);
/* harmony import */ var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2472);
/* harmony import */ var _theme_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3400);




function NotFoundContent({ className }) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)("container margin-vert--xl", className) }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "row" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "col col--6 col--offset-3" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_theme_Heading__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, { as: "h1", className: "hero__title" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    {
      id: "theme.NotFound.title",
      description: "The title of the 404 page"
    },
    "Page Not Found"
  )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    {
      id: "theme.NotFound.p1",
      description: "The first paragraph of the 404 page"
    },
    "We could not find what you were looking for."
  )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    {
      id: "theme.NotFound.p2",
      description: "The 2nd paragraph of the 404 page"
    },
    "Please contact the owner of the site that linked you to the original URL and let them know their link is broken."
  )))));
}


/***/ })

};
;