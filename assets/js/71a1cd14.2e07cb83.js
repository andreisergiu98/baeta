/*! For license information please see 71a1cd14.2e07cb83.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[7719],{8612:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"plugins/autoloading","title":"Autoloading","description":"Baeta provides an autoloading plugin that automatically discovers and loads your modules and resolvers, eliminating the need for manual registration.","source":"@site/docs/plugins/autoloading.mdx","sourceDirName":"plugins","slug":"/plugins/autoloading","permalink":"/docs/plugins/autoloading","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":10,"frontMatter":{"sidebar_position":10},"sidebar":"defaultSidebar","previous":{"title":"Plugins","permalink":"/docs/plugins/"},"next":{"title":"Directives","permalink":"/docs/plugins/builtin-directives"}}');var a=t(7250),l=t(589),o=t(5361);const s={sidebar_position:10},i="Autoloading",u={},c=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Project Structure",id:"project-structure",level:2},{value:"How It Works",id:"how-it-works",level:2},{value:"Without Autoloading",id:"without-autoloading",level:2},{value:"Default Resolver Suffixes",id:"default-resolver-suffixes",level:2},{value:"Configuration Options",id:"configuration-options",level:2},{value:"Resolver Options",id:"resolver-options",level:3},{value:"Module Options",id:"module-options",level:3},{value:"Autoload Plugin Options",id:"autoload-plugin-options",level:3}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"autoloading",children:"Autoloading"})}),"\n",(0,a.jsx)(n.p,{children:"Baeta provides an autoloading plugin that automatically discovers and loads your modules and resolvers, eliminating the need for manual registration."}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n","\n",(0,a.jsx)(o.z,{package:"@baeta/plugin-autoload",dev:!0}),"\n",(0,a.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,a.jsxs)(n.p,{children:["Enable autoloading in your ",(0,a.jsx)(n.code,{children:"baeta.ts"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'import { defineConfig } from "@baeta/cli";\nimport { autoloadPlugin } from "@baeta/plugin-autoload";\n\nexport default defineConfig({\n  // ... other config\n  plugins: [autoloadPlugin()],\n});\n'})}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsxs)(n.p,{children:["For the plugin to work correctly, it should be registered ",(0,a.jsx)(n.strong,{children:"before"})," plugins that generate ",(0,a.jsx)(n.strong,{children:"GraphQL files, modules or resolvers"}),"."]})}),"\n",(0,a.jsx)(n.h2,{id:"project-structure",children:"Project Structure"}),"\n",(0,a.jsx)(n.p,{children:"The autoloader expects a specific project structure:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"src/\n\u251c\u2500\u2500 modules/\n\u2502   \u251c\u2500\u2500 user/\n\u2502   \u2502   \u251c\u2500\u2500 user.gql\n\u2502   \u2502   \u251c\u2500\u2500 resolvers.ts\n\u2502   \u2502   \u2514\u2500\u2500 typedef.ts\n\u2502   \u251c\u2500\u2500 post/\n\u2502   \u2502   \u251c\u2500\u2500 post.gql\n\u2502   \u2502   \u251c\u2500\u2500 post.resolvers.ts // The suffix is what matters\n\u2502   \u2502   \u2514\u2500\u2500 typedef.ts\n\u2502   \u251c\u2500\u2500 scalars/\n\u2502   \u2502   \u251c\u2500\u2500 scalars.gql\n\u2502   \u2502   \u251c\u2500\u2500scalars.resolvers.ts\n\u2502   \u2502   \u2514\u2500\u2500  typedef.ts\n\u2502   \u2514\u2500\u2500 autoload.ts // Generated by the plugin\n\u2514\u2500\u2500 baeta.ts\n"})}),"\n",(0,a.jsx)(n.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,a.jsx)(n.p,{children:"With autoloading enabled:"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"No need to create index.ts files"}),"\n",(0,a.jsx)(n.li,{children:"No need to manually import resolvers"}),"\n",(0,a.jsx)(n.li,{children:"No need to export modules"}),"\n",(0,a.jsx)(n.li,{children:"No need to register resolvers in your application setup"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"The plugin will:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Discover all .gql files in your modules directory"}),"\n",(0,a.jsx)(n.li,{children:"Load corresponding resolver files"}),"\n",(0,a.jsxs)(n.li,{children:["Create ",(0,a.jsx)(n.code,{children:"autoload.ts"})," with resolver registration and modules exports"]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Just import the ",(0,a.jsx)(n.code,{children:"autoload.ts"})," file in your application setup:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'import { modules } from "./modules/autoload.ts";\n\nconst baeta = createApplication({\n  modules,\n});\n'})}),"\n",(0,a.jsx)(n.h2,{id:"without-autoloading",children:"Without Autoloading"}),"\n",(0,a.jsx)(n.p,{children:"Without the plugin, you would need to manually:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'// src/modules/user/index.ts\nimport "./resolvers";\nimport { getUserModule } from "./typedef";\n\nexport const userModule = getUserModule();\n\n// src/app.ts\nimport { userModule } from "./modules/user";\nimport { postModule } from "./modules/post";\nimport { scalarsModule } from "./modules/scalars";\n\n// Register each module manually\nconst baeta = createApplication({\n  modules: [userModule, postModule, scalarsModule],\n});\n'})}),"\n",(0,a.jsx)(n.h2,{id:"default-resolver-suffixes",children:"Default Resolver Suffixes"}),"\n",(0,a.jsx)(n.p,{children:"By default, the plugin looks for files with these suffixes:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'const defaultSuffixes = [\n  "auth",\n  "authorization",\n  "authorizations",\n  "cache",\n  "caches",\n  "resolver",\n  "resolvers",\n  "query",\n  "queries",\n  "mutation",\n  "mutations",\n  "subscription",\n  "subscriptions",\n  "baeta",\n];\n'})}),"\n",(0,a.jsxs)(n.p,{children:["This means files like ",(0,a.jsx)(n.code,{children:"user.resolver.ts"}),", ",(0,a.jsx)(n.code,{children:"auth.ts"}),", or ",(0,a.jsx)(n.code,{children:"queries.ts"})," will be automatically loaded."]}),"\n",(0,a.jsx)(n.h2,{id:"configuration-options",children:"Configuration Options"}),"\n",(0,a.jsx)(n.h3,{id:"resolver-options",children:"Resolver Options"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"interface ResolverOptions {\n  // Custom suffixes to look for\n  suffix?: string | string[];\n\n  // Disable the default suffixes\n  disableDefaultSuffixes?: boolean;\n\n  // Custom matching function\n  match?: (filename: string) => boolean;\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"module-options",children:"Module Options"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"interface ModuleOptions {\n  // Custom matching function for module names\n  match?: (moduleName: string) => boolean;\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"autoload-plugin-options",children:"Autoload Plugin Options"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"interface AutoloadPluginOptions {\n  // Enable/disable resolver autoloading\n  resolvers?: boolean | ResolverOptions;\n\n  // Enable/disable module autoloading\n  modules?: boolean | ModuleOptions;\n\n  // Output path for generated files\n  output?: string;\n}\n"})})]})}function p(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},5361:(e,n,t)=>{t.d(n,{z:()=>Y,M:()=>K});var r=t(7250),a=t(3718),l=t(7402),o=t(9679);const s={tabItem:"tabItem_viCk"};var i=Object.defineProperty,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,p=(e,n,t)=>n in e?i(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,h=(e,n)=>{for(var t in n||(n={}))c.call(n,t)&&p(e,t,n[t]);if(u)for(var t of u(n))d.call(n,t)&&p(e,t,n[t]);return e};function f({children:e,hidden:n,className:t}){return l.createElement("div",h({role:"tabpanel",className:(0,o.A)(s.tabItem,t)},{hidden:n}),e)}var g=t(274),m=t(4688),b=t(725),v=t(6567),x=t(5340),j=t(1093),y=Object.defineProperty,w=Object.defineProperties,O=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,A=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable,I=(e,n,t)=>n in e?y(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,P=(e,n)=>{for(var t in n||(n={}))A.call(n,t)&&I(e,t,n[t]);if(k)for(var t of k(n))E.call(n,t)&&I(e,t,n[t]);return e},_=(e,n)=>w(e,O(n));function N(e){var n,t;return null!=(t=null==(n=l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:n.filter(Boolean))?t:[]}function S(e){const{values:n,children:t}=e;return(0,l.useMemo)((()=>{const e=null!=n?n:function(e){return N(e).map((({props:{value:e,label:n,attributes:t,default:r}})=>({value:e,label:n,attributes:t,default:r})))}(t);return function(e){const n=(0,x.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function C({value:e,tabValues:n}){return n.some((n=>n.value===e))}function T({queryString:e=!1,groupId:n}){const t=(0,m.W6)(),r=function({queryString:e=!1,groupId:n}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:e,groupId:n});return[(0,v.aZ)(r),(0,l.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(t.location.search);n.set(r,e),t.replace(_(P({},t.location),{search:n.toString()}))}),[r,t])]}function D(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=S(e),[o,s]=(0,l.useState)((()=>function({defaultValue:e,tabValues:n}){var t;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!C({value:e,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[i,u]=T({queryString:t,groupId:r}),[c,d]=function({groupId:e}){const n=function(e){return e?`docusaurus.tab.${e}`:null}(e),[t,r]=(0,j.Dv)(n);return[t,(0,l.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:r}),p=(()=>{const e=null!=i?i:c;return C({value:e,tabValues:a})?e:null})();(0,b.A)((()=>{p&&s(p)}),[p]);return{selectedValue:o,selectValue:(0,l.useCallback)((e=>{if(!C({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),d(e)}),[u,d,a]),tabValues:a}}var V=t(7831);const q={tabList:"tabList_WaXF",tabItem:"tabItem_hApX"};var M=Object.defineProperty,R=Object.defineProperties,L=Object.getOwnPropertyDescriptors,W=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,U=(e,n,t)=>n in e?M(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,z=(e,n)=>{for(var t in n||(n={}))$.call(n,t)&&U(e,t,n[t]);if(W)for(var t of W(n))B.call(n,t)&&U(e,t,n[t]);return e},F=(e,n)=>R(e,L(n));function X({className:e,block:n,selectedValue:t,selectValue:r,tabValues:a}){const s=[],{blockElementScrollPositionUntilNextRender:i}=(0,g.a_)(),u=e=>{const n=e.currentTarget,l=s.indexOf(n),o=a[l].value;o!==t&&(i(n),r(o))},c=e=>{var n,t;let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=s.indexOf(e.currentTarget)+1;r=null!=(n=s[t])?n:s[0];break}case"ArrowLeft":{const n=s.indexOf(e.currentTarget)-1;r=null!=(t=s[n])?t:s[s.length-1];break}}null==r||r.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},e)},a.map((({value:e,label:n,attributes:r})=>l.createElement("li",F(z({role:"tab",tabIndex:t===e?0:-1,"aria-selected":t===e,key:e,ref:e=>s.push(e),onKeyDown:c,onClick:u},r),{className:(0,o.A)("tabs__item",q.tabItem,null==r?void 0:r.className,{"tabs__item--active":t===e})}),null!=n?n:e))))}function G({lazy:e,children:n,selectedValue:t}){const r=(Array.isArray(n)?n:[n]).filter(Boolean);if(e){const e=r.find((e=>e.props.value===t));return e?(0,l.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return l.createElement("div",{className:"margin-top--md"},r.map(((e,n)=>(0,l.cloneElement)(e,{key:n,hidden:e.props.value!==t}))))}function H(e){const n=D(e);return l.createElement("div",{className:(0,o.A)("tabs-container",q.tabList)},l.createElement(X,z(z({},n),e)),l.createElement(G,z(z({},n),e)))}function J(e){const n=(0,V.A)();return l.createElement(H,z({key:String(n)},e),N(e.children))}function Y(e){const n=e.dev?" -D":"";return(0,r.jsxs)(J,{groupId:"package-manager",children:[(0,r.jsx)(f,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,n]})}),(0,r.jsx)(f,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,n]})}),(0,r.jsx)(f,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,n]})}),(0,r.jsx)(f,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun add ",e.package,n]})})]})}function K(e){return(0,r.jsxs)(J,{groupId:"package-manager",children:[(0,r.jsx)(f,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn create ",e.package]})}),(0,r.jsx)(f,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npx create-",e.package]})}),(0,r.jsx)(f,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm create ",e.package]})}),(0,r.jsx)(f,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun create ",e.package]})}),(0,r.jsx)(f,{value:"yarn-2",label:"yarn 2+",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn dlx create-",e.package]})})]})}},2410:(e,n,t)=>{var r=t(7402),a=Symbol.for("react.element"),l=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function u(e,n,t){var r,l={},u=null,c=null;for(r in void 0!==t&&(u=""+t),void 0!==n.key&&(u=""+n.key),void 0!==n.ref&&(c=n.ref),n)o.call(n,r)&&!i.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===l[r]&&(l[r]=n[r]);return{$$typeof:a,type:e,key:u,ref:c,props:l,_owner:s.current}}n.Fragment=l,n.jsx=u,n.jsxs=u},7250:(e,n,t)=>{e.exports=t(2410)},589:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>s});var r=t(7402);const a={},l=r.createContext(a);function o(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);