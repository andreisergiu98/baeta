/*! For license information please see 6459b84b.99f5910e.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[6459],{62413:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"getting-started/installation","title":"Installation","description":"Get Baeta up and running in your project in just a few steps","source":"@site/docs/getting-started/installation.mdx","sourceDirName":"getting-started","slug":"/getting-started/installation","permalink":"/docs/getting-started/installation","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"description":"Get Baeta up and running in your project in just a few steps"},"sidebar":"defaultSidebar","previous":{"title":"Getting Started","permalink":"/docs/category/getting-started"},"next":{"title":"Configuration","permalink":"/docs/getting-started/configuration"}}');var a=r(77250),l=r(50589),o=r(95108);const s={sidebar_position:1,description:"Get Baeta up and running in your project in just a few steps"},i="Installation",u={},c=[{value:"Requirements",id:"requirements",level:2},{value:"Setup",id:"setup",level:2},{value:"1. Core Package",id:"1-core-package",level:3},{value:"2. Development Tools",id:"2-development-tools",level:3},{value:"Next Steps",id:"next-steps",level:2}];function p(e){const t={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"installation",children:"Installation"})}),"\n",(0,a.jsx)(t.p,{children:"Get Baeta up and running in your project in just a few steps."}),"\n",(0,a.jsx)(t.h2,{id:"requirements",children:"Requirements"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://nodejs.org",children:"Node.js"})," version 22.12.0 or above"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://www.typescriptlang.org",children:"TypeScript"})," version 5.6 or above"]}),"\n",(0,a.jsx)(t.li,{children:"Package manager of your choice (npm, yarn, or pnpm)"}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"setup",children:"Setup"}),"\n",(0,a.jsx)(t.h3,{id:"1-core-package",children:"1. Core Package"}),"\n",(0,a.jsx)(t.p,{children:"First, install the core package which provides all essential functionality:"}),"\n","\n",(0,a.jsx)(o.z,{package:"@baeta/core"}),"\n",(0,a.jsx)(t.p,{children:"This is all you need at runtime for a basic Baeta installation."}),"\n",(0,a.jsx)(t.h3,{id:"2-development-tools",children:"2. Development Tools"}),"\n",(0,a.jsx)(t.p,{children:"For the best development experience, install our CLI and compiler tools:"}),"\n",(0,a.jsx)(o.z,{dev:!0,package:"@baeta/cli @baeta/compiler"}),"\n",(0,a.jsx)(t.p,{children:"The compiler is optional but recommended as it provides:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"TypeScript configuration support"}),"\n",(0,a.jsx)(t.li,{children:"Hot reload of the application"}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,a.jsxs)(t.p,{children:["Once installed, proceed to ",(0,a.jsx)(t.a,{href:"./configuration",children:"configuration"})," to set up your project."]})]})}function d(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},95108:(e,t,r)=>{r.d(t,{z:()=>J});var n=r(77250),a=r(53718),l=r(67402),o=r(69679);const s={tabItem:"tabItem_viCk"};var i=Object.defineProperty,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,d=(e,t,r)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))c.call(t,r)&&d(e,r,t[r]);if(u)for(var r of u(t))p.call(t,r)&&d(e,r,t[r]);return e};function h({children:e,hidden:t,className:r}){return l.createElement("div",f({role:"tabpanel",className:(0,o.A)(s.tabItem,r)},{hidden:t}),e)}var b=r(30274),m=r(14688),v=r(70725),g=r(36567),y=r(45340),j=r(31093),x=Object.defineProperty,w=Object.defineProperties,k=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,_=(e,t,r)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,S=(e,t)=>{for(var r in t||(t={}))E.call(t,r)&&_(e,r,t[r]);if(O)for(var r of O(t))I.call(t,r)&&_(e,r,t[r]);return e},P=(e,t)=>w(e,k(t));function T(e){var t,r;return null!=(r=null==(t=l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))?r:[]}function V(e){const{values:t,children:r}=e;return(0,l.useMemo)((()=>{const e=null!=t?t:function(e){return T(e).map((({props:{value:e,label:t,attributes:r,default:n}})=>({value:e,label:t,attributes:r,default:n})))}(r);return function(e){const t=(0,y.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function N({value:e,tabValues:t}){return t.some((t=>t.value===e))}function A({queryString:e=!1,groupId:t}){const r=(0,m.W6)(),n=function({queryString:e=!1,groupId:t}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=t?t:null}({queryString:e,groupId:t});return[(0,g.aZ)(n),(0,l.useCallback)((e=>{if(!n)return;const t=new URLSearchParams(r.location.search);t.set(n,e),r.replace(P(S({},r.location),{search:t.toString()}))}),[n,r])]}function C(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,a=V(e),[o,s]=(0,l.useState)((()=>function({defaultValue:e,tabValues:t}){var r;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!N({value:e,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const n=null!=(r=t.find((e=>e.default)))?r:t[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[i,u]=A({queryString:r,groupId:n}),[c,p]=function({groupId:e}){const t=function(e){return e?`docusaurus.tab.${e}`:null}(e),[r,n]=(0,j.Dv)(t);return[r,(0,l.useCallback)((e=>{t&&n.set(e)}),[t,n])]}({groupId:n}),d=(()=>{const e=null!=i?i:c;return N({value:e,tabValues:a})?e:null})();(0,v.A)((()=>{d&&s(d)}),[d]);return{selectedValue:o,selectValue:(0,l.useCallback)((e=>{if(!N({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),p(e)}),[u,p,a]),tabValues:a}}var D=r(77831);const q={tabList:"tabList_WaXF",tabItem:"tabItem_hApX"};var R=Object.defineProperty,B=Object.defineProperties,L=Object.getOwnPropertyDescriptors,$=Object.getOwnPropertySymbols,F=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,G=(e,t,r)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,U=(e,t)=>{for(var r in t||(t={}))F.call(t,r)&&G(e,r,t[r]);if($)for(var r of $(t))z.call(t,r)&&G(e,r,t[r]);return e},M=(e,t)=>B(e,L(t));function W({className:e,block:t,selectedValue:r,selectValue:n,tabValues:a}){const s=[],{blockElementScrollPositionUntilNextRender:i}=(0,b.a_)(),u=e=>{const t=e.currentTarget,l=s.indexOf(t),o=a[l].value;o!==r&&(i(t),n(o))},c=e=>{var t,r;let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=s.indexOf(e.currentTarget)+1;n=null!=(t=s[r])?t:s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;n=null!=(r=s[t])?r:s[s.length-1];break}}null==n||n.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":t},e)},a.map((({value:e,label:t,attributes:n})=>l.createElement("li",M(U({role:"tab",tabIndex:r===e?0:-1,"aria-selected":r===e,key:e,ref:e=>s.push(e),onKeyDown:c,onClick:u},n),{className:(0,o.A)("tabs__item",q.tabItem,null==n?void 0:n.className,{"tabs__item--active":r===e})}),null!=t?t:e))))}function X({lazy:e,children:t,selectedValue:r}){const n=(Array.isArray(t)?t:[t]).filter(Boolean);if(e){const e=n.find((e=>e.props.value===r));return e?(0,l.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return l.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function Y(e){const t=C(e);return l.createElement("div",{className:(0,o.A)("tabs-container",q.tabList)},l.createElement(W,U(U({},t),e)),l.createElement(X,U(U({},t),e)))}function H(e){const t=(0,D.A)();return l.createElement(Y,U({key:String(t)},e),T(e.children))}function J(e){const t=e.dev?" -D":"";return(0,n.jsxs)(H,{groupId:"package-manager",children:[(0,n.jsx)(h,{value:"yarn",children:(0,n.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,t]})}),(0,n.jsx)(h,{value:"npm",children:(0,n.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,t]})}),(0,n.jsx)(h,{value:"pnpm",children:(0,n.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,t]})})]})}},2410:(e,t,r)=>{var n=r(67402),a=Symbol.for("react.element"),l=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,r){var n,l={},u=null,c=null;for(n in void 0!==r&&(u=""+r),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,n)&&!i.hasOwnProperty(n)&&(l[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===l[n]&&(l[n]=t[n]);return{$$typeof:a,type:e,key:u,ref:c,props:l,_owner:s.current}}t.Fragment=l,t.jsx=u,t.jsxs=u},77250:(e,t,r)=>{e.exports=r(2410)},50589:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>s});var n=r(67402);const a={},l=n.createContext(a);function o(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);