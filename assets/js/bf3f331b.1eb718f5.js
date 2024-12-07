/*! For license information please see bf3f331b.1eb718f5.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5567],{82094:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"api/generator-sdk/functions/isMatch","title":"Function: isMatch()","description":"isMatch(string, pattern, options?): boolean","source":"@site/docs/api/generator-sdk/functions/isMatch.md","sourceDirName":"api/generator-sdk/functions","slug":"/api/generator-sdk/functions/isMatch","permalink":"/docs/api/generator-sdk/functions/isMatch","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Function: isGeneratorPlugin()","permalink":"/docs/api/generator-sdk/functions/isGeneratorPlugin"},"next":{"title":"Function: loadOptions()","permalink":"/docs/api/generator-sdk/functions/loadOptions"}}');var s=t(77250),o=t(50589);const i={},c="Function: isMatch()",a={},l=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Example",id:"example",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"function-ismatch",children:"Function: isMatch()"})}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"isMatch"}),"(",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"pattern"}),", ",(0,s.jsx)(n.code,{children:"options"}),"?): ",(0,s.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Returns true if the specified ",(0,s.jsx)(n.code,{children:"string"})," matches the given glob ",(0,s.jsx)(n.code,{children:"pattern"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"string"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.p,{children:"String to match"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"pattern"}),": ",(0,s.jsx)(n.code,{children:"string"})," | readonly ",(0,s.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,s.jsx)(n.p,{children:"Glob pattern to use for matching."}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"options?"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/generator-sdk/namespaces/micromatch/interfaces/Options",children:(0,s.jsx)(n.code,{children:"Options"})})]}),"\n",(0,s.jsx)(n.p,{children:"See available options for changing how matches are performed"}),"\n",(0,s.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"boolean"})}),"\n",(0,s.jsx)(n.p,{children:"Returns true if the string matches the glob pattern."}),"\n",(0,s.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"var mm = require('micromatch');\nmm.isMatch(string, pattern[, options]);\n\nconsole.log(mm.isMatch('a.a', '*.a'));\n//=> true\nconsole.log(mm.isMatch('a.b', '*.a'));\n//=> false\n"})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},2410:(e,n,t)=>{var r=t(67402),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,t){var r,o={},l=null,d=null;for(r in void 0!==t&&(l=""+t),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(d=n.ref),n)i.call(n,r)&&!a.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===o[r]&&(o[r]=n[r]);return{$$typeof:s,type:e,key:l,ref:d,props:o,_owner:c.current}}n.Fragment=o,n.jsx=l,n.jsxs=l},77250:(e,n,t)=>{e.exports=t(2410)},50589:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>c});var r=t(67402);const s={},o=r.createContext(s);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);