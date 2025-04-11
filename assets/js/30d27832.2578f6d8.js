/*! For license information please see 30d27832.2578f6d8.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[4890],{589:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var i=t(7402);const r={},s=i.createContext(r);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:n},e.children)}},2410:(e,n,t)=>{var i=t(7402),r=Symbol.for("react.element"),s=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,a=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,t){var i,s={},l=null,d=null;for(i in void 0!==t&&(l=""+t),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(d=n.ref),n)o.call(n,i)&&!c.hasOwnProperty(i)&&(s[i]=n[i]);if(e&&e.defaultProps)for(i in n=e.defaultProps)void 0===s[i]&&(s[i]=n[i]);return{$$typeof:r,type:e,key:l,ref:d,props:s,_owner:a.current}}n.Fragment=s,n.jsx=l,n.jsxs=l},3662:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"getting-started/configuration","title":"Configuration","description":"Configure your Baeta project with TypeScript","source":"@site/docs/getting-started/configuration.mdx","sourceDirName":"getting-started","slug":"/getting-started/configuration","permalink":"/docs/getting-started/configuration","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"description":"Configure your Baeta project with TypeScript"},"sidebar":"defaultSidebar","previous":{"title":"Installation","permalink":"/docs/getting-started/installation"},"next":{"title":"First Module","permalink":"/docs/getting-started/first-module"}}');var r=t(7250),s=t(589);const o={sidebar_position:2,description:"Configure your Baeta project with TypeScript"},a="Configuration",c={},l=[{value:"Configuration File",id:"configuration-file",level:2},{value:"Basic Configuration",id:"basic-configuration",level:2},{value:"1. Define Schema Location",id:"1-define-schema-location",level:3},{value:"2. Configure Build Settings",id:"2-configure-build-settings",level:3},{value:"3.Add Package.json Scripts",id:"3add-packagejson-scripts",level:3},{value:"Next Steps",id:"next-steps",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"configuration",children:"Configuration"})}),"\n",(0,r.jsx)(n.p,{children:"Set up your Baeta project configuration in a few simple steps."}),"\n",(0,r.jsx)(n.h2,{id:"configuration-file",children:"Configuration File"}),"\n",(0,r.jsx)(n.p,{children:"Baeta looks for a configuration file in your project root with one of these names:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"baeta.js"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:".baeta.js"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"baeta.mjs"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:".baeta.mjs"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"baeta.ts"})," (requires ",(0,r.jsx)(n.code,{children:"@baeta/compiler"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:".baeta.ts"})," (requires ",(0,r.jsx)(n.code,{children:"@baeta/compiler"}),")"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["While Baeta supports ",(0,r.jsx)(n.strong,{children:"CommonJS"}),", the configuration file must use ",(0,r.jsx)(n.strong,{children:"ESM"}),". If using ",(0,r.jsx)(n.code,{children:".js"})," file, ensure ",(0,r.jsx)(n.code,{children:'"type": "module"'})," is set in your ",(0,r.jsx)(n.code,{children:"package.json"}),", otherwise use the ",(0,r.jsx)(n.code,{children:".mjs"})," file extension."]})}),"\n",(0,r.jsx)(n.h2,{id:"basic-configuration",children:"Basic Configuration"}),"\n",(0,r.jsx)(n.h3,{id:"1-define-schema-location",children:"1. Define Schema Location"}),"\n",(0,r.jsx)(n.p,{children:"First, specify where your GraphQL schemas are located:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'import { defineConfig } from "@baeta/cli";\n\nexport default defineConfig({\n  graphql: {\n    schemas: ["src/**/*.gql"], // Location of your GraphQL schemas\n  },\n});\n'})}),"\n",(0,r.jsx)(n.h3,{id:"2-configure-build-settings",children:"2. Configure Build Settings"}),"\n",(0,r.jsx)(n.p,{children:"Add compiler configuration to specify your app's entry point and build output:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'import { defineConfig } from "@baeta/cli";\n\nexport default defineConfig({\n  graphql: {\n    schemas: ["src/**/*.gql"],\n    modulesDir: "src/modules",\n  },\n  compiler: {\n    src: "src/app.ts", // Your application entry point\n    dist: "dist", // Build output directory\n  },\n});\n'})}),"\n",(0,r.jsx)(n.h3,{id:"3add-packagejson-scripts",children:"3.Add Package.json Scripts"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "scripts": {\n    "build": "baeta build --generate",\n    "generate": "baeta generate",\n    "start": "baeta build --watch --generate --onSuccess=\'node --enable-source-maps dist/app.js\'"\n  }\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"These scripts provide:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"build"}),": Builds your project and generates necessary files"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"generate"}),": Updates GraphQL types and resolvers"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"start"}),": Runs development server with hot reload"]}),"\n"]}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsxs)(n.p,{children:["If you're using Bun or Deno you might prefer to run the TypeScript source directly. In that case replace ",(0,r.jsx)(n.code,{children:"start"})," with:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "start:bun": "baeta generate --watch --run=\'bun --watch --inspect src/app.ts\'",\n  "start:deno": "baeta generate --watch --run=\'deno --watch --inspect --allow-net --allow-read --allow-env src/app.ts\'"\n}\n'})})]}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["Run ",(0,r.jsx)(n.code,{children:"baeta generate --help"})," or ",(0,r.jsx)(n.code,{children:"baeta build --help"})," to see all command options"]})}),"\n",(0,r.jsx)(n.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,r.jsxs)(n.p,{children:["Once configured, you're ready to ",(0,r.jsx)(n.a,{href:"./first-module",children:"create your first module"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},7250:(e,n,t)=>{e.exports=t(2410)}}]);