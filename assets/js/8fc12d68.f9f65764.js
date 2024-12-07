/*! For license information please see 8fc12d68.f9f65764.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[9017],{16940:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>o,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"api/cli/ink/type-aliases/StderrProps","title":"Type Alias: StderrProps","description":"StderrProps: object","source":"@site/docs/api/cli/ink/type-aliases/StderrProps.md","sourceDirName":"api/cli/ink/type-aliases","slug":"/api/cli/ink/type-aliases/StderrProps","permalink":"/docs/api/cli/ink/type-aliases/StderrProps","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Type Alias: StaticProps\\\\<T\\\\>","permalink":"/docs/api/cli/ink/type-aliases/StaticProps"},"next":{"title":"Type Alias: StdinProps","permalink":"/docs/api/cli/ink/type-aliases/StdinProps"}}');var s=n(77250),i=n(50589);const o={},d="Type Alias: StderrProps",l={},a=[{value:"Type declaration",id:"type-declaration",level:2},{value:"stderr",id:"stderr",level:3},{value:"write()",id:"write",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:2}];function c(e){const r={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"type-alias-stderrprops",children:"Type Alias: StderrProps"})}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"StderrProps"}),": ",(0,s.jsx)(r.code,{children:"object"})]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"type-declaration",children:"Type declaration"}),"\n",(0,s.jsx)(r.h3,{id:"stderr",children:"stderr"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"readonly"})," ",(0,s.jsx)(r.strong,{children:"stderr"}),": ",(0,s.jsx)(r.code,{children:"NodeJS.WriteStream"})]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["Stderr stream passed to ",(0,s.jsx)(r.code,{children:"render()"})," in ",(0,s.jsx)(r.code,{children:"options.stderr"})," or ",(0,s.jsx)(r.code,{children:"process.stderr"})," by default."]}),"\n",(0,s.jsx)(r.h3,{id:"write",children:"write()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"readonly"})," ",(0,s.jsx)(r.strong,{children:"write"}),": (",(0,s.jsx)(r.code,{children:"data"}),") => ",(0,s.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["Write any string to stderr, while preserving Ink's output.\nIt's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.\nIt's similar to ",(0,s.jsx)(r.code,{children:"<Static>"}),", except it can't accept components, it only works with strings."]}),"\n",(0,s.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(r.p,{children:["\u2022 ",(0,s.jsx)(r.strong,{children:"data"}),": ",(0,s.jsx)(r.code,{children:"string"})]}),"\n",(0,s.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"void"})}),"\n",(0,s.jsx)(r.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:".yarn/__virtual__/ink-virtual-46a2052950/0/cache/ink-npm-5.1.0-5eb899d847-aa60256b38.zip/node_modules/ink/build/components/StderrContext.d.ts:1"})]})}function p(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},2410:(e,r,n)=>{var t=n(67402),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,d=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function a(e,r,n){var t,i={},a=null,c=null;for(t in void 0!==n&&(a=""+n),void 0!==r.key&&(a=""+r.key),void 0!==r.ref&&(c=r.ref),r)o.call(r,t)&&!l.hasOwnProperty(t)&&(i[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===i[t]&&(i[t]=r[t]);return{$$typeof:s,type:e,key:a,ref:c,props:i,_owner:d.current}}r.Fragment=i,r.jsx=a,r.jsxs=a},77250:(e,r,n)=>{e.exports=n(2410)},50589:(e,r,n)=>{n.d(r,{R:()=>o,x:()=>d});var t=n(67402);const s={},i=t.createContext(s);function o(e){const r=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(i.Provider,{value:r},e.children)}}}]);