/*! For license information please see 2e384b39.484552c9.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3683],{589:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>o});var r=t(7402);const a={},s=r.createContext(a);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:n},e.children)}},2410:(e,n,t)=>{var r=t(7402),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(e,n,t){var r,s={},u=null,c=null;for(r in void 0!==t&&(u=""+t),void 0!==n.key&&(u=""+n.key),void 0!==n.ref&&(c=n.ref),n)i.call(n,r)&&!l.hasOwnProperty(r)&&(s[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===s[r]&&(s[r]=n[r]);return{$$typeof:a,type:e,key:u,ref:c,props:s,_owner:o.current}}n.Fragment=s,n.jsx=u,n.jsxs=u},4216:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"extensions/authorization","title":"Authorization","description":"Baeta provides a flexible and type-safe authorization system that allows you to define granular access controls at both operation and field levels. With support for default scopes, dynamic rules, and a permission granting system, you can implement complex authorization patterns while maintaining clean and maintainable code.","source":"@site/docs/extensions/authorization.mdx","sourceDirName":"extensions","slug":"/extensions/authorization","permalink":"/docs/extensions/authorization","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":10,"frontMatter":{"sidebar_position":10},"sidebar":"defaultSidebar","previous":{"title":"Extensions","permalink":"/docs/extensions/"},"next":{"title":"Complexity","permalink":"/docs/extensions/complexity"}}');var a=t(7250),s=t(589),i=t(6307);const o={sidebar_position:10},l="Authorization",u={},c=[{value:"Key Features",id:"key-features",level:2},{value:"Installation",id:"installation",level:2},{value:"Basic Setup",id:"basic-setup",level:2},{value:"Authorization Examples",id:"authorization-examples",level:2},{value:"Basic Static Rules",id:"basic-static-rules",level:3},{value:"Post-Resolution Authorization",id:"post-resolution-authorization",level:3},{value:"Subscription Rules",id:"subscription-rules",level:3},{value:"Type-wide Rules",id:"type-wide-rules",level:3},{value:"Grants system",id:"grants-system",level:3},{value:"Authorization Operators",id:"authorization-operators",level:3},{value:"Default Scopes",id:"default-scopes",level:2},{value:"Defining Default Scopes",id:"defining-default-scopes",level:3},{value:"Skipping Default Scopes",id:"skipping-default-scopes",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"authorization",children:"Authorization"})}),"\n",(0,a.jsx)(n.p,{children:"Baeta provides a flexible and type-safe authorization system that allows you to define granular access controls at both operation and field levels. With support for default scopes, dynamic rules, and a permission granting system, you can implement complex authorization patterns while maintaining clean and maintainable code."}),"\n",(0,a.jsx)(n.h2,{id:"key-features",children:"Key Features"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Type-safe authorization rules"}),"\n",(0,a.jsx)(n.li,{children:"Default scopes with override capability"}),"\n",(0,a.jsx)(n.li,{children:"Pre and post-resolution authorization"}),"\n",(0,a.jsx)(n.li,{children:"Granular field-level permissions"}),"\n",(0,a.jsx)(n.li,{children:"Permission grants between resolvers"}),"\n",(0,a.jsx)(n.li,{children:"Scope caching for performance"}),"\n",(0,a.jsx)(n.li,{children:"Async/sync authorization support"}),"\n",(0,a.jsx)(n.li,{children:"Subscription-specific controls"}),"\n",(0,a.jsx)(n.li,{children:"Type-wide authorization rules"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n","\n",(0,a.jsx)(i.z,{package:"@baeta/extension-auth"}),"\n",(0,a.jsx)(n.h2,{id:"basic-setup",children:"Basic Setup"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Define Authorization Scopes"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'import { UnauthenticatedError } from "@baeta/errors";\nimport { authExtension } from "@baeta/extension-auth";\nimport type { Context } from "../types/context";\n\ndeclare global {\n  export namespace AuthExtension {\n    export interface Scopes {\n      isPublic: boolean;\n      isLoggedIn: boolean;\n      hasAccess: "guest" | "user" | "moderator" | "admin";\n    }\n\n    export interface GrantsMap {\n      readUserPhotos: boolean;\n    }\n  }\n}\n\nexport const authExt = authExtension<Context>(async (ctx) => {\n  const accessList: string[] = ["guest", "user"];\n\n  // You can fetch data before the scopes are created\n\n  return {\n    isPublic: true,\n    isLoggedIn: async () => {\n      // But you can also use scope loaders, which will be resolved lazily, when needed\n      if (!ctx.userId) {\n        throw new UnauthenticatedError();\n      }\n      return true;\n    },\n    hasAccess: (access: string) => {\n      // Scope loaders are also required for non-boolean scopes\n      return ctx.user?.accessList.includes(access) ?? false;\n    },\n  };\n});\n'})}),"\n",(0,a.jsxs)(n.ol,{start:"2",children:["\n",(0,a.jsx)(n.li,{children:"Register the Extension"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'import { createExtensions } from "@baeta/core";\nimport { authExt } from "./auth-extension";\n\nexport default createExtensions(\n  authExt,\n  //... other extensions\n);\n'})}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["Authorization checks should be registered first in your chain, as they determine if a request can proceed at all. This ensures unauthorized requests are rejected early in the process.\nThe only exception being the ",(0,a.jsx)(n.code,{children:"complexity"})," extension."]})}),"\n",(0,a.jsxs)(n.ol,{start:"3",children:["\n",(0,a.jsx)(n.li,{children:"Point Baeta to extensions entrypoint (if you haven't already)"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'export default defineConfig({\n  graphql: {\n    extensions: "src/extensions/index.ts",\n    // ... other config\n  },\n});\n'})}),"\n",(0,a.jsx)(n.h2,{id:"authorization-examples",children:"Authorization Examples"}),"\n",(0,a.jsx)(n.h3,{id:"basic-static-rules",children:"Basic Static Rules"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'// Public or authenticated access\nQuery.user.$auth({\n  $or: {\n    isPublic: true,\n    isLoggedIn: true,\n  },\n});\n\n// Admin-only access\nMutation.createUser.$auth({\n  hasAccess: "admin",\n});\n'})}),"\n",(0,a.jsx)(n.h3,{id:"post-resolution-authorization",children:"Post-Resolution Authorization"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'// Post-auth checks permission after resolver execution\n// Useful to avoid double database queries when you need the resource for permission checking\nQuery.user.$postAuth((params, result) => {\n  if (result && result.id === params.ctx.userId) {\n    return true; // Allow access if user is requesting their own data\n  }\n  return { hasAccess: "admin" }; // Require admin access for other users\' data\n});\n\n// Compared to pre-resolution auth which might require an extra database query\nQuery.user.$auth(async (params) => {\n  const user = await db.user.findFirst({\n    // Extra database query\n    where: { id: params.args.id },\n  });\n\n  if (user && user.id === params.ctx.userId) return {};\n  return { hasAccess: "admin" };\n});\n'})}),"\n",(0,a.jsx)(n.h3,{id:"subscription-rules",children:"Subscription Rules"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"// Apply to subscription phase\nSubscription.userCreated.subscribe.$auth({\n  isLoggedIn: true,\n});\n\n// Apply to resolve phase\nSubscription.userCreated.resolve.$auth({\n  isLoggedIn: true,\n});\n\n// Apply to both phases\nSubscription.userCreated.$auth({\n  isLoggedIn: true,\n});\n"})}),"\n",(0,a.jsx)(n.h3,{id:"type-wide-rules",children:"Type-wide Rules"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"// Apply to all Query fields\nQuery.$auth({\n  isLoggedIn: true,\n});\n\n// Apply to all User fields\nUser.$auth({\n  isLoggedIn: true,\n});\n"})}),"\n",(0,a.jsx)(n.h3,{id:"grants-system",children:"Grants system"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'// Grant permission\nQuery.user.$auth(\n  {\n    $or: { isPublic: true, isLoggedIn: true },\n  },\n  {\n    grants: ["readUserPhotos"],\n  },\n);\n\n// Use granted permission\nUser.photos.$auth({\n  $granted: "readUserPhotos",\n});\n'})}),"\n",(0,a.jsx)(n.h3,{id:"authorization-operators",children:"Authorization Operators"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"$or"}),": Any condition must be true"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"$and"}),": All conditions must be true"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"$chain"}),": Sequential evaluation"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"$race"}),": Parallel evaluation"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"$granted"}),": Check granted permissions"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"default-scopes",children:"Default Scopes"}),"\n",(0,a.jsx)(n.p,{children:"Default scopes provide base authorization rules that apply to all operations. They are defined when creating the auth extension and are combined with local rules using an AND operator."}),"\n",(0,a.jsx)(n.h3,{id:"defining-default-scopes",children:"Defining Default Scopes"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"export const authExt = authExtension<Context>(\n  async (ctx) => {\n    // Define user scope values as explained above\n    return {...};\n  },\n  {\n    // All queries, mutations, and subscriptions will require the user to be logged in.\n    // You will still need to pay attention for relationships and nested queries.\n    defaultScopes: {\n      Query: {\n        isLoggedIn: true,\n      },\n      Mutation: {\n        isLoggedIn: true,\n      },\n      Subscription: {\n        subscribe: {\n          isLoggedIn: true,\n        },\n      },\n    },\n  },\n)\n"})}),"\n",(0,a.jsx)(n.h3,{id:"skipping-default-scopes",children:"Skipping Default Scopes"}),"\n",(0,a.jsxs)(n.p,{children:["You can bypass default scopes for specific operations using the ",(0,a.jsx)(n.code,{children:"skipDefaults"})," option:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"Query.publicContent.$auth(\n  {\n    isPublic: true,\n  },\n  {\n    skipDefaults: true,\n  },\n);\n"})}),"\n",(0,a.jsxs)(n.p,{children:["For detailed examples, see the ",(0,a.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/tree/main/examples/auth",children:"Baeta authorization example"}),"."]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},6307:(e,n,t)=>{t.d(n,{z:()=>J,M:()=>X});var r=t(7250),a=t(4291),s=t(7402),i=t(9679);const o={tabItem:"tabItem_VGyM"};var l=Object.defineProperty,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,p=(e,n,t)=>n in e?l(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,h=(e,n)=>{for(var t in n||(n={}))c.call(n,t)&&p(e,t,n[t]);if(u)for(var t of u(n))d.call(n,t)&&p(e,t,n[t]);return e};function f({children:e,hidden:n,className:t}){return s.createElement("div",h({role:"tabpanel",className:(0,i.A)(o.tabItem,t)},{hidden:n}),e)}var b=t(2118),m=t(2494),x=t(3450),g=t(3627),y=t(7912),v=t(4091),j=Object.defineProperty,w=Object.defineProperties,A=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable,I=(e,n,t)=>n in e?j(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,P=(e,n)=>{for(var t in n||(n={}))E.call(n,t)&&I(e,t,n[t]);if(k)for(var t of k(n))S.call(n,t)&&I(e,t,n[t]);return e},z=(e,n)=>w(e,A(n));function O(e){var n,t;return null!=(t=null==(n=s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:n.filter(Boolean))?t:[]}function _(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=null!=n?n:function(e){return O(e).map((({props:{value:e,label:n,attributes:t,default:r}})=>({value:e,label:n,attributes:t,default:r})))}(t);return function(e){const n=(0,y.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function D({value:e,tabValues:n}){return n.some((n=>n.value===e))}function $({queryString:e=!1,groupId:n}){const t=(0,m.W6)(),r=function({queryString:e=!1,groupId:n}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:e,groupId:n});return[(0,g.aZ)(r),(0,s.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(t.location.search);n.set(r,e),t.replace(z(P({},t.location),{search:n.toString()}))}),[r,t])]}function N(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=_(e),[i,o]=(0,s.useState)((()=>function({defaultValue:e,tabValues:n}){var t;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!D({value:e,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[l,u]=$({queryString:t,groupId:r}),[c,d]=function({groupId:e}){const n=function(e){return e?`docusaurus.tab.${e}`:null}(e),[t,r]=(0,v.Dv)(n);return[t,(0,s.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:r}),p=(()=>{const e=null!=l?l:c;return D({value:e,tabValues:a})?e:null})();(0,x.A)((()=>{p&&o(p)}),[p]);return{selectedValue:i,selectValue:(0,s.useCallback)((e=>{if(!D({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),d(e)}),[u,d,a]),tabValues:a}}var q=t(9314);const T={tabList:"tabList_munt",tabItem:"tabItem_msIP"};var C=Object.defineProperty,L=Object.defineProperties,R=Object.getOwnPropertyDescriptors,V=Object.getOwnPropertySymbols,U=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,M=(e,n,t)=>n in e?C(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,Q=(e,n)=>{for(var t in n||(n={}))U.call(n,t)&&M(e,t,n[t]);if(V)for(var t of V(n))B.call(n,t)&&M(e,t,n[t]);return e},F=(e,n)=>L(e,R(n));function G({className:e,block:n,selectedValue:t,selectValue:r,tabValues:a}){const o=[],{blockElementScrollPositionUntilNextRender:l}=(0,b.a_)(),u=e=>{const n=e.currentTarget,s=o.indexOf(n),i=a[s].value;i!==t&&(l(n),r(i))},c=e=>{var n,t;let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;r=null!=(n=o[t])?n:o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;r=null!=(t=o[n])?t:o[o.length-1];break}}null==r||r.focus()};return s.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},e)},a.map((({value:e,label:n,attributes:r})=>s.createElement("li",F(Q({role:"tab",tabIndex:t===e?0:-1,"aria-selected":t===e,key:e,ref:e=>{o.push(e)},onKeyDown:c,onClick:u},r),{className:(0,i.A)("tabs__item",T.tabItem,null==r?void 0:r.className,{"tabs__item--active":t===e})}),null!=n?n:e))))}function Y({lazy:e,children:n,selectedValue:t}){const r=(Array.isArray(n)?n:[n]).filter(Boolean);if(e){const e=r.find((e=>e.props.value===t));return e?(0,s.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return s.createElement("div",{className:"margin-top--md"},r.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==t}))))}function W(e){const n=N(e);return s.createElement("div",{className:(0,i.A)("tabs-container",T.tabList)},s.createElement(G,Q(Q({},n),e)),s.createElement(Y,Q(Q({},n),e)))}function K(e){const n=(0,q.A)();return s.createElement(W,Q({key:String(n)},e),O(e.children))}function J(e){const n=e.dev?" -D":"";return(0,r.jsxs)(K,{groupId:"package-manager",children:[(0,r.jsx)(f,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,n]})}),(0,r.jsx)(f,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,n]})}),(0,r.jsx)(f,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,n]})}),(0,r.jsx)(f,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun add ",e.package,n]})})]})}function X(e){return(0,r.jsxs)(K,{groupId:"package-manager",children:[(0,r.jsx)(f,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn create ",e.package]})}),(0,r.jsx)(f,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npx create-",e.package]})}),(0,r.jsx)(f,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm create ",e.package]})}),(0,r.jsx)(f,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun create ",e.package]})}),(0,r.jsx)(f,{value:"yarn-2",label:"yarn 2+",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn dlx create-",e.package]})})]})}},7250:(e,n,t)=>{e.exports=t(2410)}}]);