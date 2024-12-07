/*! For license information please see cc69999e.0aec6148.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[4662],{14904:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"api/util-path/functions/resolve","title":"Function: resolve()","description":"resolve(...pathSegments): string","source":"@site/docs/api/util-path/functions/resolve.md","sourceDirName":"api/util-path/functions","slug":"/api/util-path/functions/resolve","permalink":"/docs/api/util-path/functions/resolve","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Function: removeExt()","permalink":"/docs/api/util-path/functions/removeExt"},"next":{"title":"Function: toUnix()","permalink":"/docs/api/util-path/functions/toUnix"}}');var s=r(77250),o=r(50589);const i={},a="Function: resolve()",l={},c=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2}];function u(e){const t={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"function-resolve",children:"Function: resolve()"})}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"resolve"}),"(...",(0,s.jsx)(t.code,{children:"pathSegments"}),"): ",(0,s.jsx)(t.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"The right-most parameter is considered {to}. Other parameters are considered an array of {from}."}),"\n",(0,s.jsx)(t.p,{children:"Starting from leftmost {from} parameter, resolves {to} to an absolute path."}),"\n",(0,s.jsx)(t.p,{children:"If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory."}),"\n",(0,s.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(t.p,{children:["\u2022 ...",(0,s.jsx)(t.strong,{children:"pathSegments"}),": ",(0,s.jsx)(t.code,{children:"any"}),"[]"]}),"\n",(0,s.jsx)(t.p,{children:"string paths to join. Non-string arguments are ignored."}),"\n",(0,s.jsx)(t.h2,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:"string"})})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},2410:(e,t,r)=>{var n=r(67402),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,o={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:s,type:e,key:c,ref:u,props:o,_owner:a.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},77250:(e,t,r)=>{e.exports=r(2410)},50589:(e,t,r)=>{r.d(t,{R:()=>i,x:()=>a});var n=r(67402);const s={},o=n.createContext(s);function i(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);