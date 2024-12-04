/*! For license information please see 676dfd29.5ec1251d.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5521],{44802:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>c,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"guides/input-directives","title":"Input Directives","description":"While GraphQL doesn\'t natively support modifying query arguments and inputs through directives, Baeta provides a utility called Input Directives that enables this functionality.","source":"@site/docs/guides/input-directives.mdx","sourceDirName":"guides","slug":"/guides/input-directives","permalink":"/docs/guides/input-directives","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":110,"frontMatter":{"sidebar_position":110},"sidebar":"defaultSidebar","previous":{"title":"Directives","permalink":"/docs/guides/directives"},"next":{"title":"Typed PubSub","permalink":"/docs/guides/typed-pubsub"}}');var r=i(77250),s=i(50589);const c={sidebar_position:110},l="Input Directives",a={},o=[{value:"Target Types",id:"target-types",level:2},{value:"Defining Input Directives",id:"defining-input-directives",level:2},{value:"Implementing Input Directives",id:"implementing-input-directives",level:2},{value:"How It Works",id:"how-it-works",level:2},{value:"Usage",id:"usage",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"input-directives",children:"Input Directives"})}),"\n",(0,r.jsx)(t.p,{children:"While GraphQL doesn't natively support modifying query arguments and inputs through directives, Baeta provides a utility called Input Directives that enables this functionality."}),"\n",(0,r.jsx)(t.h2,{id:"target-types",children:"Target Types"}),"\n",(0,r.jsx)(t.p,{children:"Input directives can target different types of inputs:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"scalar"}),": For primitive values like numbers, strings, etc."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"list"}),": For array values"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"object"}),": For complex object inputs"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"defining-input-directives",children:"Defining Input Directives"}),"\n",(0,r.jsx)(t.p,{children:"First, define your input directive in the schema:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"src/modules/directives/input-directives.gql"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-graphql",children:"directive @increment(by: Int!) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION\n\ntype Query {\n  testIncrementDirective(value: Int! @increment(by: 1)): Int!\n}\n"})}),"\n",(0,r.jsx)(t.h2,{id:"implementing-input-directives",children:"Implementing Input Directives"}),"\n",(0,r.jsxs)(t.p,{children:["Use the ",(0,r.jsx)(t.code,{children:"createInputDirective"})," utility from ",(0,r.jsx)(t.code,{children:"@baeta/core"})," to implement the directive's behavior:"]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"src/modules/directives/input-directives.ts"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { createInputDirective } from '@baeta/core';\nimport type { Context } from '../../types/context';\nimport { getCustomInputDirectiveModule } from './typedef';\n\nconst { $directive, Query } = getCustomInputDirectiveModule();\n\nconst incrementDirective = createInputDirective<{ by: number }, Context>({\n  name: 'increment',\n  target: 'scalar',\n  resolve: ({ directiveConfig, getValue, setValue }) => {\n    const value = getValue();\n    if (typeof value === 'number') {\n      setValue(value + directiveConfig.by);\n    }\n  },\n});\n\n$directive(incrementDirective);\n\nQuery.testIncrementDirective(({ args }) => {\n  return args.value;\n});\n"})}),"\n",(0,r.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsx)(t.p,{children:"The input directive processes the input value before it reaches the resolver:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"getValue()"})," retrieves the original input value."]}),"\n",(0,r.jsx)(t.li,{children:"The directive logic modifies the value."}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"setValue()"})," updates the input value."]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(t.p,{children:"When querying, the directive will modify the input before it reaches the resolver:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-graphql",children:"query {\n  testIncrementDirective(value: 5) {\n    # value will be incremented to 6 before reaching the resolver\n  }\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"This feature is particularly useful for input validation and data transformation."}),"\n",(0,r.jsxs)(t.p,{children:["For more examples and implementations, visit the ",(0,r.jsx)(t.a,{href:"https://github.com/andreisergiu98/baeta/tree/main/examples/directives",children:"Baeta directives examples"}),"."]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},2410:(e,t,i)=>{var n=i(67402),r=Symbol.for("react.element"),s=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,i){var n,s={},o=null,d=null;for(n in void 0!==i&&(o=""+i),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(d=t.ref),t)c.call(t,n)&&!a.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:r,type:e,key:o,ref:d,props:s,_owner:l.current}}t.Fragment=s,t.jsx=o,t.jsxs=o},77250:(e,t,i)=>{e.exports=i(2410)},50589:(e,t,i)=>{i.d(t,{R:()=>c,x:()=>l});var n=i(67402);const r={},s=n.createContext(r);function c(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);