/*! For license information please see bef923fd.31874db1.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[9900],{3527:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>d,contentTitle:()=>o,default:()=>a,frontMatter:()=>l,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"api/compiler/esbuild/functions/build","title":"Function: build()","description":"build\\\\(options): Promise\\\\\\\\>","source":"@site/docs/api/compiler/esbuild/functions/build.md","sourceDirName":"api/compiler/esbuild/functions","slug":"/api/compiler/esbuild/functions/build","permalink":"/docs/api/compiler/esbuild/functions/build","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Function: analyzeMetafileSync()","permalink":"/docs/api/compiler/esbuild/functions/analyzeMetafileSync"},"next":{"title":"Function: buildSync()","permalink":"/docs/api/compiler/esbuild/functions/buildSync"}}');var r=n(7250),t=n(589);const l={},o="Function: build()",d={},c=[{value:"Type Parameters",id:"type-parameters",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function u(e){const i={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"function-build",children:"Function: build()"})}),"\n",(0,r.jsxs)(i.blockquote,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:"build"}),"<",(0,r.jsx)(i.code,{children:"T"}),">(",(0,r.jsx)(i.code,{children:"options"}),"): ",(0,r.jsx)(i.code,{children:"Promise"}),"<",(0,r.jsx)(i.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildResult",children:(0,r.jsx)(i.code,{children:"BuildResult"})}),"<",(0,r.jsx)(i.code,{children:"T"}),">>"]}),"\n"]}),"\n",(0,r.jsx)(i.p,{children:'This function invokes the "esbuild" command-line tool for you. It returns a\npromise that either resolves with a "BuildResult" object or rejects with a\n"BuildFailure" object.'}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(i.li,{children:"Works in browser: yes"}),"\n"]}),"\n",(0,r.jsxs)(i.p,{children:["Documentation: ",(0,r.jsx)(i.a,{href:"https://esbuild.github.io/api/#build",children:"https://esbuild.github.io/api/#build"})]}),"\n",(0,r.jsx)(i.h2,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,r.jsxs)(i.p,{children:["\u2022 ",(0,r.jsx)(i.strong,{children:"T"})," ",(0,r.jsx)(i.em,{children:"extends"})," ",(0,r.jsx)(i.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(i.code,{children:"BuildOptions"})})]}),"\n",(0,r.jsx)(i.h2,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(i.p,{children:["\u2022 ",(0,r.jsx)(i.strong,{children:"options"}),": ",(0,r.jsx)(i.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,r.jsx)(i.code,{children:"SameShape"})}),"<",(0,r.jsx)(i.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(i.code,{children:"BuildOptions"})}),", ",(0,r.jsx)(i.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(i.h2,{id:"returns",children:"Returns"}),"\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:"Promise"}),"<",(0,r.jsx)(i.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildResult",children:(0,r.jsx)(i.code,{children:"BuildResult"})}),"<",(0,r.jsx)(i.code,{children:"T"}),">>"]}),"\n",(0,r.jsx)(i.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(i.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:542"})]})}function a(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},2410:(e,i,n)=>{var s=n(7402),r=Symbol.for("react.element"),t=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function c(e,i,n){var s,t={},c=null,u=null;for(s in void 0!==n&&(c=""+n),void 0!==i.key&&(c=""+i.key),void 0!==i.ref&&(u=i.ref),i)l.call(i,s)&&!d.hasOwnProperty(s)&&(t[s]=i[s]);if(e&&e.defaultProps)for(s in i=e.defaultProps)void 0===t[s]&&(t[s]=i[s]);return{$$typeof:r,type:e,key:c,ref:u,props:t,_owner:o.current}}i.Fragment=t,i.jsx=c,i.jsxs=c},7250:(e,i,n)=>{e.exports=n(2410)},589:(e,i,n)=>{n.d(i,{R:()=>l,x:()=>o});var s=n(7402);const r={},t=s.createContext(r);function l(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(t.Provider,{value:i},e.children)}}}]);