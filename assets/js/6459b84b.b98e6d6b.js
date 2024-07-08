/*! For license information please see 6459b84b.b98e6d6b.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[868],{7103:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>te,contentTitle:()=>Q,default:()=>ae,frontMatter:()=>J,metadata:()=>ee,toc:()=>re});var n=r(7493),a=r(1503),l=r(7178),o=r(8330),i=r(9275);const s={tabItem:"tabItem_xiCG"};var u=Object.defineProperty,c=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,b=(e,t,r)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))d.call(t,r)&&b(e,r,t[r]);if(c)for(var r of c(t))p.call(t,r)&&b(e,r,t[r]);return e};function m({children:e,hidden:t,className:r}){return o.createElement("div",f({role:"tabpanel",className:(0,i.Z)(s.tabItem,r)},{hidden:t}),e)}var h=r(4751),v=r(6803),g=r(3094),y=r(3563),w=r(5931),j=r(6291),k=Object.defineProperty,E=Object.defineProperties,x=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,I=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable,S=(e,t,r)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,T=(e,t)=>{for(var r in t||(t={}))I.call(t,r)&&S(e,r,t[r]);if(O)for(var r of O(t))_.call(t,r)&&S(e,r,t[r]);return e},P=(e,t)=>E(e,x(t));function V(e){var t,r;return null!=(r=null==(t=o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))?r:[]}function C(e){const{values:t,children:r}=e;return(0,o.useMemo)((()=>{const e=null!=t?t:function(e){return V(e).map((({props:{value:e,label:t,attributes:r,default:n}})=>({value:e,label:t,attributes:r,default:n})))}(r);return function(e){const t=(0,w.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function N({value:e,tabValues:t}){return t.some((t=>t.value===e))}function q({queryString:e=!1,groupId:t}){const r=(0,v.k6)(),n=function({queryString:e=!1,groupId:t}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=t?t:null}({queryString:e,groupId:t});return[(0,y._X)(n),(0,o.useCallback)((e=>{if(!n)return;const t=new URLSearchParams(r.location.search);t.set(n,e),r.replace(P(T({},r.location),{search:t.toString()}))}),[n,r])]}function D(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,a=C(e),[l,i]=(0,o.useState)((()=>function({defaultValue:e,tabValues:t}){var r;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!N({value:e,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const n=null!=(r=t.find((e=>e.default)))?r:t[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[s,u]=q({queryString:r,groupId:n}),[c,d]=function({groupId:e}){const t=function(e){return e?`docusaurus.tab.${e}`:null}(e),[r,n]=(0,j.Nk)(t);return[r,(0,o.useCallback)((e=>{t&&n.set(e)}),[t,n])]}({groupId:n}),p=(()=>{const e=null!=s?s:c;return N({value:e,tabValues:a})?e:null})();(0,g.Z)((()=>{p&&i(p)}),[p]);return{selectedValue:l,selectValue:(0,o.useCallback)((e=>{if(!N({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),d(e)}),[u,d,a]),tabValues:a}}var R=r(8187);const L={tabList:"tabList_iiwk",tabItem:"tabItem_xA1R"};var A=Object.defineProperty,Z=Object.defineProperties,$=Object.getOwnPropertyDescriptors,U=Object.getOwnPropertySymbols,B=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable,F=(e,t,r)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,z=(e,t)=>{for(var r in t||(t={}))B.call(t,r)&&F(e,r,t[r]);if(U)for(var r of U(t))M.call(t,r)&&F(e,r,t[r]);return e},G=(e,t)=>Z(e,$(t));function Y({className:e,block:t,selectedValue:r,selectValue:n,tabValues:a}){const l=[],{blockElementScrollPositionUntilNextRender:s}=(0,h.o5)(),u=e=>{const t=e.currentTarget,o=l.indexOf(t),i=a[o].value;i!==r&&(s(t),n(i))},c=e=>{var t,r;let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;n=null!=(t=l[r])?t:l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=null!=(r=l[t])?r:l[l.length-1];break}}null==n||n.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":t},e)},a.map((({value:e,label:t,attributes:n})=>o.createElement("li",G(z({role:"tab",tabIndex:r===e?0:-1,"aria-selected":r===e,key:e,ref:e=>l.push(e),onKeyDown:c,onClick:u},n),{className:(0,i.Z)("tabs__item",L.tabItem,null==n?void 0:n.className,{"tabs__item--active":r===e})}),null!=t?t:e))))}function K({lazy:e,children:t,selectedValue:r}){const n=(Array.isArray(t)?t:[t]).filter(Boolean);if(e){const e=n.find((e=>e.props.value===r));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function W(e){const t=D(e);return o.createElement("div",{className:(0,i.Z)("tabs-container",L.tabList)},o.createElement(Y,z(z({},t),e)),o.createElement(K,z(z({},t),e)))}function X(e){const t=(0,R.Z)();return o.createElement(W,z({key:String(t)},e),V(e.children))}function H(e){return o.createElement(X,{groupId:"package-manager"},o.createElement(m,{value:"yarn"},o.createElement(l.Z,{language:"bash"},"yarn add ",e.package,e.dev?" -D":"")),o.createElement(m,{value:"npm"},o.createElement(l.Z,{language:"bash"},"npm install ",e.package,e.dev?" --save-dev":"")),o.createElement(m,{value:"pnpm"},o.createElement(l.Z,{language:"bash"},"pnpm add ",e.package,e.dev?" -D":"")))}const J={sidebar_position:1,description:""},Q="Installation",ee={id:"getting-started/installation",title:"Installation",description:"",source:"@site/docs/getting-started/installation.mdx",sourceDirName:"getting-started",slug:"/getting-started/installation",permalink:"/docs/getting-started/installation",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:""},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/category/getting-started"},next:{title:"Configuration",permalink:"/docs/getting-started/configuration"}},te={},re=[{value:"Requirements",id:"requirements",level:2},{value:"Setup",id:"setup",level:2},{value:"Runtime",id:"runtime",level:3},{value:"CLI and Compiler",id:"cli-and-compiler",level:3}];function ne(e){const t={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"installation",children:"Installation"}),"\n",(0,n.jsx)(t.h2,{id:"requirements",children:"Requirements"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://nodejs.org",children:"Node.js"})," version 18 or above."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://www.typescriptlang.org",children:"TypeScript"})," version 4.9 or above."]}),"\n",(0,n.jsx)(t.li,{children:"Any package manager."}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"setup",children:"Setup"}),"\n",(0,n.jsx)(t.h3,{id:"runtime",children:"Runtime"}),"\n",(0,n.jsx)(t.p,{children:"Install the core package."}),"\n","\n",(0,n.jsx)(H,{package:"@baeta/core"}),"\n",(0,n.jsx)(t.p,{children:"This is the only package required at runtime for a basic installation."}),"\n",(0,n.jsx)(t.h3,{id:"cli-and-compiler",children:"CLI and Compiler"}),"\n",(0,n.jsx)(t.p,{children:"Now add the cli and compiler. The compiler is optional, but highly recommended, as it will provide a more seamless integration and allow you to write configuration files in TypeScript."}),"\n",(0,n.jsx)(H,{dev:!0,package:"@baeta/cli @baeta/compiler"})]})}function ae(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(ne,{...e})}):ne(e)}},4902:(e,t,r)=>{var n=r(8330),a=Symbol.for("react.element"),l=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,r){var n,l={},u=null,c=null;for(n in void 0!==r&&(u=""+r),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,n)&&!s.hasOwnProperty(n)&&(l[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===l[n]&&(l[n]=t[n]);return{$$typeof:a,type:e,key:u,ref:c,props:l,_owner:i.current}}t.Fragment=l,t.jsx=u,t.jsxs=u},7493:(e,t,r)=>{e.exports=r(4902)},1503:(e,t,r)=>{r.d(t,{a:()=>o});var n=r(8330);const a={},l=n.createContext(a);function o(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);