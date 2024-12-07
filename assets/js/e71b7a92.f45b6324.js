/*! For license information please see e71b7a92.f45b6324.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[3515],{69224:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>t,contentTitle:()=>c,default:()=>a,frontMatter:()=>i,metadata:()=>d,toc:()=>o});const d=JSON.parse('{"id":"api/core/sdk/classes/ResolverMapper","title":"Class: ResolverMapper","description":"Constructors","source":"@site/docs/api/core/sdk/classes/ResolverMapper.md","sourceDirName":"api/core/sdk/classes","slug":"/api/core/sdk/classes/ResolverMapper","permalink":"/docs/api/core/sdk/classes/ResolverMapper","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Class: ModuleBuilder","permalink":"/docs/api/core/sdk/classes/ModuleBuilder"},"next":{"title":"Enumeration: ExtensionVersion","permalink":"/docs/api/core/sdk/enumerations/ExtensionVersion"}}');var n=r(77250),l=r(50589);const i={},c="Class: ResolverMapper",t={},o=[{value:"Constructors",id:"constructors",level:2},{value:"new ResolverMapper()",id:"new-resolvermapper",level:3},{value:"Returns",id:"returns",level:4},{value:"Properties",id:"properties",level:2},{value:"middlewares",id:"middlewares",level:3},{value:"prependedMiddlewares",id:"prependedmiddlewares",level:3},{value:"resolvers",id:"resolvers",level:3},{value:"scalars",id:"scalars",level:3},{value:"typeFields",id:"typefields",level:3},{value:"types",id:"types",level:3},{value:"Methods",id:"methods",level:2},{value:"addMiddleware()",id:"addmiddleware",level:3},{value:"Type Parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns-1",level:4},{value:"addMiddlewareToMap()",id:"addmiddlewaretomap",level:3},{value:"Type Parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"compose()",id:"compose",level:3},{value:"Returns",id:"returns-3",level:4},{value:"getTypeFields()",id:"gettypefields",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-4",level:4},{value:"getTypes()",id:"gettypes",level:3},{value:"Returns",id:"returns-5",level:4},{value:"prependMiddleware()",id:"prependmiddleware",level:3},{value:"Type Parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4},{value:"registerTypeField()",id:"registertypefield",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-7",level:4},{value:"setDefaultFieldResolver()",id:"setdefaultfieldresolver",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-8",level:4},{value:"setResolver()",id:"setresolver",level:3},{value:"Type Parameters",id:"type-parameters-3",level:4},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-9",level:4},{value:"setScalar()",id:"setscalar",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-10",level:4},{value:"setSubscription()",id:"setsubscription",level:3},{value:"Type Parameters",id:"type-parameters-4",level:4},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-11",level:4},{value:"setTypenameResolver()",id:"settypenameresolver",level:3},{value:"Type Parameters",id:"type-parameters-5",level:4},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-12",level:4}];function h(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",p:"p",strong:"strong",...(0,l.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"class-resolvermapper",children:"Class: ResolverMapper"})}),"\n",(0,n.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,n.jsx)(s.h3,{id:"new-resolvermapper",children:"new ResolverMapper()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"new ResolverMapper"}),"(): ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/classes/ResolverMapper",children:(0,n.jsx)(s.code,{children:"ResolverMapper"})})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/classes/ResolverMapper",children:(0,n.jsx)(s.code,{children:"ResolverMapper"})})}),"\n",(0,n.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,n.jsx)(s.h3,{id:"middlewares",children:"middlewares"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"readonly"})," ",(0,n.jsx)(s.strong,{children:"middlewares"}),": ",(0,n.jsx)(s.code,{children:"MiddlewareMap"})]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"prependedmiddlewares",children:"prependedMiddlewares"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"readonly"})," ",(0,n.jsx)(s.strong,{children:"prependedMiddlewares"}),": ",(0,n.jsx)(s.code,{children:"MiddlewareMap"})]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"resolvers",children:"resolvers"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"readonly"})," ",(0,n.jsx)(s.strong,{children:"resolvers"}),": ",(0,n.jsx)(s.code,{children:"ResolversMap"})]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"scalars",children:"scalars"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"readonly"})," ",(0,n.jsx)(s.strong,{children:"scalars"}),": ",(0,n.jsx)(s.code,{children:"ScalarsMap"})]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"typefields",children:"typeFields"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"readonly"})," ",(0,n.jsx)(s.strong,{children:"typeFields"}),": ",(0,n.jsx)(s.code,{children:"Record"}),"<",(0,n.jsx)(s.code,{children:"string"}),", ",(0,n.jsx)(s.code,{children:"undefined"})," | ",(0,n.jsx)(s.code,{children:"string"}),"[]>"]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"types",children:"types"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"readonly"})," ",(0,n.jsx)(s.strong,{children:"types"}),": ",(0,n.jsx)(s.code,{children:"string"}),"[] = ",(0,n.jsx)(s.code,{children:"[]"})]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(s.h3,{id:"addmiddleware",children:"addMiddleware()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"addMiddleware"}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">(",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"field"}),", ",(0,n.jsx)(s.code,{children:"middleware"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Result"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Root"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Context"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Args"})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"middleware"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/type-aliases/NativeMiddleware",children:(0,n.jsx)(s.code,{children:"NativeMiddleware"})}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"addmiddlewaretomap",children:"addMiddlewareToMap()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"protected"})," ",(0,n.jsx)(s.strong,{children:"addMiddlewareToMap"}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">(",(0,n.jsx)(s.code,{children:"map"}),", ",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"field"}),", ",(0,n.jsx)(s.code,{children:"middleware"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters-1",children:"Type Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Result"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Root"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Context"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Args"})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"map"}),": ",(0,n.jsx)(s.code,{children:"MiddlewareMap"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"middleware"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/type-aliases/NativeMiddleware",children:(0,n.jsx)(s.code,{children:"NativeMiddleware"})}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"compose",children:"compose()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"compose"}),"(): ",(0,n.jsx)(s.code,{children:"IResolvers"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"IResolvers"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"gettypefields",children:"getTypeFields()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"getTypeFields"}),"(",(0,n.jsx)(s.code,{children:"type"}),"): ",(0,n.jsx)(s.code,{children:"string"}),"[]"]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-4",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"gettypes",children:"getTypes()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"getTypes"}),"(): ",(0,n.jsx)(s.code,{children:"string"}),"[]"]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-5",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"prependmiddleware",children:"prependMiddleware()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"prependMiddleware"}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">(",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"field"}),", ",(0,n.jsx)(s.code,{children:"middleware"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters-2",children:"Type Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Result"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Root"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Context"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Args"})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"middleware"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/type-aliases/NativeMiddleware",children:(0,n.jsx)(s.code,{children:"NativeMiddleware"})}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-6",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"registertypefield",children:"registerTypeField()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"registerTypeField"}),"(",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"field"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-7",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setdefaultfieldresolver",children:"setDefaultFieldResolver()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"setDefaultFieldResolver"}),"(",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"field"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-8",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setresolver",children:"setResolver()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"setResolver"}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">(",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"field"}),", ",(0,n.jsx)(s.code,{children:"resolver"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters-3",children:"Type Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Result"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Root"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Context"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Args"})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"resolver"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/type-aliases/NativeResolver",children:(0,n.jsx)(s.code,{children:"NativeResolver"})}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-9",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setscalar",children:"setScalar()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"setScalar"}),"(",(0,n.jsx)(s.code,{children:"scalar"}),", ",(0,n.jsx)(s.code,{children:"resolver"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-7",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"scalar"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"resolver"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/index/type-aliases/ScalarResolver",children:(0,n.jsx)(s.code,{children:"ScalarResolver"})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-10",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setsubscription",children:"setSubscription()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"setSubscription"}),"<",(0,n.jsx)(s.code,{children:"Payload"}),", ",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">(",(0,n.jsx)(s.code,{children:"field"}),", ",(0,n.jsx)(s.code,{children:"resolver"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters-4",children:"Type Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Payload"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Result"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Root"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Context"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Args"})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-8",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"field"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"resolver"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/type-aliases/NativeSubscription",children:(0,n.jsx)(s.code,{children:"NativeSubscription"})}),"<",(0,n.jsx)(s.code,{children:"Payload"}),", ",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Root"}),", ",(0,n.jsx)(s.code,{children:"Context"}),", ",(0,n.jsx)(s.code,{children:"Args"}),">"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-11",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"settypenameresolver",children:"setTypenameResolver()"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"setTypenameResolver"}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Value"}),", ",(0,n.jsx)(s.code,{children:"Context"}),">(",(0,n.jsx)(s.code,{children:"type"}),", ",(0,n.jsx)(s.code,{children:"resolver"}),"): ",(0,n.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters-5",children:"Type Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Result"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Value"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"Context"})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-9",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"type"}),": ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"resolver"}),": ",(0,n.jsx)(s.a,{href:"/docs/api/core/sdk/type-aliases/NativeTypeResolver",children:(0,n.jsx)(s.code,{children:"NativeTypeResolver"})}),"<",(0,n.jsx)(s.code,{children:"Result"}),", ",(0,n.jsx)(s.code,{children:"Value"}),", ",(0,n.jsx)(s.code,{children:"Context"}),">"]}),"\n",(0,n.jsx)(s.h4,{id:"returns-12",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"void"})})]})}function a(e={}){const{wrapper:s}={...(0,l.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},2410:(e,s,r)=>{var d=r(67402),n=Symbol.for("react.element"),l=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function o(e,s,r){var d,l={},o=null,h=null;for(d in void 0!==r&&(o=""+r),void 0!==s.key&&(o=""+s.key),void 0!==s.ref&&(h=s.ref),s)i.call(s,d)&&!t.hasOwnProperty(d)&&(l[d]=s[d]);if(e&&e.defaultProps)for(d in s=e.defaultProps)void 0===l[d]&&(l[d]=s[d]);return{$$typeof:n,type:e,key:o,ref:h,props:l,_owner:c.current}}s.Fragment=l,s.jsx=o,s.jsxs=o},77250:(e,s,r)=>{e.exports=r(2410)},50589:(e,s,r)=>{r.d(s,{R:()=>i,x:()=>c});var d=r(67402);const n={},l=d.createContext(n);function i(e){const s=d.useContext(l);return d.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),d.createElement(l.Provider,{value:s},e.children)}}}]);