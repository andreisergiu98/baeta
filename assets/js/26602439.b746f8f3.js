/*! For license information please see 26602439.b746f8f3.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[623],{8176:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(7250),a=n(4153);const o={sidebar_position:5,description:""},i="Wrapping up",s={id:"getting-started/wrapping-up",title:"Wrapping up",description:"",source:"@site/docs/getting-started/wrapping-up.mdx",sourceDirName:"getting-started",slug:"/getting-started/wrapping-up",permalink:"/docs/getting-started/wrapping-up",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,description:""},sidebar:"tutorialSidebar",previous:{title:"Extend modules",permalink:"/docs/getting-started/extend-modules"}},p={},c=[{value:"Create the application",id:"create-the-application",level:3},{value:"Start the application",id:"start-the-application",level:3}];function l(e){const t={admonition:"admonition",code:"code",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"wrapping-up",children:"Wrapping up"})}),"\n",(0,r.jsx)(t.h3,{id:"create-the-application",children:"Create the application"}),"\n",(0,r.jsxs)(t.p,{children:["Our modules are now ready to use!\nWe can create an entry point for our application in ",(0,r.jsx)(t.code,{children:"src/app.ts"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { createApplication } from '@baeta/core';\nimport { userModule } from './modules/user';\nimport { userPhotosModule } from './modules/user-photos';\n\nimport { createYoga } from 'graphql-yoga';\nimport { createServer } from 'node:http';\n\nconst baeta = createApplication({\n  modules: [userModule, userPhotosModule],\n});\n\nconst yoga = createYoga({\n  schema: baeta.schema,\n});\n\nconst server = createServer(yoga);\n\nserver.listen(4000, () => {\n  console.log('\ud83d\ude80 Server ready at http://localhost:4000/graphql');\n});\n"})}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsx)(t.p,{children:"We are using graphql-yoga because it's very easy to setup, but Baeta is compatible with all graphql servers."})}),"\n",(0,r.jsx)(t.h3,{id:"start-the-application",children:"Start the application"}),"\n",(0,r.jsx)(t.p,{children:"That's it! You can now start your application by running the following command:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"yarn start\n# or\nyarn baeta build --watch --generate --onSuccess='node --enable-source-maps dist/app.js'\n"})})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},2410:(e,t,n)=>{var r=n(7402),a=Symbol.for("react.element"),o=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,l=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,r)&&!p.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:a,type:e,key:c,ref:l,props:o,_owner:s.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},7250:(e,t,n)=>{e.exports=n(2410)},4153:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>s});var r=n(7402);const a={},o=r.createContext(a);function i(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);