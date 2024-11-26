/*! For license information please see cc426781.4d5b6aed.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[2543],{64424:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"guides/scalars","title":"Scalars","description":"Baeta provides support for custom GraphQL scalars to handle specific data types like DateTime or UUID.","source":"@site/docs/guides/scalars.mdx","sourceDirName":"guides","slug":"/guides/scalars","permalink":"/docs/guides/scalars","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":20,"frontMatter":{"sidebar_position":20},"sidebar":"defaultSidebar","previous":{"title":"Resolvers","permalink":"/docs/guides/resolvers"},"next":{"title":"Middlewares","permalink":"/docs/guides/middlewares"}}');var a=r(77250),t=r(50589);const i={sidebar_position:20},l="Scalars",c={},o=[{value:"Configuration",id:"configuration",level:2},{value:"Schema Definition",id:"schema-definition",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Usage in Resolvers",id:"usage-in-resolvers",level:2},{value:"Type Safety",id:"type-safety",level:2},{value:"Built-in Scalars",id:"built-in-scalars",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.header,{children:(0,a.jsx)(s.h1,{id:"scalars",children:"Scalars"})}),"\n",(0,a.jsx)(s.p,{children:"Baeta provides support for custom GraphQL scalars to handle specific data types like DateTime or UUID."}),"\n",(0,a.jsx)(s.h2,{id:"configuration",children:"Configuration"}),"\n",(0,a.jsxs)(s.p,{children:["First, define your scalars in your ",(0,a.jsx)(s.code,{children:"baeta.ts"})," configuration file:"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-typescript",children:'export default defineConfig({\n  graphql: {\n    schemas: ["src/**/*.gql"],\n    scalars: {\n      DateTime: "Date", // Built-in JavaScript Date\n      UUID: "src/types/scalars.ts#UUID", // Custom type\n    },\n  },\n  // ... rest of config\n});\n'})}),"\n",(0,a.jsx)(s.h2,{id:"schema-definition",children:"Schema Definition"}),"\n",(0,a.jsxs)(s.p,{children:["Define your scalars in your GraphQL schema ",(0,a.jsx)(s.code,{children:"src/modules/scalars/scalars.gql"}),":"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-graphql",children:"scalar DateTime\nscalar UUID\n"})}),"\n",(0,a.jsx)(s.h2,{id:"implementation",children:"Implementation"}),"\n",(0,a.jsxs)(s.p,{children:["Implement the scalar resolvers using ",(0,a.jsx)(s.code,{children:"graphql-scalars"})," or your own implementation ",(0,a.jsx)(s.code,{children:"src/modules/scalars/resolvers.ts"}),":"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-typescript",children:'import { DateTimeResolver, UUIDResolver } from "graphql-scalars";\nimport { getScalarsModule } from "./typedef.ts";\n\nconst { Scalar } = getScalarsModule();\n\nScalar.DateTime(DateTimeResolver);\nScalar.UUID(UUIDResolver);\n'})}),"\n",(0,a.jsx)(s.h2,{id:"usage-in-resolvers",children:"Usage in Resolvers"}),"\n",(0,a.jsx)(s.p,{children:"The scalars are automatically typed in your resolvers:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-typescript",children:"const { Query } = getUserModule();\n\nQuery.user(({ args }) => {\n  // args.id is typed as UUID\n  // return type createdAt is typed as Date\n  return {\n    id: args.id,\n    createdAt: new Date(),\n  };\n});\n"})}),"\n",(0,a.jsx)(s.h2,{id:"type-safety",children:"Type Safety"}),"\n",(0,a.jsx)(s.p,{children:"Baeta ensures type safety between your GraphQL schema and TypeScript code:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-typescript",children:"interface User {\n  id: UUID; // Custom type\n  createdAt: Date; // JavaScript Date\n  email: string; // Regular field\n}\n"})}),"\n",(0,a.jsx)(s.h2,{id:"built-in-scalars",children:"Built-in Scalars"}),"\n",(0,a.jsx)(s.p,{children:"Baeta supports several common scalar types out of the box:"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.code,{children:"Int"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.code,{children:"Float"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.code,{children:"String"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.code,{children:"Boolean"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.code,{children:"ID"})}),"\n"]}),"\n",(0,a.jsx)(s.p,{children:"These don't require any additional configuration."})]})}function p(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},2410:(e,s,r)=>{var n=r(67402),a=Symbol.for("react.element"),t=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function o(e,s,r){var n,t={},o=null,d=null;for(n in void 0!==r&&(o=""+r),void 0!==s.key&&(o=""+s.key),void 0!==s.ref&&(d=s.ref),s)i.call(s,n)&&!c.hasOwnProperty(n)&&(t[n]=s[n]);if(e&&e.defaultProps)for(n in s=e.defaultProps)void 0===t[n]&&(t[n]=s[n]);return{$$typeof:a,type:e,key:o,ref:d,props:t,_owner:l.current}}s.Fragment=t,s.jsx=o,s.jsxs=o},77250:(e,s,r)=>{e.exports=r(2410)},50589:(e,s,r)=>{r.d(s,{R:()=>i,x:()=>l});var n=r(67402);const a={},t=n.createContext(a);function i(e){const s=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),n.createElement(t.Provider,{value:s},e.children)}}}]);