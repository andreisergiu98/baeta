"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[817],{418:(e,t,r)=>{r.d(t,{Z:()=>x});var a=r(3289),n=r(8795),i=r(6547),l=r(3205),o=r(2275),c=r(7333),s=r(396),m=r(4556),d=Object.defineProperty,u=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))b.call(t,r)&&v(e,r,t[r]);if(u)for(var r of u(t))p.call(t,r)&&v(e,r,t[r]);return e};function f(e){return a.createElement("svg",h({viewBox:"0 0 24 24"},e),a.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const g={breadcrumbHomeIcon:"breadcrumbHomeIcon_jMtt"};function E(){const e=(0,m.Z)("/");return a.createElement("li",{className:"breadcrumbs__item"},a.createElement(c.Z,{"aria-label":(0,s.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},a.createElement(f,{className:g.breadcrumbHomeIcon})))}const y={breadcrumbsContainer:"breadcrumbsContainer_w4Ux"};var O=Object.defineProperty,N=Object.defineProperties,w=Object.getOwnPropertyDescriptors,P=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,Z=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,_=(e,t)=>{for(var r in t||(t={}))j.call(t,r)&&Z(e,r,t[r]);if(P)for(var r of P(t))k.call(t,r)&&Z(e,r,t[r]);return e},L=(e,t)=>N(e,w(t));function I({children:e,href:t,isLast:r}){const n="breadcrumbs__link";return r?a.createElement("span",{className:n,itemProp:"name"},e):t?a.createElement(c.Z,{className:n,href:t,itemProp:"item"},a.createElement("span",{itemProp:"name"},e)):a.createElement("span",{className:n},e)}function T({children:e,active:t,index:r,addMicrodata:i}){return a.createElement("li",L(_({},i&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"}),{className:(0,n.Z)("breadcrumbs__item",{"breadcrumbs__item--active":t})}),e,a.createElement("meta",{itemProp:"position",content:String(r+1)}))}function x(){const e=(0,l.s1)(),t=(0,o.Ns)();return e?a.createElement("nav",{className:(0,n.Z)(i.k.docs.docBreadcrumbs,y.breadcrumbsContainer),"aria-label":(0,s.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},a.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&a.createElement(E,null),e.map(((t,r)=>{const n=r===e.length-1;return a.createElement(T,{key:r,active:n,index:r,addMicrodata:!!t.href},a.createElement(I,{href:t.href,isLast:n},t.label))})))):null}},8215:(e,t,r)=>{r.r(t),r.d(t,{default:()=>H});var a=r(3289),n=r(502),i=r(3205),l=r(4556),o=r(8795),c=r(7333),s=r(1266),m=r(396);const d={cardContainer:"cardContainer_t4_S",cardTitle:"cardTitle_vCSf",cardDescription:"cardDescription_ky6X"};function u({href:e,children:t}){return a.createElement(c.Z,{href:e,className:(0,o.Z)("card padding--lg",d.cardContainer)},t)}function b({href:e,icon:t,title:r,description:n}){return a.createElement(u,{href:e},a.createElement("h2",{className:(0,o.Z)("text--truncate",d.cardTitle),title:r},t," ",r),n&&a.createElement("p",{className:(0,o.Z)("text--truncate",d.cardDescription),title:n},n))}function p({item:e}){var t;const r=(0,i.Wl)(e);return r?a.createElement(b,{href:r,icon:"\ud83d\uddc3\ufe0f",title:e.label,description:null!=(t=e.description)?t:(0,m.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:e.items.length})}):null}function v({item:e}){var t,r;const n=(0,s.Z)(e.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",l=(0,i.xz)(null!=(t=e.docId)?t:void 0);return a.createElement(b,{href:e.href,icon:n,title:e.label,description:null!=(r=e.description)?r:null==l?void 0:l.description})}function h({item:e}){switch(e.type){case"link":return a.createElement(v,{item:e});case"category":return a.createElement(p,{item:e});default:throw new Error(`unknown item type ${JSON.stringify(e)}`)}}var f=Object.defineProperty,g=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable,O=(e,t,r)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,N=(e,t)=>{for(var r in t||(t={}))E.call(t,r)&&O(e,r,t[r]);if(g)for(var r of g(t))y.call(t,r)&&O(e,r,t[r]);return e};function w({className:e}){const t=(0,i.jA)();return a.createElement(P,{items:t.items,className:e})}function P(e){const{items:t,className:r}=e;if(!t)return a.createElement(w,N({},e));const n=(0,i.MN)(t);return a.createElement("section",{className:(0,o.Z)("row",r)},n.map(((e,t)=>a.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},a.createElement(h,{item:e})))))}var j=r(4184),k=r(6959),Z=r(9327),_=r(418),L=r(4202);const I={generatedIndexPage:"generatedIndexPage_LwkC",list:"list_ecPU",title:"title_JSK7"};var T=Object.defineProperty,x=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,D=(e,t,r)=>t in e?T(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,A=(e,t)=>{for(var r in t||(t={}))S.call(t,r)&&D(e,r,t[r]);if(x)for(var r of x(t))C.call(t,r)&&D(e,r,t[r]);return e};function M({categoryGeneratedIndex:e}){return a.createElement(n.d,{title:e.title,description:e.description,keywords:e.keywords,image:(0,l.Z)(e.image)})}function V({categoryGeneratedIndex:e}){const t=(0,i.jA)();return a.createElement("div",{className:I.generatedIndexPage},a.createElement(k.Z,null),a.createElement(_.Z,null),a.createElement(Z.Z,null),a.createElement("header",null,a.createElement(L.Z,{as:"h1",className:I.title},e.title),e.description&&a.createElement("p",null,e.description)),a.createElement("article",{className:"margin-top--lg"},a.createElement(P,{items:t.items,className:I.list})),a.createElement("footer",{className:"margin-top--lg"},a.createElement(j.Z,{previous:e.navigation.previous,next:e.navigation.next})))}function H(e){return a.createElement(a.Fragment,null,a.createElement(M,A({},e)),a.createElement(V,A({},e)))}},4184:(e,t,r)=>{r.d(t,{Z:()=>f});var a=r(3289),n=r(396),i=r(8795),l=r(7333);function o(e){const{permalink:t,title:r,subLabel:n,isNext:o}=e;return a.createElement(l.Z,{className:(0,i.Z)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},n&&a.createElement("div",{className:"pagination-nav__sublabel"},n),a.createElement("div",{className:"pagination-nav__label"},r))}var c=Object.defineProperty,s=Object.defineProperties,m=Object.getOwnPropertyDescriptors,d=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,p=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))u.call(t,r)&&p(e,r,t[r]);if(d)for(var r of d(t))b.call(t,r)&&p(e,r,t[r]);return e},h=(e,t)=>s(e,m(t));function f(e){const{previous:t,next:r}=e;return a.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,n.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"})},t&&a.createElement(o,h(v({},t),{subLabel:a.createElement(n.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),r&&a.createElement(o,h(v({},r),{subLabel:a.createElement(n.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},9327:(e,t,r)=>{r.d(t,{Z:()=>c});var a=r(3289),n=r(8795),i=r(396),l=r(6547),o=r(4109);function c({className:e}){const t=(0,o.E)();return t.badge?a.createElement("span",{className:(0,n.Z)(e,l.k.docs.docVersionBadge,"badge badge--secondary")},a.createElement(i.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:t.label}},"Version: {versionLabel}")):null}},6959:(e,t,r)=>{r.d(t,{Z:()=>N});var a=r(3289),n=r(8795),i=r(9687),l=r(7333),o=r(396),c=r(6081),s=r(6547),m=r(7748),d=r(4109),u=Object.defineProperty,b=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,h=(e,t,r)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&h(e,r,t[r]);if(b)for(var r of b(t))v.call(t,r)&&h(e,r,t[r]);return e};const g={unreleased:function({siteTitle:e,versionMetadata:t}){return a.createElement(o.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:e,versionLabel:a.createElement("b",null,t.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function({siteTitle:e,versionMetadata:t}){return a.createElement(o.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:e,versionLabel:a.createElement("b",null,t.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function E(e){const t=g[e.versionMetadata.banner];return a.createElement(t,f({},e))}function y({versionLabel:e,to:t,onClick:r}){return a.createElement(o.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:e,latestVersionLink:a.createElement("b",null,a.createElement(l.Z,{to:t,onClick:r},a.createElement(o.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function O({className:e,versionMetadata:t}){const{siteConfig:{title:r}}=(0,i.Z)(),{pluginId:l}=(0,c.gA)({failfast:!0}),{savePreferredVersionName:o}=(0,m.J)(l),{latestDocSuggestion:d,latestVersionSuggestion:u}=(0,c.Jo)(l),b=null!=d?d:(p=u).docs.find((e=>e.id===p.mainDocId));var p;return a.createElement("div",{className:(0,n.Z)(e,s.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},a.createElement("div",null,a.createElement(E,{siteTitle:r,versionMetadata:t})),a.createElement("div",{className:"margin-top--md"},a.createElement(y,{versionLabel:u.label,to:b.path,onClick:()=>o(u.name)})))}function N({className:e}){const t=(0,d.E)();return t.banner?a.createElement(O,{className:e,versionMetadata:t}):null}},4202:(e,t,r)=>{r.d(t,{Z:()=>E});var a=r(3289),n=r(8795),i=r(396),l=r(7482),o=r(7333);const c={anchorWithStickyNavbar:"anchorWithStickyNavbar_DD1R",anchorWithHideOnScrollNavbar:"anchorWithHideOnScrollNavbar_R0kb"};var s=Object.defineProperty,m=Object.defineProperties,d=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))b.call(t,r)&&v(e,r,t[r]);if(u)for(var r of u(t))p.call(t,r)&&v(e,r,t[r]);return e},f=(e,t)=>m(e,d(t)),g=(e,t)=>{var r={};for(var a in e)b.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&u)for(var a of u(e))t.indexOf(a)<0&&p.call(e,a)&&(r[a]=e[a]);return r};function E(e){var t=e,{as:r,id:s}=t,m=g(t,["as","id"]);const{navbar:{hideOnScroll:d}}=(0,l.L)();if("h1"===r||!s)return a.createElement(r,f(h({},m),{id:void 0}));const u=(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to {heading}",description:"Title for link to heading"},{heading:"string"==typeof m.children?m.children:s});return a.createElement(r,f(h({},m),{className:(0,n.Z)("anchor",d?c.anchorWithHideOnScrollNavbar:c.anchorWithStickyNavbar,m.className),id:s}),m.children,a.createElement(o.Z,{className:"hash-link",to:`#${s}`,"aria-label":u,title:u},"\u200b"))}}}]);