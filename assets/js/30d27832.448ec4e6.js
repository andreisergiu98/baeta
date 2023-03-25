"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[650],{5810:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(3289);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),f=a,m=u["".concat(l,".").concat(f)]||u[f]||d[f]||i;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9426:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>y,contentTitle:()=>g,default:()=>v,frontMatter:()=>m,metadata:()=>b,toc:()=>h});var r=n(5810),a=Object.defineProperty,i=Object.defineProperties,o=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,p=(e,t,n)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,u=(e,t)=>{for(var n in t||(t={}))l.call(t,n)&&p(e,n,t[n]);if(s)for(var n of s(t))c.call(t,n)&&p(e,n,t[n]);return e},d=(e,t)=>i(e,o(t)),f=(e,t)=>{var n={};for(var r in e)l.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&s)for(var r of s(e))t.indexOf(r)<0&&c.call(e,r)&&(n[r]=e[r]);return n};const m={sidebar_position:2,description:""},g="Configuration",b={unversionedId:"getting-started/configuration",id:"getting-started/configuration",title:"Configuration",description:"",source:"@site/docs/getting-started/configuration.mdx",sourceDirName:"getting-started",slug:"/getting-started/configuration",permalink:"/docs/getting-started/configuration",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:""},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/docs/getting-started/installation"},next:{title:"First modules",permalink:"/docs/getting-started/first-modules"}},y={},h=[],O={toc:h},k="wrapper";function v(e){var t=e,{components:n}=t,a=f(t,["components"]);return(0,r.kt)(k,d(u(u({},O),a),{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",u({},{id:"configuration"}),"Configuration"),(0,r.kt)("p",null,"Assuming ",(0,r.kt)("a",u({parentName:"p"},{href:"https://www.npmjs.com/package/@baeta/compiler"}),"@baeta/compiler")," is installed, the configuration is defined in ",(0,r.kt)("inlineCode",{parentName:"p"},"baeta.ts"),".\nOtherwise ",(0,r.kt)("inlineCode",{parentName:"p"},".js"),", ",(0,r.kt)("inlineCode",{parentName:"p"},".cjs"),", ",(0,r.kt)("inlineCode",{parentName:"p"},".mjs")," files will be handled accordingly."),(0,r.kt)("p",null,"First things first, define the schemas and modules directory."),(0,r.kt)("pre",null,(0,r.kt)("code",u({parentName:"pre"},{className:"language-typescript"}),"import { defineConfig } from '@baeta/cli';\n\nexport default defineConfig({\n  graphql: {\n    schemas: ['src/**.gql'],\n    modulesDir: 'src/modules',\n  },\n});\n")),(0,r.kt)("p",null,"After defining the schemas and modules directory, define the entry point of your app and the location where the compiler should build."),(0,r.kt)("pre",null,(0,r.kt)("code",u({parentName:"pre"},{className:"language-typescript"}),"import { defineConfig } from '@baeta/cli';\n\nexport default defineConfig({\n  graphql: {\n    schemas: ['src/**.gql'],\n    modulesDir: 'src/modules',\n  },\n  compiler: {\n    src: 'src/app.ts',\n    dist: 'dist',\n  },\n});\n")),(0,r.kt)("p",null,"Finally, add the following scripts to ",(0,r.kt)("inlineCode",{parentName:"p"},"package.json"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",u({parentName:"pre"},{className:"language-json"}),'"scripts": {\n    "build": "baeta build --generate",\n    "generate": "baeta generate",\n    "start": "baeta build --watch --generate --onSuccess=\'node --enable-source-maps dist/app.js\'"\n}\n')),(0,r.kt)("p",null,"These scripts will build your app and start it. You can modify these scripts based on your requirements."),(0,r.kt)("p",null,"For more configuration options and defaults, check out the advanced guide."))}v.isMDXComponent=!0}}]);