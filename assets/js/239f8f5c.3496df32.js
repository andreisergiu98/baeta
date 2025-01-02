/*! For license information please see 239f8f5c.3496df32.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5289],{7728:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>t,contentTitle:()=>l,default:()=>x,frontMatter:()=>i,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"api/create-baeta/index","title":"create-baeta","description":"Interfaces","source":"@site/docs/api/create-baeta/index.md","sourceDirName":"api/create-baeta","slug":"/api/create-baeta/","permalink":"/docs/api/create-baeta/","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"BaetaExtensions","permalink":"/docs/api/core/sdk/namespaces/BaetaExtensions"},"next":{"title":"directives","permalink":"/docs/api/directives/"}}');var d=r(7250),c=r(589);const i={},l="create-baeta",t={},h=[{value:"Interfaces",id:"interfaces",level:2},{value:"Args",id:"args",level:3},{value:"Properties",id:"properties",level:4},{value:"CliOptions",id:"clioptions",level:3},{value:"Properties",id:"properties-1",level:4},{value:"Type Aliases",id:"type-aliases",level:2},{value:"JavaScriptRuntime",id:"javascriptruntime",level:3},{value:"PackageManager",id:"packagemanager",level:3},{value:"Template",id:"template",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Variables",id:"variables",level:2},{value:"defaultJavaScriptRuntime",id:"defaultjavascriptruntime",level:3},{value:"defaultPackageManager",id:"defaultpackagemanager",level:3},{value:"gitignoreUrl",id:"gitignoreurl",level:3},{value:"lockfileNames",id:"lockfilenames",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"packageManagers",id:"packagemanagers",level:3},{value:"runtimes",id:"runtimes",level:3},{value:"Functions",id:"functions",level:2},{value:"copyTemplate()",id:"copytemplate",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"createTsconfig()",id:"createtsconfig",level:3},{value:"Returns",id:"returns-1",level:4},{value:"getAppName()",id:"getappname",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"getInstallCommand()",id:"getinstallcommand",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4},{value:"getPackageJson()",id:"getpackagejson",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-4",level:4},{value:"getPackageManager()",id:"getpackagemanager",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-5",level:4},{value:"getRuntime()",id:"getruntime",level:3},{value:"Returns",id:"returns-6",level:4},{value:"getTemplate()",id:"gettemplate",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-7",level:4},{value:"handler()",id:"handler",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-8",level:4}];function j(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,c.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"create-baeta",children:"create-baeta"})}),"\n",(0,d.jsx)(n.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,d.jsx)(n.h3,{id:"args",children:"Args"}),"\n",(0,d.jsx)(n.h4,{id:"properties",children:"Properties"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Property"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"rootDir"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"appName?"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"packageManager?"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:'"npm"'})," | ",(0,d.jsx)(n.code,{children:'"yarn"'})," | ",(0,d.jsx)(n.code,{children:'"pnpm"'})," | ",(0,d.jsx)(n.code,{children:'"bun"'})]}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"skipInstall?"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"boolean"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"template?"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"clioptions",children:"CliOptions"}),"\n",(0,d.jsx)(n.h4,{id:"properties-1",children:"Properties"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Property"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"packageManager?"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:'"npm"'})," | ",(0,d.jsx)(n.code,{children:'"yarn"'})," | ",(0,d.jsx)(n.code,{children:'"pnpm"'})," | ",(0,d.jsx)(n.code,{children:'"bun"'})]}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"skipInstall?"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"boolean"})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"type-aliases",children:"Type Aliases"}),"\n",(0,d.jsx)(n.h3,{id:"javascriptruntime",children:"JavaScriptRuntime"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"JavaScriptRuntime"}),": ",(0,d.jsx)(n.em,{children:"typeof"})," ",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#runtimes",children:(0,d.jsx)(n.code,{children:"runtimes"})}),"[",(0,d.jsx)(n.code,{children:"number"}),"]"]}),"\n"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"packagemanager",children:"PackageManager"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"PackageManager"}),": keyof ",(0,d.jsx)(n.em,{children:"typeof"})," ",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#lockfilenames",children:(0,d.jsx)(n.code,{children:"lockfileNames"})})]}),"\n"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"template",children:"Template"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Template"}),": ",(0,d.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Name"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"name"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"path"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"packageJsn"}),"?"]}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"variables",children:"Variables"}),"\n",(0,d.jsx)(n.h3,{id:"defaultjavascriptruntime",children:"defaultJavaScriptRuntime"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"const"})," ",(0,d.jsx)(n.strong,{children:"defaultJavaScriptRuntime"}),": ",(0,d.jsx)(n.code,{children:'"node"'})," = ",(0,d.jsx)(n.code,{children:"'node'"})]}),"\n"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"defaultpackagemanager",children:"defaultPackageManager"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"const"})," ",(0,d.jsx)(n.strong,{children:"defaultPackageManager"}),": ",(0,d.jsx)(n.code,{children:'"npm"'})," = ",(0,d.jsx)(n.code,{children:"'npm'"})]}),"\n"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"gitignoreurl",children:"gitignoreUrl"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"const"})," ",(0,d.jsx)(n.strong,{children:"gitignoreUrl"}),": ",(0,d.jsx)(n.code,{children:'"https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore"'})," = ",(0,d.jsx)(n.code,{children:"'https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore'"})]}),"\n"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"lockfilenames",children:"lockfileNames"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"const"})," ",(0,d.jsx)(n.strong,{children:"lockfileNames"}),": ",(0,d.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"type-declaration-1",children:"Type declaration"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Name"}),(0,d.jsx)(n.th,{children:"Type"}),(0,d.jsx)(n.th,{children:"Default value"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"bun"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:"'bun.lockb'"}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"npm"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:"'package-lock.json'"}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"pnpm"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:"'pnpm-lock.yaml'"}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"yarn"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:"'yarn.lock'"}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"packagemanagers",children:"packageManagers"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"const"})," ",(0,d.jsx)(n.strong,{children:"packageManagers"}),": (",(0,d.jsx)(n.code,{children:'"npm"'})," | ",(0,d.jsx)(n.code,{children:'"yarn"'})," | ",(0,d.jsx)(n.code,{children:'"pnpm"'})," | ",(0,d.jsx)(n.code,{children:'"bun"'}),")[]"]}),"\n"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"runtimes",children:"runtimes"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"const"})," ",(0,d.jsx)(n.strong,{children:"runtimes"}),": readonly [",(0,d.jsx)(n.code,{children:'"node"'}),", ",(0,d.jsx)(n.code,{children:'"deno"'}),", ",(0,d.jsx)(n.code,{children:'"bun"'}),"]"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,d.jsx)(n.h3,{id:"copytemplate",children:"copyTemplate()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"copyTemplate"}),"(",(0,d.jsx)(n.code,{children:"appName"}),", ",(0,d.jsx)(n.code,{children:"runtime"}),", ",(0,d.jsx)(n.code,{children:"template"}),", ",(0,d.jsx)(n.code,{children:"dest"}),"): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"appName"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"runtime"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:'"bun"'})," | ",(0,d.jsx)(n.code,{children:'"node"'})," | ",(0,d.jsx)(n.code,{children:'"deno"'})]}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"template"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#template-1",children:(0,d.jsx)(n.code,{children:"Template"})})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"dest"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"createtsconfig",children:"createTsconfig()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"createTsconfig"}),"(): ",(0,d.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"object"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Name"}),(0,d.jsx)(n.th,{children:"Type"}),(0,d.jsx)(n.th,{children:"Default value"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"$schema"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})}),(0,d.jsxs)(n.td,{children:['"',(0,d.jsx)(n.a,{href:"https://json.schemastore.org/tsconfig",children:"https://json.schemastore.org/tsconfig"}),'"']})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"object"})}),(0,d.jsx)(n.td,{children:"-"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.allowImportingTsExtensions"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.allowSyntheticDefaultImports"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.emitDeclarationOnly"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"false"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.esModuleInterop"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.forceConsistentCasingInFileNames"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.isolatedModules"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.lib"})}),(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"string"}),"[]"]}),(0,d.jsx)(n.td,{children:"-"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.module"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})}),(0,d.jsx)(n.td,{children:'"esnext"'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.moduleResolution"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})}),(0,d.jsx)(n.td,{children:'"bundler"'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.noEmit"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.noImplicitAny"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.outDir"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})}),(0,d.jsx)(n.td,{children:"'dist'"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.rootDir"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})}),(0,d.jsx)(n.td,{children:"'src'"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.skipLibCheck"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.strict"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.target"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})}),(0,d.jsx)(n.td,{children:'"es2023"'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"compilerOptions.verbatimModuleSyntax"})}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"exclude"})}),(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"string"}),"[]"]}),(0,d.jsx)(n.td,{children:"-"})]})]})]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"getappname",children:"getAppName()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"getAppName"}),"(",(0,d.jsx)(n.code,{children:"reqName"}),", ",(0,d.jsx)(n.code,{children:"rootDir"}),"): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"string"}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"reqName"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"rootDir"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"string"}),">"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"getinstallcommand",children:"getInstallCommand()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"getInstallCommand"}),"(",(0,d.jsx)(n.code,{children:"pkgManager"}),"): ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsx)(n.tbody,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"pkgManager"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:'"npm"'})," | ",(0,d.jsx)(n.code,{children:'"yarn"'})," | ",(0,d.jsx)(n.code,{children:'"pnpm"'})," | ",(0,d.jsx)(n.code,{children:'"bun"'})]}),"\n"]})]})})]}),"\n",(0,d.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"getpackagejson",children:"getPackageJson()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"getPackageJson"}),"(",(0,d.jsx)(n.code,{children:"appName"}),", ",(0,d.jsx)(n.code,{children:"runtime"}),", ",(0,d.jsx)(n.code,{children:"templateName"}),"): ",(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"appName"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"runtime"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:'"bun"'})," | ",(0,d.jsx)(n.code,{children:'"node"'})," | ",(0,d.jsx)(n.code,{children:'"deno"'})]}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"templateName"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"getpackagemanager",children:"getPackageManager()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"getPackageManager"}),"(",(0,d.jsx)(n.code,{children:"dest"}),", ",(0,d.jsx)(n.code,{children:"__namedParameters"}),"): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#packagemanager-2",children:(0,d.jsx)(n.code,{children:"PackageManager"})}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"dest"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"__namedParameters"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#clioptions",children:(0,d.jsx)(n.code,{children:"CliOptions"})})}),"\n"]})]})]})]}),"\n",(0,d.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#packagemanager-2",children:(0,d.jsx)(n.code,{children:"PackageManager"})}),">"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"getruntime",children:"getRuntime()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"getRuntime"}),"(): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#javascriptruntime",children:(0,d.jsx)(n.code,{children:"JavaScriptRuntime"})}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#javascriptruntime",children:(0,d.jsx)(n.code,{children:"JavaScriptRuntime"})}),">"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"gettemplate",children:"getTemplate()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"getTemplate"}),"(",(0,d.jsx)(n.code,{children:"reqTemplate"}),"): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#template-1",children:(0,d.jsx)(n.code,{children:"Template"})}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsx)(n.tbody,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"reqTemplate"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]})]})})]}),"\n",(0,d.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#template-1",children:(0,d.jsx)(n.code,{children:"Template"})}),">"]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"handler",children:"handler()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"handler"}),"(",(0,d.jsx)(n.code,{children:"args"}),"): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Parameter"}),(0,d.jsx)(n.th,{children:"Type"})]})}),(0,d.jsx)(n.tbody,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"args"})}),"\n"]}),(0,d.jsxs)(n.td,{children:["\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/docs/api/create-baeta/#args",children:(0,d.jsx)(n.code,{children:"Args"})})}),"\n"]})]})})]}),"\n",(0,d.jsx)(n.h4,{id:"returns-8",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]})]})}function x(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(j,{...e})}):j(e)}},2410:(e,n,r)=>{var s=r(7402),d=Symbol.for("react.element"),c=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function h(e,n,r){var s,c={},h=null,j=null;for(s in void 0!==r&&(h=""+r),void 0!==n.key&&(h=""+n.key),void 0!==n.ref&&(j=n.ref),n)i.call(n,s)&&!t.hasOwnProperty(s)&&(c[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===c[s]&&(c[s]=n[s]);return{$$typeof:d,type:e,key:h,ref:j,props:c,_owner:l.current}}n.Fragment=c,n.jsx=h,n.jsxs=h},7250:(e,n,r)=>{e.exports=r(2410)},589:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>l});var s=r(7402);const d={},c=s.createContext(d);function i(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:i(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);