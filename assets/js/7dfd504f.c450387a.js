/*! For license information please see 7dfd504f.c450387a.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[6657],{2172:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"context-store","title":"Context Store","description":"Context Store is a feature in Baeta that provides a pattern for managing request-scoped data with lazy loading and caching capabilities. It allows you to define values that can be loaded on-demand and cached throughout the request lifecycle, while maintaining full type safety.","source":"@site/docs/context-store.mdx","sourceDirName":".","slug":"/context-store","permalink":"/docs/context-store","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":100,"frontMatter":{"sidebar_position":100},"sidebar":"defaultSidebar","previous":{"title":"Subscriptions","permalink":"/docs/subscriptions"},"next":{"title":"Interfaces & Unions","permalink":"/docs/interfaces-unions"}}');var s=n(7250),o=n(589);const a={sidebar_position:100},i="Context Store",c={},l=[{value:"Why Use Context Store?",id:"why-use-context-store",level:2},{value:"1. Better Type Safety for Authentication",id:"1-better-type-safety-for-authentication",level:3},{value:"2. Lazy Loading &amp; Performance",id:"2-lazy-loading--performance",level:3},{value:"3. Request-Scoped Caching",id:"3-request-scoped-caching",level:3},{value:"Creating a Store",id:"creating-a-store",level:2},{value:"Chaining Stores",id:"chaining-stores",level:2},{value:"Initializing Stores",id:"initializing-stores",level:2},{value:"Using Stores in Resolvers",id:"using-stores-in-resolvers",level:2},{value:"Caching Behavior",id:"caching-behavior",level:2},{value:"Configuration Options",id:"configuration-options",level:2}];function d(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"context-store",children:"Context Store"})}),"\n",(0,s.jsx)(t.p,{children:"Context Store is a feature in Baeta that provides a pattern for managing request-scoped data with lazy loading and caching capabilities. It allows you to define values that can be loaded on-demand and cached throughout the request lifecycle, while maintaining full type safety."}),"\n",(0,s.jsx)(t.h2,{id:"why-use-context-store",children:"Why Use Context Store?"}),"\n",(0,s.jsx)(t.p,{children:"Context Store solves several common problems in GraphQL APIs:"}),"\n",(0,s.jsx)(t.h3,{id:"1-better-type-safety-for-authentication",children:"1. Better Type Safety for Authentication"}),"\n",(0,s.jsx)(t.p,{children:"Without Context Store, handling both authenticated and public routes often leads to compromised type safety:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"// Without Context Store\ntype Context = {\n  user: User | null; // Have to make it optional for public routes\n};\n\n// Forces unnecessary null checks even in authenticated resolvers\nQuery.profile(({ ctx }) => {\n  if (!ctx.user) { // Required even though we know it's authenticated\n    throw new Error('Unauthenticated'); \n  }\n  return ctx.user;\n});\n"})}),"\n",(0,s.jsx)(t.p,{children:"With Context Store, you can have precise types for each use case:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"// With Context Store\nconst optionalUser = await getOptionalUser(ctx); // User | null - for public routes\nconst user = await getUser(ctx); // User - for authenticated routes, automatically throws if not authenticated\n"})}),"\n",(0,s.jsx)(t.h3,{id:"2-lazy-loading--performance",children:"2. Lazy Loading & Performance"}),"\n",(0,s.jsx)(t.p,{children:"Context Store prevents unnecessary database queries by:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Loading data only when it's actually needed"}),"\n",(0,s.jsx)(t.li,{children:"Caching the result for the entire request lifecycle"}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"For example:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"// Without Context Store\nconst context = {\n  user: await db.user.findUnique({ where: { id: userId }}), // Always queries DB even if user data isn't needed\n};\n\n// With Context Store\nconst user = await getUser(ctx); // Only queries DB when this line is executed\n// And subsequent calls in the same request will use cached data\n"})}),"\n",(0,s.jsx)(t.h3,{id:"3-request-scoped-caching",children:"3. Request-Scoped Caching"}),"\n",(0,s.jsx)(t.p,{children:"Many applications repeatedly fetch the same data within a single request:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"// Without caching - hits database multiple times\nconst userProfile = await db.user.findUnique(...);\nconst userPreferences = await db.user.findUnique(...); // Same user, another query\n\n// With Context Store - single database query\nconst user = await getUser(ctx); // First call fetches from DB\nconst userAgain = await getUser(ctx); // Uses cached data\n"})}),"\n",(0,s.jsx)(t.h2,{id:"creating-a-store",children:"Creating a Store"}),"\n",(0,s.jsxs)(t.p,{children:["Use ",(0,s.jsx)(t.code,{children:"createContextStore"})," to define a store with its loading logic:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"import { createContextStore } from '@baeta/core';\nimport { UnauthenticatedError } from '@baeta/errors';\nimport type { User } from './modules/user/typedef';\nimport type { Context } from './types/context';\n\n// Define the loader function\nasync function loadOptionalUser(ctx: Context) {\n  if (!ctx.userId) {\n    return null;\n  }\n  \n  const user = await db.user.findUnique({\n    where: { id: ctx.userId }\n  });\n  \n  return user;\n}\n\n// Create the store\nconst optionalUserStoreKey = Symbol('optionalUserStore');\nexport const [getOptionalUser, setOptionalUserLoader] = createContextStore<User | null>(\n  optionalUserStoreKey,\n  {\n    lazy: true, // Load the user only when requested\n  }\n);\n"})}),"\n",(0,s.jsx)(t.h2,{id:"chaining-stores",children:"Chaining Stores"}),"\n",(0,s.jsx)(t.p,{children:"Stores can be chained to create more complex stores:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"// Build upon the optional user store\nasync function loadUser(ctx: Context) {\n  const user = await getOptionalUser(ctx);\n\n  if (!user) {\n    throw new UnauthenticatedError();\n  }\n\n  return user;\n}\n\nconst userStoreKey = Symbol('userStore');\nexport const [getUser, setUserLoader] = createContextStore<User>(userStoreKey, {\n  lazy: true,\n});\n"})}),"\n",(0,s.jsx)(t.h2,{id:"initializing-stores",children:"Initializing Stores"}),"\n",(0,s.jsx)(t.p,{children:"Initialize your stores in the context creation:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"export const yoga = createYoga<ServerContext, Context>({\n  schema: baeta.schema,\n  context: () => {\n    const ctx: Context = {\n      userId: '1',\n    };\n\n    // Set up the loaders\n    setOptionalUserLoader(ctx, () => loadOptionalUser(ctx));\n    setUserLoader(ctx, () => loadUser(ctx));\n\n    return ctx;\n  },\n});\n"})}),"\n",(0,s.jsx)(t.h2,{id:"using-stores-in-resolvers",children:"Using Stores in Resolvers"}),"\n",(0,s.jsx)(t.p,{children:"Access store values in your resolvers:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"const { Query } = getUserModule();\n\nQuery.me(async ({ ctx }) => {\n  // Optional user store - won't throw if user isn't authenticated\n  const optionalUser = await getOptionalUser(ctx); // User | null\n  \n  // Required user store - will throw UnauthenticatedError if user isn't authenticated\n  const requiredUser = await getUser(ctx); // User\n  \n  return requiredUser;\n});\n"})}),"\n",(0,s.jsx)(t.h2,{id:"caching-behavior",children:"Caching Behavior"}),"\n",(0,s.jsx)(t.p,{children:"Store values are cached for the entire request lifecycle. Multiple calls to the same store will only trigger the loader once:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"Query.example(async ({ ctx }) => {\n  // All these calls will only trigger loadOptionalUser once\n  await Promise.all([\n    getOptionalUser(ctx),\n    getOptionalUser(ctx),\n    getOptionalUser(ctx),\n  ]);\n  \n  // Uses cached value\n  const user = await getOptionalUser(ctx);\n});\n"})}),"\n",(0,s.jsx)(t.h2,{id:"configuration-options",children:"Configuration Options"}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"createContextStore"})," function accepts these options:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"type StoreOptions = {\n  lazy?: boolean; // If true, only loads when first accessed\n  // Add any future options here\n};\n"})})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},2410:(e,t,n)=>{var r=n(7402),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,n){var r,o={},l=null,d=null;for(r in void 0!==n&&(l=""+n),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(d=t.ref),t)a.call(t,r)&&!c.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:s,type:e,key:l,ref:d,props:o,_owner:i.current}}t.Fragment=o,t.jsx=l,t.jsxs=l},7250:(e,t,n)=>{e.exports=n(2410)},589:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>i});var r=n(7402);const s={},o=r.createContext(s);function a(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);