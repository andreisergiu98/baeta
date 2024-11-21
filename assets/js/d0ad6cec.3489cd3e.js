/*! For license information please see d0ad6cec.3489cd3e.js.LICENSE.txt */
"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[4341],{7923:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>d,metadata:()=>i,toc:()=>t});const i=JSON.parse('{"id":"api/compiler/esbuild/interfaces/PluginBuild","title":"Interface: PluginBuild","description":"Properties","source":"@site/docs/api/compiler/esbuild/interfaces/PluginBuild.md","sourceDirName":"api/compiler/esbuild/interfaces","slug":"/api/compiler/esbuild/interfaces/PluginBuild","permalink":"/docs/api/compiler/esbuild/interfaces/PluginBuild","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Interface: Plugin","permalink":"/docs/api/compiler/esbuild/interfaces/Plugin"},"next":{"title":"Interface: ResolveOptions","permalink":"/docs/api/compiler/esbuild/interfaces/ResolveOptions"}}');var r=n(7250),l=n(589);const d={},c="Interface: PluginBuild",o={},t=[{value:"Properties",id:"properties",level:2},{value:"esbuild",id:"esbuild",level:3},{value:"analyzeMetafile()",id:"analyzemetafile",level:4},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"analyzeMetafileSync()",id:"analyzemetafilesync",level:4},{value:"Parameters",id:"parameters-1",level:5},{value:"Returns",id:"returns-1",level:5},{value:"build()",id:"build",level:4},{value:"Type Parameters",id:"type-parameters",level:5},{value:"Parameters",id:"parameters-2",level:5},{value:"Returns",id:"returns-2",level:5},{value:"buildSync()",id:"buildsync",level:4},{value:"Type Parameters",id:"type-parameters-1",level:5},{value:"Parameters",id:"parameters-3",level:5},{value:"Returns",id:"returns-3",level:5},{value:"context()",id:"context",level:4},{value:"Type Parameters",id:"type-parameters-2",level:5},{value:"Parameters",id:"parameters-4",level:5},{value:"Returns",id:"returns-4",level:5},{value:"formatMessages()",id:"formatmessages",level:4},{value:"Parameters",id:"parameters-5",level:5},{value:"Returns",id:"returns-5",level:5},{value:"formatMessagesSync()",id:"formatmessagessync",level:4},{value:"Parameters",id:"parameters-6",level:5},{value:"Returns",id:"returns-6",level:5},{value:"initialize()",id:"initialize",level:4},{value:"Parameters",id:"parameters-7",level:5},{value:"Returns",id:"returns-7",level:5},{value:"transform()",id:"transform",level:4},{value:"Type Parameters",id:"type-parameters-3",level:5},{value:"Parameters",id:"parameters-8",level:5},{value:"Returns",id:"returns-8",level:5},{value:"transformSync()",id:"transformsync",level:4},{value:"Type Parameters",id:"type-parameters-4",level:5},{value:"Parameters",id:"parameters-9",level:5},{value:"Returns",id:"returns-9",level:5},{value:"version",id:"version",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"initialOptions",id:"initialoptions",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Methods",id:"methods",level:2},{value:"onDispose()",id:"ondispose",level:3},{value:"Parameters",id:"parameters-10",level:4},{value:"Returns",id:"returns-10",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"onEnd()",id:"onend",level:3},{value:"Parameters",id:"parameters-11",level:4},{value:"Returns",id:"returns-11",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"onLoad()",id:"onload",level:3},{value:"Parameters",id:"parameters-12",level:4},{value:"Returns",id:"returns-12",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"onResolve()",id:"onresolve",level:3},{value:"Parameters",id:"parameters-13",level:4},{value:"Returns",id:"returns-13",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"onStart()",id:"onstart",level:3},{value:"Parameters",id:"parameters-14",level:4},{value:"Returns",id:"returns-14",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"resolve()",id:"resolve",level:3},{value:"Parameters",id:"parameters-15",level:4},{value:"Returns",id:"returns-15",level:4},{value:"Defined in",id:"defined-in-7",level:4}];function a(e){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"interface-pluginbuild",children:"Interface: PluginBuild"})}),"\n",(0,r.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsx)(s.h3,{id:"esbuild",children:"esbuild"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"esbuild"}),": ",(0,r.jsx)(s.code,{children:"object"})]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"analyzemetafile",children:"analyzeMetafile()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"analyzeMetafile"}),": (",(0,r.jsx)(s.code,{children:"metafile"}),", ",(0,r.jsx)(s.code,{children:"options"}),"?) => ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"string"}),">"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"Pretty-prints an analysis of the metafile JSON to a string. This is just for\nconvenience to be able to match esbuild's pretty-printing exactly. If you want\nto customize it, you can just inspect the data in the metafile yourself."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: yes"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#analyze",children:"https://esbuild.github.io/api/#analyze"})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"metafile"}),": ",(0,r.jsx)(s.code,{children:"string"})," | ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/Metafile",children:(0,r.jsx)(s.code,{children:"Metafile"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options?"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/AnalyzeMetafileOptions",children:(0,r.jsx)(s.code,{children:"AnalyzeMetafileOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"returns",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"string"}),">"]}),"\n",(0,r.jsx)(s.h4,{id:"analyzemetafilesync",children:"analyzeMetafileSync()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"analyzeMetafileSync"}),": (",(0,r.jsx)(s.code,{children:"metafile"}),", ",(0,r.jsx)(s.code,{children:"options"}),"?) => ",(0,r.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'A synchronous version of "analyzeMetafile".'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: no"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#analyze",children:"https://esbuild.github.io/api/#analyze"})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"metafile"}),": ",(0,r.jsx)(s.code,{children:"string"})," | ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/Metafile",children:(0,r.jsx)(s.code,{children:"Metafile"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options?"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/AnalyzeMetafileOptions",children:(0,r.jsx)(s.code,{children:"AnalyzeMetafileOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"returns-1",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"string"})}),"\n",(0,r.jsx)(s.h4,{id:"build",children:"build()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"build"}),": <",(0,r.jsx)(s.code,{children:"T"}),">(",(0,r.jsx)(s.code,{children:"options"}),") => ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildResult",children:(0,r.jsx)(s.code,{children:"BuildResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">>"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'This function invokes the "esbuild" command-line tool for you. It returns a\npromise that either resolves with a "BuildResult" object or rejects with a\n"BuildFailure" object.'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: yes"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#build",children:"https://esbuild.github.io/api/#build"})]}),"\n",(0,r.jsx)(s.h5,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"T"})," ",(0,r.jsx)(s.em,{children:"extends"})," ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-2",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,r.jsx)(s.code,{children:"SameShape"})}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})}),", ",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h5,{id:"returns-2",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildResult",children:(0,r.jsx)(s.code,{children:"BuildResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">>"]}),"\n",(0,r.jsx)(s.h4,{id:"buildsync",children:"buildSync()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"buildSync"}),": <",(0,r.jsx)(s.code,{children:"T"}),">(",(0,r.jsx)(s.code,{children:"options"}),") => ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildResult",children:(0,r.jsx)(s.code,{children:"BuildResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'A synchronous version of "build".'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: no"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#build",children:"https://esbuild.github.io/api/#build"})]}),"\n",(0,r.jsx)(s.h5,{id:"type-parameters-1",children:"Type Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"T"})," ",(0,r.jsx)(s.em,{children:"extends"})," ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-3",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,r.jsx)(s.code,{children:"SameShape"})}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})}),", ",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h5,{id:"returns-3",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildResult",children:(0,r.jsx)(s.code,{children:"BuildResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h4,{id:"context",children:"context()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"context"}),": <",(0,r.jsx)(s.code,{children:"T"}),">(",(0,r.jsx)(s.code,{children:"options"}),") => ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildContext",children:(0,r.jsx)(s.code,{children:"BuildContext"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">>"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'This is the advanced long-running form of "build" that supports additional\nfeatures such as watch mode and a local development server.'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: no"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#build",children:"https://esbuild.github.io/api/#build"})]}),"\n",(0,r.jsx)(s.h5,{id:"type-parameters-2",children:"Type Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"T"})," ",(0,r.jsx)(s.em,{children:"extends"})," ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-4",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,r.jsx)(s.code,{children:"SameShape"})}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})}),", ",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h5,{id:"returns-4",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildContext",children:(0,r.jsx)(s.code,{children:"BuildContext"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">>"]}),"\n",(0,r.jsx)(s.h4,{id:"formatmessages",children:"formatMessages()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"formatMessages"}),": (",(0,r.jsx)(s.code,{children:"messages"}),", ",(0,r.jsx)(s.code,{children:"options"}),") => ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"string"}),"[]>"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"Converts log messages to formatted message strings suitable for printing in\nthe terminal. This allows you to reuse the built-in behavior of esbuild's\nlog message formatter. This is a batch-oriented API for efficiency."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: yes"}),"\n"]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-5",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"messages"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/PartialMessage",children:(0,r.jsx)(s.code,{children:"PartialMessage"})}),"[]"]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/FormatMessagesOptions",children:(0,r.jsx)(s.code,{children:"FormatMessagesOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"returns-5",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"string"}),"[]>"]}),"\n",(0,r.jsx)(s.h4,{id:"formatmessagessync",children:"formatMessagesSync()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"formatMessagesSync"}),": (",(0,r.jsx)(s.code,{children:"messages"}),", ",(0,r.jsx)(s.code,{children:"options"}),") => ",(0,r.jsx)(s.code,{children:"string"}),"[]"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'A synchronous version of "formatMessages".'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: no"}),"\n"]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-6",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"messages"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/PartialMessage",children:(0,r.jsx)(s.code,{children:"PartialMessage"})}),"[]"]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/FormatMessagesOptions",children:(0,r.jsx)(s.code,{children:"FormatMessagesOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"returns-6",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,r.jsx)(s.h4,{id:"initialize",children:"initialize()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"initialize"}),": (",(0,r.jsx)(s.code,{children:"options"}),") => ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"This configures the browser-based version of esbuild. It is necessary to\ncall this first and wait for the returned promise to be resolved before\nmaking other API calls when using esbuild in the browser."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:'Works in browser: yes ("options" is required)'}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#browser",children:"https://esbuild.github.io/api/#browser"})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-7",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/InitializeOptions",children:(0,r.jsx)(s.code,{children:"InitializeOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"returns-7",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"void"}),">"]}),"\n",(0,r.jsx)(s.h4,{id:"transform",children:"transform()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"transform"}),": <",(0,r.jsx)(s.code,{children:"T"}),">(",(0,r.jsx)(s.code,{children:"input"}),", ",(0,r.jsx)(s.code,{children:"options"}),"?) => ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformResult",children:(0,r.jsx)(s.code,{children:"TransformResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">>"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'This function transforms a single JavaScript file. It can be used to minify\nJavaScript, convert TypeScript/JSX to JavaScript, or convert newer JavaScript\nto older JavaScript. It returns a promise that is either resolved with a\n"TransformResult" object or rejected with a "TransformFailure" object.'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: yes"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#transform",children:"https://esbuild.github.io/api/#transform"})]}),"\n",(0,r.jsx)(s.h5,{id:"type-parameters-3",children:"Type Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"T"})," ",(0,r.jsx)(s.em,{children:"extends"})," ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformOptions",children:(0,r.jsx)(s.code,{children:"TransformOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-8",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"input"}),": ",(0,r.jsx)(s.code,{children:"string"})," | ",(0,r.jsx)(s.code,{children:"Uint8Array"})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options?"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,r.jsx)(s.code,{children:"SameShape"})}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformOptions",children:(0,r.jsx)(s.code,{children:"TransformOptions"})}),", ",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h5,{id:"returns-8",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformResult",children:(0,r.jsx)(s.code,{children:"TransformResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">>"]}),"\n",(0,r.jsx)(s.h4,{id:"transformsync",children:"transformSync()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"transformSync"}),": <",(0,r.jsx)(s.code,{children:"T"}),">(",(0,r.jsx)(s.code,{children:"input"}),", ",(0,r.jsx)(s.code,{children:"options"}),"?) => ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformResult",children:(0,r.jsx)(s.code,{children:"TransformResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:'A synchronous version of "transform".'}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Works in node: yes"}),"\n",(0,r.jsx)(s.li,{children:"Works in browser: no"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/api/#transform",children:"https://esbuild.github.io/api/#transform"})]}),"\n",(0,r.jsx)(s.h5,{id:"type-parameters-4",children:"Type Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"T"})," ",(0,r.jsx)(s.em,{children:"extends"})," ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformOptions",children:(0,r.jsx)(s.code,{children:"TransformOptions"})})]}),"\n",(0,r.jsx)(s.h5,{id:"parameters-9",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"input"}),": ",(0,r.jsx)(s.code,{children:"string"})," | ",(0,r.jsx)(s.code,{children:"Uint8Array"})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options?"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/type-aliases/SameShape",children:(0,r.jsx)(s.code,{children:"SameShape"})}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformOptions",children:(0,r.jsx)(s.code,{children:"TransformOptions"})}),", ",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h5,{id:"returns-9",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/TransformResult",children:(0,r.jsx)(s.code,{children:"TransformResult"})}),"<",(0,r.jsx)(s.code,{children:"T"}),">"]}),"\n",(0,r.jsx)(s.h4,{id:"version",children:"version"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"version"}),": ",(0,r.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:320"}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"initialoptions",children:"initialOptions"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"initialOptions"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/BuildOptions",children:(0,r.jsx)(s.code,{children:"BuildOptions"})})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#build-options",children:"https://esbuild.github.io/plugins/#build-options"})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:295"}),"\n",(0,r.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,r.jsx)(s.h3,{id:"ondispose",children:"onDispose()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"onDispose"}),"(",(0,r.jsx)(s.code,{children:"callback"}),"): ",(0,r.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#on-dispose",children:"https://esbuild.github.io/plugins/#on-dispose"})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-10",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"callback"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-10",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"void"})}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:317"}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"onend",children:"onEnd()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"onEnd"}),"(",(0,r.jsx)(s.code,{children:"callback"}),"): ",(0,r.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#on-end",children:"https://esbuild.github.io/plugins/#on-end"})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-11",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"callback"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-11",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"void"})}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:305"}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"onload",children:"onLoad()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"onLoad"}),"(",(0,r.jsx)(s.code,{children:"options"}),", ",(0,r.jsx)(s.code,{children:"callback"}),"): ",(0,r.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#on-load",children:"https://esbuild.github.io/plugins/#on-load"})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-12",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/OnLoadOptions",children:(0,r.jsx)(s.code,{children:"OnLoadOptions"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"callback"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-12",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"void"})}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:313"}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"onresolve",children:"onResolve()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"onResolve"}),"(",(0,r.jsx)(s.code,{children:"options"}),", ",(0,r.jsx)(s.code,{children:"callback"}),"): ",(0,r.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#on-resolve",children:"https://esbuild.github.io/plugins/#on-resolve"})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-13",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/OnResolveOptions",children:(0,r.jsx)(s.code,{children:"OnResolveOptions"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"callback"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-13",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"void"})}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:309"}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"onstart",children:"onStart()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"onStart"}),"(",(0,r.jsx)(s.code,{children:"callback"}),"): ",(0,r.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#on-start",children:"https://esbuild.github.io/plugins/#on-start"})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-14",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"callback"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-14",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"void"})}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:301"}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"resolve",children:"resolve()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"resolve"}),"(",(0,r.jsx)(s.code,{children:"path"}),", ",(0,r.jsx)(s.code,{children:"options"}),"?): ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/ResolveResult",children:(0,r.jsx)(s.code,{children:"ResolveResult"})}),">"]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Documentation: ",(0,r.jsx)(s.a,{href:"https://esbuild.github.io/plugins/#resolve",children:"https://esbuild.github.io/plugins/#resolve"})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-15",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"path"}),": ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"options?"}),": ",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/ResolveOptions",children:(0,r.jsx)(s.code,{children:"ResolveOptions"})})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-15",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/docs/api/compiler/esbuild/interfaces/ResolveResult",children:(0,r.jsx)(s.code,{children:"ResolveResult"})}),">"]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:".yarn/unplugged/esbuild-npm-0.24.0-1252872327/node_modules/esbuild/lib/main.d.ts:298"})]})}function h(e={}){const{wrapper:s}={...(0,l.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},2410:(e,s,n)=>{var i=n(7402),r=Symbol.for("react.element"),l=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,c=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function t(e,s,n){var i,l={},t=null,a=null;for(i in void 0!==n&&(t=""+n),void 0!==s.key&&(t=""+s.key),void 0!==s.ref&&(a=s.ref),s)d.call(s,i)&&!o.hasOwnProperty(i)&&(l[i]=s[i]);if(e&&e.defaultProps)for(i in s=e.defaultProps)void 0===l[i]&&(l[i]=s[i]);return{$$typeof:r,type:e,key:t,ref:a,props:l,_owner:c.current}}s.Fragment=l,s.jsx=t,s.jsxs=t},7250:(e,s,n)=>{e.exports=n(2410)},589:(e,s,n)=>{n.d(s,{R:()=>d,x:()=>c});var i=n(7402);const r={},l=i.createContext(r);function d(e){const s=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),i.createElement(l.Provider,{value:s},e.children)}}}]);