/*! For license information please see f8378e3f.1818142a.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3793],{3473:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>o,frontMatter:()=>i,metadata:()=>n,toc:()=>h});const n=JSON.parse('{"id":"api/extension-cache-upstash/index","title":"@baeta/extension-cache-upstash","description":"Classes","source":"@site/docs/api/extension-cache-upstash/index.md","sourceDirName":"api/extension-cache-upstash","slug":"/api/extension-cache-upstash/","permalink":"/docs/api/extension-cache-upstash/","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"extension-cache-redis","permalink":"/docs/api/extension-cache-redis/"},"next":{"title":"@baeta/extension-complexity","permalink":"/docs/api/extension-complexity/"}}');var t=r(7250),d=r(589);const i={},c="@baeta/extension-cache-upstash",l={},h=[{value:"Classes",id:"classes",level:2},{value:"UpstashStore",id:"upstashstore",level:3},{value:"Remarks",id:"remarks",level:4},{value:"Example",id:"example",level:4},{value:"Extends",id:"extends",level:4},{value:"Constructors",id:"constructors",level:4},{value:"new UpstashStore()",id:"new-upstashstore",level:5},{value:"Parameters",id:"parameters",level:6},{value:"Returns",id:"returns",level:6},{value:"Overrides",id:"overrides",level:6},{value:"Properties",id:"properties",level:4},{value:"Methods",id:"methods",level:4},{value:"createStoreAdapter()",id:"createstoreadapter",level:5},{value:"Type Parameters",id:"type-parameters",level:6},{value:"Parameters",id:"parameters-1",level:6},{value:"Returns",id:"returns-1",level:6},{value:"Overrides",id:"overrides-1",level:6}];function a(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"baetaextension-cache-upstash",children:"@baeta/extension-cache-upstash"})}),"\n",(0,t.jsx)(s.h2,{id:"classes",children:"Classes"}),"\n",(0,t.jsx)(s.h3,{id:"upstashstore",children:"UpstashStore"}),"\n",(0,t.jsx)(s.p,{children:"Upstash Redis-based cache store implementation.\nProvides a serverless-optimized caching solution ideal for edge and serverless environments."}),"\n",(0,t.jsx)(s.h4,{id:"remarks",children:"Remarks"}),"\n",(0,t.jsx)(s.p,{children:"This implementation uses Upstash Redis and is designed for serverless architectures."}),"\n",(0,t.jsx)(s.h4,{id:"example",children:"Example"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:'import { UpstashStore } from "@baeta/extension-cache-upstash";\nimport { Redis } from "@upstash/redis";\n\nconst redis = new Redis({\n  url: "UPSTASH_REDIS_URL",\n  token: "UPSTASH_REDIS_TOKEN",\n});\nconst store = new UpstashStore(redis);\n\n// Use with cache extension\nconst cacheExt = cacheExtension(store, {\n  ttl: 3600,\n});\n'})}),"\n",(0,t.jsx)(s.h4,{id:"extends",children:"Extends"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.code,{children:"Store"})}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"constructors",children:"Constructors"}),"\n",(0,t.jsx)(s.h5,{id:"new-upstashstore",children:"new UpstashStore()"}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"new UpstashStore"}),"(",(0,t.jsx)(s.code,{children:"client"}),"): ",(0,t.jsx)(s.a,{href:"/docs/api/extension-cache-upstash/#upstashstore",children:(0,t.jsx)(s.code,{children:"UpstashStore"})})]}),"\n"]}),"\n",(0,t.jsx)(s.h6,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Parameter"}),(0,t.jsx)(s.th,{children:"Type"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"client"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"Redis"})}),"\n"]})]})})]}),"\n",(0,t.jsx)(s.h6,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"/docs/api/extension-cache-upstash/#upstashstore",children:(0,t.jsx)(s.code,{children:"UpstashStore"})})}),"\n",(0,t.jsx)(s.h6,{id:"overrides",children:"Overrides"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"Store.constructor"})}),"\n",(0,t.jsx)(s.h4,{id:"properties",children:"Properties"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Property"}),(0,t.jsx)(s.th,{children:"Modifier"}),(0,t.jsx)(s.th,{children:"Type"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"client"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"protected"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"Redis"})}),"\n"]})]})})]}),"\n",(0,t.jsx)(s.h4,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(s.h5,{id:"createstoreadapter",children:"createStoreAdapter()"}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"createStoreAdapter"}),"<",(0,t.jsx)(s.code,{children:"T"}),">(",(0,t.jsx)(s.code,{children:"options"}),", ",(0,t.jsx)(s.code,{children:"type"}),", ",(0,t.jsx)(s.code,{children:"hash"}),"): ",(0,t.jsx)(s.code,{children:"StoreAdapter"}),"<",(0,t.jsx)(s.code,{children:"T"}),">"]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:"Creates a new store adapter for a specific type"}),"\n",(0,t.jsx)(s.h6,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsx)(s.tr,{children:(0,t.jsx)(s.th,{children:"Type Parameter"})})}),(0,t.jsx)(s.tbody,{children:(0,t.jsx)(s.tr,{children:(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"T"})}),"\n"]})})})]}),"\n",(0,t.jsx)(s.h6,{id:"parameters-1",children:"Parameters"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Parameter"}),(0,t.jsx)(s.th,{children:"Type"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"options"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"StoreOptions"}),"<",(0,t.jsx)(s.code,{children:"T"}),">"]}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:"Store configuration options"}),"\n"]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"type"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"string"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:"Type name for the cached items"}),"\n"]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"hash"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"string"})}),"\n"]}),(0,t.jsxs)(s.td,{children:["\n",(0,t.jsx)(s.p,{children:"Unique hash for the type"}),"\n"]})]})]})]}),"\n",(0,t.jsx)(s.h6,{id:"returns-1",children:"Returns"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"StoreAdapter"}),"<",(0,t.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,t.jsx)(s.h6,{id:"overrides-1",children:"Overrides"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"Store.createStoreAdapter"})})]})}function o(e={}){const{wrapper:s}={...(0,d.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},2410:(e,s,r)=>{var n=r(7402),t=Symbol.for("react.element"),d=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function h(e,s,r){var n,d={},h=null,a=null;for(n in void 0!==r&&(h=""+r),void 0!==s.key&&(h=""+s.key),void 0!==s.ref&&(a=s.ref),s)i.call(s,n)&&!l.hasOwnProperty(n)&&(d[n]=s[n]);if(e&&e.defaultProps)for(n in s=e.defaultProps)void 0===d[n]&&(d[n]=s[n]);return{$$typeof:t,type:e,key:h,ref:a,props:d,_owner:c.current}}s.Fragment=d,s.jsx=h,s.jsxs=h},7250:(e,s,r)=>{e.exports=r(2410)},589:(e,s,r)=>{r.d(s,{R:()=>i,x:()=>c});var n=r(7402);const t={},d=n.createContext(t);function i(e){const s=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),n.createElement(d.Provider,{value:s},e.children)}}}]);