"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[671],{5810:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var a=r(3289);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),p=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(r),y=n,m=d["".concat(l,".").concat(y)]||d[y]||u[y]||o;return r?a.createElement(m,i(i({ref:t},c),{},{components:r})):a.createElement(m,i({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:n,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}y.displayName="MDXCreateElement"},566:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>h,default:()=>k,frontMatter:()=>m,metadata:()=>f,toc:()=>v});var a=r(5810),n=Object.defineProperty,o=Object.defineProperties,i=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,c=(e,t,r)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,d=(e,t)=>{for(var r in t||(t={}))l.call(t,r)&&c(e,r,t[r]);if(s)for(var r of s(t))p.call(t,r)&&c(e,r,t[r]);return e},u=(e,t)=>o(e,i(t)),y=(e,t)=>{var r={};for(var a in e)l.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&s)for(var a of s(e))t.indexOf(a)<0&&p.call(e,a)&&(r[a]=e[a]);return r};const m={sidebar_position:1},h="Introduction",f={unversionedId:"intro",id:"intro",title:"Introduction",description:"What is Baeta?",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Getting Started",permalink:"/docs/category/getting-started"}},b={},v=[{value:"What is Baeta?",id:"what-is-baeta",level:2},{value:"Why use Baeta?",id:"why-use-baeta",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"Ready to get started?",id:"ready-to-get-started",level:2}],g={toc:v},w="wrapper";function k(e){var t=e,{components:r}=t,n=y(t,["components"]);return(0,a.kt)(w,u(d(d({},g),n),{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",d({},{id:"introduction"}),"Introduction"),(0,a.kt)("h2",d({},{id:"what-is-baeta"}),"What is Baeta?"),(0,a.kt)("p",null,"Baeta is a modern, open-source GraphQL framework that enables developers to build powerful and scalable GraphQL APIs with ease. It provides a modular architecture, a schema-first approach, and automatic code generation, making it easy to build and maintain robust GraphQL APIs."),(0,a.kt)("h2",d({},{id:"why-use-baeta"}),"Why use Baeta?"),(0,a.kt)("p",null,"Baeta makes it easy to build better GraphQL APIs. Here are some of the key reasons why you should consider using Baeta:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Modular architecture:")," Baeta's modular design allows you to organize your GraphQL API into smaller, more manageable modules that can be added or removed as needed. This makes it easier to maintain and scale your API over time."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Schema-first approach:")," With Baeta, you define your schema first, and then logic and resolvers. This approach ensures a consistent and well-defined API for your clients and reduces boilerplate code."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type safety:")," Baeta provides automatic code generation, which ensures type safety and reduces errors. This improves the stability and reliability of your API."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Middleware and directives:")," Baeta supports middleware and directives, which allow you to add custom behavior to your resolvers and schema validation. This makes it easy to add authentication, logging, or other custom behavior to your API."),(0,a.kt)("h2",d({},{id:"compatibility"}),"Compatibility"),(0,a.kt)("p",null,"Baeta is compatible with all GraphQL servers, which makes it easy to integrate with your existing stack. It works seamlessly with popular GraphQL server libraries such as ",(0,a.kt)("inlineCode",{parentName:"p"},"graphql-yoga")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Apollo Server"),", as well as other popular tools like ",(0,a.kt)("inlineCode",{parentName:"p"},"Prisma")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Kysely"),"."),(0,a.kt)("h2",d({},{id:"ready-to-get-started"}),"Ready to get started?"),(0,a.kt)("p",null,"Head over to the the next page to learn more and get started today!"))}k.isMDXComponent=!0}}]);