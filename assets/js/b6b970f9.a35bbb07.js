/*! For license information please see b6b970f9.a35bbb07.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5978],{589:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>i});var t=r(7402);const s={},o=t.createContext(s);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(o.Provider,{value:n},e.children)}},2410:(e,n,r)=>{var t=r(7402),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(e,n,r){var t,o={},d=null,c=null;for(t in void 0!==r&&(d=""+r),void 0!==n.key&&(d=""+n.key),void 0!==n.ref&&(c=n.ref),n)a.call(n,t)&&!l.hasOwnProperty(t)&&(o[t]=n[t]);if(e&&e.defaultProps)for(t in n=e.defaultProps)void 0===o[t]&&(o[t]=n[t]);return{$$typeof:s,type:e,key:d,ref:c,props:o,_owner:i.current}}n.Fragment=o,n.jsx=d,n.jsxs=d},7114:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"guides/middlewares","title":"Middlewares","description":"Baeta provides a powerful middleware system that allows you to add functionality before and after your resolvers.","source":"@site/docs/guides/middlewares.mdx","sourceDirName":"guides","slug":"/guides/middlewares","permalink":"/docs/guides/middlewares","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":30,"frontMatter":{"sidebar_position":30},"sidebar":"defaultSidebar","previous":{"title":"Scalars","permalink":"/docs/guides/scalars"},"next":{"title":"Context","permalink":"/docs/guides/context"}}');var s=r(7250),o=r(589);const a={sidebar_position:30},i="Middlewares",l={},d=[{value:"Basic Usage",id:"basic-usage",level:2},{value:"Common Use Cases",id:"common-use-cases",level:2},{value:"Logging",id:"logging",level:3},{value:"Authentication",id:"authentication",level:3},{value:"Data Transformation",id:"data-transformation",level:3},{value:"Error Handling",id:"error-handling",level:3},{value:"Middleware Context",id:"middleware-context",level:2},{value:"Multiple Middlewares",id:"multiple-middlewares",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"middlewares",children:"Middlewares"})}),"\n",(0,s.jsx)(n.p,{children:"Baeta provides a powerful middleware system that allows you to add functionality before and after your resolvers."}),"\n",(0,s.jsx)(n.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'import { getUserModule } from "./typedef.ts";\n\nconst { Query } = getUserModule();\n\nQuery.user.$use(async ({ args, ctx }, next) => {\n  console.log("Before resolver:", args);\n  const result = await next();\n  console.log("After resolver:", result);\n  return result;\n});\n'})}),"\n",(0,s.jsx)(n.h2,{id:"common-use-cases",children:"Common Use Cases"}),"\n",(0,s.jsx)(n.h3,{id:"logging",children:"Logging"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"Query.user.$use(async (context, next) => {\n  const startTime = Date.now();\n  const result = await next();\n  const duration = Date.now() - startTime;\n\n  console.log(`Query.user took ${duration}ms`);\n  return result;\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"authentication",children:"Authentication"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"Query.user.$use(async ({ ctx }, next) => {\n  if (!ctx.user) {\n    throw new UnauthenticatedError();\n  }\n  return next();\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"data-transformation",children:"Data Transformation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"Query.user.$use(async (context, next) => {\n  const user = await next();\n  if (user) {\n    // Remove sensitive data\n    delete user.internalNotes;\n  }\n  return user;\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"error-handling",children:"Error Handling"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'Query.user.$use(async (context, next) => {\n  try {\n    return await next();\n  } catch (error) {\n    console.error("Error in user resolver:", error);\n    throw new GraphQLError("Failed to fetch user");\n  }\n});\n'})}),"\n",(0,s.jsx)(n.h2,{id:"middleware-context",children:"Middleware Context"}),"\n",(0,s.jsx)(n.p,{children:"Middlewares receive the same context as resolvers:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"args"}),": Arguments passed to the resolver"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"ctx"}),": Context object"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"root"}),": Parent object"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"info"}),": GraphQL resolve info"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"multiple-middlewares",children:"Multiple Middlewares"}),"\n",(0,s.jsx)(n.p,{children:"Middlewares are executed in the order they are defined:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'const { Query } = getUserModule();\n\n// First middleware\nQuery.user.$use(async (context, next) => {\n  console.log("First middleware - before");\n  const result = await next();\n  console.log("First middleware - after");\n  return result;\n});\n\n// Second middleware\nQuery.user.$use(async (context, next) => {\n  console.log("Second middleware - before");\n  const result = await next();\n  console.log("Second middleware - after");\n  return result;\n});\n\n// Output order:\n// First middleware - before\n// Second middleware - before\n// Second middleware - after\n// First middleware - after\n'})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},7250:(e,n,r)=>{e.exports=r(2410)}}]);