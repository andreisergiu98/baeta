"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[237],{1963:(e,t,l)=>{l.r(t),l.d(t,{default:()=>x});var c=l(6473),r=l(3289),n=l(4489);const a="features_jUrl",s="featureSvg_Jh1u";function i(e){let{title:t,Svg:l,description:c}=e;return r.createElement("div",{className:"col col--3"},r.createElement("div",{className:"text--center margin-bottom--md"},r.createElement(l,{className:s,role:"img"})),r.createElement("div",{className:"text--center padding-horiz--md"},r.createElement("h3",null,t),r.createElement("p",null,c)))}const m=[{title:"Schema First",Svg:l(9754).Z,description:r.createElement(r.Fragment,null,"Design your schema using the language made specifically for it.")},{title:"GraphQL Modules",Svg:l(4798).Z,description:r.createElement(r.Fragment,null,"GraphQL Modules is built in so you can split your schema into reusable modules.")},{title:"Type Safe",Svg:l(2520).Z,description:r.createElement(r.Fragment,null,"Implement your API using TypeScript. Baeta makes sure your resolvers are type safe.")},{title:"Advanced Features",Svg:l(8651).Z,description:r.createElement(r.Fragment,null,"Use directives to validate or mutate values, extend your api using middlewares and more...")}];function o(){return r.createElement("section",{className:a},r.createElement("div",{className:"container"},r.createElement("div",{className:"row"},m.map(((e,t)=>r.createElement(i,(0,n.Z)({key:t},e)))))))}var u=l(1501),d=l(3097),p=l(8795);const f="heroBanner_x8FS",h="buttons_iRG0";function y(){const{siteConfig:e}=(0,d.Z)();return r.createElement("header",{className:(0,p.Z)("hero",f)},r.createElement("div",{className:"container"},r.createElement("h1",{className:"hero__title"},e.title),r.createElement("p",{className:"hero__subtitle"},e.tagline),r.createElement("div",{className:h},r.createElement(u.Z,{className:"button button--secondary button--lg",to:"/docs/intro"},"Introduction"))))}var E=l(5025);const v="snippetDescription_Qu7t",g="first_AZzg",z="second_iT95";function M(e){return r.createElement("div",{className:"row"},r.createElement("div",{className:(0,p.Z)("col col--6",e.left&&z)},r.createElement("div",{className:v},r.createElement("h3",null,e.title),r.createElement("p",null,e.description))),r.createElement("div",{className:(0,p.Z)("col col--6",e.left&&g)},r.createElement(E.Z,{title:e.path,language:e.language},e.snippet)))}const b=[{title:"SDL",description:r.createElement(r.Fragment,null,"Adopting the schema first pattern will make GraphQL APIs easier to write and more readable.",r.createElement("br",null),r.createElement("br",null),"Not only that, but it will encourage you to think about the API first, rather than the implementation."),path:"modules/user/user.gql",language:"graphql",snippet:"type User {\n    id: ID!\n    name: String!\n    email: String!\n    age: Int\n}\n  \ninput UserWhereUnique {\n    id: ID\n    email: String\n}\n  \ntype Query {\n    user(where: UserWhereUnique!): User!\n    users: [User!]!\n}"},{title:"Implement resolvers",description:r.createElement(r.Fragment,null,"Baeta takes care of type safety and type definitions so you can focus on implementing your resolvers in a flat and readable way.",r.createElement("br",null),r.createElement("br",null),"Middlewares and directives are also supported."),left:!0,path:"modules/user/resolvers.ts",language:"typescript",snippet:'import { getUserModule, User, UserWhereUnique } from "./typedef";\n\nconst { Query, User } = getUserModule();\n    \nQuery.user(({ args }) => {\n    return dataSource.user.find(args.where);\n});\n\nQuery.user.$use(async ({ args }, next) => {\n    const result = await next();\n    console.log("Found user", result, "for args", args);\n    return result;\n});'},{title:"Extend other types",description:r.createElement(r.Fragment,null,"By using ",r.createElement("a",{href:"https://www.the-guild.dev/graphql/modules"},"GraphQL Modules")," ","under the hood, you can extend other types and split your schema into small, reusable and maintainable pieces."),path:"modules/user-photos/user-photos.gql",language:"graphql",snippet:"type Photo {\n    id: ID!\n    url: String!\n    description: String!\n    postedBy: User!\n}\n\ninput PhotoCreateData {\n    url: String! @trim\n    description: String!\n    userId: ID!\n}\n  \nextend type User {\n    photos: [Photo!]!\n}"},{title:"Custom directives",description:r.createElement(r.Fragment,null,"Easily define your own custom directives to validate or mutate input fields."),left:!0,language:"typescript",snippet:'const trimDirective = createInputDirective({\n    name: "trim",\n    target: "scalar",\n    resolve: ({ getValue, setValue }) => {\n      const value = getValue();\n      if (typeof value === "string") {\n        setValue(value.trim());\n      }\n    },\n});'}];function w(){return r.createElement("section",null,r.createElement("div",{className:"container"},b.map(((e,t)=>r.createElement(M,(0,n.Z)({key:t},e))))))}function x(){return r.createElement(c.Z,{title:"Home",description:"Schema first without the hassle"},r.createElement(y,null),r.createElement("main",null,r.createElement(o,null),r.createElement(w,null)))}},4798:(e,t,l)=>{l.d(t,{Z:()=>i});var c,r,n,a=l(3289);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c])}return e},s.apply(this,arguments)}const i=e=>{let{title:t,titleId:l,...i}=e;return a.createElement("svg",s({id:"Warstwa_1",xmlns:"http://www.w3.org/2000/svg",x:0,y:0,viewBox:"0 0 67.2 71.2",style:{enableBackground:"new 0 0 67.2 71.2"},xmlSpace:"preserve",role:"img","aria-labelledby":l},i),t?a.createElement("title",{id:l},t):null,c||(c=a.createElement("style",null,".st0{fill-rule:evenodd;clip-rule:evenodd;fill:#e535ab}")),a.createElement("g",{transform:"translate(6 20)"},r||(r=a.createElement("path",{id:"Fill-2",className:"st0",d:"M32.5 43.1c0 .3 0 .5-.1.7v.1c-.4 2.3-2.4 4-4.8 4-2.1 0-4-1.4-4.6-3.3L2.8 33c-2-1.2-3.2-3.3-3.2-5.6V7.6c.7.3 1.5.4 2.4.4.7 0 1.5-.1 2.2-.3v19.7c0 .7.4 1.3 1 1.7L24 40c.9-1 2.2-1.7 3.7-1.7 1.6 0 3 .8 3.9 2v.1c.1.1.1.2.2.3 0 0 0 .1.1.1 0 .1.1.2.1.3 0 0 0 .1.1.1 0 .1.1.2.1.3s0 .1.1.2c0 .1.1.2.1.2 0 .1 0 .2.1.2v1zM57.4.5c0 1.5-.6 2.8-1.7 3.7v23.1c0 2.3-1.2 4.5-3.2 5.6L35.1 43.1c0-1.6-.6-3.2-1.5-4.4L50.2 29c.6-.3 1-1 1-1.7V5.2c-2-.6-3.5-2.5-3.5-4.7 0-1.1.4-2.1 1-2.9.1-.1.2-.3.4-.4.3-.3.6-.5.9-.7 0 0 .1 0 .1-.1.1-.1.3-.2.4-.2 0 0 .1 0 .1-.1.2-.1.3-.1.5-.2.5-.1 1-.2 1.5-.2 2.6 0 4.8 2.1 4.8 4.8zM-.4 4.8C-1.9 4-2.9 2.4-2.9.6c0-2.7 2.2-4.9 4.9-4.9.7 0 1.4.2 2 .4l20.5-11.9c1-.6 2.1-.9 3.2-.9s2.2.3 3.2.9L48.4-5.7c-1.3.9-2.3 2.1-2.8 3.6l-16.9-9.8c-.3-.2-.6-.3-1-.3-.3 0-.7.1-1 .3L6.7-.3c0 .3.1.6.1.8 0 2.1-1.3 3.9-3.2 4.6-.2.1-.3.1-.5.2H3c-.1 0-.3.1-.4.1H1.2c-.1 0-.3-.1-.4-.1H.7C.3 5.1-.1 5-.4 4.8z"})),a.createElement("g",{transform:"translate(12.305 12.345)"},n||(n=a.createElement("path",{id:"Fill-1",className:"st0",d:"M16.5 17.5V2L29-3.4v14.8l-3-1.3c-.4-.2-.8 0-1 .4s0 .8.4 1l2.5 1.1-11.4 4.9zm-10-7c-.2-.4-.6-.6-1-.4l-3 1.3V-3.4L15 2v15.4L3.6 12.5l2.5-1.1c.4-.1.5-.6.4-.9zM15-9.4v1.9c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-1.9L28-4.5 15.8.7 3.6-4.5 15-9.4zm19.6 23.3-4.1-1.8V-4.5c0-.3-.2-.6-.5-.7L16.4-11v-5.5c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v5.5L1.4-5.2c-.2.1-.4.4-.4.7v16.6l-4.1 1.8c-.4.2-.6.6-.4 1 .2.4.6.6 1 .4l4.2-1.9 13.7 5.9c.2.1.4.1.6 0l13.7-5.9 4.2 1.9c.4.2.8 0 1-.4.2-.4.1-.8-.3-1z"})),a.createElement("path",{id:"Stroke-3",d:"M16.5 17.5V2L29-3.4v14.8l-3-1.3c-.4-.2-.8 0-1 .4s0 .8.4 1l2.5 1.1-11.4 4.9zm-10-7c-.2-.4-.6-.6-1-.4l-3 1.3V-3.4L15 2v15.4L3.6 12.5l2.5-1.1c.4-.1.5-.6.4-.9zM15-9.4v1.9c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-1.9L28-4.5 15.8.7 3.6-4.5 15-9.4zm19.6 23.3-4.1-1.8V-4.5c0-.3-.2-.6-.5-.7L16.4-11v-5.5c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v5.5L1.4-5.2c-.2.1-.4.4-.4.7v16.6l-4.1 1.8c-.4.2-.6.6-.4 1 .2.4.6.6 1 .4l4.2-1.9 13.7 5.9c.2.1.4.1.6 0l13.7-5.9 4.2 1.9c.4.2.8 0 1-.4.2-.4.1-.8-.3-1z",style:{fill:"none",stroke:"#e535ab",strokeWidth:.75}}))))}},9754:(e,t,l)=>{l.d(t,{Z:()=>p});var c,r,n,a,s,i,m,o,u=l(3289);function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c])}return e},d.apply(this,arguments)}const p=e=>{let{title:t,titleId:l,...p}=e;return u.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 400 400",xmlSpace:"preserve",role:"img","aria-labelledby":l},p),t?u.createElement("title",{id:l},t):null,c||(c=u.createElement("path",{fill:"#E535AB",d:"m57.468 302.66-14.376-8.3 160.15-277.38 14.376 8.3z"})),r||(r=u.createElement("path",{fill:"#E535AB",d:"M39.8 272.2h320.3v16.6H39.8z"})),n||(n=u.createElement("path",{fill:"#E535AB",d:"m206.348 374.026-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z"})),a||(a=u.createElement("path",{fill:"#E535AB",d:"m54.482 132.883-8.3-14.375 160.21-92.5 8.3 14.375z"})),s||(s=u.createElement("path",{fill:"#E535AB",d:"m342.568 302.663-160.15-277.38 14.376-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5z"})),i||(i=u.createElement("path",{fill:"#E535AB",d:"M330.9 107.5h16.6v185h-16.6z"})),m||(m=u.createElement("path",{fill:"#E535AB",d:"m203.522 367-7.25-12.558 139.34-80.45 7.25 12.557z"})),o||(o=u.createElement("path",{fill:"#E535AB",d:"M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.8 9.7 22.5 31 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9"})))}},8651:(e,t,l)=>{l.d(t,{Z:()=>n});var c=l(3289);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c])}return e},r.apply(this,arguments)}const n=e=>{let{title:t,titleId:l,...n}=e;return c.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve",role:"img","aria-labelledby":l},n),t?c.createElement("title",{id:l},t):null,c.createElement("circle",{style:{fill:"#2d4452"},cx:256,cy:256,r:256}),c.createElement("path",{style:{fill:"#f5f5f5"},d:"M252 320h8v180h-8z"}),c.createElement("circle",{style:{fill:"#f5f5f5"},cx:216,cy:408,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M216 372c-2.752 0-5.424.336-8 .92 16.028 3.636 28 17.944 28 35.08s-11.972 31.436-28 35.08c2.576.584 5.248.92 8 .92 19.884 0 36-16.116 36-36s-16.116-36-36-36z"}),c.createElement("circle",{style:{fill:"#f5f5f5"},cx:256,cy:388,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M256 352c-1.352 0-2.684.088-4 .236 18 1.992 32 17.24 32 35.764s-14 33.772-32 35.764c1.316.14 2.648.236 4 .236 19.884 0 36-16.116 36-36s-16.116-36-36-36z"}),c.createElement("circle",{style:{fill:"#f5f5f5"},cx:160,cy:428,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M160 392c-2.048 0-4.044.212-6 .54 17.02 2.864 30 17.624 30 35.46s-12.98 32.596-30 35.46c1.956.328 3.952.54 6 .54 19.884 0 36-16.116 36-36s-16.116-36-36-36z"}),c.createElement("circle",{style:{fill:"#f5f5f5"},cx:296,cy:408,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M296 372c-1.352 0-2.684.088-4 .236 18 1.992 32 17.24 32 35.764s-14 33.772-32 35.764c1.316.144 2.648.236 4 .236 19.884 0 36-16.116 36-36s-16.116-36-36-36z"}),c.createElement("circle",{style:{fill:"#f5f5f5"},cx:352,cy:428,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M352 392c-1.352 0-2.684.088-4 .236 18 1.992 32 17.24 32 35.764s-14 33.772-32 35.764c1.316.144 2.648.236 4 .236 19.884 0 36-16.116 36-36s-16.116-36-36-36z"}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M256 448C136.908 448 36.012 377.252 1.112 279.416 12.944 409.816 122.516 512 256 512s243.056-102.184 254.892-232.584C475.988 377.252 375.092 448 256 448z"}),c.createElement("path",{style:{fill:"#ffd464"},d:"M256.668 267.164c-11.1 0-18.312 7.22-18.312 18.312 0 11.096 1.564 31.152 18.312 41.204 16.748-10.052 18.312-30.1 18.312-41.204.004-11.096-7.208-18.312-18.312-18.312z"}),c.createElement("path",{style:{fill:"#c23527"},d:"M256.668 271.744c-5.876 0-9.156 3.288-9.156 9.156 0 5.884.292 17.58 9.156 22.896 8.864-5.316 9.156-17.012 9.156-22.896.004-5.868-3.276-9.156-9.156-9.156z"}),c.createElement("ellipse",{style:{fill:"#242424"},cx:256,cy:240,rx:20,ry:8}),c.createElement("path",{style:{fill:"#cc584c"},d:"M226.012 84c-10.86 16-19.7 37.636-19.7 59.952C206.312 220.996 229.2 268 229.2 268h54.936s22.888-47.008 22.888-124.048c0-21.108-9.28-43.952-20.512-59.952h-60.5z"}),c.createElement("path",{style:{fill:"#bf5347"},d:"M286.512 84h-13.74c11.232 16 20.516 38.844 20.516 59.952C293.288 220.992 270.4 268 270.4 268h13.74s22.888-47.008 22.888-124.048c0-21.108-9.284-43.952-20.516-59.952z"}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M229.2 239.372c0 3.68-2.076 6.772-4.58 9.484L197.152 280.9c-2.5 2.716-9.156 3.684-9.156 0v-32.044c0-3.684 5.976-7.3 9.156-9.156l27.468-18.308s4.58.9 4.58 4.58v13.4z"}),c.createElement("path",{style:{fill:"#ccc"},d:"m224.024 221.392-4.552 3.22c.152.404.528.844.528 1.356v13.408c0 3.68-2.056 6.772-4.556 9.484l-27.456 32.044c0 3.684 6.66 2.716 9.164 0l26.868-32.044c2.5-2.712 3.98-5.804 3.98-9.484v-13.408c0-3.688-3.976-4.576-3.976-4.576z"}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M284.14 239.372c0 3.68 2.08 6.772 4.58 9.484l27.464 32.044c2.5 2.716 9.156 3.684 9.156 0v-32.044c0-3.684-5.976-7.3-9.156-9.156l-27.464-18.308s-4.58.9-4.58 4.58v13.4z"}),c.createElement("path",{style:{fill:"#ccc"},d:"m315.512 239.7-27.136-18.308s-3.22.68-4.156 3.22l22.628 15.088c3.184 1.856 9.152 5.472 9.152 9.156V280.9c4 2.716 8 3.684 8 0v-32.044c0-3.684-5.304-7.3-8.488-9.156z"}),c.createElement("circle",{style:{fill:"#263740"},cx:256.68,cy:157.28,r:22.892}),c.createElement("circle",{style:{fill:"#f5f5f5"},cx:256.68,cy:157.28,r:18.312}),c.createElement("circle",{style:{fill:"#e6e6e6"},cx:252,cy:440,r:36}),c.createElement("circle",{style:{fill:"#e6e6e6"},cx:196,cy:424,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M140 408c-19.884 0-36 16.116-36 36 0 9.82 3.944 18.716 10.32 25.212 4.828 3.216 9.788 6.24 14.836 9.12A35.98 35.98 0 0 0 140 480c19.884 0 36-16.116 36-36s-16.116-36-36-36z"}),c.createElement("circle",{style:{fill:"#e6e6e6"},cx:316,cy:424,r:36}),c.createElement("path",{style:{fill:"#e6e6e6"},d:"M372 408c-19.884 0-36 16.116-36 36s16.116 36 36 36c3.78 0 7.416-.588 10.84-1.668 5.052-2.888 10.012-5.912 14.84-9.124C404.056 462.712 408 453.82 408 444c0-19.884-16.116-36-36-36z"}),c.createElement("circle",{style:{fill:"#e6e6e6"},cx:260,cy:440,r:36}),c.createElement("ellipse",{style:{fill:"#e6e6e6"},cx:256.68,cy:248.84,rx:4.584,ry:36.62}),c.createElement("path",{style:{fill:"#263740"},d:"M256.668 93.204c11.104 0 21.46-3.092 30.352-8.396-10.268-15.78-22.268-27.956-30.352-32.808-8.24 4.944-20.548 16.664-30.94 32.456 9.024 5.512 19.596 8.748 30.94 8.748z"}),c.createElement("path",{style:{fill:"#1e2c33"},d:"M275.9 89.964a59.996 59.996 0 0 0 11.124-5.156C276.76 69.028 264.76 56.852 256.672 52c-2.616 1.572-5.668 3.892-8.912 6.744 8.612 7.272 18.624 18.104 28.14 31.22z"}),c.createElement("path",{style:{fill:"#ccc"},d:"M392.132 414.152A35.827 35.827 0 0 0 372 408c-1.352 0-2.684.088-4 .236 7.36.816 14.032 3.88 19.372 8.44a268.93 268.93 0 0 0 4.76-2.524zM343.884 421.552c2-2.504 4.336-4.716 6.92-6.6C346.78 399.452 332.752 388 316 388c-1.352 0-2.684.088-4 .236 17.196 1.9 30.712 15.908 31.884 33.316zM223.484 418.084a36.006 36.006 0 0 1 6.312-6.388C224.768 397.884 211.556 388 196 388c-1.352 0-2.684.088-4 .236 16.036 1.772 28.872 14.08 31.484 29.848zM160.12 421.584a35.84 35.84 0 0 1 1.072-6.636C155.244 410.596 147.932 408 140 408c-1.352 0-2.684.088-4 .236 9.752 1.076 18.308 6.068 24.12 13.348z"}),c.createElement("path",{style:{fill:"#ffd464"},d:"M152 76c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM140 160c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM396 344c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM376 364c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM360 332c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM68 116c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM368 52c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM196 92c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM228 20c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM332 192c0 4-4 8-8 8 4 0 8 4 8 8 0-4 4-8 8-8-4 0-8-4-8-8zM428 160c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM396 216c0 13.332-6.668 20-20 20 13.332 0 20 6.668 20 20 0-13.332 6.668-20 20-20-13.332 0-20-6.668-20-20zM436 108c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM396 292c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM184 52c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM124 320c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12zM76 224c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12z"}))}},2520:(e,t,l)=>{l.d(t,{Z:()=>a});var c,r=l(3289);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c])}return e},n.apply(this,arguments)}const a=e=>{let{title:t,titleId:l,...a}=e;return r.createElement("svg",n({width:512,height:512,fill:"none",viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-labelledby":l},a),void 0===t?r.createElement("title",{id:l},"TypeScript logo"):t?r.createElement("title",{id:l},t):null,c||(c=r.createElement("rect",{width:512,height:512,rx:50,fill:"#3178c6"})),r.createElement("path",{d:"M317 407v50c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1 23-1.1 34-3.4 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9-5.2-2.6-9.7-5.2-13-7.8-3.7-2.7-6.5-5.5-8.5-8.4-2-3-3-6.3-3-10 0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6 4.2 0 8.6.31 13 .94 4.6.63 9.3 1.6 14 2.9 4.7 1.3 9.3 2.9 14 4.9 4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1-23 1.3-34 3.8-20 6.5-28 12c-8.1 5.4-14 12-19 21-4.7 8.4-7 18-7 30 0 15 4.3 28 13 38 8.6 11 22 19 39 27 6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5 2.5 3.4 3.8 7.4 3.8 12 0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7-11 0-22-1.9-32-5.7-11-3.8-21-9.5-30-17zm-84-123h64v-41H118v41h64v183h51z",clipRule:"evenodd",fill:"#fff",fillRule:"evenodd",style:{fill:"#fff"}}))}}}]);