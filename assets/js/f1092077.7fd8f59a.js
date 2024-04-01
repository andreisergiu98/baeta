/*! For license information please see f1092077.7fd8f59a.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[610],{199:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>n,metadata:()=>i,toc:()=>l});var s=r(966),o=r(1503);const n={sidebar_position:4,description:""},d="Extend modules",i={id:"getting-started/extend-modules",title:"Extend modules",description:"",source:"@site/docs/getting-started/extend-modules.mdx",sourceDirName:"getting-started",slug:"/getting-started/extend-modules",permalink:"/docs/getting-started/extend-modules",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,description:""},sidebar:"tutorialSidebar",previous:{title:"First module",permalink:"/docs/getting-started/first-module"},next:{title:"Wrapping up",permalink:"/docs/getting-started/wrapping-up"}},a={},l=[];function c(e){const t={code:"code",h1:"h1",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"extend-modules",children:"Extend modules"}),"\n",(0,s.jsxs)(t.p,{children:["One of the powerful features of Baeta is the ability to extend modules with other modules.\nLet's extend our user module with a ",(0,s.jsx)(t.code,{children:"user-photos"})," module."]}),"\n",(0,s.jsxs)(t.p,{children:["We create a new schema file at ",(0,s.jsx)(t.code,{children:"src/modules/user-photos/user-photos.gql"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-graphql",children:"type UserPhoto {\n  id: ID!\n  url: String!\n}\n\nextend type User {\n  photos: [UserPhoto!]\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Generate types again and then we create a resolver for the photos field in ",(0,s.jsx)(t.code,{children:"src/modules/user-photos/resolvers.ts"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"import { getUserPhotosModule } from './typedef';\n\nconst { User } = getUserPhotosModule();\n\nUser.photos(({ args, root, info, ctx }) => {\n  return [\n    {\n      id: '1',\n      url: 'https://baeta.io/img/logo.svg',\n    },\n  ];\n});\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Next, we export the ",(0,s.jsx)(t.code,{children:"userPhotosModule"})," in ",(0,s.jsx)(t.code,{children:"src/modules/user-photos/index.ts"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"import './resolvers';\nimport { getUserPhotosModule } from './typedef';\n\nexport const userPhotosModule = getUserPhotosModule();\n"})})]})}function u(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},3407:(e,t,r)=>{var s=r(3900),o=Symbol.for("react.element"),n=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,i=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var s,n={},l=null,c=null;for(s in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(c=t.ref),t)d.call(t,s)&&!a.hasOwnProperty(s)&&(n[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===n[s]&&(n[s]=t[s]);return{$$typeof:o,type:e,key:l,ref:c,props:n,_owner:i.current}}t.Fragment=n,t.jsx=l,t.jsxs=l},966:(e,t,r)=>{e.exports=r(3407)},1503:(e,t,r)=>{r.d(t,{a:()=>d});var s=r(3900);const o={},n=s.createContext(o);function d(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);