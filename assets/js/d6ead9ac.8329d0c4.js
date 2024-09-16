/*! For license information please see d6ead9ac.8329d0c4.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[302],{5315:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=t(7250),s=t(4153);const o={sidebar_position:3,description:""},d="First module",i={id:"getting-started/first-module",title:"First module",description:"",source:"@site/docs/getting-started/first-module.mdx",sourceDirName:"getting-started",slug:"/getting-started/first-module",permalink:"/docs/getting-started/first-module",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,description:""},sidebar:"tutorialSidebar",previous:{title:"Configuration",permalink:"/docs/getting-started/configuration"},next:{title:"Extend modules",permalink:"/docs/getting-started/extend-modules"}},a={},l=[{value:"Create module schema",id:"create-module-schema",level:3},{value:"Generate types",id:"generate-types",level:3},{value:"Add resolver",id:"add-resolver",level:3},{value:"Exporting the module and registering resolvers",id:"exporting-the-module-and-registering-resolvers",level:3}];function c(e){const r={admonition:"admonition",code:"code",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.header,{children:(0,n.jsx)(r.h1,{id:"first-module",children:"First module"})}),"\n",(0,n.jsx)(r.p,{children:"Baeta is a schema-first and modular framework, where each module has its own schema definitions and resolvers.\nIn this guide, we will cover how to create your first module and extend it with another module."}),"\n",(0,n.jsx)(r.h3,{id:"create-module-schema",children:"Create module schema"}),"\n",(0,n.jsx)(r.p,{children:"A module can have multiple schema files, so there are many ways to organize it.\nOne way is to separate files for types, inputs, and operations."}),"\n",(0,n.jsxs)(r.p,{children:["Let's start with a simple schema file for our user module at ",(0,n.jsx)(r.code,{children:"src/modules/user/user.gql"}),":"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-graphql",children:"type User {\n  id: ID!\n  name: String!\n}\n\ntype Query {\n  user(id: ID): User\n}\n"})}),"\n",(0,n.jsx)(r.h3,{id:"generate-types",children:"Generate types"}),"\n",(0,n.jsx)(r.p,{children:"After creating the schema, we need to generate the type definitions for the module.\nWe can do this with the following command:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-bash",children:"yarn generate\n# or\nyarn baeta generate\n"})}),"\n",(0,n.jsxs)(r.p,{children:["This command will generate an autogenerated file ",(0,n.jsx)(r.code,{children:"src/modules/user/typedef.ts"})," that contains the type definitions of the module."]}),"\n",(0,n.jsx)(r.admonition,{type:"note",children:(0,n.jsxs)(r.p,{children:["Baeta can watch for changes with the ",(0,n.jsx)(r.code,{children:"--watch"})," flag."]})}),"\n",(0,n.jsx)(r.h3,{id:"add-resolver",children:"Add resolver"}),"\n",(0,n.jsxs)(r.p,{children:["Now we can add a resolver for the ",(0,n.jsx)(r.code,{children:"user"})," query field in ",(0,n.jsx)(r.code,{children:"src/modules/user/resolvers.ts"}),":"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"import { getUserModule } from './typedef';\n\nconst { Query } = getUserModule();\n\nQuery.user(async (params) => {\n  return {\n    id: params.args.id ?? 'id',\n    name: 'John Doe',\n  };\n});\n"})}),"\n",(0,n.jsxs)(r.p,{children:["We import the ",(0,n.jsx)(r.code,{children:"getUserModule"})," function from our autogenerated ",(0,n.jsx)(r.code,{children:"typedef.ts"})," file, and use it to access the ",(0,n.jsx)(r.code,{children:"Query"})," type.\nWe then add a resolver for the ",(0,n.jsx)(r.code,{children:"user"})," field that returns a hardcoded ",(0,n.jsx)(r.code,{children:"user"})," object with an ",(0,n.jsx)(r.code,{children:"id"})," and ",(0,n.jsx)(r.code,{children:"name"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"exporting-the-module-and-registering-resolvers",children:"Exporting the module and registering resolvers"}),"\n",(0,n.jsxs)(r.p,{children:["Next, we need to export the module and register its resolvers in ",(0,n.jsx)(r.code,{children:"src/modules/user/index.ts"}),":"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"import './resolvers';\nimport { getUserModule } from './typedef';\n\nexport const userModule = getUserModule();\n"})})]})}function u(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},2410:(e,r,t)=>{var n=t(7402),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(e,r,t){var n,o={},l=null,c=null;for(n in void 0!==t&&(l=""+t),void 0!==r.key&&(l=""+r.key),void 0!==r.ref&&(c=r.ref),r)d.call(r,n)&&!a.hasOwnProperty(n)&&(o[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===o[n]&&(o[n]=r[n]);return{$$typeof:s,type:e,key:l,ref:c,props:o,_owner:i.current}}r.Fragment=o,r.jsx=l,r.jsxs=l},7250:(e,r,t)=>{e.exports=t(2410)},4153:(e,r,t)=>{t.d(r,{R:()=>d,x:()=>i});var n=t(7402);const s={},o=n.createContext(s);function d(e){const r=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),n.createElement(o.Provider,{value:r},e.children)}}}]);