/*! For license information please see 3e3f1bd3.7c0a5894.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[6402],{66177:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>d,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"api/plugin-exec/interfaces/ExecPluginOptions","title":"Interface: ExecPluginOptions","description":"Properties","source":"@site/docs/api/plugin-exec/interfaces/ExecPluginOptions.md","sourceDirName":"api/plugin-exec/interfaces","slug":"/api/plugin-exec/interfaces/ExecPluginOptions","permalink":"/docs/api/plugin-exec/interfaces/ExecPluginOptions","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Function: dynamicImport()","permalink":"/docs/api/plugin-exec/functions/dynamicImport"},"next":{"title":"@baeta/plugin-gitignore","permalink":"/docs/api/plugin-gitignore/"}}');var s=i(77250),c=i(50589);const d={},t="Interface: ExecPluginOptions",l={},a=[{value:"Properties",id:"properties",level:2},{value:"actionName?",id:"actionname",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"exec",id:"exec",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"name?",id:"name",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"skip()?",id:"skip",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"watch?",id:"watch",level:3},{value:"Defined in",id:"defined-in-4",level:4}];function o(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",p:"p",strong:"strong",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"interface-execpluginoptions",children:"Interface: ExecPluginOptions"})}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"actionname",children:"actionName?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"actionName"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/plugin-exec/index.ts#L5",children:"plugin-exec/index.ts:5"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"exec",children:"exec"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"exec"}),": ",(0,s.jsx)(n.code,{children:"string"})," | (",(0,s.jsx)(n.code,{children:"ctx"}),") => ",(0,s.jsx)(n.code,{children:"void"})," | ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/plugin-exec/index.ts#L6",children:"plugin-exec/index.ts:6"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"name",children:"name?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"name"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/plugin-exec/index.ts#L4",children:"plugin-exec/index.ts:4"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"skip",children:"skip()?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"skip"}),": (",(0,s.jsx)(n.code,{children:"ctx"}),") => ",(0,s.jsx)(n.code,{children:"boolean"})," | ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"boolean"}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx"})]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.changedFile?"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/generator/interfaces/WatcherFile",children:(0,s.jsx)(n.code,{children:"WatcherFile"})})]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.didEnd"}),": ",(0,s.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.didGenerate"}),": ",(0,s.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.didSetup"}),": ",(0,s.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.fileManager"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/FileManager",children:(0,s.jsx)(n.code,{children:"FileManager"})})]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.generatorOptions"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/generator-sdk/interfaces/NormalizedGeneratorOptions",children:(0,s.jsx)(n.code,{children:"NormalizedGeneratorOptions"})})]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.pluginNames"}),": ",(0,s.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"ctx.watching"}),": ",(0,s.jsx)(n.code,{children:"boolean"})]}),"\n",(0,s.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"boolean"})," | ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"boolean"}),">"]}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/plugin-exec/index.ts#L8",children:"plugin-exec/index.ts:8"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"watch",children:"watch?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"watch"}),": ",(0,s.jsx)(n.a,{href:"/docs/api/generator-sdk/type-aliases/GeneratorPluginV1WatchOptions",children:(0,s.jsx)(n.code,{children:"GeneratorPluginV1WatchOptions"})})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/plugin-exec/index.ts#L7",children:"plugin-exec/index.ts:7"})})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},2410:(e,n,i)=>{var r=i(67402),s=Symbol.for("react.element"),c=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,t=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function a(e,n,i){var r,c={},a=null,o=null;for(r in void 0!==i&&(a=""+i),void 0!==n.key&&(a=""+n.key),void 0!==n.ref&&(o=n.ref),n)d.call(n,r)&&!l.hasOwnProperty(r)&&(c[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===c[r]&&(c[r]=n[r]);return{$$typeof:s,type:e,key:a,ref:o,props:c,_owner:t.current}}n.Fragment=c,n.jsx=a,n.jsxs=a},77250:(e,n,i)=>{e.exports=i(2410)},50589:(e,n,i)=>{i.d(n,{R:()=>d,x:()=>t});var r=i(67402);const s={},c=r.createContext(s);function d(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);