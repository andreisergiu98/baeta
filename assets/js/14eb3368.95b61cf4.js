"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[817],{2047:(e,t,r)=>{r.d(t,{Z:()=>T});var n=r(8330),a=r(9275),l=r(6839),o=r(2680),i=r(6297),s=r(8885),c=r(5483),m=r(1588),u=Object.defineProperty,d=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))b.call(t,r)&&f(e,r,t[r]);if(d)for(var r of d(t))p.call(t,r)&&f(e,r,t[r]);return e};function g(e){return n.createElement("svg",v({viewBox:"0 0 24 24"},e),n.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const h={breadcrumbHomeIcon:"breadcrumbHomeIcon_eWgu"};function E(){const e=(0,m.ZP)("/");return n.createElement("li",{className:"breadcrumbs__item"},n.createElement(s.Z,{"aria-label":(0,c.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},n.createElement(g,{className:h.breadcrumbHomeIcon})))}const y={breadcrumbsContainer:"breadcrumbsContainer_ARMh"};var O=Object.defineProperty,w=Object.defineProperties,N=Object.getOwnPropertyDescriptors,P=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable,_=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,j=(e,t)=>{for(var r in t||(t={}))Z.call(t,r)&&_(e,r,t[r]);if(P)for(var r of P(t))L.call(t,r)&&_(e,r,t[r]);return e},k=(e,t)=>w(e,N(t));function I({children:e,href:t,isLast:r}){const a="breadcrumbs__link";return r?n.createElement("span",{className:a,itemProp:"name"},e):t?n.createElement(s.Z,{className:a,href:t,itemProp:"item"},n.createElement("span",{itemProp:"name"},e)):n.createElement("span",{className:a},e)}function x({children:e,active:t,index:r,addMicrodata:l}){return n.createElement("li",k(j({},l&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"}),{className:(0,a.Z)("breadcrumbs__item",{"breadcrumbs__item--active":t})}),e,n.createElement("meta",{itemProp:"position",content:String(r+1)}))}function T(){const e=(0,o.s1)(),t=(0,i.Ns)();return e?n.createElement("nav",{className:(0,a.Z)(l.k.docs.docBreadcrumbs,y.breadcrumbsContainer),"aria-label":(0,c.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},n.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&n.createElement(E,null),e.map(((t,r)=>{const a=r===e.length-1,l="category"===t.type&&t.linkUnlisted?void 0:t.href;return n.createElement(x,{key:r,active:a,index:r,addMicrodata:!!l},n.createElement(I,{href:l,isLast:a},t.label))})))):null}},4487:(e,t,r)=>{r.r(t),r.d(t,{default:()=>z});var n=r(8330),a=r(8492),l=r(2680),o=r(1588),i=r(9275),s=r(8885),c=r(3242);const m=["zero","one","two","few","many","other"];function u(e){return m.filter((t=>e.includes(t)))}const d={locale:"en",pluralForms:u(["one","other"]),select:e=>1===e?"one":"other"};function b(){const{i18n:{currentLocale:e}}=(0,c.Z)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:u(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),d}}),[e])}function p(){const e=b();return{selectMessage:(t,r)=>function(e,t,r){const n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const a=r.select(t),l=r.pluralForms.indexOf(a);return n[Math.min(l,n.length-1)]}(r,t,e)}}var f=r(526),v=r(5483),g=r(3613);const h={cardContainer:"cardContainer_LGd2",cardTitle:"cardTitle_fESL",cardDescription:"cardDescription_Jdba"};function E({href:e,children:t}){return n.createElement(s.Z,{href:e,className:(0,i.Z)("card padding--lg",h.cardContainer)},t)}function y({href:e,icon:t,title:r,description:a}){return n.createElement(E,{href:e},n.createElement(g.Z,{as:"h2",className:(0,i.Z)("text--truncate",h.cardTitle),title:r},t," ",r),a&&n.createElement("p",{className:(0,i.Z)("text--truncate",h.cardDescription),title:a},a))}function O({item:e}){var t;const r=(0,l.LM)(e),a=function(){const{selectMessage:e}=p();return t=>e(t,(0,v.I)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return r?n.createElement(y,{href:r,icon:"\ud83d\uddc3\ufe0f",title:e.label,description:null!=(t=e.description)?t:a(e.items.length)}):null}function w({item:e}){var t,r;const a=(0,f.Z)(e.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,l.xz)(null!=(t=e.docId)?t:void 0);return n.createElement(y,{href:e.href,icon:a,title:e.label,description:null!=(r=e.description)?r:null==o?void 0:o.description})}function N({item:e}){switch(e.type){case"link":return n.createElement(w,{item:e});case"category":return n.createElement(O,{item:e});default:throw new Error(`unknown item type ${JSON.stringify(e)}`)}}var P=Object.defineProperty,Z=Object.getOwnPropertySymbols,L=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable,j=(e,t,r)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,k=(e,t)=>{for(var r in t||(t={}))L.call(t,r)&&j(e,r,t[r]);if(Z)for(var r of Z(t))_.call(t,r)&&j(e,r,t[r]);return e};function I({className:e}){const t=(0,l.jA)();return n.createElement(x,{items:t.items,className:e})}function x(e){const{items:t,className:r}=e;if(!t)return n.createElement(I,k({},e));const a=(0,l.MN)(t);return n.createElement("section",{className:(0,i.Z)("row",r)},a.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(N,{item:e})))))}var T=r(9825),M=r(5114),C=r(2838),S=r(2047);const A={generatedIndexPage:"generatedIndexPage_P1xB",list:"list_q7ad",title:"title_Hgk0"};var D=Object.defineProperty,V=Object.getOwnPropertySymbols,F=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,$=(e,t,r)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,H=(e,t)=>{for(var r in t||(t={}))F.call(t,r)&&$(e,r,t[r]);if(V)for(var r of V(t))B.call(t,r)&&$(e,r,t[r]);return e};function R({categoryGeneratedIndex:e}){return n.createElement(a.d,{title:e.title,description:e.description,keywords:e.keywords,image:(0,o.ZP)(e.image)})}function J({categoryGeneratedIndex:e}){const t=(0,l.jA)();return n.createElement("div",{className:A.generatedIndexPage},n.createElement(M.Z,null),n.createElement(S.Z,null),n.createElement(C.Z,null),n.createElement("header",null,n.createElement(g.Z,{as:"h1",className:A.title},e.title),e.description&&n.createElement("p",null,e.description)),n.createElement("article",{className:"margin-top--lg"},n.createElement(x,{items:t.items,className:A.list})),n.createElement("footer",{className:"margin-top--lg"},n.createElement(T.Z,{previous:e.navigation.previous,next:e.navigation.next})))}function z(e){return n.createElement(n.Fragment,null,n.createElement(R,H({},e)),n.createElement(J,H({},e)))}},9825:(e,t,r)=>{r.d(t,{Z:()=>g});var n=r(8330),a=r(5483),l=r(9275),o=r(8885);function i(e){const{permalink:t,title:r,subLabel:a,isNext:i}=e;return n.createElement(o.Z,{className:(0,l.Z)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},a&&n.createElement("div",{className:"pagination-nav__sublabel"},a),n.createElement("div",{className:"pagination-nav__label"},r))}var s=Object.defineProperty,c=Object.defineProperties,m=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,p=(e,t,r)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))d.call(t,r)&&p(e,r,t[r]);if(u)for(var r of u(t))b.call(t,r)&&p(e,r,t[r]);return e},v=(e,t)=>c(e,m(t));function g(e){const{previous:t,next:r}=e;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,a.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"})},t&&n.createElement(i,v(f({},t),{subLabel:n.createElement(a.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),r&&n.createElement(i,v(f({},r),{subLabel:n.createElement(a.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},2838:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(8330),a=r(9275),l=r(5483),o=r(6839),i=r(733);function s({className:e}){const t=(0,i.E)();return t.badge?n.createElement("span",{className:(0,a.Z)(e,o.k.docs.docVersionBadge,"badge badge--secondary")},n.createElement(l.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:t.label}},"Version: {versionLabel}")):null}},5114:(e,t,r)=>{r.d(t,{Z:()=>w});var n=r(8330),a=r(9275),l=r(3242),o=r(8885),i=r(5483),s=r(7644),c=r(6839),m=r(5724),u=r(733),d=Object.defineProperty,b=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,g=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&v(e,r,t[r]);if(b)for(var r of b(t))f.call(t,r)&&v(e,r,t[r]);return e};const h={unreleased:function({siteTitle:e,versionMetadata:t}){return n.createElement(i.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:e,versionLabel:n.createElement("b",null,t.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function({siteTitle:e,versionMetadata:t}){return n.createElement(i.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:e,versionLabel:n.createElement("b",null,t.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function E(e){const t=h[e.versionMetadata.banner];return n.createElement(t,g({},e))}function y({versionLabel:e,to:t,onClick:r}){return n.createElement(i.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:e,latestVersionLink:n.createElement("b",null,n.createElement(o.Z,{to:t,onClick:r},n.createElement(i.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function O({className:e,versionMetadata:t}){const{siteConfig:{title:r}}=(0,l.Z)(),{pluginId:o}=(0,s.gA)({failfast:!0}),{savePreferredVersionName:i}=(0,m.J)(o),{latestDocSuggestion:u,latestVersionSuggestion:d}=(0,s.Jo)(o),b=null!=u?u:(p=d).docs.find((e=>e.id===p.mainDocId));var p;return n.createElement("div",{className:(0,a.Z)(e,c.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(E,{siteTitle:r,versionMetadata:t})),n.createElement("div",{className:"margin-top--md"},n.createElement(y,{versionLabel:d.label,to:b.path,onClick:()=>i(d.name)})))}function w({className:e}){const t=(0,u.E)();return t.banner?n.createElement(O,{className:e,versionMetadata:t}):null}}}]);