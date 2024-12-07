/*! For license information please see 8af9fe22.420159a6.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3194],{34054:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"guides/environment","title":"Environment","description":"Baeta provides a type-safe environment variable parser that helps you validate and transform environment variables at runtime while maintaining full type safety.","source":"@site/docs/guides/environment.mdx","sourceDirName":"guides","slug":"/guides/environment","permalink":"/docs/guides/environment","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":130,"frontMatter":{"sidebar_position":130,"title":"Environment"},"sidebar":"defaultSidebar","previous":{"title":"Typed PubSub","permalink":"/docs/guides/typed-pubsub"},"next":{"title":"Extensions","permalink":"/docs/category/extensions"}}');var a=r(77250),s=r(50589),i=r(95108);const l={sidebar_position:130,title:"Environment"},o="Environment Parser",c={},u=[{value:"Installation",id:"installation",level:2},{value:"Basic Usage",id:"basic-usage",level:2},{value:"Configuration Options",id:"configuration-options",level:2},{value:"Types",id:"types",level:3},{value:"TypeScript Support",id:"typescript-support",level:2},{value:"Error Handling",id:"error-handling",level:2},{value:"Examples",id:"examples",level:2},{value:"Required Variables",id:"required-variables",level:3},{value:"Default Values",id:"default-values",level:3},{value:"Custom Resolvers",id:"custom-resolvers",level:3},{value:"Complex Configuration Example",id:"complex-configuration-example",level:3},{value:"Environment Sources",id:"environment-sources",level:2},{value:"Node.js",id:"nodejs",level:3},{value:"Deno",id:"deno",level:3},{value:"Bun",id:"bun",level:3},{value:"Vite",id:"vite",level:3},{value:"Next.js",id:"nextjs",level:3}];function p(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"environment-parser",children:"Environment Parser"})}),"\n",(0,a.jsx)(n.p,{children:"Baeta provides a type-safe environment variable parser that helps you validate and transform environment variables at runtime while maintaining full type safety."}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n","\n",(0,a.jsx)(i.z,{package:"@baeta/env"}),"\n",(0,a.jsx)(n.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'import { createEnvParser } from "@baeta/env";\n\n// Create a parser that reads from process.env\nconst parse = createEnvParser((key) => process.env[key]);\n\nexport const config = {\n  // Basic string parsing\n  apiKey: parse("API_KEY", {\n    type: "string",\n    required: true,\n  }),\n\n  // Number with default value\n  port: parse("PORT", {\n    type: "number",\n    default: 3000,\n  }),\n\n  // Boolean with custom resolver\n  isDevelopment: parse("NODE_ENV", {\n    type: "boolean",\n    default: true,\n    resolver: (value) => value === "development",\n  }),\n};\n'})}),"\n",(0,a.jsx)(n.h2,{id:"configuration-options",children:"Configuration Options"}),"\n",(0,a.jsx)(n.h3,{id:"types",children:"Types"}),"\n",(0,a.jsx)(n.p,{children:"The parser supports three basic types:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"string"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"number"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"boolean"})}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"typescript-support",children:"TypeScript Support"}),"\n",(0,a.jsx)(n.p,{children:"The parser provides full type inference:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'const config = {\n  port: parse("PORT", {\n    type: "number",\n    default: 3000,\n  }),\n  cachePrefix: parse("CACHE_PREFIX", {\n    type: "string",\n  }),\n};\n\n// config.port is inferred as number\nconst port: number = config.port; // OK\nconst port: string = config.port; // Type error\nconst prefix: string = config.cachePrefix; // Possible type undefined is not assignable to string\n'})}),"\n",(0,a.jsx)(n.h2,{id:"error-handling",children:"Error Handling"}),"\n",(0,a.jsx)(n.p,{children:"The parser will throw descriptive errors when:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"A required variable is missing"}),"\n",(0,a.jsx)(n.li,{children:"Type conversion fails (e.g., parsing a number)"}),"\n",(0,a.jsx)(n.li,{children:"Custom resolver throws an error"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,a.jsx)(n.h3,{id:"required-variables",children:"Required Variables"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'const config = {\n  databaseUrl: parse("DATABASE_URL", {\n    type: "string",\n    required: true, // Will throw if not provided\n  }),\n};\n'})}),"\n",(0,a.jsx)(n.h3,{id:"default-values",children:"Default Values"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'const config = {\n  logLevel: parse("LOG_LEVEL", {\n    type: "string",\n    default: "info", // Uses \'info\' if not provided\n  }),\n};\n'})}),"\n",(0,a.jsx)(n.h3,{id:"custom-resolvers",children:"Custom Resolvers"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'const config = {\n  isProduction: parse("NODE_ENV", {\n    type: "boolean",\n    default: false,\n    resolver: (value) => value === "production",\n  }),\n};\n'})}),"\n",(0,a.jsx)(n.h3,{id:"complex-configuration-example",children:"Complex Configuration Example"}),"\n",(0,a.jsx)(n.p,{children:"Here's a more comprehensive example showing various use cases:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'import { createEnvParser } from "@baeta/env";\n\nconst parse = createEnvParser((key) => process.env[key]);\n\nexport const config = {\n  // Basic required string\n  apiUrl: parse("API_URL", {\n    type: "string",\n    required: true,\n  }),\n\n  // Number with default\n  serverPort: parse("PORT", {\n    type: "number",\n    default: 80,\n  }),\n\n  // Boolean with custom resolver\n  isProduction: parse("NODE_ENV", {\n    type: "boolean",\n    default: false,\n    resolver: (value) => value === "production",\n  }),\n\n  // Optional string\n  cachePrefix: parse("CACHE_PREFIX", {\n    type: "string",\n    required: false,\n  }),\n\n  // Required with custom error handling\n  secretKey: parse("SECRET_KEY", {\n    type: "string",\n    required: true,\n  }),\n};\n'})}),"\n",(0,a.jsx)(n.h2,{id:"environment-sources",children:"Environment Sources"}),"\n",(0,a.jsx)(n.h3,{id:"nodejs",children:"Node.js"}),"\n",(0,a.jsxs)(n.p,{children:["Using Node's built-in ",(0,a.jsx)(n.code,{children:"process.env"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"const parse = createEnvParser((key) => process.env[key]);\n"})}),"\n",(0,a.jsx)(n.h3,{id:"deno",children:"Deno"}),"\n",(0,a.jsx)(n.p,{children:"Using Deno's built-in Deno.env:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"const parse = createEnvParser((key) => Deno.env.get(key));\n"})}),"\n",(0,a.jsx)(n.h3,{id:"bun",children:"Bun"}),"\n",(0,a.jsx)(n.p,{children:"Using Bun's built-in process.env or Bun.env:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"// Using process.env (Node.js compatible)\nconst parse = createEnvParser((key) => process.env[key]);\n\n// Using Bun.env (Bun specific)\nconst parse = createEnvParser((key) => Bun.env[key]);\n"})}),"\n",(0,a.jsx)(n.h3,{id:"vite",children:"Vite"}),"\n",(0,a.jsxs)(n.p,{children:["When using Vite, you can access environment variables through ",(0,a.jsx)(n.code,{children:"import.meta.env"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"const parse = createEnvParser((key) => import.meta.env[key]);\n"})}),"\n",(0,a.jsx)(n.h3,{id:"nextjs",children:"Next.js"}),"\n",(0,a.jsxs)(n.p,{children:["Next.js requires special handling of environment variables during bundling. Only variables prefixed with ",(0,a.jsx)(n.code,{children:"NEXT_PUBLIC_"})," are included in the client bundle, and they must be accessed via ",(0,a.jsx)(n.code,{children:"process.env.NEXT_PUBLIC_*"})," directly in your code, since the bundler inlines them."]}),"\n",(0,a.jsx)(n.p,{children:"To work around this limitation, you can create a map of your environment variables:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'const envMap = {\n  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,\n  // ... other env vars\n} as const;\n\nconst parse = createEnvParser((key) => envMap[key as keyof typeof envMap]);\n\nexport const config = {\n  apiUrl: parse("NEXT_PUBLIC_API_URL", {\n    type: "string",\n    required: true,\n  }),\n};\n'})}),"\n",(0,a.jsx)(n.p,{children:"Or you can edit the Webpack configuration to include a global map of public variables."})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},95108:(e,n,r)=>{r.d(n,{z:()=>G});var t=r(77250),a=r(53718),s=r(67402),i=r(69679);const l={tabItem:"tabItem_viCk"};var o=Object.defineProperty,c=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,d=(e,n,r)=>n in e?o(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,v=(e,n)=>{for(var r in n||(n={}))u.call(n,r)&&d(e,r,n[r]);if(c)for(var r of c(n))p.call(n,r)&&d(e,r,n[r]);return e};function h({children:e,hidden:n,className:r}){return s.createElement("div",v({role:"tabpanel",className:(0,i.A)(l.tabItem,r)},{hidden:n}),e)}var f=r(30274),m=r(14688),b=r(70725),g=r(36567),y=r(45340),x=r(31093),j=Object.defineProperty,E=Object.defineProperties,P=Object.getOwnPropertyDescriptors,w=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,O=(e,n,r)=>n in e?j(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,N=(e,n)=>{for(var r in n||(n={}))_.call(n,r)&&O(e,r,n[r]);if(w)for(var r of w(n))k.call(n,r)&&O(e,r,n[r]);return e},I=(e,n)=>E(e,P(n));function T(e){var n,r;return null!=(r=null==(n=s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:n.filter(Boolean))?r:[]}function C(e){const{values:n,children:r}=e;return(0,s.useMemo)((()=>{const e=null!=n?n:function(e){return T(e).map((({props:{value:e,label:n,attributes:r,default:t}})=>({value:e,label:n,attributes:r,default:t})))}(r);return function(e){const n=(0,y.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function S({value:e,tabValues:n}){return n.some((n=>n.value===e))}function V({queryString:e=!1,groupId:n}){const r=(0,m.W6)(),t=function({queryString:e=!1,groupId:n}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:e,groupId:n});return[(0,g.aZ)(t),(0,s.useCallback)((e=>{if(!t)return;const n=new URLSearchParams(r.location.search);n.set(t,e),r.replace(I(N({},r.location),{search:n.toString()}))}),[t,r])]}function A(e){const{defaultValue:n,queryString:r=!1,groupId:t}=e,a=C(e),[i,l]=(0,s.useState)((()=>function({defaultValue:e,tabValues:n}){var r;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!S({value:e,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const t=null!=(r=n.find((e=>e.default)))?r:n[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[o,c]=V({queryString:r,groupId:t}),[u,p]=function({groupId:e}){const n=function(e){return e?`docusaurus.tab.${e}`:null}(e),[r,t]=(0,x.Dv)(n);return[r,(0,s.useCallback)((e=>{n&&t.set(e)}),[n,t])]}({groupId:t}),d=(()=>{const e=null!=o?o:u;return S({value:e,tabValues:a})?e:null})();(0,b.A)((()=>{d&&l(d)}),[d]);return{selectedValue:i,selectValue:(0,s.useCallback)((e=>{if(!S({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),p(e)}),[c,p,a]),tabValues:a}}var R=r(77831);const D={tabList:"tabList_WaXF",tabItem:"tabItem_hApX"};var U=Object.defineProperty,q=Object.defineProperties,B=Object.getOwnPropertyDescriptors,L=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable,M=(e,n,r)=>n in e?U(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,F=(e,n)=>{for(var r in n||(n={}))X.call(n,r)&&M(e,r,n[r]);if(L)for(var r of L(n))$.call(n,r)&&M(e,r,n[r]);return e},K=(e,n)=>q(e,B(n));function W({className:e,block:n,selectedValue:r,selectValue:t,tabValues:a}){const l=[],{blockElementScrollPositionUntilNextRender:o}=(0,f.a_)(),c=e=>{const n=e.currentTarget,s=l.indexOf(n),i=a[s].value;i!==r&&(o(n),t(i))},u=e=>{var n,r;let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;t=null!=(n=l[r])?n:l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=null!=(r=l[n])?r:l[l.length-1];break}}null==t||t.focus()};return s.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},e)},a.map((({value:e,label:n,attributes:t})=>s.createElement("li",K(F({role:"tab",tabIndex:r===e?0:-1,"aria-selected":r===e,key:e,ref:e=>l.push(e),onKeyDown:u,onClick:c},t),{className:(0,i.A)("tabs__item",D.tabItem,null==t?void 0:t.className,{"tabs__item--active":r===e})}),null!=n?n:e))))}function H({lazy:e,children:n,selectedValue:r}){const t=(Array.isArray(n)?n:[n]).filter(Boolean);if(e){const e=t.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return s.createElement("div",{className:"margin-top--md"},t.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r}))))}function z(e){const n=A(e);return s.createElement("div",{className:(0,i.A)("tabs-container",D.tabList)},s.createElement(W,F(F({},n),e)),s.createElement(H,F(F({},n),e)))}function Y(e){const n=(0,R.A)();return s.createElement(z,F({key:String(n)},e),T(e.children))}function G(e){const n=e.dev?" -D":"";return(0,t.jsxs)(Y,{groupId:"package-manager",children:[(0,t.jsx)(h,{value:"yarn",children:(0,t.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,n]})}),(0,t.jsx)(h,{value:"npm",children:(0,t.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,n]})}),(0,t.jsx)(h,{value:"pnpm",children:(0,t.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,n]})})]})}},2410:(e,n,r)=>{var t=r(67402),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,l=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,r){var t,s={},c=null,u=null;for(t in void 0!==r&&(c=""+r),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(u=n.ref),n)i.call(n,t)&&!o.hasOwnProperty(t)&&(s[t]=n[t]);if(e&&e.defaultProps)for(t in n=e.defaultProps)void 0===s[t]&&(s[t]=n[t]);return{$$typeof:a,type:e,key:c,ref:u,props:s,_owner:l.current}}n.Fragment=s,n.jsx=c,n.jsxs=c},77250:(e,n,r)=>{e.exports=r(2410)},50589:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>l});var t=r(67402);const a={},s=t.createContext(a);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);