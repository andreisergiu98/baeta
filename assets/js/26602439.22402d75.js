/*! For license information please see 26602439.22402d75.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[7623],{589:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>s});var r=n(7402);const a={},i=r.createContext(a);function o(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(i.Provider,{value:t},e.children)}},2410:(e,t,n)=>{var r=n(7402),a=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function p(e,t,n){var r,i={},p=null,c=null;for(r in void 0!==n&&(p=""+n),void 0!==t.key&&(p=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,r)&&!l.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:a,type:e,key:p,ref:c,props:i,_owner:s.current}}t.Fragment=i,t.jsx=p,t.jsxs=p},7250:(e,t,n)=>{e.exports=n(2410)},7667:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>p});const r=JSON.parse('{"id":"getting-started/wrapping-up","title":"Wrapping up","description":"Create and run your Baeta GraphQL application","source":"@site/docs/getting-started/wrapping-up.mdx","sourceDirName":"getting-started","slug":"/getting-started/wrapping-up","permalink":"/docs/getting-started/wrapping-up","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"description":"Create and run your Baeta GraphQL application"},"sidebar":"defaultSidebar","previous":{"title":"Extend modules","permalink":"/docs/getting-started/extend-modules"},"next":{"title":"Stability","permalink":"/docs/stability"}}');var a=n(7250),i=n(589);const o={sidebar_position:5,description:"Create and run your Baeta GraphQL application"},s="Wrapping up",l={},p=[{value:"Create the application",id:"create-the-application",level:2},{value:"Start the application",id:"start-the-application",level:3},{value:"What&#39;s Next?",id:"whats-next",level:2}];function c(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"wrapping-up",children:"Wrapping up"})}),"\n",(0,a.jsx)(t.p,{children:"Now that we have our modules ready, let's create and run our GraphQL application."}),"\n",(0,a.jsx)(t.h2,{id:"create-the-application",children:"Create the application"}),"\n",(0,a.jsxs)(t.p,{children:["Create an entry point for your application in ",(0,a.jsx)(t.code,{children:"src/app.ts"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:'import { createApplication } from "@baeta/core";\nimport { userModule } from "./modules/user";\nimport { userPhotosModule } from "./modules/user-photos";\n\nimport { createYoga } from "graphql-yoga";\nimport { createServer } from "node:http";\n\nconst baeta = createApplication({\n  modules: [userModule, userPhotosModule],\n});\n\nconst yoga = createYoga({\n  schema: baeta.schema,\n});\n\nconst server = createServer(yoga);\n\nserver.listen(4000, () => {\n  console.log("\ud83d\ude80 Server ready at http://localhost:4000/graphql");\n});\n'})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsx)(t.p,{children:"We're using GraphQL Yoga for this example due to its simple setup, but Baeta is compatible with all GraphQL servers like Apollo Server, Express GraphQL, and others."})}),"\n",(0,a.jsx)(t.h3,{id:"start-the-application",children:"Start the application"}),"\n",(0,a.jsx)(t.p,{children:"Run your application with:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"yarn start\n"})}),"\n",(0,a.jsx)(t.p,{children:"Or with the full command:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"yarn baeta build --watch --generate --onSuccess='node --enable-source-maps dist/app.js'\n"})}),"\n",(0,a.jsx)(t.h2,{id:"whats-next",children:"What's Next?"}),"\n",(0,a.jsx)(t.p,{children:"Now that you have a running GraphQL API, you can:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"../extensions/authorization",children:"Add authentication"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"../extensions/caching",children:"Implement caching"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"../extensions/complexity",children:"Safeguard from malicious operations"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"../plugins/builtin-directives",children:"Add validation"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"../guides/directives",children:"Add custom directives"})}),"\n"]}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsxs)(t.p,{children:["Visit our ",(0,a.jsx)(t.a,{href:"https://github.com/andreisergiu98/baeta/tree/chore/examples/examples",children:"examples repository"})," for more complex implementations and real-world usage patterns."]})})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}}}]);