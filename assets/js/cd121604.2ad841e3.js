/*! For license information please see cd121604.2ad841e3.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[9218],{66265:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"extensions/extensions","title":"Extensions","description":"While plugins enhance Baeta during build time, extensions add functionality at runtime, allowing you to extend your GraphQL schema with additional capabilities. Extensions provide methods (similar to middlewares) that can be applied to fields and resolvers, enabling features like authorization, caching, logging, and more.","source":"@site/docs/extensions/extensions.mdx","sourceDirName":"extensions","slug":"/extensions/","permalink":"/docs/extensions/","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Extensions"},"sidebar":"defaultSidebar","previous":{"title":"Extensions","permalink":"/docs/category/extensions"},"next":{"title":"Authorization","permalink":"/docs/extensions/authorization"}}');var a=t(77250),s=t(50589),o=t(55361);const i={sidebar_position:1,title:"Extensions"},l="Understanding Extensions",u={},c=[{value:"How Extensions Work",id:"how-extensions-work",level:2},{value:"Extension Setup",id:"extension-setup",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"understanding-extensions",children:"Understanding Extensions"})}),"\n",(0,a.jsx)(n.p,{children:"While plugins enhance Baeta during build time, extensions add functionality at runtime, allowing you to extend your GraphQL schema with additional capabilities. Extensions provide methods (similar to middlewares) that can be applied to fields and resolvers, enabling features like authorization, caching, logging, and more."}),"\n",(0,a.jsx)(n.h2,{id:"how-extensions-work",children:"How Extensions Work"}),"\n",(0,a.jsxs)(n.p,{children:["Extensions attach additional methods to your GraphQL types and fields using a type-safe API. For example, the authorization extension adds the ",(0,a.jsx)(n.code,{children:"$auth()"})," method to your resolvers, allowing you to define access control rules:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"Query.user.$auth({\n  isLoggedIn: true,\n});\n"})}),"\n",(0,a.jsx)(n.h2,{id:"extension-setup",children:"Extension Setup"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Install the desired extensions:"}),"\n"]}),"\n","\n",(0,a.jsx)(o.z,{package:"@baeta/extension-auth @baeta/extension-complexity"}),"\n",(0,a.jsxs)(n.ol,{start:"2",children:["\n",(0,a.jsx)(n.li,{children:"Register your extensions:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"\nimport { createExtensions } from '@baeta/core';\nimport { authExtension } from '@baeta/extension-auth';\nimport { complexityExtension } from '@baeta/extension-complexity';\n\n\nexport default createExtensions(\n  authExtension(...),\n  complexityExtension(...),\n  // other extensions...\n);\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"3",children:["\n",(0,a.jsx)(n.li,{children:"Configure Baeta to use the extensions:"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Since extensions are runtime features, the generators need to know where to find them.\nYou must specify the path to extensions entrypoint in ",(0,a.jsx)(n.code,{children:"baeta.ts"})," configuration file:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:'export default defineConfig({\n  graphql: {\n    extensions: "src/extensions/index.ts",\n    // ... other config\n  },\n});\n'})}),"\n",(0,a.jsx)(n.p,{children:"For detailed information about specific extensions, check their respective documentation pages."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},55361:(e,n,t)=>{t.d(n,{z:()=>H,M:()=>J});var r=t(77250),a=t(53718),s=t(67402),o=t(69679);const i={tabItem:"tabItem_viCk"};var l=Object.defineProperty,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,p=(e,n,t)=>n in e?l(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,h=(e,n)=>{for(var t in n||(n={}))c.call(n,t)&&p(e,t,n[t]);if(u)for(var t of u(n))d.call(n,t)&&p(e,t,n[t]);return e};function f({children:e,hidden:n,className:t}){return s.createElement("div",h({role:"tabpanel",className:(0,o.A)(i.tabItem,t)},{hidden:n}),e)}var b=t(30274),m=t(14688),x=t(70725),g=t(36567),y=t(45340),v=t(31093),j=Object.defineProperty,w=Object.defineProperties,E=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,O=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,_=(e,n,t)=>n in e?j(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,A=(e,n)=>{for(var t in n||(n={}))O.call(n,t)&&_(e,t,n[t]);if(k)for(var t of k(n))I.call(n,t)&&_(e,t,n[t]);return e},S=(e,n)=>w(e,E(n));function P(e){var n,t;return null!=(t=null==(n=s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:n.filter(Boolean))?t:[]}function V(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=null!=n?n:function(e){return P(e).map((({props:{value:e,label:n,attributes:t,default:r}})=>({value:e,label:n,attributes:t,default:r})))}(t);return function(e){const n=(0,y.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function N({value:e,tabValues:n}){return n.some((n=>n.value===e))}function T({queryString:e=!1,groupId:n}){const t=(0,m.W6)(),r=function({queryString:e=!1,groupId:n}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:e,groupId:n});return[(0,g.aZ)(r),(0,s.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(t.location.search);n.set(r,e),t.replace(S(A({},t.location),{search:n.toString()}))}),[r,t])]}function C(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=V(e),[o,i]=(0,s.useState)((()=>function({defaultValue:e,tabValues:n}){var t;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!N({value:e,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[l,u]=T({queryString:t,groupId:r}),[c,d]=function({groupId:e}){const n=function(e){return e?`docusaurus.tab.${e}`:null}(e),[t,r]=(0,v.Dv)(n);return[t,(0,s.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:r}),p=(()=>{const e=null!=l?l:c;return N({value:e,tabValues:a})?e:null})();(0,x.A)((()=>{p&&i(p)}),[p]);return{selectedValue:o,selectValue:(0,s.useCallback)((e=>{if(!N({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),d(e)}),[u,d,a]),tabValues:a}}var D=t(77831);const q={tabList:"tabList_WaXF",tabItem:"tabItem_hApX"};var L=Object.defineProperty,R=Object.defineProperties,$=Object.getOwnPropertyDescriptors,z=Object.getOwnPropertySymbols,B=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,W=(e,n,t)=>n in e?L(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,F=(e,n)=>{for(var t in n||(n={}))B.call(n,t)&&W(e,t,n[t]);if(z)for(var t of z(n))U.call(n,t)&&W(e,t,n[t]);return e},M=(e,n)=>R(e,$(n));function Q({className:e,block:n,selectedValue:t,selectValue:r,tabValues:a}){const i=[],{blockElementScrollPositionUntilNextRender:l}=(0,b.a_)(),u=e=>{const n=e.currentTarget,s=i.indexOf(n),o=a[s].value;o!==t&&(l(n),r(o))},c=e=>{var n,t;let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;r=null!=(n=i[t])?n:i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;r=null!=(t=i[n])?t:i[i.length-1];break}}null==r||r.focus()};return s.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},e)},a.map((({value:e,label:n,attributes:r})=>s.createElement("li",M(F({role:"tab",tabIndex:t===e?0:-1,"aria-selected":t===e,key:e,ref:e=>i.push(e),onKeyDown:c,onClick:u},r),{className:(0,o.A)("tabs__item",q.tabItem,null==r?void 0:r.className,{"tabs__item--active":t===e})}),null!=n?n:e))))}function G({lazy:e,children:n,selectedValue:t}){const r=(Array.isArray(n)?n:[n]).filter(Boolean);if(e){const e=r.find((e=>e.props.value===t));return e?(0,s.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return s.createElement("div",{className:"margin-top--md"},r.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==t}))))}function X(e){const n=C(e);return s.createElement("div",{className:(0,o.A)("tabs-container",q.tabList)},s.createElement(Q,F(F({},n),e)),s.createElement(G,F(F({},n),e)))}function Y(e){const n=(0,D.A)();return s.createElement(X,F({key:String(n)},e),P(e.children))}function H(e){const n=e.dev?" -D":"";return(0,r.jsxs)(Y,{groupId:"package-manager",children:[(0,r.jsx)(f,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,n]})}),(0,r.jsx)(f,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,n]})}),(0,r.jsx)(f,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,n]})}),(0,r.jsx)(f,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun add ",e.package,n]})})]})}function J(e){return(0,r.jsxs)(Y,{groupId:"package-manager",children:[(0,r.jsx)(f,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn create ",e.package]})}),(0,r.jsx)(f,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npx create-",e.package]})}),(0,r.jsx)(f,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm create ",e.package]})}),(0,r.jsx)(f,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun create ",e.package]})}),(0,r.jsx)(f,{value:"yarn-2",label:"yarn 2+",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn dlx create-",e.package]})})]})}},2410:(e,n,t)=>{var r=t(67402),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(e,n,t){var r,s={},u=null,c=null;for(r in void 0!==t&&(u=""+t),void 0!==n.key&&(u=""+n.key),void 0!==n.ref&&(c=n.ref),n)o.call(n,r)&&!l.hasOwnProperty(r)&&(s[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===s[r]&&(s[r]=n[r]);return{$$typeof:a,type:e,key:u,ref:c,props:s,_owner:i.current}}n.Fragment=s,n.jsx=u,n.jsxs=u},77250:(e,n,t)=>{e.exports=t(2410)},50589:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>i});var r=t(67402);const a={},s=r.createContext(a);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);