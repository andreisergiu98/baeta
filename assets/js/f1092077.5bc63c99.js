/*! For license information please see f1092077.5bc63c99.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3045],{2954:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>d,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"getting-started/extend-modules","title":"Extend modules","description":"Learn how to extend modules in Baeta","source":"@site/docs/getting-started/extend-modules.mdx","sourceDirName":"getting-started","slug":"/getting-started/extend-modules","permalink":"/docs/getting-started/extend-modules","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4,"description":"Learn how to extend modules in Baeta"},"sidebar":"defaultSidebar","previous":{"title":"First Module","permalink":"/docs/getting-started/first-module"},"next":{"title":"Wrapping up","permalink":"/docs/getting-started/wrapping-up"}}');var r=n(7250),o=n(589);const d={sidebar_position:4,description:"Learn how to extend modules in Baeta"},i="Extend modules",l={},a=[{value:"1. Define Extension Schema",id:"1-define-extension-schema",level:3},{value:"2. Generate Types",id:"2-generate-types",level:3},{value:"3. Add Resolver",id:"3-add-resolver",level:3},{value:"4. Export Module",id:"4-export-module",level:3},{value:"Project Structure",id:"project-structure",level:2},{value:"Next Steps",id:"next-steps",level:2}];function c(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"extend-modules",children:"Extend modules"})}),"\n",(0,r.jsx)(t.p,{children:"One of the powerful features of Baeta is the ability to extend existing modules. In this guide, we'll extend our user module by adding photo capabilities."}),"\n",(0,r.jsx)(t.h3,{id:"1-define-extension-schema",children:"1. Define Extension Schema"}),"\n",(0,r.jsxs)(t.p,{children:["Create a new schema file at ",(0,r.jsx)(t.code,{children:"src/modules/user-photos/user-photos.gql"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-graphql",children:"type UserPhoto {\n  id: ID!\n  url: String!\n}\n\nextend type User {\n  photos: [UserPhoto!]\n}\n"})}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsxs)(t.p,{children:["Use the ",(0,r.jsx)(t.strong,{children:"extend"})," keyword to add new fields to existing types from other modules."]})}),"\n",(0,r.jsx)(t.h3,{id:"2-generate-types",children:"2. Generate Types"}),"\n",(0,r.jsx)(t.p,{children:"Generate TypeScript definitions for your new schema:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"yarn generate\n"})}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsx)(t.p,{children:"If you are using the watch mode, types will be automatically generated on each change."})}),"\n",(0,r.jsx)(t.h3,{id:"3-add-resolver",children:"3. Add Resolver"}),"\n",(0,r.jsxs)(t.p,{children:["Create ",(0,r.jsx)(t.code,{children:"src/modules/user-photos/resolvers.ts"})," to implement the photos field:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'import { getUserPhotosModule } from "./typedef";\n\nconst { User } = getUserPhotosModule();\n\nUser.photos(({ args, root, info, ctx }) => {\n  return [\n    {\n      id: "1",\n      url: "https://baeta.io/img/logo.svg",\n    },\n  ];\n});\n'})}),"\n",(0,r.jsx)(t.h3,{id:"4-export-module",children:"4. Export Module"}),"\n",(0,r.jsxs)(t.p,{children:["Create ",(0,r.jsx)(t.code,{children:"src/modules/user-photos/index.ts"})," to export your extension module:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'import "./resolvers";\nimport { getUserPhotosModule } from "./typedef";\n\nexport const userPhotosModule = getUserPhotosModule();\n'})}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsxs)(t.p,{children:["Remember that ",(0,r.jsx)(t.strong,{children:"@baeta/plugin-autoload"})," can automatically handle module loading and exports for you."]})}),"\n",(0,r.jsx)(t.h2,{id:"project-structure",children:"Project Structure"}),"\n",(0,r.jsx)(t.p,{children:"Your extended modules should now look like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"src/modules/\n\u251c\u2500\u2500 user/\n\u2502   \u251c\u2500\u2500 user.gql\n\u2502   \u251c\u2500\u2500 resolvers.ts\n\u2502   \u251c\u2500\u2500 typedef.ts\n\u2502   \u2514\u2500\u2500 index.ts\n\u2514\u2500\u2500 user-photos/\n    \u251c\u2500\u2500 user-photos.gql\n    \u251c\u2500\u2500 resolvers.ts\n    \u251c\u2500\u2500 typedef.ts\n    \u2514\u2500\u2500 index.ts\n"})}),"\n",(0,r.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,r.jsxs)(t.p,{children:["Let's ",(0,r.jsx)(t.a,{href:"./wrapping-up",children:"wrap everything up"})," and see how to use our modules."]})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},2410:(e,t,n)=>{var s=n(7402),r=Symbol.for("react.element"),o=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,i=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,n){var s,o={},a=null,c=null;for(s in void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(c=t.ref),t)d.call(t,s)&&!l.hasOwnProperty(s)&&(o[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===o[s]&&(o[s]=t[s]);return{$$typeof:r,type:e,key:a,ref:c,props:o,_owner:i.current}}t.Fragment=o,t.jsx=a,t.jsxs=a},7250:(e,t,n)=>{e.exports=n(2410)},589:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>i});var s=n(7402);const r={},o=s.createContext(r);function d(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);