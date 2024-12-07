/*! For license information please see e326ed7c.d97b57ab.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[2866],{47459:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"api/compiler/esbuild/functions/context","title":"Function: context()","description":"context\\\\(options): Promise\\\\\\\\>","source":"@site/docs/api/compiler/esbuild/functions/context.md","sourceDirName":"api/compiler/esbuild/functions","slug":"/api/compiler/esbuild/functions/context","permalink":"/docs/api/compiler/esbuild/functions/context","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Function: buildSync()","permalink":"/docs/api/compiler/esbuild/functions/buildSync"},"next":{"title":"Function: formatMessages()","permalink":"/docs/api/compiler/esbuild/functions/formatMessages"}}');var t=i(77250),r=i(50589);const o={},c="Function: context()",d={},l=[{value:"Type Parameters",id:"type-parameters",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"function-context",children:"Function: context()"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"context"}),"<",(0,t.jsx)(n.code,{children:"T"}),">(",(0,t.jsx)(n.code,{children:"options"}),"): ",(0,t.jsx)(n.code,{children:"Promise"}),"<",(0,t.jsx)(n.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildContext",children:(0,t.jsx)(n.code,{children:"BuildContext"})}),"<",(0,t.jsx)(n.code,{children:"T"}),">>"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:'This is the advanced long-running form of "build" that supports additional\nfeatures such as watch mode and a local development server.'}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Works in node: yes"}),"\n",(0,t.jsx)(n.li,{children:"Works in browser: no"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Documentation: ",(0,t.jsx)(n.a,{href:"https://esbuild.github.io/api/#build",children:"https://esbuild.github.io/api/#build"})]}),"\n",(0,t.jsx)(n.h2,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"T"})," ",(0,t.jsx)(n.em,{children:"extends"})," ",(0,t.jsx)(n.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,t.jsx)(n.code,{children:"BuildOptions"})})]}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options"}),": ",(0,t.jsx)(n.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,t.jsx)(n.code,{children:"SameShape"})}),"<",(0,t.jsx)(n.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,t.jsx)(n.code,{children:"BuildOptions"})}),", ",(0,t.jsx)(n.code,{children:"T"}),">"]}),"\n",(0,t.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"Promise"}),"<",(0,t.jsx)(n.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildContext",children:(0,t.jsx)(n.code,{children:"BuildContext"})}),"<",(0,t.jsx)(n.code,{children:"T"}),">>"]}),"\n",(0,t.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,t.jsx)(n.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:553"})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},2410:(e,n,i)=>{var s=i(67402),t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,c=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,i){var s,r={},l=null,a=null;for(s in void 0!==i&&(l=""+i),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(a=n.ref),n)o.call(n,s)&&!d.hasOwnProperty(s)&&(r[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===r[s]&&(r[s]=n[s]);return{$$typeof:t,type:e,key:l,ref:a,props:r,_owner:c.current}}n.Fragment=r,n.jsx=l,n.jsxs=l},77250:(e,n,i)=>{e.exports=i(2410)},50589:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>c});var s=i(67402);const t={},r=s.createContext(t);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);