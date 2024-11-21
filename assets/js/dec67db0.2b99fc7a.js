/*! For license information please see dec67db0.2b99fc7a.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5010],{9314:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"application","title":"Application","description":"This guide explains how to set up a Baeta application and integrate it with a GraphQL server.","source":"@site/docs/application.mdx","sourceDirName":".","slug":"/application","permalink":"/docs/application","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":50,"frontMatter":{"sidebar_position":50},"sidebar":"defaultSidebar","previous":{"title":"Context","permalink":"/docs/context"},"next":{"title":"Autoloading","permalink":"/docs/autoloading"}}');var r=o(7250),a=o(589);const i={sidebar_position:50},s="Application",l={},c=[{value:"Manual Module Registration",id:"manual-module-registration",level:2},{value:"Automatic Registration (Autoloading)",id:"automatic-registration-autoloading",level:2},{value:"Server Integration",id:"server-integration",level:2},{value:"Apollo Server",id:"apollo-server",level:3},{value:"GraphQL Yoga",id:"graphql-yoga",level:3}];function p(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"application",children:"Application"})}),"\n",(0,r.jsx)(t.p,{children:"This guide explains how to set up a Baeta application and integrate it with a GraphQL server."}),"\n",(0,r.jsx)(t.h2,{id:"manual-module-registration",children:"Manual Module Registration"}),"\n",(0,r.jsx)(t.p,{children:"Without autoloading, you need to manually register your modules:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'// src/modules/user/index.ts\nimport "./resolvers";\nimport { getUserModule } from "./typedef";\n\nexport const userModule = getUserModule();\n\n// src/app.ts\nimport { createApplication } from "@baeta/core";\nimport { userModule } from "./modules/user";\nimport { postModule } from "./modules/post";\nimport { scalarsModule } from "./modules/scalars";\n\nconst baeta = createApplication({\n  modules: [userModule, postModule, scalarsModule],\n});\n'})}),"\n",(0,r.jsx)(t.h2,{id:"automatic-registration-autoloading",children:"Automatic Registration (Autoloading)"}),"\n",(0,r.jsxs)(t.p,{children:["Using ",(0,r.jsx)(t.code,{children:"@baeta/plugin-autoload"})," simplifies the setup:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'// baeta.ts\nimport { defineConfig } from "@baeta/cli";\nimport { autoloadPlugin } from "@baeta/plugin-autoload";\n\nexport default defineConfig({\n  plugins: [autoloadPlugin()],\n  // ... other config\n});\n\n// src/app.ts\nimport { createApplication } from "@baeta/core";\nimport { modules } from "./modules/autoload.ts";\n\nconst baeta = createApplication({\n  // Modules are loaded automatically\n  modules,\n});\n'})}),"\n",(0,r.jsx)(t.h2,{id:"server-integration",children:"Server Integration"}),"\n",(0,r.jsx)(t.h3,{id:"apollo-server",children:"Apollo Server"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'import { ApolloServer } from "@apollo/server";\nimport { startStandaloneServer } from "@apollo/server/standalone";\nimport { createApplication } from "@baeta/core";\nimport { modules } from "./modules/autoload.ts";\nimport { Context, createContext } from "./context.ts";\n\nconst baeta = createApplication({\n  modules,\n});\n\nconst server = new ApolloServer<Context>({\n  schema: baeta.schema,\n});\n\nconst { url } = await startStandaloneServer(server, {\n  listen: { port: 4000 },\n  context: createContext,\n});\n\nconsole.log(`\ud83d\ude80  Server ready at: ${url}`);\n'})}),"\n",(0,r.jsx)(t.h3,{id:"graphql-yoga",children:"GraphQL Yoga"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'import { createServer } from "node:http";\nimport { createApplication } from "@baeta/core";\nimport { createYoga } from "graphql-yoga";\nimport { modules } from "./modules/autoload.ts";\nimport { Context, ServerContext, createContext } from "./context.ts";\n\nconst baeta = createApplication({\n  modules,\n});\n\nexport const yoga = createYoga<ServerContext, Context>({\n  schema: baeta.schema,\n  context: createContext,\n});\n\nconst server = createServer(yoga);\n\nserver.listen(4000, () => {\n  console.log(\n    `\ud83d\ude80 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`\n  );\n});\n'})})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},2410:(e,t,o)=>{var n=o(7402),r=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,o){var n,a={},c=null,p=null;for(n in void 0!==o&&(c=""+o),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:r,type:e,key:c,ref:p,props:a,_owner:s.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},7250:(e,t,o)=>{e.exports=o(2410)},589:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>s});var n=o(7402);const r={},a=n.createContext(r);function i(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);