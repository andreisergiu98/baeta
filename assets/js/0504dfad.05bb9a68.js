/*! For license information please see 0504dfad.05bb9a68.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[5123],{94395:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>a,frontMatter:()=>l,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"api/generator-sdk/classes/FileBlock","title":"Class: FileBlock","description":"Extends","source":"@site/docs/api/generator-sdk/classes/FileBlock.md","sourceDirName":"api/generator-sdk/classes","slug":"/api/generator-sdk/classes/FileBlock","permalink":"/docs/api/generator-sdk/classes/FileBlock","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Class: File","permalink":"/docs/api/generator-sdk/classes/File"},"next":{"title":"Class: FileManager","permalink":"/docs/api/generator-sdk/classes/FileManager"}}');var i=r(77250),d=r(50589);const l={},c="Class: FileBlock",t={},o=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new FileBlock()",id:"new-fileblock",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Properties",id:"properties",level:2},{value:"content",id:"content",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"end",id:"end",level:3},{value:"filename",id:"filename",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"persisted",id:"persisted",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"start",id:"start",level:3},{value:"tag",id:"tag",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Methods",id:"methods",level:2},{value:"addBlockToContent()",id:"addblocktocontent",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"buildContent()",id:"buildcontent",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"buildHeader()",id:"buildheader",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"buildPadding()",id:"buildpadding",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-4",level:4},{value:"createComment()",id:"createcomment",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"getExistingContent()",id:"getexistingcontent",level:3},{value:"Returns",id:"returns-6",level:4},{value:"getSlices()",id:"getslices",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-7",level:4},{value:"unlink()",id:"unlink",level:3},{value:"Returns",id:"returns-8",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"write()",id:"write",level:3},{value:"Returns",id:"returns-9",level:4},{value:"Overrides",id:"overrides-2",level:4}];function h(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"class-fileblock",children:"Class: FileBlock"})}),"\n",(0,i.jsx)(n.h2,{id:"extends",children:"Extends"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(n.h3,{id:"new-fileblock",children:"new FileBlock()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"new FileBlock"}),"(",(0,i.jsx)(n.code,{children:"filename"}),", ",(0,i.jsx)(n.code,{children:"content"}),", ",(0,i.jsx)(n.code,{children:"start"}),", ",(0,i.jsx)(n.code,{children:"end"}),", ",(0,i.jsx)(n.code,{children:"tag"}),", ",(0,i.jsx)(n.code,{children:"options"}),"?): ",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/FileBlock",children:(0,i.jsx)(n.code,{children:"FileBlock"})})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"filename"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"content"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"start"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"end"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"tag"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"options?"}),": ",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/interfaces/FileOptions",children:(0,i.jsx)(n.code,{children:"FileOptions"})})]}),"\n",(0,i.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/FileBlock",children:(0,i.jsx)(n.code,{children:"FileBlock"})})}),"\n",(0,i.jsx)(n.h4,{id:"overrides",children:"Overrides"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#constructors",children:(0,i.jsx)(n.code,{children:"constructor"})})]}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"content",children:"content"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"content"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#content",children:(0,i.jsx)(n.code,{children:"content"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"end",children:"end"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"end"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"filename",children:"filename"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"filename"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#filename",children:(0,i.jsx)(n.code,{children:"filename"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"persisted",children:"persisted"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"persisted"}),": ",(0,i.jsx)(n.code,{children:"boolean"})," = ",(0,i.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#persisted",children:(0,i.jsx)(n.code,{children:"persisted"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"start",children:"start"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"start"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"tag",children:"tag"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"tag"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#tag",children:(0,i.jsx)(n.code,{children:"tag"})})]}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"addblocktocontent",children:"addBlockToContent()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"addBlockToContent"}),"(",(0,i.jsx)(n.code,{children:"existingContent"}),"): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"existingContent"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"buildcontent",children:"buildContent()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"buildContent"}),"(): ",(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"string"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"string"}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#buildcontent",children:(0,i.jsx)(n.code,{children:"buildContent"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"buildheader",children:"buildHeader()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"buildHeader"}),"(): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#buildheader",children:(0,i.jsx)(n.code,{children:"buildHeader"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"buildpadding",children:"buildPadding()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"buildPadding"}),"(",(0,i.jsx)(n.code,{children:"existingContent"}),"): ",(0,i.jsx)(n.code,{children:'""'}),' | "\\n" | "\\n\\n"']}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"existingContent"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:'""'}),' | "\\n" | "\\n\\n"']}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"createcomment",children:"createComment()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"createComment"}),"(",(0,i.jsx)(n.code,{children:"comment"}),"): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"comment"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#createcomment",children:(0,i.jsx)(n.code,{children:"createComment"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getexistingcontent",children:"getExistingContent()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"getExistingContent"}),"(): ",(0,i.jsx)(n.code,{children:"Promise"}),"<readonly [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:"FileHandle"}),"] | readonly [",(0,i.jsx)(n.code,{children:'""'}),", ",(0,i.jsx)(n.code,{children:"null"}),"]>"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Promise"}),"<readonly [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:"FileHandle"}),"] | readonly [",(0,i.jsx)(n.code,{children:'""'}),", ",(0,i.jsx)(n.code,{children:"null"}),"]>"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getslices",children:"getSlices()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"getSlices"}),"(",(0,i.jsx)(n.code,{children:"existingContent"}),"): readonly [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:'""'}),", ",(0,i.jsx)(n.code,{children:"false"}),"] | readonly [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:"true"}),"]"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"existingContent"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:["readonly [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:'""'}),", ",(0,i.jsx)(n.code,{children:"false"}),"] | readonly [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.code,{children:"true"}),"]"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"unlink",children:"unlink()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"unlink"}),"(): ",(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-8",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#unlink",children:(0,i.jsx)(n.code,{children:"unlink"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"write",children:"write()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"write"}),"(): ",(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns-9",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"overrides-2",children:"Overrides"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File",children:(0,i.jsx)(n.code,{children:"File"})}),".",(0,i.jsx)(n.a,{href:"/docs/api/generator-sdk/classes/File#write",children:(0,i.jsx)(n.code,{children:"write"})})]})]})}function a(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},2410:(e,n,r)=>{var s=r(67402),i=Symbol.for("react.element"),d=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,c=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function o(e,n,r){var s,d={},o=null,h=null;for(s in void 0!==r&&(o=""+r),void 0!==n.key&&(o=""+n.key),void 0!==n.ref&&(h=n.ref),n)l.call(n,s)&&!t.hasOwnProperty(s)&&(d[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===d[s]&&(d[s]=n[s]);return{$$typeof:i,type:e,key:o,ref:h,props:d,_owner:c.current}}n.Fragment=d,n.jsx=o,n.jsxs=o},77250:(e,n,r)=>{e.exports=r(2410)},50589:(e,n,r)=>{r.d(n,{R:()=>l,x:()=>c});var s=r(67402);const i={},d=s.createContext(i);function l(e){const n=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(d.Provider,{value:n},e.children)}}}]);