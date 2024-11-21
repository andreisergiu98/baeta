/*! For license information please see 73e261e9.27316e47.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[2625],{9546:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"api/compiler/esbuild/interfaces/InitializeOptions","title":"Interface: InitializeOptions","description":"Properties","source":"@site/docs/api/compiler/esbuild/interfaces/InitializeOptions.md","sourceDirName":"api/compiler/esbuild/interfaces","slug":"/api/compiler/esbuild/interfaces/InitializeOptions","permalink":"/docs/api/compiler/esbuild/interfaces/InitializeOptions","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Interface: FormatMessagesOptions","permalink":"/docs/api/compiler/esbuild/interfaces/FormatMessagesOptions"},"next":{"title":"Interface: Location","permalink":"/docs/api/compiler/esbuild/interfaces/Location"}}');var s=i(7250),t=i(589);const o={},l="Interface: InitializeOptions",d={},a=[{value:"Properties",id:"properties",level:2},{value:"wasmModule?",id:"wasmmodule",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"wasmURL?",id:"wasmurl",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"worker?",id:"worker",level:3},{value:"Defined in",id:"defined-in-2",level:4}];function c(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",p:"p",strong:"strong",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"interface-initializeoptions",children:"Interface: InitializeOptions"})}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"wasmmodule",children:"wasmModule?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"wasmModule"}),": ",(0,s.jsx)(n.code,{children:"Module"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'The result of calling "new WebAssembly.Module(buffer)" where "buffer"\nis a typed array or ArrayBuffer containing the binary code of the\n"esbuild.wasm" file.'}),"\n",(0,s.jsx)(n.p,{children:'You can use this as an alternative to "wasmURL" for environments where it\'s\nnot possible to download the WebAssembly module.'}),"\n",(0,s.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:655"}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"wasmurl",children:"wasmURL?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"wasmURL"}),": ",(0,s.jsx)(n.code,{children:"string"})," | ",(0,s.jsx)(n.code,{children:"URL"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'The URL of the "esbuild.wasm" file. This must be provided when running\nesbuild in the browser.'}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:645"}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"worker",children:"worker?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"worker"}),": ",(0,s.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'By default esbuild runs the WebAssembly-based browser API in a web worker\nto avoid blocking the UI thread. This can be disabled by setting "worker"\nto false.'}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:662"})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},2410:(e,n,i)=>{var r=i(7402),s=Symbol.for("react.element"),t=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function a(e,n,i){var r,t={},a=null,c=null;for(r in void 0!==i&&(a=""+i),void 0!==n.key&&(a=""+n.key),void 0!==n.ref&&(c=n.ref),n)o.call(n,r)&&!d.hasOwnProperty(r)&&(t[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===t[r]&&(t[r]=n[r]);return{$$typeof:s,type:e,key:a,ref:c,props:t,_owner:l.current}}n.Fragment=t,n.jsx=a,n.jsxs=a},7250:(e,n,i)=>{e.exports=i(2410)},589:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>l});var r=i(7402);const s={},t=r.createContext(s);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);