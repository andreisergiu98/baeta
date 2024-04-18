exports.id = 316;
exports.ids = [316];
exports.modules = {

/***/ 5208:
/***/ ((module) => {

// Exports
module.exports = {
	"codeBlockContainer": `codeBlockContainer_E3QR`
};


/***/ }),

/***/ 7467:
/***/ ((module) => {

// Exports
module.exports = {
	"codeBlockContent": `codeBlockContent_JITR`,
	"codeBlockTitle": `codeBlockTitle_T1qb`,
	"codeBlock": `codeBlock_WGLV`,
	"codeBlockStandalone": `codeBlockStandalone_EpcC`,
	"codeBlockLines": `codeBlockLines_vFLA`,
	"codeBlockLinesWithNumbering": `codeBlockLinesWithNumbering_Ls86`,
	"buttonGroup": `buttonGroup_yxYV`
};


/***/ }),

/***/ 410:
/***/ ((module) => {

// Exports
module.exports = {
	"copyButtonCopied": `copyButtonCopied_LId1`,
	"copyButtonIcons": `copyButtonIcons_dADC`,
	"copyButtonIcon": `copyButtonIcon_aP9o`,
	"copyButtonSuccessIcon": `copyButtonSuccessIcon_VEaC`
};


/***/ }),

/***/ 5099:
/***/ ((module) => {

// Exports
module.exports = {
	"codeLine": `codeLine_YxEV`,
	"codeLineNumber": `codeLineNumber_WV1N`,
	"codeLineContent": `codeLineContent_H6WD`
};


/***/ }),

/***/ 6914:
/***/ ((module) => {

// Exports
module.exports = {
	"wordWrapButtonIcon": `wordWrapButtonIcon_UYff`,
	"wordWrapButtonEnabled": `wordWrapButtonEnabled_cDfI`
};


/***/ }),

/***/ 3459:
/***/ ((module) => {

// Exports
module.exports = {
	"features": `features_rkw6`,
	"featureSvg": `featureSvg_65ar`
};


/***/ }),

/***/ 9187:
/***/ ((module) => {

// Exports
module.exports = {
	"heroBanner": `heroBanner_c_4V`,
	"buttons": `buttons_ihef`,
	"logo": `logo_Mv13`,
	"titleContainer": `titleContainer_nOjY`
};


/***/ }),

/***/ 2749:
/***/ ((module) => {

// Exports
module.exports = {
	"snippetDescription": `snippetDescription_bGh4`,
	"first": `first_IRGI`,
	"second": `second_m_e2`
};


/***/ }),

/***/ 1347:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ CodeBlock)
});

// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js
var react = __webpack_require__(3900);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js
var useIsBrowser = __webpack_require__(8310);
// EXTERNAL MODULE: ../.yarn/cache/clsx-npm-2.0.0-afafbbe44a-943766d1b0.zip/node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(9275);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/contexts/colorMode.js
var contexts_colorMode = __webpack_require__(7178);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/useThemeConfig.js
var useThemeConfig = __webpack_require__(921);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/hooks/usePrismTheme.js


function usePrismTheme() {
  const { prism } = (0,useThemeConfig/* useThemeConfig */.L)();
  const { colorMode } = (0,contexts_colorMode/* useColorMode */.I)();
  const lightModeTheme = prism.theme;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = colorMode === "dark" ? darkModeTheme : lightModeTheme;
  return prismTheme;
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(8515);
// EXTERNAL MODULE: ../.yarn/cache/parse-numeric-range-npm-1.3.0-71baf377a4-289ca126d5.zip/node_modules/parse-numeric-range/index.js
var parse_numeric_range = __webpack_require__(8485);
var parse_numeric_range_default = /*#__PURE__*/__webpack_require__.n(parse_numeric_range);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/codeBlockUtils.js

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

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Container/styles.module.css
var styles_module = __webpack_require__(5208);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Container/index.js





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

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/styles.module.css
var Content_styles_module = __webpack_require__(7467);
var Content_styles_module_default = /*#__PURE__*/__webpack_require__.n(Content_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/Element.js




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

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/utils/reactUtils.js
var reactUtils = __webpack_require__(8803);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/hooks/useMutationObserver.js


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

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-common-virtual-46f949317f/0/cache/@docusaurus-theme-common-npm-3.2.1-2639b89f99-bedd469ddb.zip/node_modules/@docusaurus/theme-common/lib/hooks/useCodeWordWrap.js


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

// EXTERNAL MODULE: ../.yarn/__virtual__/prism-react-renderer-virtual-1f5dbc9e90/0/cache/prism-react-renderer-npm-2.3.0-47266bd402-f582e0de68.zip/node_modules/prism-react-renderer/dist/index.mjs
var dist = __webpack_require__(3641);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/styles.module.css
var Line_styles_module = __webpack_require__(5099);
var Line_styles_module_default = /*#__PURE__*/__webpack_require__.n(Line_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/index.js



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

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(2472);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/Copy/index.js

function IconCopy(props) {
  return /* @__PURE__ */ react.createElement("svg", { viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ react.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
    }
  ));
}

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/Success/index.js

function IconSuccess(props) {
  return /* @__PURE__ */ react.createElement("svg", { viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ react.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
    }
  ));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/CopyButton/styles.module.css
var CopyButton_styles_module = __webpack_require__(410);
var CopyButton_styles_module_default = /*#__PURE__*/__webpack_require__.n(CopyButton_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/CopyButton/index.js







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

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Icon/WordWrap/index.js

function IconWordWrap(props) {
  return /* @__PURE__ */ react.createElement("svg", { viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ react.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
    }
  ));
}

// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/WordWrapButton/styles.module.css
var WordWrapButton_styles_module = __webpack_require__(6914);
var WordWrapButton_styles_module_default = /*#__PURE__*/__webpack_require__.n(WordWrapButton_styles_module);
;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/WordWrapButton/index.js





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

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/String.js










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

;// CONCATENATED MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/index.js




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

/***/ 8881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: ../.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js
var react = __webpack_require__(3900);
;// CONCATENATED MODULE: ./static/img/logo-graphql.svg
var _path, _circle, _circle2, _circle3, _circle4, _circle5, _circle6;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgLogoGraphql = _ref => {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    fill: "#e10098",
    style: {
      fill: "color(display-p3 .8824 0 .5961)"
    },
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/react.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "m50 6.903 37.323 21.549v43.096L50 93.097 12.677 71.548V28.451L50 6.903ZM16.865 30.87v31.656L44.28 15.041 16.864 30.87ZM50 13.51 18.398 68.246h63.205L50 13.509Zm27.415 58.924h-54.83L50 88.261l27.415-15.828Zm5.72-9.908L55.72 15.041 83.136 30.87v31.656Z"
  })), _circle || (_circle = /*#__PURE__*/react.createElement("circle", {
    cx: 50,
    cy: 9.321,
    r: 8.82
  })), _circle2 || (_circle2 = /*#__PURE__*/react.createElement("circle", {
    cx: 85.229,
    cy: 29.66,
    r: 8.82
  })), _circle3 || (_circle3 = /*#__PURE__*/react.createElement("circle", {
    cx: 85.229,
    cy: 70.34,
    r: 8.82
  })), _circle4 || (_circle4 = /*#__PURE__*/react.createElement("circle", {
    cx: 50,
    cy: 90.679,
    r: 8.82
  })), _circle5 || (_circle5 = /*#__PURE__*/react.createElement("circle", {
    cx: 14.766,
    cy: 70.34,
    r: 8.82
  })), _circle6 || (_circle6 = /*#__PURE__*/react.createElement("circle", {
    cx: 14.766,
    cy: 29.66,
    r: 8.82
  })));
};
/* harmony default export */ const logo_graphql = (SvgLogoGraphql);
;// CONCATENATED MODULE: ./static/img/logo-modular.svg
var logo_modular_path;
function logo_modular_extends() { logo_modular_extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return logo_modular_extends.apply(this, arguments); }

const SvgLogoModular = _ref => {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement("svg", logo_modular_extends({
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 109.57 122.88",
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react.createElement("title", {
    id: titleId
  }, title) : null, logo_modular_path || (logo_modular_path = /*#__PURE__*/react.createElement("path", {
    fill: "#8F78E7",
    d: "M51.83 29.77v-7.88a11.12 11.12 0 0 1-5-18.62 11.09 11.09 0 0 1 15.71 0A11.13 11.13 0 0 1 57.17 22v7.47l-.17-.08a6.51 6.51 0 0 0-.92-.18 10.81 10.81 0 0 0-1.24 0h-.14a6.82 6.82 0 0 0-1 .07c-.23 0-.51.1-.82.18a6.71 6.71 0 0 0-1 .31h-.08Zm-18 17.51L54.1 35.93l.25-.1a2.05 2.05 0 0 1 .65-.1 2.1 2.1 0 0 1 .56.07 1.09 1.09 0 0 1 .44.2l20.06 11.61a2.08 2.08 0 0 1 1.11 1 2.65 2.65 0 0 1 .3 1.3v23.41a2.26 2.26 0 0 1-1.19 1.85L56.13 86.88a2 2 0 0 1-.46.18 2.15 2.15 0 0 1-1.23 0 2.18 2.18 0 0 1-.56-.25l-20.61-12A2.26 2.26 0 0 1 32.1 73V49.46a2.26 2.26 0 0 1 1.7-2.18Zm19 33.81V62.77L36.6 53.12v18.44l16.21 9.53ZM73 53.4l-15.69 9.38v18.33L73 71.86V53.4ZM55 40.47l-15.31 9.14 15.38 9.26 14.92-9L55 40.47ZM57.32 101a11.18 11.18 0 0 1 5.21 2.94 11.09 11.09 0 0 1 0 15.71 11.09 11.09 0 0 1-15.71 0 11.09 11.09 0 0 1 0-15.71A11.09 11.09 0 0 1 52 101v-7.8a6.6 6.6 0 0 0 .66.23l.38.1a4.9 4.9 0 0 0 .78.16 8.48 8.48 0 0 0 1.26.11 8.37 8.37 0 0 0 1.26-.11 6.44 6.44 0 0 0 1-.22V101Zm1.44 6.7a5.82 5.82 0 0 0-8.18 0 5.83 5.83 0 0 0 0 8.19 5.82 5.82 0 0 0 8.18 0 5.81 5.81 0 0 0 0-8.19Zm0-100.7a5.82 5.82 0 0 0-8.18 0 5.83 5.83 0 0 0 0 8.19 5.83 5.83 0 0 0 4.1 1.69A5.79 5.79 0 0 0 58.77 7Zm39.68 68.44a11.12 11.12 0 0 1 7.86 3.26 11.09 11.09 0 0 1 0 15.71 11.12 11.12 0 0 1-18.51-11.07l-6.51-3.76a8.36 8.36 0 0 0 1.45-1.8 9.85 9.85 0 0 0 .51-1 6.45 6.45 0 0 0 .39-1 8.06 8.06 0 0 0 .23-.91l6.65 3.84.06-.07a11.13 11.13 0 0 1 7.87-3.26Zm4.09 7a5.79 5.79 0 1 0 0 8.21 5.81 5.81 0 0 0 0-8.19Zm-91.4-7a11.1 11.1 0 0 1 7.74 3.14l6.84-4 .06.24.16.61a7.15 7.15 0 0 0 .47 1.17 4.79 4.79 0 0 0 .4.78 8.91 8.91 0 0 0 1.44 1.79l.06.06-6.6 3.81A11.12 11.12 0 0 1 3.27 94.43a11.13 11.13 0 0 1 7.87-19Zm4.09 7a5.81 5.81 0 0 0-8.19 0 5.82 5.82 0 0 0 0 8.19H7a5.83 5.83 0 0 0 8.19 0 5.82 5.82 0 0 0 0-8.2Zm83.22-57.31a11.12 11.12 0 0 1 7.87 19 11.12 11.12 0 0 1-15.73 0l-.15-.13-6.61 3.8a8.6 8.6 0 0 0-.92-2.41 8.87 8.87 0 0 0-1.72-2.22l6.58-3.8a11.07 11.07 0 0 1 2.81-11 11.08 11.08 0 0 1 7.86-3.26Zm4.09 7a5.81 5.81 0 0 0-8.18 0 5.79 5.79 0 0 0 8.19 8.2 5.79 5.79 0 0 0 0-8.19Zm-91.4-7A11 11 0 0 1 19 28.39a11 11 0 0 1 3.26 7.85 11.32 11.32 0 0 1-.31 2.62l6.58 4a7.31 7.31 0 0 0-.83.84 8.46 8.46 0 0 0-1.33 2.06l-.27.6c-.12.35-.23.69-.32 1l-6.29-3.82a6.15 6.15 0 0 1-.49.53A11.12 11.12 0 1 1 3.26 28.4a11.08 11.08 0 0 1 7.86-3.26Zm4.09 7a5.83 5.83 0 0 0-8.19 0H7a5.83 5.83 0 0 0 0 8.19 5.79 5.79 0 0 0 9.89-4.1 5.77 5.77 0 0 0-1.68-4.09Z"
  })));
};
/* harmony default export */ const logo_modular = (SvgLogoModular);
;// CONCATENATED MODULE: ./static/img/logo-rocket.svg
function logo_rocket_extends() { logo_rocket_extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return logo_rocket_extends.apply(this, arguments); }

const SvgLogoRocket = _ref => {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement("svg", logo_rocket_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    style: {
      enableBackground: "new 0 0 512 512"
    },
    xmlSpace: "preserve",
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#2d4452"
    },
    cx: 256,
    cy: 256,
    r: 256
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#f5f5f5"
    },
    d: "M252 320h8v180h-8z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#f5f5f5"
    },
    cx: 216,
    cy: 408,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M216 372c-2.752 0-5.424.336-8 .92 16.028 3.636 28 17.944 28 35.08s-11.972 31.436-28 35.08c2.576.584 5.248.92 8 .92 19.884 0 36-16.116 36-36s-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#f5f5f5"
    },
    cx: 256,
    cy: 388,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M256 352c-1.352 0-2.684.088-4 .236 18 1.992 32 17.24 32 35.764s-14 33.772-32 35.764c1.316.14 2.648.236 4 .236 19.884 0 36-16.116 36-36s-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#f5f5f5"
    },
    cx: 160,
    cy: 428,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M160 392c-2.048 0-4.044.212-6 .54 17.02 2.864 30 17.624 30 35.46s-12.98 32.596-30 35.46c1.956.328 3.952.54 6 .54 19.884 0 36-16.116 36-36s-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#f5f5f5"
    },
    cx: 296,
    cy: 408,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M296 372c-1.352 0-2.684.088-4 .236 18 1.992 32 17.24 32 35.764s-14 33.772-32 35.764c1.316.144 2.648.236 4 .236 19.884 0 36-16.116 36-36s-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#f5f5f5"
    },
    cx: 352,
    cy: 428,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M352 392c-1.352 0-2.684.088-4 .236 18 1.992 32 17.24 32 35.764s-14 33.772-32 35.764c1.316.144 2.648.236 4 .236 19.884 0 36-16.116 36-36s-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M256 448C136.908 448 36.012 377.252 1.112 279.416 12.944 409.816 122.516 512 256 512s243.056-102.184 254.892-232.584C475.988 377.252 375.092 448 256 448z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#ffd464"
    },
    d: "M256.668 267.164c-11.1 0-18.312 7.22-18.312 18.312 0 11.096 1.564 31.152 18.312 41.204 16.748-10.052 18.312-30.1 18.312-41.204.004-11.096-7.208-18.312-18.312-18.312z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#c23527"
    },
    d: "M256.668 271.744c-5.876 0-9.156 3.288-9.156 9.156 0 5.884.292 17.58 9.156 22.896 8.864-5.316 9.156-17.012 9.156-22.896.004-5.868-3.276-9.156-9.156-9.156z"
  }), /*#__PURE__*/react.createElement("ellipse", {
    style: {
      fill: "#242424"
    },
    cx: 256,
    cy: 240,
    rx: 20,
    ry: 8
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#cc584c"
    },
    d: "M226.012 84c-10.86 16-19.7 37.636-19.7 59.952C206.312 220.996 229.2 268 229.2 268h54.936s22.888-47.008 22.888-124.048c0-21.108-9.28-43.952-20.512-59.952h-60.5z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#bf5347"
    },
    d: "M286.512 84h-13.74c11.232 16 20.516 38.844 20.516 59.952C293.288 220.992 270.4 268 270.4 268h13.74s22.888-47.008 22.888-124.048c0-21.108-9.284-43.952-20.516-59.952z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M229.2 239.372c0 3.68-2.076 6.772-4.58 9.484L197.152 280.9c-2.5 2.716-9.156 3.684-9.156 0v-32.044c0-3.684 5.976-7.3 9.156-9.156l27.468-18.308s4.58.9 4.58 4.58v13.4z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#ccc"
    },
    d: "m224.024 221.392-4.552 3.22c.152.404.528.844.528 1.356v13.408c0 3.68-2.056 6.772-4.556 9.484l-27.456 32.044c0 3.684 6.66 2.716 9.164 0l26.868-32.044c2.5-2.712 3.98-5.804 3.98-9.484v-13.408c0-3.688-3.976-4.576-3.976-4.576z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M284.14 239.372c0 3.68 2.08 6.772 4.58 9.484l27.464 32.044c2.5 2.716 9.156 3.684 9.156 0v-32.044c0-3.684-5.976-7.3-9.156-9.156l-27.464-18.308s-4.58.9-4.58 4.58v13.4z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#ccc"
    },
    d: "m315.512 239.7-27.136-18.308s-3.22.68-4.156 3.22l22.628 15.088c3.184 1.856 9.152 5.472 9.152 9.156V280.9c4 2.716 8 3.684 8 0v-32.044c0-3.684-5.304-7.3-8.488-9.156z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#263740"
    },
    cx: 256.68,
    cy: 157.28,
    r: 22.892
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#f5f5f5"
    },
    cx: 256.68,
    cy: 157.28,
    r: 18.312
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#e6e6e6"
    },
    cx: 252,
    cy: 440,
    r: 36
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#e6e6e6"
    },
    cx: 196,
    cy: 424,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M140 408c-19.884 0-36 16.116-36 36 0 9.82 3.944 18.716 10.32 25.212 4.828 3.216 9.788 6.24 14.836 9.12A35.98 35.98 0 0 0 140 480c19.884 0 36-16.116 36-36s-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#e6e6e6"
    },
    cx: 316,
    cy: 424,
    r: 36
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#e6e6e6"
    },
    d: "M372 408c-19.884 0-36 16.116-36 36s16.116 36 36 36c3.78 0 7.416-.588 10.84-1.668 5.052-2.888 10.012-5.912 14.84-9.124C404.056 462.712 408 453.82 408 444c0-19.884-16.116-36-36-36z"
  }), /*#__PURE__*/react.createElement("circle", {
    style: {
      fill: "#e6e6e6"
    },
    cx: 260,
    cy: 440,
    r: 36
  }), /*#__PURE__*/react.createElement("ellipse", {
    style: {
      fill: "#e6e6e6"
    },
    cx: 256.68,
    cy: 248.84,
    rx: 4.584,
    ry: 36.62
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#263740"
    },
    d: "M256.668 93.204c11.104 0 21.46-3.092 30.352-8.396-10.268-15.78-22.268-27.956-30.352-32.808-8.24 4.944-20.548 16.664-30.94 32.456 9.024 5.512 19.596 8.748 30.94 8.748z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#1e2c33"
    },
    d: "M275.9 89.964a59.996 59.996 0 0 0 11.124-5.156C276.76 69.028 264.76 56.852 256.672 52c-2.616 1.572-5.668 3.892-8.912 6.744 8.612 7.272 18.624 18.104 28.14 31.22z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#ccc"
    },
    d: "M392.132 414.152A35.827 35.827 0 0 0 372 408c-1.352 0-2.684.088-4 .236 7.36.816 14.032 3.88 19.372 8.44a268.93 268.93 0 0 0 4.76-2.524zM343.884 421.552c2-2.504 4.336-4.716 6.92-6.6C346.78 399.452 332.752 388 316 388c-1.352 0-2.684.088-4 .236 17.196 1.9 30.712 15.908 31.884 33.316zM223.484 418.084a36.006 36.006 0 0 1 6.312-6.388C224.768 397.884 211.556 388 196 388c-1.352 0-2.684.088-4 .236 16.036 1.772 28.872 14.08 31.484 29.848zM160.12 421.584a35.84 35.84 0 0 1 1.072-6.636C155.244 410.596 147.932 408 140 408c-1.352 0-2.684.088-4 .236 9.752 1.076 18.308 6.068 24.12 13.348z"
  }), /*#__PURE__*/react.createElement("path", {
    style: {
      fill: "#ffd464"
    },
    d: "M152 76c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM140 160c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM396 344c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM376 364c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM360 332c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM68 116c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM368 52c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM196 92c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM228 20c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM332 192c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM428 160c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM396 216c0 13.332-6.668 20-20 20 13.332 0 20 6.668 20 20 0-13.332 6.668-20 20-20-13.332 0-20-6.668-20-20zM436 108c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM396 292c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM184 52c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM124 320c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM76 224c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12z"
  }));
};
/* harmony default export */ const logo_rocket = (SvgLogoRocket);
;// CONCATENATED MODULE: ./static/img/logo-typescript.svg
var _rect, logo_typescript_path;
function logo_typescript_extends() { logo_typescript_extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return logo_typescript_extends.apply(this, arguments); }

const SvgLogoTypescript = _ref => {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement("svg", logo_typescript_extends({
    fill: "none",
    height: 256,
    viewBox: "0 0 256 256",
    width: 256,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react.createElement("title", {
    id: titleId
  }, title) : null, _rect || (_rect = /*#__PURE__*/react.createElement("rect", {
    fill: "#3178c6",
    height: 256,
    rx: 20,
    width: 256
  })), logo_typescript_path || (logo_typescript_path = /*#__PURE__*/react.createElement("path", {
    clipRule: "evenodd",
    d: "M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179S179.053 235 185.849 235c6.622 0 12.914-.633 18.874-1.899s11.187-3.352 15.678-6.257c4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163s-3.657-7.121-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661s-1.641-3.495-1.641-5.567c0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582S205.083 107 198.633 107c-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66s4.276 3.366 5.658 5.265 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97s-3.945 1.999-6.565 2.632-5.687.95-9.2.95c-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137z",
    fill: "#fff",
    fillRule: "evenodd"
  })));
};
/* harmony default export */ const logo_typescript = (SvgLogoTypescript);
// EXTERNAL MODULE: ./components/home-features/feature.module.css
var feature_module = __webpack_require__(3459);
var feature_module_default = /*#__PURE__*/__webpack_require__.n(feature_module);
;// CONCATENATED MODULE: ./components/home-features/feature.tsx


function Feature({ title, Svg, description }) {
  return /* @__PURE__ */ react.createElement("div", { className: "col col--3" }, /* @__PURE__ */ react.createElement("div", { className: "text--center margin-bottom--md" }, /* @__PURE__ */ react.createElement(Svg, { className: (feature_module_default()).featureSvg, role: "img" })), /* @__PURE__ */ react.createElement("div", { className: "text--center padding-horiz--md" }, /* @__PURE__ */ react.createElement("h3", null, title), /* @__PURE__ */ react.createElement("p", null, description)));
}

;// CONCATENATED MODULE: ./components/home-features/features.tsx







const FeatureList = [
  {
    title: "Schema First",
    Svg: logo_graphql,
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Schema-first approach for a consistent and well-defined API.")
  },
  {
    title: "Modular",
    Svg: logo_modular,
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Modular architecture for easy organization and scalability.")
  },
  {
    title: "Type Safe",
    Svg: logo_typescript,
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Automatic code generation for type safety, increased productivity, and reduced errors.")
  },
  {
    title: "Advanced Features",
    Svg: logo_rocket,
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Extensible, including support for middlewares, directives and plugins.")
  }
];
function HomeFeatures() {
  return /* @__PURE__ */ react.createElement("section", { className: (feature_module_default()).features }, /* @__PURE__ */ react.createElement("div", { className: "container" }, /* @__PURE__ */ react.createElement("div", { className: "row" }, FeatureList.map((props, idx) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static list
    /* @__PURE__ */ react.createElement(Feature, { key: idx, ...props })
  )))));
}

;// CONCATENATED MODULE: ./components/home-features/index.ts


// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/Link.js + 1 modules
var Link = __webpack_require__(3262);
// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-core-virtual-0a6cdb5c21/0/cache/@docusaurus-core-npm-3.2.1-027b2f9feb-94bf57cc35.zip/node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(7895);
;// CONCATENATED MODULE: ./static/img/logo-baeta.svg
var _g;
function logo_baeta_extends() { logo_baeta_extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return logo_baeta_extends.apply(this, arguments); }

const SvgLogoBaeta = _ref => {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement("svg", logo_baeta_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 143.33 165.62",
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/react.createElement("g", {
    fill: "#ff324e"
  }, /*#__PURE__*/react.createElement("path", {
    d: "m104.96 54.72.01-13.39L53.01 11.3l-.02.01-33.22 19.16v13.38L53 24.69l51.96 30.03zM11.59 35.18.01 41.86v13.45l11.58-6.7V35.18zM52.76 117.95l.03-60.01-11.6 6.68-.02 60.02.01.01 51.96 30.03 30.28-17.46v-13.38L93.15 141.3l-40.39-23.35z"
  }), /*#__PURE__*/react.createElement("path", {
    d: "m111.8 36.01.02 46.65-51.95 30.03 11.59 6.69 51.96-30.04-.03-60.01v-.02L92.38 11.42 80.76 18.1l31.04 17.91zM31.82 127.9l-.02-46.65.03-.02.02-13.39-11.65 6.73.03 60.01v.02l33.33 19.22 11.81-6.57-33.55-19.35z"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M131.71 95.42 79.72 125.4l11.59 6.7 51.98-29.99v-.01l.01-.01.02-39.25-11.59-6.47-.02 39.05zM103.99 78.81V65.43L52.03 35.4h-.01L.03 65.39l-.02 34.88 11.59 6.64.01-34.82 40.42-23.31 51.96 30.03zM131.68 33.78l.01 12.78 11.63 6.32.01-12.77-11.65-6.33zM131.6 132.5l11.71-6.75v-13.38l-11.71 6.75v13.38zM61.82 158.58l12.2 7.04 11.61-6.68-12-6.93-11.81 6.57zM0 122.99l11.59 6.64v-13.3L.01 109.69 0 122.99zM84.18 6.7 72.57 0 60.95 6.68l11.62 6.7L84.18 6.7z"
  }))));
};
/* harmony default export */ const logo_baeta = (SvgLogoBaeta);
;// CONCATENATED MODULE: ../.yarn/cache/clsx-npm-2.1.0-29d286e1de-2e0ce7c3b6.zip/node_modules/clsx/dist/clsx.mjs
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const dist_clsx = (clsx);
// EXTERNAL MODULE: ./components/home-header/header.module.css
var header_module = __webpack_require__(9187);
var header_module_default = /*#__PURE__*/__webpack_require__.n(header_module);
;// CONCATENATED MODULE: ./components/home-header/header.tsx






function HomeHeader() {
  const { siteConfig } = (0,useDocusaurusContext/* default */.Z)();
  return /* @__PURE__ */ react.createElement("header", { className: dist_clsx("hero", (header_module_default()).heroBanner) }, /* @__PURE__ */ react.createElement("div", { className: "container" }, /* @__PURE__ */ react.createElement("div", { className: (header_module_default()).titleContainer }, /* @__PURE__ */ react.createElement(logo_baeta, { className: (header_module_default()).logo }), /* @__PURE__ */ react.createElement("h1", { className: "hero__title" }, siteConfig.title)), /* @__PURE__ */ react.createElement("p", { className: "hero__subtitle" }, siteConfig.tagline), /* @__PURE__ */ react.createElement("div", { className: (header_module_default()).buttons }, /* @__PURE__ */ react.createElement(Link/* default */.Z, { className: "button button--secondary button--lg", to: "/docs/intro" }, "Introduction"), /* @__PURE__ */ react.createElement(
    Link/* default */.Z,
    {
      className: "button button--secondary button--lg",
      to: "/docs/getting-started/installation"
    },
    "Getting Started"
  ))));
}

;// CONCATENATED MODULE: ./components/home-header/index.ts


// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/index.js + 14 modules
var CodeBlock = __webpack_require__(1347);
// EXTERNAL MODULE: ./components/home-snippets/snippet.module.css
var snippet_module = __webpack_require__(2749);
var snippet_module_default = /*#__PURE__*/__webpack_require__.n(snippet_module);
;// CONCATENATED MODULE: ./components/home-snippets/snippet.tsx




function Snippet(props) {
  const left = props.idx % 2 === 1;
  return /* @__PURE__ */ react.createElement("div", { className: "row" }, /* @__PURE__ */ react.createElement("div", { className: dist_clsx("col col--6", left && (snippet_module_default()).second) }, /* @__PURE__ */ react.createElement("div", { className: (snippet_module_default()).snippetDescription }, /* @__PURE__ */ react.createElement("h3", null, props.title), /* @__PURE__ */ react.createElement("p", null, props.description))), /* @__PURE__ */ react.createElement("div", { className: dist_clsx("col col--6", left && (snippet_module_default()).first) }, /* @__PURE__ */ react.createElement(CodeBlock/* default */.Z, { title: props.path, language: props.language }, props.snippet)));
}

;// CONCATENATED MODULE: ./components/home-snippets/snippets.tsx


const featureList = [
  {
    title: "SDL",
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Baeta's schema-first pattern makes it easy to write and maintain GraphQL APIs that are easy to read and understand. By defining your schema first, you can focus on the API design and structure, rather than the implementation details."),
    path: "modules/user/user.gql",
    language: "graphql",
    snippet: `type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}
  
input UserWhereUnique {
    id: ID
    email: String
}
  
type Query {
    user(where: UserWhereUnique!): User!
    users: [User!]!
}`
  },
  {
    title: "Typed resolvers",
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Baeta takes care of type safety and type definitions, so you can focus on implementing your resolvers in a flat and readable way."),
    path: "modules/user/resolvers.ts",
    language: "typescript",
    snippet: `import { getUserModule } from "./typedef";

const { Query } = getUserModule();
    
Query.user(({ args }) => {
    return dataSource.user.find(args.where);
});

Query.users(() => {
    return dataSource.user.findMany();
});
`
  },
  {
    title: "Extend other modules",
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Baeta's modular architecture allows you to easily extend other types and split your schema into small, reusable, and maintainable pieces. Here's an example of how to extend the User type with a photos field."),
    path: "modules/user-photos/user-photos.gql",
    language: "graphql",
    snippet: `type Photo {
    id: ID!
    url: String!
    description: String!
    postedBy: User!
}

input PhotoCreateData {
    url: String! @trim
    description: String!
    userId: ID!
}
  
extend type User {
    photos: [Photo!]!
}`
  },
  {
    title: "Directives",
    description: /* @__PURE__ */ react.createElement(react.Fragment, null, "Baeta also supports custom directives, which allow you to define your own validation or mutation rules for input fields. Here's an example of a trim directive that trims whitespace from a string input."),
    language: "typescript",
    snippet: `const trimDirective = createInputDirective({
    name: "trim",
    target: "scalar",
    resolve: ({ getValue, setValue }) => {
      const value = getValue();
      if (typeof value === "string") {
        setValue(value.trim());
      }
    },
});`
  }
];
function HomeSnippets() {
  return /* @__PURE__ */ react.createElement("section", null, /* @__PURE__ */ react.createElement("div", { className: "container" }, featureList.map((props, idx) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static list
    /* @__PURE__ */ react.createElement(Snippet, { key: idx, idx, ...props })
  ))));
}

;// CONCATENATED MODULE: ./components/home-snippets/index.ts


// EXTERNAL MODULE: ../.yarn/__virtual__/@docusaurus-theme-classic-virtual-112765c6ca/0/cache/@docusaurus-theme-classic-npm-3.2.1-8ce1757871-384b7289b8.zip/node_modules/@docusaurus/theme-classic/lib/theme/Layout/index.js + 53 modules
var Layout = __webpack_require__(3477);
;// CONCATENATED MODULE: ./pages/index.tsx





function Home() {
  return /* @__PURE__ */ react.createElement(Layout/* default */.Z, { description: "Schema first without the hassle" }, /* @__PURE__ */ react.createElement(HomeHeader, null), /* @__PURE__ */ react.createElement("main", null, /* @__PURE__ */ react.createElement(HomeFeatures, null), /* @__PURE__ */ react.createElement(HomeSnippets, null)));
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


/***/ })

};
;