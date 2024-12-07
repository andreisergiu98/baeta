/*! For license information please see 5afa776e.2e4ddd43.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[7503],{50822:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"api/cli/ink/type-aliases/StdinProps","title":"Type Alias: StdinProps","description":"StdinProps: object","source":"@site/docs/api/cli/ink/type-aliases/StdinProps.md","sourceDirName":"api/cli/ink/type-aliases","slug":"/api/cli/ink/type-aliases/StdinProps","permalink":"/docs/api/cli/ink/type-aliases/StdinProps","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Type Alias: StderrProps","permalink":"/docs/api/cli/ink/type-aliases/StderrProps"},"next":{"title":"Type Alias: StdoutProps","permalink":"/docs/api/cli/ink/type-aliases/StdoutProps"}}');var r=t(77250),i=t(50589);const o={},d="Type Alias: StdinProps",l={},c=[{value:"Type declaration",id:"type-declaration",level:2},{value:"internal_eventEmitter",id:"internal_eventemitter",level:3},{value:"internal_exitOnCtrlC",id:"internal_exitonctrlc",level:3},{value:"isRawModeSupported",id:"israwmodesupported",level:3},{value:"setRawMode()",id:"setrawmode",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"stdin",id:"stdin",level:3}];function a(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"type-alias-stdinprops",children:"Type Alias: StdinProps"})}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"StdinProps"}),": ",(0,r.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"type-declaration",children:"Type declaration"}),"\n",(0,r.jsx)(n.h3,{id:"internal_eventemitter",children:"internal_eventEmitter"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.strong,{children:"internal_eventEmitter"}),": ",(0,r.jsx)(n.code,{children:"EventEmitter"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"internal_exitonctrlc",children:"internal_exitOnCtrlC"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.strong,{children:"internal_exitOnCtrlC"}),": ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"israwmodesupported",children:"isRawModeSupported"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.strong,{children:"isRawModeSupported"}),": ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["A boolean flag determining if the current ",(0,r.jsx)(n.code,{children:"stdin"})," supports ",(0,r.jsx)(n.code,{children:"setRawMode"}),". A component using ",(0,r.jsx)(n.code,{children:"setRawMode"})," might want to use ",(0,r.jsx)(n.code,{children:"isRawModeSupported"})," to nicely fall back in environments where raw mode is not supported."]}),"\n",(0,r.jsx)(n.h3,{id:"setrawmode",children:"setRawMode()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.strong,{children:"setRawMode"}),": (",(0,r.jsx)(n.code,{children:"value"}),") => ",(0,r.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Ink exposes this function via own ",(0,r.jsx)(n.code,{children:"<StdinContext>"})," to be able to handle Ctrl+C, that's why you should use Ink's ",(0,r.jsx)(n.code,{children:"setRawMode"})," instead of ",(0,r.jsx)(n.code,{children:"process.stdin.setRawMode"}),".\nIf the ",(0,r.jsx)(n.code,{children:"stdin"})," stream passed to Ink does not support setRawMode, this function does nothing."]}),"\n",(0,r.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.strong,{children:"value"}),": ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n",(0,r.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"void"})}),"\n",(0,r.jsx)(n.h3,{id:"stdin",children:"stdin"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.strong,{children:"stdin"}),": ",(0,r.jsx)(n.code,{children:"NodeJS.ReadStream"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Stdin stream passed to ",(0,r.jsx)(n.code,{children:"render()"})," in ",(0,r.jsx)(n.code,{children:"options.stdin"})," or ",(0,r.jsx)(n.code,{children:"process.stdin"})," by default. Useful if your app needs to handle user input."]})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},2410:(e,n,t)=>{var s=t(67402),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,d=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,t){var s,i={},c=null,a=null;for(s in void 0!==t&&(c=""+t),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(a=n.ref),n)o.call(n,s)&&!l.hasOwnProperty(s)&&(i[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===i[s]&&(i[s]=n[s]);return{$$typeof:r,type:e,key:c,ref:a,props:i,_owner:d.current}}n.Fragment=i,n.jsx=c,n.jsxs=c},77250:(e,n,t)=>{e.exports=t(2410)},50589:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>d});var s=t(67402);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);