/*! For license information please see 2fca31cb.14d73aa4.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3524],{8691:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"api/cloudflare-subscriptions/index/functions/createCloudflareSubscription","title":"Function: createCloudflareSubscription()","description":"createCloudflareSubscription\\\\(options): object","source":"@site/docs/api/cloudflare-subscriptions/index/functions/createCloudflareSubscription.md","sourceDirName":"api/cloudflare-subscriptions/index/functions","slug":"/api/cloudflare-subscriptions/index/functions/createCloudflareSubscription","permalink":"/docs/api/cloudflare-subscriptions/index/functions/createCloudflareSubscription","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Class: SubscriptionDatabaseD1","permalink":"/docs/api/cloudflare-subscriptions/index/classes/SubscriptionDatabaseD1"},"next":{"title":"Interface: SubscriptionsOptions\\\\<Env, Context, ContextParams\\\\>","permalink":"/docs/api/cloudflare-subscriptions/index/interfaces/SubscriptionsOptions"}}');var i=s(7250),c=s(589);const t={},l="Function: createCloudflareSubscription()",o={},d=[{value:"Type Parameters",id:"type-parameters",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"createPublisher()",id:"createpublisher",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"createSubscriber()",id:"createsubscriber",level:3},{value:"Returns",id:"returns-2",level:4},{value:"createWsConnectionsClass()",id:"createwsconnectionsclass",level:3},{value:"Returns",id:"returns-3",level:4},{value:"handleWS()",id:"handlews",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",strong:"strong",...(0,c.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"function-createcloudflaresubscription",children:"Function: createCloudflareSubscription()"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"createCloudflareSubscription"}),"<",(0,i.jsx)(n.code,{children:"Env"}),", ",(0,i.jsx)(n.code,{children:"Context"}),", ",(0,i.jsx)(n.code,{children:"ContextParams"}),", ",(0,i.jsx)(n.code,{children:"PubSubMap"}),">(",(0,i.jsx)(n.code,{children:"options"}),"): ",(0,i.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"Env"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"Context"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"ContextParams"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"PubSubMap"})," ",(0,i.jsx)(n.em,{children:"extends"})," ",(0,i.jsx)(n.code,{children:"DefaultPubSubMap"})," = ",(0,i.jsx)(n.code,{children:"DefaultPubSubMap"})]}),"\n",(0,i.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"options"}),": ",(0,i.jsx)(n.a,{href:"/docs/api/cloudflare-subscriptions/index/interfaces/SubscriptionsOptions",children:(0,i.jsx)(n.code,{children:"SubscriptionsOptions"})}),"<",(0,i.jsx)(n.code,{children:"Env"}),", ",(0,i.jsx)(n.code,{children:"Context"}),", ",(0,i.jsx)(n.code,{children:"ContextParams"}),">"]}),"\n",(0,i.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"object"})}),"\n",(0,i.jsx)(n.h3,{id:"createpublisher",children:"createPublisher()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"createPublisher"}),": (",(0,i.jsx)(n.code,{children:"env"}),", ",(0,i.jsx)(n.code,{children:"execContext"}),") => ",(0,i.jsx)(n.a,{href:"/docs/api/cloudflare-subscriptions/index/type-aliases/Publish",children:(0,i.jsx)(n.code,{children:"Publish"})}),"<",(0,i.jsx)(n.code,{children:"PubSubMap"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"env"}),": ",(0,i.jsx)(n.code,{children:"Env"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"execContext"}),": ",(0,i.jsx)(n.code,{children:"ExecutionContext"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/cloudflare-subscriptions/index/type-aliases/Publish",children:(0,i.jsx)(n.code,{children:"Publish"})}),"<",(0,i.jsx)(n.code,{children:"PubSubMap"}),">"]}),"\n",(0,i.jsx)(n.h3,{id:"createsubscriber",children:"createSubscriber()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"createSubscriber"}),": () => ",(0,i.jsx)(n.a,{href:"/docs/api/cloudflare-subscriptions/index/type-aliases/Subscribe",children:(0,i.jsx)(n.code,{children:"Subscribe"})}),"<",(0,i.jsx)(n.code,{children:"PubSubMap"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/cloudflare-subscriptions/index/type-aliases/Subscribe",children:(0,i.jsx)(n.code,{children:"Subscribe"})}),"<",(0,i.jsx)(n.code,{children:"PubSubMap"}),">"]}),"\n",(0,i.jsx)(n.h3,{id:"createwsconnectionsclass",children:"createWsConnectionsClass()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"createWsConnectionsClass"}),": () => ",(0,i.jsx)(n.em,{children:"typeof"})," ",(0,i.jsx)(n.code,{children:"BaetaWsConnections"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"typeof"})," ",(0,i.jsx)(n.code,{children:"BaetaWsConnections"})]}),"\n",(0,i.jsx)(n.h3,{id:"handlews",children:"handleWS()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"handleWS"}),": (",(0,i.jsx)(n.code,{children:"request"}),", ",(0,i.jsx)(n.code,{children:"env"}),", ",(0,i.jsx)(n.code,{children:"execContext"}),") => ",(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"Response"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"request"}),": ",(0,i.jsx)(n.code,{children:"Request"}),"<",(0,i.jsx)(n.code,{children:"unknown"}),", ",(0,i.jsx)(n.code,{children:"CfProperties"}),"<",(0,i.jsx)(n.code,{children:"unknown"}),">>"]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"env"}),": ",(0,i.jsx)(n.code,{children:"Env"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"execContext"}),": ",(0,i.jsx)(n.code,{children:"ExecutionContext"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"Response"}),">"]}),"\n",(0,i.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L32",children:"lib/subscription.ts:32"})})]})}function u(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},2410:(e,n,s)=>{var r=s(7402),i=Symbol.for("react.element"),c=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function d(e,n,s){var r,c={},d=null,a=null;for(r in void 0!==s&&(d=""+s),void 0!==n.key&&(d=""+n.key),void 0!==n.ref&&(a=n.ref),n)t.call(n,r)&&!o.hasOwnProperty(r)&&(c[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===c[r]&&(c[r]=n[r]);return{$$typeof:i,type:e,key:d,ref:a,props:c,_owner:l.current}}n.Fragment=c,n.jsx=d,n.jsxs=d},7250:(e,n,s)=>{e.exports=s(2410)},589:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>l});var r=s(7402);const i={},c=r.createContext(i);function t(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);