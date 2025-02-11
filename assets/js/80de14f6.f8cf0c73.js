/*! For license information please see 80de14f6.f8cf0c73.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[381],{3288:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>a,frontMatter:()=>c,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"api/extension-cache-keyv/index","title":"@baeta/extension-cache-keyv","description":"Classes","source":"@site/docs/api/extension-cache-keyv/index.md","sourceDirName":"api/extension-cache-keyv","slug":"/api/extension-cache-keyv/","permalink":"/docs/api/extension-cache-keyv/","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"sdk","permalink":"/docs/api/extension-cache-cloudflare/sdk"},"next":{"title":"extension-cache-redis","permalink":"/docs/api/extension-cache-redis/"}}');var t=n(7250),d=n(589);const c={},i="@baeta/extension-cache-keyv",l={},o=[{value:"Classes",id:"classes",level:2},{value:"KeyvStore",id:"keyvstore",level:3},{value:"Remarks",id:"remarks",level:4},{value:"Example",id:"example",level:4},{value:"Extends",id:"extends",level:4},{value:"Constructors",id:"constructors",level:4},{value:"new KeyvStore()",id:"new-keyvstore",level:5},{value:"Parameters",id:"parameters",level:6},{value:"Returns",id:"returns",level:6},{value:"Overrides",id:"overrides",level:6},{value:"Properties",id:"properties",level:4},{value:"Methods",id:"methods",level:4},{value:"createStoreAdapter()",id:"createstoreadapter",level:5},{value:"Type Parameters",id:"type-parameters",level:6},{value:"Parameters",id:"parameters-1",level:6},{value:"Returns",id:"returns-1",level:6},{value:"Overrides",id:"overrides-1",level:6}];function h(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"baetaextension-cache-keyv",children:"@baeta/extension-cache-keyv"})}),"\n",(0,t.jsx)(r.h2,{id:"classes",children:"Classes"}),"\n",(0,t.jsx)(r.h3,{id:"keyvstore",children:"KeyvStore"}),"\n",(0,t.jsx)(r.p,{children:"Keyv-based cache store implementation."}),"\n",(0,t.jsx)(r.h4,{id:"remarks",children:"Remarks"}),"\n",(0,t.jsx)(r.p,{children:"Not recommended for production environments with high query volumes.\nConsider using Redis or Upstash for production deployments."}),"\n",(0,t.jsx)(r.h4,{id:"example",children:"Example"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-typescript",children:'import { KeyvStore } from "@baeta/extension-cache-keyv";\nimport Keyv from "keyv";\n\nconst keyv = new Keyv();\nconst store = new KeyvStore(keyv);\n\n// Use with cache extension\nconst cacheExt = cacheExtension(store, {\n  ttl: 3600,\n});\n'})}),"\n",(0,t.jsx)(r.h4,{id:"extends",children:"Extends"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.code,{children:"Store"})}),"\n"]}),"\n",(0,t.jsx)(r.h4,{id:"constructors",children:"Constructors"}),"\n",(0,t.jsx)(r.h5,{id:"new-keyvstore",children:"new KeyvStore()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"new KeyvStore"}),"(",(0,t.jsx)(r.code,{children:"keyv"}),"): ",(0,t.jsx)(r.a,{href:"/docs/api/extension-cache-keyv/#keyvstore",children:(0,t.jsx)(r.code,{children:"KeyvStore"})})]}),"\n"]}),"\n",(0,t.jsx)(r.h6,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"Parameter"}),(0,t.jsx)(r.th,{children:"Type"})]})}),(0,t.jsx)(r.tbody,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"keyv"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Keyv"})}),"\n"]})]})})]}),"\n",(0,t.jsx)(r.h6,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/extension-cache-keyv/#keyvstore",children:(0,t.jsx)(r.code,{children:"KeyvStore"})})}),"\n",(0,t.jsx)(r.h6,{id:"overrides",children:"Overrides"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Store.constructor"})}),"\n",(0,t.jsx)(r.h4,{id:"properties",children:"Properties"}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"Property"}),(0,t.jsx)(r.th,{children:"Modifier"}),(0,t.jsx)(r.th,{children:"Type"})]})}),(0,t.jsx)(r.tbody,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsxs)(r.td,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.a,{id:"keyv"})," ",(0,t.jsx)(r.code,{children:"keyv"})]}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"protected"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Keyv"})}),"\n"]})]})})]}),"\n",(0,t.jsx)(r.h4,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(r.h5,{id:"createstoreadapter",children:"createStoreAdapter()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"createStoreAdapter"}),"<",(0,t.jsx)(r.code,{children:"T"}),">(",(0,t.jsx)(r.code,{children:"options"}),", ",(0,t.jsx)(r.code,{children:"type"}),", ",(0,t.jsx)(r.code,{children:"hash"}),"): ",(0,t.jsx)(r.code,{children:"StoreAdapter"}),"<",(0,t.jsx)(r.code,{children:"T"}),">"]}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Creates a new store adapter for a specific type"}),"\n",(0,t.jsx)(r.h6,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.th,{children:"Type Parameter"})})}),(0,t.jsx)(r.tbody,{children:(0,t.jsx)(r.tr,{children:(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"T"})}),"\n"]})})})]}),"\n",(0,t.jsx)(r.h6,{id:"parameters-1",children:"Parameters"}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"Parameter"}),(0,t.jsx)(r.th,{children:"Type"}),(0,t.jsx)(r.th,{children:"Description"})]})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsxs)(r.tr,{children:[(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"options"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"StoreOptions"}),"<",(0,t.jsx)(r.code,{children:"T"}),">"]}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:"Store configuration options"}),"\n"]})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"type"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"string"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:"Type name for the cached items"}),"\n"]})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"hash"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"string"})}),"\n"]}),(0,t.jsxs)(r.td,{children:["\n",(0,t.jsx)(r.p,{children:"Unique hash for the type"}),"\n"]})]})]})]}),"\n",(0,t.jsx)(r.h6,{id:"returns-1",children:"Returns"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"StoreAdapter"}),"<",(0,t.jsx)(r.code,{children:"T"}),">"]}),"\n",(0,t.jsx)(r.h6,{id:"overrides-1",children:"Overrides"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Store.createStoreAdapter"})})]})}function a(e={}){const{wrapper:r}={...(0,d.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},2410:(e,r,n)=>{var s=n(7402),t=Symbol.for("react.element"),d=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,i=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function o(e,r,n){var s,d={},o=null,h=null;for(s in void 0!==n&&(o=""+n),void 0!==r.key&&(o=""+r.key),void 0!==r.ref&&(h=r.ref),r)c.call(r,s)&&!l.hasOwnProperty(s)&&(d[s]=r[s]);if(e&&e.defaultProps)for(s in r=e.defaultProps)void 0===d[s]&&(d[s]=r[s]);return{$$typeof:t,type:e,key:o,ref:h,props:d,_owner:i.current}}r.Fragment=d,r.jsx=o,r.jsxs=o},7250:(e,r,n)=>{e.exports=n(2410)},589:(e,r,n)=>{n.d(r,{R:()=>c,x:()=>i});var s=n(7402);const t={},d=s.createContext(t);function c(e){const r=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);