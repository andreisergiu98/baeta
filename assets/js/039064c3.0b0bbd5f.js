/*! For license information please see 039064c3.0b0bbd5f.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[4311],{44:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>x,frontMatter:()=>l,metadata:()=>d,toc:()=>t});const d=JSON.parse('{"id":"api/compiler/module_index","title":"index","description":"Interfaces","source":"@site/docs/api/compiler/module_index.md","sourceDirName":"api/compiler","slug":"/api/compiler/module_index","permalink":"/docs/api/compiler/module_index","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"@baeta/compiler","permalink":"/docs/api/compiler/"},"next":{"title":"esbuild","permalink":"/docs/api/compiler/esbuild"}}');var r=s(7250),i=s(589);const l={},c="index",o={},t=[{value:"Interfaces",id:"interfaces",level:2},{value:"CompilerOptions",id:"compileroptions",level:3},{value:"Properties",id:"properties",level:4},{value:"HooksOptions",id:"hooksoptions",level:3},{value:"Properties",id:"properties-1",level:4},{value:"Functions",id:"functions",level:2},{value:"build()",id:"build",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"buildAndWatch()",id:"buildandwatch",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"bundleFile()",id:"bundlefile",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"createEsbuildCliHooksPlugin()",id:"createesbuildclihooksplugin",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4}];function h(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"index",children:"index"})}),"\n",(0,r.jsx)(n.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,r.jsx)(n.h3,{id:"compileroptions",children:"CompilerOptions"}),"\n",(0,r.jsx)(n.h4,{id:"properties",children:"Properties"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Default value"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"dist"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"string"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"undefined"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"The output directory"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Example"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'dist: "dist";\n'})}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"src"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"string"})," | ",(0,r.jsx)(n.code,{children:"string"}),"[]"]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"undefined"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"The source file or files to compile"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Example"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'src: "src/index.ts";\n'})}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"bundleDeps?"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"boolean"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"false;\n"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"If true the bundle will also include all dependencies"}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"bundleWorkspaces?"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"boolean"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"true; // in watch mode\n"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"If true the bundle will also include all workspace dependencies."}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"cjsGlobals?"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"boolean"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"false;\n"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Adds CommonJS global variables within esm bundle like:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"__dirname"})," - Corresponds to the directory of the generated bundle file"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"__filename"})," - Corresponds to the file path of the generated bundle file"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"require"})," - Corresponds to the Node.js synchronous function to import modules"]}),"\n"]}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"esbuild?"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Partial"}),"<",(0,r.jsx)(n.code,{children:"Omit"}),"<",(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#buildoptions",children:(0,r.jsx)(n.code,{children:"BuildOptions"})}),", ",(0,r.jsx)(n.code,{children:'"outdir"'})," | ",(0,r.jsx)(n.code,{children:'"entryPoints"'}),">>"]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"undefined"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Options to pass to esbuild"}),"\n"]})]})]})]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"hooksoptions",children:"HooksOptions"}),"\n",(0,r.jsx)(n.h4,{id:"properties-1",children:"Properties"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"onBuildEnd"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:["(",(0,r.jsx)(n.code,{children:"buildTime"}),": ",(0,r.jsx)(n.code,{children:"number"}),", ",(0,r.jsx)(n.code,{children:"warnings"}),": ",(0,r.jsx)(n.code,{children:"string"}),"[], ",(0,r.jsx)(n.code,{children:"errors"}),": ",(0,r.jsx)(n.code,{children:"string"}),"[]) => ",(0,r.jsx)(n.code,{children:"void"})," | ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"onBuildStart"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:["(",(0,r.jsx)(n.code,{children:"startTime"}),": ",(0,r.jsx)(n.code,{children:"number"}),") => ",(0,r.jsx)(n.code,{children:"void"})," | ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n"]})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,r.jsx)(n.h3,{id:"build",children:"build()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"build"}),"(",(0,r.jsx)(n.code,{children:"options"}),"): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"options"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/compiler/module_index#compileroptions",children:(0,r.jsx)(n.code,{children:"CompilerOptions"})})}),"\n"]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"buildandwatch",children:"buildAndWatch()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"buildAndWatch"}),"(",(0,r.jsx)(n.code,{children:"options"}),"): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#buildcontextprovidedoptions",children:(0,r.jsx)(n.code,{children:"BuildContext"})}),"<",(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#buildoptions",children:(0,r.jsx)(n.code,{children:"BuildOptions"})}),">>"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"options"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/compiler/module_index#compileroptions",children:(0,r.jsx)(n.code,{children:"CompilerOptions"})})}),"\n"]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#buildcontextprovidedoptions",children:(0,r.jsx)(n.code,{children:"BuildContext"})}),"<",(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#buildoptions",children:(0,r.jsx)(n.code,{children:"BuildOptions"})}),">>"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"bundlefile",children:"bundleFile()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"bundleFile"}),"(",(0,r.jsx)(n.code,{children:"fileName"}),"): ",(0,r.jsx)(n.code,{children:"Promise"}),"<{ ",(0,r.jsx)(n.code,{children:"code"}),": ",(0,r.jsx)(n.code,{children:"string"}),"; ",(0,r.jsx)(n.code,{children:"dependencies"}),": ",(0,r.jsx)(n.code,{children:"string"}),"[]; }>"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"fileName"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"string"})}),"\n"]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<{ ",(0,r.jsx)(n.code,{children:"code"}),": ",(0,r.jsx)(n.code,{children:"string"}),"; ",(0,r.jsx)(n.code,{children:"dependencies"}),": ",(0,r.jsx)(n.code,{children:"string"}),"[]; }>"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"createesbuildclihooksplugin",children:"createEsbuildCliHooksPlugin()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"createEsbuildCliHooksPlugin"}),"(",(0,r.jsx)(n.code,{children:"options"}),"): ",(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#plugin",children:(0,r.jsx)(n.code,{children:"Plugin"})})]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"options"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/compiler/module_index#hooksoptions",children:(0,r.jsx)(n.code,{children:"HooksOptions"})})}),"\n"]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/compiler/esbuild#plugin",children:(0,r.jsx)(n.code,{children:"Plugin"})})})]})}function x(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},2410:(e,n,s)=>{var d=s(7402),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,c=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function t(e,n,s){var d,i={},t=null,h=null;for(d in void 0!==s&&(t=""+s),void 0!==n.key&&(t=""+n.key),void 0!==n.ref&&(h=n.ref),n)l.call(n,d)&&!o.hasOwnProperty(d)&&(i[d]=n[d]);if(e&&e.defaultProps)for(d in n=e.defaultProps)void 0===i[d]&&(i[d]=n[d]);return{$$typeof:r,type:e,key:t,ref:h,props:i,_owner:c.current}}n.Fragment=i,n.jsx=t,n.jsxs=t},7250:(e,n,s)=>{e.exports=s(2410)},589:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>c});var d=s(7402);const r={},i=d.createContext(r);function l(e){const n=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),d.createElement(i.Provider,{value:n},e.children)}}}]);