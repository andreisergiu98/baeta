/*! For license information please see ed18e777.864fb7a0.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[97],{1314:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>u});const r=JSON.parse('{"id":"extensions/complexity","title":"Complexity","description":"Baeta provides a query complexity analysis system that helps protect your GraphQL API from resource-exhausting queries. It calculates the complexity of incoming queries and rejects those that exceed configured limits.","source":"@site/docs/extensions/complexity.mdx","sourceDirName":"extensions","slug":"/extensions/complexity","permalink":"/docs/extensions/complexity","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":20,"frontMatter":{"sidebar_position":20,"title":"Complexity"},"sidebar":"defaultSidebar","previous":{"title":"Authorization","permalink":"/docs/extensions/authorization"},"next":{"title":"Caching","permalink":"/docs/extensions/caching"}}');var l=n(7250),a=n(589),i=n(1948);const s={sidebar_position:20,title:"Complexity"},o="Query Complexity",c={},u=[{value:"Key Features",id:"key-features",level:2},{value:"Installation",id:"installation",level:2},{value:"Basic Setup",id:"basic-setup",level:2},{value:"Customizing Complexity Rules",id:"customizing-complexity-rules",level:2},{value:"Field-Level Configuration",id:"field-level-configuration",level:3},{value:"Dynamic Complexity Rules",id:"dynamic-complexity-rules",level:3},{value:"How Complexity is Calculated",id:"how-complexity-is-calculated",level:2}];function p(e){const t={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.header,{children:(0,l.jsx)(t.h1,{id:"query-complexity",children:"Query Complexity"})}),"\n",(0,l.jsx)(t.p,{children:"Baeta provides a query complexity analysis system that helps protect your GraphQL API from resource-exhausting queries. It calculates the complexity of incoming queries and rejects those that exceed configured limits."}),"\n",(0,l.jsx)(t.h2,{id:"key-features",children:"Key Features"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"Automatic complexity calculation for all fields"}),"\n",(0,l.jsx)(t.li,{children:"Customizable complexity per field"}),"\n",(0,l.jsx)(t.li,{children:"Dynamic limits based on context"}),"\n",(0,l.jsx)(t.li,{children:"List operation handling with multipliers"}),"\n",(0,l.jsx)(t.li,{children:"Depth and breadth limitations"}),"\n",(0,l.jsx)(t.li,{children:"Context-aware complexity rules"}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n","\n",(0,l.jsx)(i.z,{package:"@baeta/extension-complexity"}),"\n",(0,l.jsx)(t.h2,{id:"basic-setup",children:"Basic Setup"}),"\n",(0,l.jsxs)(t.ol,{children:["\n",(0,l.jsx)(t.li,{children:"Create the Extension"}),"\n"]}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-typescript",children:'import { createExtensions } from "@baeta/core";\nimport { complexityExtension } from "@baeta/extension-complexity";\nimport type { Context } from "./types/context";\n\nconst complexity = complexityExtension<Context>({\n  // Default complexity score for fields\n  defaultComplexity: 1,\n  // Multiplier applied to list fields\n  defaultListMultiplier: 10,\n  // Dynamic limits based on context\n  async limit(ctx) {\n    return {\n      depth: 10, // Maximum query depth\n      breadth: 50, // Maximum number of fields at each level\n      complexity: 1000, // Maximum total complexity score\n    };\n  },\n  // Alternatively, use static limits\n  // limit: {\n  //   depth: 10,\n  //   breadth: 50,\n  //   complexity: 1000,\n  // }\n});\n'})}),"\n",(0,l.jsxs)(t.ol,{start:"2",children:["\n",(0,l.jsx)(t.li,{children:"Afterwards register it"}),"\n"]}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-typescript",children:'import { createExtensions } from "@baeta/core";\nimport { complexity } from "./complexity-extension";\nimport { authExt } from "./auth-extension";\n\nexport default createExtensions(\n  complexity,\n  authExt,\n  //... other extensions\n);\n'})}),"\n",(0,l.jsx)(t.admonition,{type:"tip",children:(0,l.jsx)(t.p,{children:"Consider placing complexity checks before authorization. This can prevent unnecessary permission checks on queries that would be rejected for being too complex anyway."})}),"\n",(0,l.jsxs)(t.ol,{start:"2",children:["\n",(0,l.jsx)(t.li,{children:"Point Baeta to registered extensions (if you haven't already)"}),"\n"]}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-typescript",children:'export default defineConfig({\n  graphql: {\n    extensions: "src/extensions/index.ts",\n    // ... other config\n  },\n});\n'})}),"\n",(0,l.jsx)(t.h2,{id:"customizing-complexity-rules",children:"Customizing Complexity Rules"}),"\n",(0,l.jsx)(t.h3,{id:"field-level-configuration",children:"Field-Level Configuration"}),"\n",(0,l.jsx)(t.p,{children:"You can customize complexity rules for specific fields or types:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-typescript",children:'import { getUserModule } from "./typedef";\n\nconst { Query } = getUserModule();\n\n// Disable complexity calculation for specific field\nQuery.user.$complexity(() => false);\n\n// Custom complexity score for specific field\nQuery.users.$complexity(({ args, ctx }) => ({\n  complexity: 1, // Base complexity score\n  multiplier: 5, // Custom multiplier for list operations\n}));\n'})}),"\n",(0,l.jsx)(t.h3,{id:"dynamic-complexity-rules",children:"Dynamic Complexity Rules"}),"\n",(0,l.jsx)(t.p,{children:"Complexity rules can be determined dynamically based on context or arguments:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-typescript",children:"Query.users.$complexity(({ args, ctx }) => {\n  return {\n    complexity: 1,\n    multiplier: args.limit,\n  };\n});\n"})}),"\n",(0,l.jsx)(t.h2,{id:"how-complexity-is-calculated",children:"How Complexity is Calculated"}),"\n",(0,l.jsxs)(t.ol,{children:["\n",(0,l.jsx)(t.li,{children:"Each field has a base complexity (default: 1)"}),"\n",(0,l.jsx)(t.li,{children:"List fields are multiplied by the list multiplier"}),"\n",(0,l.jsx)(t.li,{children:"Nested fields add to the total complexity"}),"\n",(0,l.jsx)(t.li,{children:"The total is compared against the configured limit"}),"\n"]}),"\n",(0,l.jsx)(t.p,{children:"Example:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-graphql",children:"query {\n  users(first: 10) {\n    # complexity: 1 * 10 (multiplier)\n    name # complexity: 1 * 10 (inherited multiplier)\n    posts {\n      # complexity: 1 * 10 * 10 (nested list)\n      title # complexity: 1 * 10 * 10 (inherited multiplier)\n    }\n  }\n}\n# Total complexity: 210\n"})})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}},1948:(e,t,n)=>{n.d(t,{z:()=>W,M:()=>J});var r=n(7250),l=n(6449),a=n(7402),i=n(9679);const s={tabItem:"tabItem_VGyM"};var o=Object.defineProperty,c=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,d=(e,t,n)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))u.call(t,n)&&d(e,n,t[n]);if(c)for(var n of c(t))p.call(t,n)&&d(e,n,t[n]);return e};function h({children:e,hidden:t,className:n}){return a.createElement("div",m({role:"tabpanel",className:(0,i.A)(s.tabItem,n)},{hidden:t}),e)}var x=n(9898),y=n(2494),f=n(950),b=n(8319),g=n(7060),v=n(4483),j=Object.defineProperty,w=Object.defineProperties,C=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable,I=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))E.call(t,n)&&I(e,n,t[n]);if(k)for(var n of k(t))O.call(t,n)&&I(e,n,t[n]);return e},A=(e,t)=>w(e,C(t));function P(e){var t,n;return null!=(n=null==(t=a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))?n:[]}function S(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=null!=t?t:function(e){return P(e).map((({props:{value:e,label:t,attributes:n,default:r}})=>({value:e,label:t,attributes:n,default:r})))}(n);return function(e){const t=(0,g.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function q({value:e,tabValues:t}){return t.some((t=>t.value===e))}function N({queryString:e=!1,groupId:t}){const n=(0,y.W6)(),r=function({queryString:e=!1,groupId:t}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=t?t:null}({queryString:e,groupId:t});return[(0,b.aZ)(r),(0,a.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(n.location.search);t.set(r,e),n.replace(A(_({},n.location),{search:t.toString()}))}),[r,n])]}function D(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,l=S(e),[i,s]=(0,a.useState)((()=>function({defaultValue:e,tabValues:t}){var n;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!q({value:e,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const r=null!=(n=t.find((e=>e.default)))?n:t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[o,c]=N({queryString:n,groupId:r}),[u,p]=function({groupId:e}){const t=function(e){return e?`docusaurus.tab.${e}`:null}(e),[n,r]=(0,v.Dv)(t);return[n,(0,a.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:r}),d=(()=>{const e=null!=o?o:u;return q({value:e,tabValues:l})?e:null})();(0,f.A)((()=>{d&&s(d)}),[d]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!q({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),p(e)}),[c,p,l]),tabValues:l}}var T=n(6222);const V={tabList:"tabList_munt",tabItem:"tabItem_msIP"};var L=Object.defineProperty,R=Object.defineProperties,z=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,Q=(e,t,n)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,F=(e,t)=>{for(var n in t||(t={}))$.call(t,n)&&Q(e,n,t[n]);if(M)for(var n of M(t))B.call(t,n)&&Q(e,n,t[n]);return e},U=(e,t)=>R(e,z(t));function G({className:e,block:t,selectedValue:n,selectValue:r,tabValues:l}){const s=[],{blockElementScrollPositionUntilNextRender:o}=(0,x.a_)(),c=e=>{const t=e.currentTarget,a=s.indexOf(t),i=l[a].value;i!==n&&(o(t),r(i))},u=e=>{var t,n;let r=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=s.indexOf(e.currentTarget)+1;r=null!=(t=s[n])?t:s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;r=null!=(n=s[t])?n:s[s.length-1];break}}null==r||r.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},e)},l.map((({value:e,label:t,attributes:r})=>a.createElement("li",U(F({role:"tab",tabIndex:n===e?0:-1,"aria-selected":n===e,key:e,ref:e=>{s.push(e)},onKeyDown:u,onClick:c},r),{className:(0,i.A)("tabs__item",V.tabItem,null==r?void 0:r.className,{"tabs__item--active":n===e})}),null!=t?t:e))))}function K({lazy:e,children:t,selectedValue:n}){const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(e){const e=r.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return a.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function Y(e){const t=D(e);return a.createElement("div",{className:(0,i.A)("tabs-container",V.tabList)},a.createElement(G,F(F({},t),e)),a.createElement(K,F(F({},t),e)))}function H(e){const t=(0,T.A)();return a.createElement(Y,F({key:String(t)},e),P(e.children))}function W(e){const t=e.dev?" -D":"";return(0,r.jsxs)(H,{groupId:"package-manager",children:[(0,r.jsx)(h,{value:"yarn",children:(0,r.jsxs)(l.A,{language:"bash",children:["yarn add ",e.package,t]})}),(0,r.jsx)(h,{value:"npm",children:(0,r.jsxs)(l.A,{language:"bash",children:["npm install ",e.package,t]})}),(0,r.jsx)(h,{value:"pnpm",children:(0,r.jsxs)(l.A,{language:"bash",children:["pnpm add ",e.package,t]})}),(0,r.jsx)(h,{value:"bun",children:(0,r.jsxs)(l.A,{language:"bash",children:["bun add ",e.package,t]})})]})}function J(e){return(0,r.jsxs)(H,{groupId:"package-manager",children:[(0,r.jsx)(h,{value:"yarn",children:(0,r.jsxs)(l.A,{language:"bash",children:["yarn create ",e.package]})}),(0,r.jsx)(h,{value:"npm",children:(0,r.jsxs)(l.A,{language:"bash",children:["npx create-",e.package]})}),(0,r.jsx)(h,{value:"pnpm",children:(0,r.jsxs)(l.A,{language:"bash",children:["pnpm create ",e.package]})}),(0,r.jsx)(h,{value:"bun",children:(0,r.jsxs)(l.A,{language:"bash",children:["bun create ",e.package]})}),(0,r.jsx)(h,{value:"yarn-2",label:"yarn 2+",children:(0,r.jsxs)(l.A,{language:"bash",children:["yarn dlx create-",e.package]})})]})}},2410:(e,t,n)=>{var r=n(7402),l=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,a={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,r)&&!o.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:l,type:e,key:c,ref:u,props:a,_owner:s.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},7250:(e,t,n)=>{e.exports=n(2410)},589:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>s});var r=n(7402);const l={},a=r.createContext(l);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);