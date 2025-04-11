/*! For license information please see 66f38cb3.37c08293.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[1848],{589:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>o});var t=n(7402);const a={},l=t.createContext(a);function i(e){const r=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(l.Provider,{value:r},e.children)}},2410:(e,r,n)=>{var t=n(7402),a=Symbol.for("react.element"),l=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,n){var t,l={},u=null,c=null;for(t in void 0!==n&&(u=""+n),void 0!==r.key&&(u=""+r.key),void 0!==r.ref&&(c=r.ref),r)i.call(r,t)&&!s.hasOwnProperty(t)&&(l[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===l[t]&&(l[t]=r[t]);return{$$typeof:a,type:e,key:u,ref:c,props:l,_owner:o.current}}r.Fragment=l,r.jsx=u,r.jsxs=u},6307:(e,r,n)=>{n.d(r,{z:()=>K,M:()=>X});var t=n(7250),a=n(4291),l=n(7402),i=n(9679);const o={tabItem:"tabItem_VGyM"};var s=Object.defineProperty,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,p=(e,r,n)=>r in e?s(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,g=(e,r)=>{for(var n in r||(r={}))c.call(r,n)&&p(e,n,r[n]);if(u)for(var n of u(r))d.call(r,n)&&p(e,n,r[n]);return e};function h({children:e,hidden:r,className:n}){return l.createElement("div",g({role:"tabpanel",className:(0,i.A)(o.tabItem,n)},{hidden:r}),e)}var f=n(2118),b=n(2494),m=n(3450),v=n(3627),y=n(7912),j=n(4091),x=Object.defineProperty,w=Object.defineProperties,k=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,_=(e,r,n)=>r in e?x(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,P=(e,r)=>{for(var n in r||(r={}))E.call(r,n)&&_(e,n,r[n]);if(O)for(var n of O(r))I.call(r,n)&&_(e,n,r[n]);return e},A=(e,r)=>w(e,k(r));function S(e){var r,n;return null!=(n=null==(r=l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:r.filter(Boolean))?n:[]}function T(e){const{values:r,children:n}=e;return(0,l.useMemo)((()=>{const e=null!=r?r:function(e){return S(e).map((({props:{value:e,label:r,attributes:n,default:t}})=>({value:e,label:r,attributes:n,default:t})))}(n);return function(e){const r=(0,y.XI)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,n])}function V({value:e,tabValues:r}){return r.some((r=>r.value===e))}function C({queryString:e=!1,groupId:r}){const n=(0,b.W6)(),t=function({queryString:e=!1,groupId:r}){if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=r?r:null}({queryString:e,groupId:r});return[(0,v.aZ)(t),(0,l.useCallback)((e=>{if(!t)return;const r=new URLSearchParams(n.location.search);r.set(t,e),n.replace(A(P({},n.location),{search:r.toString()}))}),[t,n])]}function N(e){const{defaultValue:r,queryString:n=!1,groupId:t}=e,a=T(e),[i,o]=(0,l.useState)((()=>function({defaultValue:e,tabValues:r}){var n;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!V({value:e,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const t=null!=(n=r.find((e=>e.default)))?n:r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:r,tabValues:a}))),[s,u]=C({queryString:n,groupId:t}),[c,d]=function({groupId:e}){const r=function(e){return e?`docusaurus.tab.${e}`:null}(e),[n,t]=(0,j.Dv)(r);return[n,(0,l.useCallback)((e=>{r&&t.set(e)}),[r,t])]}({groupId:t}),p=(()=>{const e=null!=s?s:c;return V({value:e,tabValues:a})?e:null})();(0,m.A)((()=>{p&&o(p)}),[p]);return{selectedValue:i,selectValue:(0,l.useCallback)((e=>{if(!V({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),d(e)}),[u,d,a]),tabValues:a}}var D=n(9314);const q={tabList:"tabList_munt",tabItem:"tabItem_msIP"};var R=Object.defineProperty,G=Object.defineProperties,L=Object.getOwnPropertyDescriptors,$=Object.getOwnPropertySymbols,M=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,W=(e,r,n)=>r in e?R(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,B=(e,r)=>{for(var n in r||(r={}))M.call(r,n)&&W(e,n,r[n]);if($)for(var n of $(r))U.call(r,n)&&W(e,n,r[n]);return e},F=(e,r)=>G(e,L(r));function z({className:e,block:r,selectedValue:n,selectValue:t,tabValues:a}){const o=[],{blockElementScrollPositionUntilNextRender:s}=(0,f.a_)(),u=e=>{const r=e.currentTarget,l=o.indexOf(r),i=a[l].value;i!==n&&(s(r),t(i))},c=e=>{var r,n;let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=null!=(r=o[n])?r:o[0];break}case"ArrowLeft":{const r=o.indexOf(e.currentTarget)-1;t=null!=(n=o[r])?n:o[o.length-1];break}}null==t||t.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":r},e)},a.map((({value:e,label:r,attributes:t})=>l.createElement("li",F(B({role:"tab",tabIndex:n===e?0:-1,"aria-selected":n===e,key:e,ref:e=>{o.push(e)},onKeyDown:c,onClick:u},t),{className:(0,i.A)("tabs__item",q.tabItem,null==t?void 0:t.className,{"tabs__item--active":n===e})}),null!=r?r:e))))}function H({lazy:e,children:r,selectedValue:n}){const t=(Array.isArray(r)?r:[r]).filter(Boolean);if(e){const e=t.find((e=>e.props.value===n));return e?(0,l.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return l.createElement("div",{className:"margin-top--md"},t.map(((e,r)=>(0,l.cloneElement)(e,{key:r,hidden:e.props.value!==n}))))}function Y(e){const r=N(e);return l.createElement("div",{className:(0,i.A)("tabs-container",q.tabList)},l.createElement(z,B(B({},r),e)),l.createElement(H,B(B({},r),e)))}function J(e){const r=(0,D.A)();return l.createElement(Y,B({key:String(r)},e),S(e.children))}function K(e){const r=e.dev?" -D":"";return(0,t.jsxs)(J,{groupId:"package-manager",children:[(0,t.jsx)(h,{value:"yarn",children:(0,t.jsxs)(a.A,{language:"bash",children:["yarn add ",e.package,r]})}),(0,t.jsx)(h,{value:"npm",children:(0,t.jsxs)(a.A,{language:"bash",children:["npm install ",e.package,r]})}),(0,t.jsx)(h,{value:"pnpm",children:(0,t.jsxs)(a.A,{language:"bash",children:["pnpm add ",e.package,r]})}),(0,t.jsx)(h,{value:"bun",children:(0,t.jsxs)(a.A,{language:"bash",children:["bun add ",e.package,r]})})]})}function X(e){return(0,t.jsxs)(J,{groupId:"package-manager",children:[(0,t.jsx)(h,{value:"yarn",children:(0,t.jsxs)(a.A,{language:"bash",children:["yarn create ",e.package]})}),(0,t.jsx)(h,{value:"npm",children:(0,t.jsxs)(a.A,{language:"bash",children:["npx create-",e.package]})}),(0,t.jsx)(h,{value:"pnpm",children:(0,t.jsxs)(a.A,{language:"bash",children:["pnpm create ",e.package]})}),(0,t.jsx)(h,{value:"bun",children:(0,t.jsxs)(a.A,{language:"bash",children:["bun create ",e.package]})}),(0,t.jsx)(h,{value:"yarn-2",label:"yarn 2+",children:(0,t.jsxs)(a.A,{language:"bash",children:["yarn dlx create-",e.package]})})]})}},7250:(e,r,n)=>{e.exports=n(2410)},7782:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>u,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"plugins/gitignore","title":"Gitignore","description":"The Gitignore plugin automatically adds generated files to your .gitignore, keeping your repository clean from auto-generated code. While some developers prefer to track generated files to review changes, this plugin provides a simple way to ignore them.","source":"@site/docs/plugins/gitignore.mdx","sourceDirName":"plugins","slug":"/plugins/gitignore","permalink":"/docs/plugins/gitignore","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":50,"frontMatter":{"sidebar_position":50,"title":"Gitignore"},"sidebar":"defaultSidebar","previous":{"title":"Prisma","permalink":"/docs/plugins/prisma"},"next":{"title":"Exec","permalink":"/docs/plugins/exec"}}');var a=n(7250),l=n(589),i=n(6307);const o={sidebar_position:50,title:"Gitignore"},s="Gitignore Plugin",u={},c=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"How It Works",id:"how-it-works",level:2}];function d(e){const r={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.header,{children:(0,a.jsx)(r.h1,{id:"gitignore-plugin",children:"Gitignore Plugin"})}),"\n",(0,a.jsxs)(r.p,{children:["The Gitignore plugin automatically adds generated files to your ",(0,a.jsx)(r.code,{children:".gitignore"}),", keeping your repository clean from auto-generated code. While some developers prefer to track generated files to review changes, this plugin provides a simple way to ignore them."]}),"\n",(0,a.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n","\n",(0,a.jsx)(i.z,{package:"@baeta/plugin-gitignore",dev:!0}),"\n",(0,a.jsx)(r.h2,{id:"configuration",children:"Configuration"}),"\n",(0,a.jsxs)(r.p,{children:["Enable the gitignore plugin in your ",(0,a.jsx)(r.code,{children:"baeta.ts"}),":"]}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-typescript",children:'import { defineConfig } from "@baeta/cli";\nimport { gitignorePlugin } from "@baeta/plugin-gitignore";\n\nexport default defineConfig({\n  // ... other config\n  plugins: [gitignorePlugin()],\n});\n'})}),"\n",(0,a.jsx)(r.admonition,{type:"warning",children:(0,a.jsxs)(r.p,{children:["For the plugin to work correctly, it should be registered ",(0,a.jsx)(r.strong,{children:"before"})," plugins that generate ",(0,a.jsx)(r.strong,{children:"any"})," kind of files.\nFor most use cases, it should be the first plugin in the list, before even the ",(0,a.jsx)(r.code,{children:"autoload plugin"}),"."]})}),"\n",(0,a.jsx)(r.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,a.jsx)(r.p,{children:"The plugin automatically:"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsx)(r.li,{children:"Detects all generated files from other Baeta plugins"}),"\n",(0,a.jsxs)(r.li,{children:["Adds appropriate entries to your ",(0,a.jsx)(r.code,{children:".gitignore"})," file"]}),"\n",(0,a.jsxs)(r.li,{children:["Updates the ",(0,a.jsx)(r.code,{children:".gitignore"})," file when the configuration changes"]}),"\n"]})]})}function p(e={}){const{wrapper:r}={...(0,l.R)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}}}]);