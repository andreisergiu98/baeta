"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[713],{5810:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(3289);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(r),m=a,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},s),{},{components:r})):n.createElement(f,i({ref:t},s))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},456:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>g,default:()=>w,frontMatter:()=>f,metadata:()=>y,toc:()=>v});var n=r(5810),a=Object.defineProperty,o=Object.defineProperties,i=Object.getOwnPropertyDescriptors,p=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,u=(e,t)=>{for(var r in t||(t={}))c.call(t,r)&&s(e,r,t[r]);if(p)for(var r of p(t))l.call(t,r)&&s(e,r,t[r]);return e},d=(e,t)=>o(e,i(t)),m=(e,t)=>{var r={};for(var n in e)c.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&p)for(var n of p(e))t.indexOf(n)<0&&l.call(e,n)&&(r[n]=e[n]);return r};const f={sidebar_position:5,description:""},g="Wrapping up",y={unversionedId:"getting-started/wrapping-up",id:"getting-started/wrapping-up",title:"Wrapping up",description:"",source:"@site/docs/getting-started/wrapping-up.mdx",sourceDirName:"getting-started",slug:"/getting-started/wrapping-up",permalink:"/docs/getting-started/wrapping-up",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,description:""},sidebar:"tutorialSidebar",previous:{title:"Extend modules",permalink:"/docs/getting-started/extend-modules"}},b={},v=[{value:"Create the application",id:"create-the-application",level:3},{value:"Start the application",id:"start-the-application",level:3}],h={toc:v},O="wrapper";function w(e){var t=e,{components:r}=t,a=m(t,["components"]);return(0,n.kt)(O,d(u(u({},h),a),{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",u({},{id:"wrapping-up"}),"Wrapping up"),(0,n.kt)("h3",u({},{id:"create-the-application"}),"Create the application"),(0,n.kt)("p",null,"Our modules are now ready to use!\nWe can create an entry point for our application in ",(0,n.kt)("inlineCode",{parentName:"p"},"src/app.ts"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",u({parentName:"pre"},{className:"language-typescript"}),"import { createApplication } from '@baeta/core';\nimport { userModule } from './modules/user';\nimport { userPhotosModule } from './modules/user-photos';\n\nimport { createYoga } from 'graphql-yoga';\nimport { createServer } from 'node:http';\n\nconst baeta = createApplication({\n  modules: [userModule, userPhotosModule],\n});\n\nconst yoga = createYoga({\n  schema: baeta.schema,\n});\n\nconst server = createServer(yoga);\n\nserver.listen(4000, () => {\n  console.log('\ud83d\ude80 Server ready at http://localhost:4000/graphql');\n});\n")),(0,n.kt)("admonition",u({},{type:"note"}),(0,n.kt)("p",{parentName:"admonition"},"We are using graphql-yoga because it's very easy to setup, but Baeta is compatible with all graphql servers.")),(0,n.kt)("h3",u({},{id:"start-the-application"}),"Start the application"),(0,n.kt)("p",null,"That's it! You can now start your application by running the following command:"),(0,n.kt)("pre",null,(0,n.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"yarn start\n# or\nyarn baeta build --watch --generate --onSuccess='node --enable-source-maps dist/app.js'\n")))}w.isMDXComponent=!0}}]);