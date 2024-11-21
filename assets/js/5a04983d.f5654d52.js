/*! For license information please see 5a04983d.f5654d52.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3187],{8081:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"api/env/functions/createEnvParser","title":"Function: createEnvParser()","description":"createEnvParser(getValue) D extends undefined ? undefined \\\\| InferType\\\\ : InferType\\\\","source":"@site/docs/api/env/functions/createEnvParser.md","sourceDirName":"api/env/functions","slug":"/api/env/functions/createEnvParser","permalink":"/docs/api/env/functions/createEnvParser","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"@baeta/env","permalink":"/docs/api/env/"},"next":{"title":"Interface: EnvOptions\\\\<T, R, D\\\\>","permalink":"/docs/api/env/interfaces/EnvOptions"}}');var d=r(7250),c=r(589);const i={},t="Function: createEnvParser()",o={},l=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Type Parameters",id:"type-parameters",level:3},{value:"Parameters",id:"parameters-1",level:3},{value:"Returns",id:"returns-1",level:3},{value:"Defined in",id:"defined-in",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",strong:"strong",...(0,c.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"function-createenvparser",children:"Function: createEnvParser()"})}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"createEnvParser"}),"(",(0,d.jsx)(n.code,{children:"getValue"}),"): <",(0,d.jsx)(n.code,{children:"T"}),", ",(0,d.jsx)(n.code,{children:"R"}),", ",(0,d.jsx)(n.code,{children:"D"}),">(",(0,d.jsx)(n.code,{children:"key"}),", ",(0,d.jsx)(n.code,{children:"options"}),") => ",(0,d.jsx)(n.code,{children:"R"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"true"})," ? ",(0,d.jsx)(n.code,{children:"InferType"}),"<",(0,d.jsx)(n.code,{children:"T"}),"> : ",(0,d.jsx)(n.code,{children:"D"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"undefined"})," ? ",(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"InferType"}),"<",(0,d.jsx)(n.code,{children:"T"}),"> : ",(0,d.jsx)(n.code,{children:"InferType"}),"<",(0,d.jsx)(n.code,{children:"T"}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,d.jsxs)(n.p,{children:["\u2022 ",(0,d.jsx)(n.strong,{children:"getValue"})]}),"\n",(0,d.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"Function"})}),"\n",(0,d.jsx)(n.h3,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,d.jsxs)(n.p,{children:["\u2022 ",(0,d.jsx)(n.strong,{children:"T"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"Types"})]}),"\n",(0,d.jsxs)(n.p,{children:["\u2022 ",(0,d.jsx)(n.strong,{children:"R"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"boolean"})]}),"\n",(0,d.jsxs)(n.p,{children:["\u2022 ",(0,d.jsx)(n.strong,{children:"D"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"string"})," | ",(0,d.jsx)(n.code,{children:"number"})," | ",(0,d.jsx)(n.code,{children:"boolean"})]}),"\n",(0,d.jsx)(n.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,d.jsxs)(n.p,{children:["\u2022 ",(0,d.jsx)(n.strong,{children:"key"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.p,{children:["\u2022 ",(0,d.jsx)(n.strong,{children:"options"}),": ",(0,d.jsx)(n.a,{href:"/docs/api/env/interfaces/EnvOptions",children:(0,d.jsx)(n.code,{children:"EnvOptions"})}),"<",(0,d.jsx)(n.code,{children:"T"}),", ",(0,d.jsx)(n.code,{children:"R"}),", ",(0,d.jsx)(n.code,{children:"D"}),">"]}),"\n",(0,d.jsx)(n.h3,{id:"returns-1",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"R"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"true"})," ? ",(0,d.jsx)(n.code,{children:"InferType"}),"<",(0,d.jsx)(n.code,{children:"T"}),"> : ",(0,d.jsx)(n.code,{children:"D"})," ",(0,d.jsx)(n.em,{children:"extends"})," ",(0,d.jsx)(n.code,{children:"undefined"})," ? ",(0,d.jsx)(n.code,{children:"undefined"})," | ",(0,d.jsx)(n.code,{children:"InferType"}),"<",(0,d.jsx)(n.code,{children:"T"}),"> : ",(0,d.jsx)(n.code,{children:"InferType"}),"<",(0,d.jsx)(n.code,{children:"T"}),">"]}),"\n",(0,d.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/env/index.ts#L104",children:"index.ts:104"})})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},2410:(e,n,r)=>{var s=r(7402),d=Symbol.for("react.element"),c=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,t=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,r){var s,c={},l=null,a=null;for(s in void 0!==r&&(l=""+r),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(a=n.ref),n)i.call(n,s)&&!o.hasOwnProperty(s)&&(c[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===c[s]&&(c[s]=n[s]);return{$$typeof:d,type:e,key:l,ref:a,props:c,_owner:t.current}}n.Fragment=c,n.jsx=l,n.jsxs=l},7250:(e,n,r)=>{e.exports=r(2410)},589:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>t});var s=r(7402);const d={},c=s.createContext(d);function i(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:i(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);