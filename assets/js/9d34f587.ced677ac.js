/*! For license information please see 9d34f587.ced677ac.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[782],{31052:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>t,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"api/cli/sdk/functions/useConfigStore","title":"Function: useConfigStore()","description":"useConfigStore(props): object","source":"@site/docs/api/cli/sdk/functions/useConfigStore.md","sourceDirName":"api/cli/sdk/functions","slug":"/api/cli/sdk/functions/useConfigStore","permalink":"/docs/api/cli/sdk/functions/useConfigStore","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Function: useConfig()","permalink":"/docs/api/cli/sdk/functions/useConfig"},"next":{"title":"Interface: ConfigProps","permalink":"/docs/api/cli/sdk/interfaces/ConfigProps"}}');var s=i(77250),r=i(50589);const t={},c="Function: useConfigStore()",l={},d=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"config",id:"config",level:3},{value:"events",id:"events",level:3},{value:"location",id:"location",level:3},{value:"relativeLocation",id:"relativelocation",level:3},{value:"Defined in",id:"defined-in",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",strong:"strong",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"function-useconfigstore",children:"Function: useConfigStore()"})}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"useConfigStore"}),"(",(0,s.jsx)(n.code,{children:"props"}),"): ",(0,s.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"props"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/cli/sdk/interfaces/ConfigProps",children:(0,s.jsx)(n.code,{children:"ConfigProps"})})]}),"\n",(0,s.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"object"})}),"\n",(0,s.jsx)(n.h3,{id:"config",children:"config"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"config"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/cli/index/interfaces/BaetaOptions",children:(0,s.jsx)(n.code,{children:"BaetaOptions"})})]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"events",children:"events"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"events"}),": ",(0,s.jsx)(n.code,{children:"EventEmitter"}),"<",(0,s.jsx)(n.code,{children:"ConfigEventMap"}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"location",children:"location"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"location"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"relativelocation",children:"relativeLocation"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"relativeLocation"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/cli/sdk/config-provider.tsx#L18",children:"packages/cli/sdk/config-provider.tsx:18"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},2410:(e,n,i)=>{var o=i(67402),s=Symbol.for("react.element"),r=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,c=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(e,n,i){var o,r={},d=null,a=null;for(o in void 0!==i&&(d=""+i),void 0!==n.key&&(d=""+n.key),void 0!==n.ref&&(a=n.ref),n)t.call(n,o)&&!l.hasOwnProperty(o)&&(r[o]=n[o]);if(e&&e.defaultProps)for(o in n=e.defaultProps)void 0===r[o]&&(r[o]=n[o]);return{$$typeof:s,type:e,key:d,ref:a,props:r,_owner:c.current}}n.Fragment=r,n.jsx=d,n.jsxs=d},77250:(e,n,i)=>{e.exports=i(2410)},50589:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>c});var o=i(67402);const s={},r=o.createContext(s);function t(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);