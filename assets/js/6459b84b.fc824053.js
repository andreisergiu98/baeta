/*! For license information please see 6459b84b.fc824053.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[6459],{3206:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"getting-started/installation","title":"Installation","description":"Get Baeta up and running in your project in just a few steps","source":"@site/docs/getting-started/installation.mdx","sourceDirName":"getting-started","slug":"/getting-started/installation","permalink":"/docs/getting-started/installation","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"description":"Get Baeta up and running in your project in just a few steps"},"sidebar":"defaultSidebar","previous":{"title":"Getting Started","permalink":"/docs/category/getting-started"},"next":{"title":"Configuration","permalink":"/docs/getting-started/configuration"}}');var a=n(7250),l=n(589),s=n(6307);const o={sidebar_position:1,description:"Get Baeta up and running in your project in just a few steps"},i="Installation",u={},c=[{value:"Requirements",id:"requirements",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Setup",id:"setup",level:2},{value:"1. Core Package",id:"1-core-package",level:3},{value:"2. Development Tools",id:"2-development-tools",level:3},{value:"Next Steps",id:"next-steps",level:2}];function p(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"installation",children:"Installation"})}),"\n",(0,a.jsx)(t.p,{children:"Get Baeta up and running in your project in just a few steps."}),"\n",(0,a.jsx)(t.h2,{id:"requirements",children:"Requirements"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://nodejs.org",children:"Node.js"})," version 22.12.0 or above (while Bun and Deno are supported, Node is still needed for the CLI)"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://www.typescriptlang.org",children:"TypeScript"})," version 5.6 or above"]}),"\n",(0,a.jsx)(t.li,{children:"Package manager of your choice (npm, yarn, pnpm or bun)"}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,a.jsxs)(t.p,{children:["Baeta comes with a ",(0,a.jsx)(t.code,{children:"create baeta"})," command to quickly set up a new project:"]}),"\n","\n",(0,a.jsx)(s.M,{package:"baeta"}),"\n",(0,a.jsx)(t.p,{children:"If you prefer to set up the project manually, follow the steps below."}),"\n",(0,a.jsx)(t.h2,{id:"setup",children:"Setup"}),"\n",(0,a.jsx)(t.h3,{id:"1-core-package",children:"1. Core Package"}),"\n",(0,a.jsx)(t.p,{children:"First, install the core package which provides all essential functionality:"}),"\n","\n",(0,a.jsx)(s.z,{package:"@baeta/core"}),"\n",(0,a.jsx)(t.p,{children:"This is all you need at runtime for a basic Baeta installation."}),"\n",(0,a.jsx)(t.h3,{id:"2-development-tools",children:"2. Development Tools"}),"\n",(0,a.jsx)(t.p,{children:"For the best development experience, install our CLI and compiler tools:"}),"\n",(0,a.jsx)(s.z,{dev:!0,package:"@baeta/cli @baeta/compiler"}),"\n",(0,a.jsx)(t.p,{children:"The compiler is optional but recommended as it provides:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"TypeScript configuration support"}),"\n",(0,a.jsx)(t.li,{children:"Hot reload of the application"}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,a.jsxs)(t.p,{children:["Once installed, proceed to ",(0,a.jsx)(t.a,{href:"./configuration",children:"configuration"})," to set up your project."]})]})}function d(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},6307:(e,t,n)=>{n.d(t,{z:()=>J,M:()=>K});var r=n(7250),a=n(4291),l=n(7402),s=n(9679);const o={tabItem:"tabItem_VGyM"};var i=Object.defineProperty,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,d=(e,t,n)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,h=(e,t)=>{for(var n in t||(t={}))c.call(t,n)&&d(e,n,t[n]);if(u)for(var n of u(t))p.call(t,n)&&d(e,n,t[n]);return e};function b({children:e,hidden:t,className:n}){return l.createElement("div",h({role:"tabpanel",className:(0,s.A)(o.tabItem,n)},{hidden:t}),e)}var f=n(2118),m=n(2494),g=n(3450),v=n(3627),j=n(7912),y=n(4091),x=Object.defineProperty,w=Object.defineProperties,k=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,I=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable,S=(e,t,n)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))I.call(t,n)&&S(e,n,t[n]);if(O)for(var n of O(t))E.call(t,n)&&S(e,n,t[n]);return e},P=(e,t)=>w(e,k(t));function T(e){var t,n;return null!=(n=null==(t=l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))?n:[]}function A(e){const{values:t,children:n}=e;return(0,l.useMemo)((()=>{const e=null!=t?t:function(e){return T(e).map((({props:{value:e,label:t,attributes:n,default:r}})=>({value:e,label:t,attributes:n,default:r})))}(n);return function(e){const t=(0,j.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function V({value:e,tabValues:t}){return t.some((t=>t.value===e))}function N({queryString:e=!1,groupId:t}){const n=(0,m.W6)(),r=function({queryString:e=!1,groupId:t}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=t?t:null}({queryString:e,groupId:t});return[(0,v.aZ)(r),(0,l.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(n.location.search);t.set(r,e),n.replace(P(_({},n.location),{search:t.toString()}))}),[r,n])]}function q(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,a=A(e),[s,o]=(0,l.useState)((()=>function({defaultValue:e,tabValues:t}){var n;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!V({value:e,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const r=null!=(n=t.find((e=>e.default)))?n:t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:a}))),[i,u]=N({queryString:n,groupId:r}),[c,p]=function({groupId:e}){const t=function(e){return e?`docusaurus.tab.${e}`:null}(e),[n,r]=(0,y.Dv)(t);return[n,(0,l.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:r}),d=(()=>{const e=null!=i?i:c;return V({value:e,tabValues:a})?e:null})();(0,g.A)((()=>{d&&o(d)}),[d]);return{selectedValue:s,selectValue:(0,l.useCallback)((e=>{if(!V({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),p(e)}),[u,p,a]),tabValues:a}}var C=n(9314);const D={tabList:"tabList_munt",tabItem:"tabItem_msIP"};var R=Object.defineProperty,B=Object.defineProperties,L=Object.getOwnPropertyDescriptors,$=Object.getOwnPropertySymbols,M=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable,z=(e,t,n)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,F=(e,t)=>{for(var n in t||(t={}))M.call(t,n)&&z(e,n,t[n]);if($)for(var n of $(t))G.call(t,n)&&z(e,n,t[n]);return e},U=(e,t)=>B(e,L(t));function Q({className:e,block:t,selectedValue:n,selectValue:r,tabValues:a}){const o=[],{blockElementScrollPositionUntilNextRender:i}=(0,f.a_)(),u=e=>{const t=e.currentTarget,l=o.indexOf(t),s=a[l].value;s!==n&&(i(t),r(s))},c=e=>{var t,n;let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;r=null!=(t=o[n])?t:o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;r=null!=(n=o[t])?n:o[o.length-1];break}}null==r||r.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":t},e)},a.map((({value:e,label:t,attributes:r})=>l.createElement("li",U(F({role:"tab",tabIndex:n===e?0:-1,"aria-selected":n===e,key:e,ref:e=>{o.push(e)},onKeyDown:c,onClick:u},r),{className:(0,s.A)("tabs__item",D.tabItem,null==r?void 0:r.className,{"tabs__item--active":n===e})}),null!=t?t:e))))}function W({lazy:e,children:t,selectedValue:n}){const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(e){const e=r.find((e=>e.props.value===n));return e?(0,l.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return l.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function Y(e){const t=q(e);return l.createElement("div",{className:(0,s.A)("tabs-container",D.tabList)},l.createElement(Q,F(F({},t),e)),l.createElement(W,F(F({},t),e)))}function H(e){const t=(0,C.A)();return l.createElement(Y,F({key:String(t)},e),T(e.children))}function J(e){const t=e.dev?" -D":"";return(0,r.jsxs)(H,{groupId:"package-manager",children:[(0,r.jsx)(b,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,t]})}),(0,r.jsx)(b,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,t]})}),(0,r.jsx)(b,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,t]})}),(0,r.jsx)(b,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun add ",e.package,t]})})]})}function K(e){return(0,r.jsxs)(H,{groupId:"package-manager",children:[(0,r.jsx)(b,{value:"yarn",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn create ",e.package]})}),(0,r.jsx)(b,{value:"npm",children:(0,r.jsxs)(a.A,{language:"bash",children:["npx create-",e.package]})}),(0,r.jsx)(b,{value:"pnpm",children:(0,r.jsxs)(a.A,{language:"bash",children:["pnpm create ",e.package]})}),(0,r.jsx)(b,{value:"bun",children:(0,r.jsxs)(a.A,{language:"bash",children:["bun create ",e.package]})}),(0,r.jsx)(b,{value:"yarn-2",label:"yarn 2+",children:(0,r.jsxs)(a.A,{language:"bash",children:["yarn dlx create-",e.package]})})]})}},2410:(e,t,n)=>{var r=n(7402),a=Symbol.for("react.element"),l=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,n){var r,l={},u=null,c=null;for(r in void 0!==n&&(u=""+n),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(c=t.ref),t)s.call(t,r)&&!i.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===l[r]&&(l[r]=t[r]);return{$$typeof:a,type:e,key:u,ref:c,props:l,_owner:o.current}}t.Fragment=l,t.jsx=u,t.jsxs=u},7250:(e,t,n)=>{e.exports=n(2410)},589:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>o});var r=n(7402);const a={},l=r.createContext(a);function s(e){const t=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(l.Provider,{value:t},e.children)}}}]);