/*! For license information please see 82941e59.ef15887d.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[2458],{4484:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>c});const d=JSON.parse('{"id":"api/plugin-autoload/index","title":"@baeta/plugin-autoload","description":"Interfaces","source":"@site/docs/api/plugin-autoload/index.md","sourceDirName":"api/plugin-autoload","slug":"/api/plugin-autoload/","permalink":"/docs/api/plugin-autoload/","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"plugin","permalink":"/docs/api/plugin/"},"next":{"title":"plugin-cloudflare","permalink":"/docs/api/plugin-cloudflare/"}}');var r=s(7250),l=s(589);const i={},t="@baeta/plugin-autoload",o={},c=[{value:"Interfaces",id:"interfaces",level:2},{value:"AutoloadModuleOptions",id:"autoloadmoduleoptions",level:3},{value:"Properties",id:"properties",level:4},{value:"AutoloadPluginOptions",id:"autoloadpluginoptions",level:3},{value:"Properties",id:"properties-1",level:4},{value:"AutoloadResolverOptions",id:"autoloadresolveroptions",level:3},{value:"Properties",id:"properties-2",level:4},{value:"Functions",id:"functions",level:2},{value:"autoloadPlugin()",id:"autoloadplugin",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"baetaplugin-autoload",children:"@baeta/plugin-autoload"})}),"\n",(0,r.jsx)(n.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,r.jsx)(n.h3,{id:"autoloadmoduleoptions",children:"AutoloadModuleOptions"}),"\n",(0,r.jsx)(n.h4,{id:"properties",children:"Properties"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"match"})," ",(0,r.jsx)(n.code,{children:"match?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:["(",(0,r.jsx)(n.code,{children:"moduleName"}),": ",(0,r.jsx)(n.code,{children:"string"}),") => ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Custom function to determine if a module should be included"}),"\n"]})]})})]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"autoloadpluginoptions",children:"AutoloadPluginOptions"}),"\n",(0,r.jsx)(n.h4,{id:"properties-1",children:"Properties"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Default value"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"modules"})," ",(0,r.jsx)(n.code,{children:"modules?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"boolean"})," | ",(0,r.jsx)(n.a,{href:"/docs/api/plugin-autoload/#autoloadmoduleoptions",children:(0,r.jsx)(n.code,{children:"AutoloadModuleOptions"})})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"undefined"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Configuration for module autoloading. Set to false to disable"}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"output"})," ",(0,r.jsx)(n.code,{children:"output?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"string"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"`${modulesDir}/autoload.ts`;\n"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Output path for the generated autoload file"}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"resolvers"})," ",(0,r.jsx)(n.code,{children:"resolvers?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"boolean"})," | ",(0,r.jsx)(n.a,{href:"/docs/api/plugin-autoload/#autoloadresolveroptions",children:(0,r.jsx)(n.code,{children:"AutoloadResolverOptions"})})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"undefined"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Configuration for resolver autoloading. Set to false to disable"}),"\n"]})]})]})]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"autoloadresolveroptions",children:"AutoloadResolverOptions"}),"\n",(0,r.jsx)(n.h4,{id:"properties-2",children:"Properties"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"disabledefaultsuffixes"})," ",(0,r.jsx)(n.code,{children:"disableDefaultSuffixes?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"boolean"})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"If true, disables the default resolver suffixes"}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"match-1"})," ",(0,r.jsx)(n.code,{children:"match?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:["(",(0,r.jsx)(n.code,{children:"filename"}),": ",(0,r.jsx)(n.code,{children:"string"}),") => ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Custom function to determine if a resolver file should be included"}),"\n"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{id:"suffix"})," ",(0,r.jsx)(n.code,{children:"suffix?"})]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"string"})," | ",(0,r.jsx)(n.code,{children:"string"}),"[]"]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Custom suffix(es) to identify resolver files\nUsed together with the default suffixes, unless disabled"}),"\n"]})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,r.jsx)(n.h3,{id:"autoloadplugin",children:"autoloadPlugin()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"autoloadPlugin"}),"(",(0,r.jsx)(n.code,{children:"options"}),"?): ",(0,r.jsx)(n.a,{href:"/docs/api/generator/#generatorpluginv1store",children:(0,r.jsx)(n.code,{children:"GeneratorPluginV1"})}),"<",(0,r.jsx)(n.code,{children:"unknown"}),">"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["A plugin that automatically loads GraphQL resolvers and modules based on file names.\nSee ",(0,r.jsx)(n.a,{href:"https://baeta.io/docs/plugins/autoloading",children:"https://baeta.io/docs/plugins/autoloading"})]}),"\n",(0,r.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"options"}),"?"]}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/plugin-autoload/#autoloadpluginoptions",children:(0,r.jsx)(n.code,{children:"AutoloadPluginOptions"})})}),"\n"]}),(0,r.jsxs)(n.td,{children:["\n",(0,r.jsx)(n.p,{children:"Configuration options for the autoload plugin"}),"\n"]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/docs/api/generator/#generatorpluginv1store",children:(0,r.jsx)(n.code,{children:"GeneratorPluginV1"})}),"<",(0,r.jsx)(n.code,{children:"unknown"}),">"]}),"\n",(0,r.jsx)(n.p,{children:"A Baeta generator plugin"})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},2410:(e,n,s)=>{var d=s(7402),r=Symbol.for("react.element"),l=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,t=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,s){var d,l={},c=null,a=null;for(d in void 0!==s&&(c=""+s),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(a=n.ref),n)i.call(n,d)&&!o.hasOwnProperty(d)&&(l[d]=n[d]);if(e&&e.defaultProps)for(d in n=e.defaultProps)void 0===l[d]&&(l[d]=n[d]);return{$$typeof:r,type:e,key:c,ref:a,props:l,_owner:t.current}}n.Fragment=l,n.jsx=c,n.jsxs=c},7250:(e,n,s)=>{e.exports=s(2410)},589:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>t});var d=s(7402);const r={},l=d.createContext(r);function i(e){const n=d.useContext(l);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),d.createElement(l.Provider,{value:n},e.children)}}}]);