/*! For license information please see b4f71b2f.ae91c1a2.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[1205],{1127:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>d,default:()=>x,frontMatter:()=>r,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"stability","title":"Stability","description":"This document outlines the stability status of Baeta packages. Understanding these statuses helps you make informed decisions about which features to use in production.","source":"@site/docs/stability.mdx","sourceDirName":".","slug":"/stability","permalink":"/docs/stability","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"defaultSidebar","previous":{"title":"Wrapping up","permalink":"/docs/getting-started/wrapping-up"},"next":{"title":"Guides","permalink":"/docs/category/guides"}}');var i=s(7250),l=s(589);const r={sidebar_position:2},d="Stability",a={},c=[{value:"Stability Levels",id:"stability-levels",level:2},{value:"\ud83d\udfe2 Stable",id:"-stable",level:3},{value:"\ud83d\udfe1 Beta",id:"-beta",level:3},{value:"\ud83d\udfe0 Early Testing",id:"-early-testing",level:3},{value:"Package Status",id:"package-status",level:2},{value:"Core Packages",id:"core-packages",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Subscriptions",id:"subscriptions",level:3},{value:"Runtime Internals",id:"runtime-internals",level:3},{value:"Development Tools",id:"development-tools",level:3},{value:"Development Internals",id:"development-internals",level:3},{value:"Testing Coverage",id:"testing-coverage",level:2}];function h(e){const t={h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"stability",children:"Stability"})}),"\n",(0,i.jsx)(t.p,{children:"This document outlines the stability status of Baeta packages. Understanding these statuses helps you make informed decisions about which features to use in production."}),"\n",(0,i.jsx)(t.h2,{id:"stability-levels",children:"Stability Levels"}),"\n",(0,i.jsx)(t.h3,{id:"-stable",children:"\ud83d\udfe2 Stable"}),"\n",(0,i.jsx)(t.p,{children:"Tested packages with stable APIs. Breaking changes are only introduced with major version bumps. While these packages are reliable, note that Baeta is still in its early stages with a small user base."}),"\n",(0,i.jsx)(t.h3,{id:"-beta",children:"\ud83d\udfe1 Beta"}),"\n",(0,i.jsx)(t.p,{children:"Feature complete but may receive breaking changes in minor versions. Suitable for most non-critical production use cases."}),"\n",(0,i.jsx)(t.h3,{id:"-early-testing",children:"\ud83d\udfe0 Early Testing"}),"\n",(0,i.jsx)(t.p,{children:"Experimental packages that may undergo significant changes. Not recommended for production use."}),"\n",(0,i.jsx)(t.h2,{id:"package-status",children:"Package Status"}),"\n",(0,i.jsx)(t.h3,{id:"core-packages",children:"Core Packages"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Package"}),(0,i.jsx)(t.th,{children:"Status"}),(0,i.jsx)(t.th,{style:{textAlign:"center"},children:"Tests"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/core"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/directives"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/env"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/errors"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Package"}),(0,i.jsx)(t.th,{children:"Status"}),(0,i.jsx)(t.th,{style:{textAlign:"center"},children:"Tests"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-auth"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-cache"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe1 Beta"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-cache-cloudflare"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe0 Early Testing"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-cache-keyv"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe0 Early Testing"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-cache-redis"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe1 Beta"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-cache-upstash"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe0 Early Testing"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/extension-complexity"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe1 Beta"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"subscriptions",children:"Subscriptions"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Package"}),(0,i.jsx)(t.th,{children:"Status"}),(0,i.jsx)(t.th,{style:{textAlign:"center"},children:"Tests"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/subscriptions-cloudflare"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe1 Beta"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/subscriptions-pubsub"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"runtime-internals",children:"Runtime Internals"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Package"}),(0,i.jsx)(t.th,{children:"Status"}),(0,i.jsx)(t.th,{style:{textAlign:"center"},children:"Tests"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/util-encoding"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/util-env"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/util-log"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"}),(0,i.jsx)(t.td,{style:{textAlign:"center"},children:"\u2705"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"development-tools",children:"Development Tools"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Package"}),(0,i.jsx)(t.th,{children:"Status"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/cli"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/compiler"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-autoload"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-cloudflare"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-directives"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-exec"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-gitignore"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-graphql"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-pagination"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin-prisma"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"development-internals",children:"Development Internals"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Package"}),(0,i.jsx)(t.th,{children:"Status"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/generator"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/generator-sdk"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/plugin"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"@baeta/util-path"}),(0,i.jsx)(t.td,{children:"\ud83d\udfe2 Stable"})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"testing-coverage",children:"Testing Coverage"}),"\n",(0,i.jsx)(t.p,{children:"We're actively working on improving our test coverage. Packages marked with \u2705 have unit tests, while those marked with \u274c are pending test implementation."})]})}function x(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},2410:(e,t,s)=>{var n=s(7402),i=Symbol.for("react.element"),l=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,d=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,s){var n,l={},c=null,h=null;for(n in void 0!==s&&(c=""+s),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(h=t.ref),t)r.call(t,n)&&!a.hasOwnProperty(n)&&(l[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===l[n]&&(l[n]=t[n]);return{$$typeof:i,type:e,key:c,ref:h,props:l,_owner:d.current}}t.Fragment=l,t.jsx=c,t.jsxs=c},7250:(e,t,s)=>{e.exports=s(2410)},589:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>d});var n=s(7402);const i={},l=n.createContext(i);function r(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);