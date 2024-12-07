/*! For license information please see 4c7077fe.9ad14968.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[9540],{18822:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"api/cli/ink/type-aliases/RenderOptions","title":"Type Alias: RenderOptions","description":"RenderOptions: object","source":"@site/docs/api/cli/ink/type-aliases/RenderOptions.md","sourceDirName":"api/cli/ink/type-aliases","slug":"/api/cli/ink/type-aliases/RenderOptions","permalink":"/docs/api/cli/ink/type-aliases/RenderOptions","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Type Alias: NewlineProps","permalink":"/docs/api/cli/ink/type-aliases/NewlineProps"},"next":{"title":"Type Alias: StaticProps\\\\<T\\\\>","permalink":"/docs/api/cli/ink/type-aliases/StaticProps"}}');var l=t(77250),i=t(50589);const r={},d="Type Alias: RenderOptions",o={},a=[{value:"Type declaration",id:"type-declaration",level:2},{value:"debug?",id:"debug",level:3},{value:"Default",id:"default",level:4},{value:"exitOnCtrlC?",id:"exitonctrlc",level:3},{value:"Default",id:"default-1",level:4},{value:"patchConsole?",id:"patchconsole",level:3},{value:"Default",id:"default-2",level:4},{value:"stderr?",id:"stderr",level:3},{value:"Default",id:"default-3",level:4},{value:"stdin?",id:"stdin",level:3},{value:"Default",id:"default-4",level:4},{value:"stdout?",id:"stdout",level:3},{value:"Default",id:"default-5",level:4},{value:"Defined in",id:"defined-in",level:2}];function c(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"type-alias-renderoptions",children:"Type Alias: RenderOptions"})}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"RenderOptions"}),": ",(0,l.jsx)(n.code,{children:"object"})]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"type-declaration",children:"Type declaration"}),"\n",(0,l.jsx)(n.h3,{id:"debug",children:"debug?"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"optional"})," ",(0,l.jsx)(n.strong,{children:"debug"}),": ",(0,l.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"If true, each update will be rendered as a separate output, without replacing the previous one."}),"\n",(0,l.jsx)(n.h4,{id:"default",children:"Default"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"false\n"})}),"\n",(0,l.jsx)(n.h3,{id:"exitonctrlc",children:"exitOnCtrlC?"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"optional"})," ",(0,l.jsx)(n.strong,{children:"exitOnCtrlC"}),": ",(0,l.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["Configure whether Ink should listen to Ctrl+C keyboard input and exit the app. This is needed in case ",(0,l.jsx)(n.code,{children:"process.stdin"})," is in raw mode, because then Ctrl+C is ignored by default and process is expected to handle it manually."]}),"\n",(0,l.jsx)(n.h4,{id:"default-1",children:"Default"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"true\n"})}),"\n",(0,l.jsx)(n.h3,{id:"patchconsole",children:"patchConsole?"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"optional"})," ",(0,l.jsx)(n.strong,{children:"patchConsole"}),": ",(0,l.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Patch console methods to ensure console output doesn't mix with Ink output."}),"\n",(0,l.jsx)(n.h4,{id:"default-2",children:"Default"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"true\n"})}),"\n",(0,l.jsx)(n.h3,{id:"stderr",children:"stderr?"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"optional"})," ",(0,l.jsx)(n.strong,{children:"stderr"}),": ",(0,l.jsx)(n.code,{children:"NodeJS.WriteStream"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Error stream."}),"\n",(0,l.jsx)(n.h4,{id:"default-3",children:"Default"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"process.stderr\n"})}),"\n",(0,l.jsx)(n.h3,{id:"stdin",children:"stdin?"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"optional"})," ",(0,l.jsx)(n.strong,{children:"stdin"}),": ",(0,l.jsx)(n.code,{children:"NodeJS.ReadStream"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Input stream where app will listen for input."}),"\n",(0,l.jsx)(n.h4,{id:"default-4",children:"Default"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"process.stdin\n"})}),"\n",(0,l.jsx)(n.h3,{id:"stdout",children:"stdout?"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"optional"})," ",(0,l.jsx)(n.strong,{children:"stdout"}),": ",(0,l.jsx)(n.code,{children:"NodeJS.WriteStream"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Output stream where app will be rendered."}),"\n",(0,l.jsx)(n.h4,{id:"default-5",children:"Default"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"process.stdout\n"})}),"\n",(0,l.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,l.jsx)(n.p,{children:".yarn/__virtual__/ink-virtual-46a2052950/0/cache/ink-npm-5.1.0-5eb899d847-aa60256b38.zip/node_modules/ink/build/render.d.ts:3"})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},2410:(e,n,t)=>{var s=t(67402),l=Symbol.for("react.element"),i=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,d=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function a(e,n,t){var s,i={},a=null,c=null;for(s in void 0!==t&&(a=""+t),void 0!==n.key&&(a=""+n.key),void 0!==n.ref&&(c=n.ref),n)r.call(n,s)&&!o.hasOwnProperty(s)&&(i[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===i[s]&&(i[s]=n[s]);return{$$typeof:l,type:e,key:a,ref:c,props:i,_owner:d.current}}n.Fragment=i,n.jsx=a,n.jsxs=a},77250:(e,n,t)=>{e.exports=t(2410)},50589:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>d});var s=t(67402);const l={},i=s.createContext(l);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);