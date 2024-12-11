/*! For license information please see 3a50ef60.69c87372.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5323],{81781:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>d,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"api/extension-cache-redis/classes/RedisStore","title":"Class: RedisStore","description":"Extends","source":"@site/docs/api/extension-cache-redis/classes/RedisStore.md","sourceDirName":"api/extension-cache-redis/classes","slug":"/api/extension-cache-redis/classes/RedisStore","permalink":"/docs/api/extension-cache-redis/classes/RedisStore","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"@baeta/extension-cache-redis","permalink":"/docs/api/extension-cache-redis/"},"next":{"title":"@baeta/extension-cache-upstash","permalink":"/docs/api/extension-cache-upstash/"}}');var t=s(77250),i=s(50589);const d={},c="Class: RedisStore",l={},o=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new RedisStore()",id:"new-redisstore",level:3},{value:"Parameters",id:"parameters",level:4},{value:"client",id:"client",level:5},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Properties",id:"properties",level:2},{value:"client",id:"client-1",level:3},{value:"Methods",id:"methods",level:2},{value:"createStoreAdapter()",id:"createstoreadapter",level:3},{value:"Type Parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"options",id:"options",level:5},{value:"type",id:"type",level:5},{value:"hash",id:"hash",level:5},{value:"Returns",id:"returns-1",level:4},{value:"Overrides",id:"overrides-1",level:4}];function a(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"class-redisstore",children:"Class: RedisStore"})}),"\n",(0,t.jsx)(r.h2,{id:"extends",children:"Extends"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.code,{children:"Store"})}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"constructors",children:"Constructors"}),"\n",(0,t.jsx)(r.h3,{id:"new-redisstore",children:"new RedisStore()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"new RedisStore"}),"(",(0,t.jsx)(r.code,{children:"client"}),"): ",(0,t.jsx)(r.a,{href:"/docs/api/extension-cache-redis/classes/RedisStore",children:(0,t.jsx)(r.code,{children:"RedisStore"})})]}),"\n"]}),"\n",(0,t.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(r.h5,{id:"client",children:"client"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Redis"})}),"\n",(0,t.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/extension-cache-redis/classes/RedisStore",children:(0,t.jsx)(r.code,{children:"RedisStore"})})}),"\n",(0,t.jsx)(r.h4,{id:"overrides",children:"Overrides"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Store.constructor"})}),"\n",(0,t.jsx)(r.h2,{id:"properties",children:"Properties"}),"\n",(0,t.jsx)(r.h3,{id:"client-1",children:"client"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"protected"})," ",(0,t.jsx)(r.strong,{children:"client"}),": ",(0,t.jsx)(r.code,{children:"Redis"})]}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(r.h3,{id:"createstoreadapter",children:"createStoreAdapter()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"createStoreAdapter"}),"<",(0,t.jsx)(r.code,{children:"T"}),">(",(0,t.jsx)(r.code,{children:"options"}),", ",(0,t.jsx)(r.code,{children:"type"}),", ",(0,t.jsx)(r.code,{children:"hash"}),"): ",(0,t.jsx)(r.code,{children:"StoreAdapter"}),"<",(0,t.jsx)(r.code,{children:"T"}),">"]}),"\n"]}),"\n",(0,t.jsx)(r.h4,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,t.jsxs)(r.p,{children:["\u2022 ",(0,t.jsx)(r.strong,{children:"T"})]}),"\n",(0,t.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,t.jsx)(r.h5,{id:"options",children:"options"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"StoreOptions"}),"<",(0,t.jsx)(r.code,{children:"T"}),">"]}),"\n",(0,t.jsx)(r.h5,{id:"type",children:"type"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"string"})}),"\n",(0,t.jsx)(r.h5,{id:"hash",children:"hash"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"string"})}),"\n",(0,t.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"StoreAdapter"}),"<",(0,t.jsx)(r.code,{children:"T"}),">"]}),"\n",(0,t.jsx)(r.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"Store.createStoreAdapter"})})]})}function h(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},2410:(e,r,s)=>{var n=s(67402),t=Symbol.for("react.element"),i=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function o(e,r,s){var n,i={},o=null,a=null;for(n in void 0!==s&&(o=""+s),void 0!==r.key&&(o=""+r.key),void 0!==r.ref&&(a=r.ref),r)d.call(r,n)&&!l.hasOwnProperty(n)&&(i[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===i[n]&&(i[n]=r[n]);return{$$typeof:t,type:e,key:o,ref:a,props:i,_owner:c.current}}r.Fragment=i,r.jsx=o,r.jsxs=o},77250:(e,r,s)=>{e.exports=s(2410)},50589:(e,r,s)=>{s.d(r,{R:()=>d,x:()=>c});var n=s(67402);const t={},i=n.createContext(t);function d(e){const r=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),n.createElement(i.Provider,{value:r},e.children)}}}]);