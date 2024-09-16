"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[969],{8163:(e,t,r)=>{r.d(t,{A:()=>x});var n=r(7402),a=r(9679),l=r(196),o=r(4829),i=r(6702),c=r(9461),s=r(3020),m=r(3554),u=Object.defineProperty,d=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))b.call(t,r)&&f(e,r,t[r]);if(d)for(var r of d(t))p.call(t,r)&&f(e,r,t[r]);return e};function h(e){return n.createElement("svg",v({viewBox:"0 0 24 24"},e),n.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const g={breadcrumbHomeIcon:"breadcrumbHomeIcon__5mI"};function E(){const e=(0,m.Ay)("/");return n.createElement("li",{className:"breadcrumbs__item"},n.createElement(c.A,{"aria-label":(0,s.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},n.createElement(h,{className:g.breadcrumbHomeIcon})))}const y={breadcrumbsContainer:"breadcrumbsContainer_jA06"};var O=Object.defineProperty,A=Object.defineProperties,w=Object.getOwnPropertyDescriptors,N=Object.getOwnPropertySymbols,P=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable,j=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,L=(e,t)=>{for(var r in t||(t={}))P.call(t,r)&&j(e,r,t[r]);if(N)for(var r of N(t))_.call(t,r)&&j(e,r,t[r]);return e},T=(e,t)=>A(e,w(t));function k({children:e,href:t,isLast:r}){const a="breadcrumbs__link";return r?n.createElement("span",{className:a,itemProp:"name"},e):t?n.createElement(c.A,{className:a,href:t,itemProp:"item"},n.createElement("span",{itemProp:"name"},e)):n.createElement("span",{className:a},e)}function I({children:e,active:t,index:r,addMicrodata:l}){return n.createElement("li",T(L({},l&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"}),{className:(0,a.A)("breadcrumbs__item",{"breadcrumbs__item--active":t})}),e,n.createElement("meta",{itemProp:"position",content:String(r+1)}))}function x(){const e=(0,o.OF)(),t=(0,i.Dt)();return e?n.createElement("nav",{className:(0,a.A)(l.G.docs.docBreadcrumbs,y.breadcrumbsContainer),"aria-label":(0,s.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},n.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&n.createElement(E,null),e.map(((t,r)=>{const a=r===e.length-1,l="category"===t.type&&t.linkUnlisted?void 0:t.href;return n.createElement(I,{key:r,active:a,index:r,addMicrodata:!!l},n.createElement(k,{href:l,isLast:a},t.label))})))):null}},3038:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var n=r(7402),a=r(1731),l=r(4829),o=r(3554),i=r(9679),c=r(9461),s=r(1441);const m=["zero","one","two","few","many","other"];function u(e){return m.filter((t=>e.includes(t)))}const d={locale:"en",pluralForms:u(["one","other"]),select:e=>1===e?"one":"other"};function b(){const{i18n:{currentLocale:e}}=(0,s.A)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:u(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),d}}),[e])}function p(){const e=b();return{selectMessage:(t,r)=>function(e,t,r){const n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const a=r.select(t),l=r.pluralForms.indexOf(a);return n[Math.min(l,n.length-1)]}(r,t,e)}}var f=r(411),v=r(3020),h=r(9180);const g={cardContainer:"cardContainer_voXb",cardTitle:"cardTitle_ByBB",cardDescription:"cardDescription_aFbn"};function E({href:e,children:t}){return n.createElement(c.A,{href:e,className:(0,i.A)("card padding--lg",g.cardContainer)},t)}function y({href:e,icon:t,title:r,description:a}){return n.createElement(E,{href:e},n.createElement(h.A,{as:"h2",className:(0,i.A)("text--truncate",g.cardTitle),title:r},t," ",r),a&&n.createElement("p",{className:(0,i.A)("text--truncate",g.cardDescription),title:a},a))}function O({item:e}){var t;const r=(0,l.Nr)(e),a=function(){const{selectMessage:e}=p();return t=>e(t,(0,v.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return r?n.createElement(y,{href:r,icon:"\ud83d\uddc3\ufe0f",title:e.label,description:null!=(t=e.description)?t:a(e.items.length)}):null}function A({item:e}){var t,r;const a=(0,f.A)(e.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,l.cC)(null!=(t=e.docId)?t:void 0);return n.createElement(y,{href:e.href,icon:a,title:e.label,description:null!=(r=e.description)?r:null==o?void 0:o.description})}function w({item:e}){switch(e.type){case"link":return n.createElement(A,{item:e});case"category":return n.createElement(O,{item:e});default:throw new Error(`unknown item type ${JSON.stringify(e)}`)}}var N=Object.defineProperty,P=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable,L=(e,t,r)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,T=(e,t)=>{for(var r in t||(t={}))_.call(t,r)&&L(e,r,t[r]);if(P)for(var r of P(t))j.call(t,r)&&L(e,r,t[r]);return e};function k({className:e}){const t=(0,l.$S)();return n.createElement(I,{items:t.items,className:e})}function I(e){const{items:t,className:r}=e;if(!t)return n.createElement(k,T({},e));const a=(0,l.d1)(t);return n.createElement("section",{className:(0,i.A)("row",r)},a.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(w,{item:e})))))}var x=r(7322),C=r(8472),S=r(8449),D=r(8163);const M={generatedIndexPage:"generatedIndexPage_DOIL",list:"list_2KCQ",title:"title_GBaP"};var F=Object.defineProperty,B=Object.getOwnPropertySymbols,V=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable,G=(e,t,r)=>t in e?F(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,H=(e,t)=>{for(var r in t||(t={}))V.call(t,r)&&G(e,r,t[r]);if(B)for(var r of B(t))$.call(t,r)&&G(e,r,t[r]);return e};function R({categoryGeneratedIndex:e}){return n.createElement(a.be,{title:e.title,description:e.description,keywords:e.keywords,image:(0,o.Ay)(e.image)})}function z({categoryGeneratedIndex:e}){const t=(0,l.$S)();return n.createElement("div",{className:M.generatedIndexPage},n.createElement(C.A,null),n.createElement(D.A,null),n.createElement(S.A,null),n.createElement("header",null,n.createElement(h.A,{as:"h1",className:M.title},e.title),e.description&&n.createElement("p",null,e.description)),n.createElement("article",{className:"margin-top--lg"},n.createElement(I,{items:t.items,className:M.list})),n.createElement("footer",{className:"margin-top--lg"},n.createElement(x.A,{previous:e.navigation.previous,next:e.navigation.next})))}function J(e){return n.createElement(n.Fragment,null,n.createElement(R,H({},e)),n.createElement(z,H({},e)))}},7322:(e,t,r)=>{r.d(t,{A:()=>h});var n=r(7402),a=r(3020),l=r(9679),o=r(9461);function i(e){const{permalink:t,title:r,subLabel:a,isNext:i}=e;return n.createElement(o.A,{className:(0,l.A)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},a&&n.createElement("div",{className:"pagination-nav__sublabel"},a),n.createElement("div",{className:"pagination-nav__label"},r))}var c=Object.defineProperty,s=Object.defineProperties,m=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,p=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))d.call(t,r)&&p(e,r,t[r]);if(u)for(var r of u(t))b.call(t,r)&&p(e,r,t[r]);return e},v=(e,t)=>s(e,m(t));function h(e){const{previous:t,next:r}=e;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,a.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"})},t&&n.createElement(i,v(f({},t),{subLabel:n.createElement(a.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),r&&n.createElement(i,v(f({},r),{subLabel:n.createElement(a.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},8449:(e,t,r)=>{r.d(t,{A:()=>c});var n=r(7402),a=r(9679),l=r(3020),o=r(196),i=r(8216);function c({className:e}){const t=(0,i.r)();return t.badge?n.createElement("span",{className:(0,a.A)(e,o.G.docs.docVersionBadge,"badge badge--secondary")},n.createElement(l.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:t.label}},"Version: {versionLabel}")):null}},8472:(e,t,r)=>{r.d(t,{A:()=>A});var n=r(7402),a=r(9679),l=r(1441),o=r(9461),i=r(3020),c=r(4675),s=r(196),m=r(3753),u=r(8216),d=Object.defineProperty,b=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&v(e,r,t[r]);if(b)for(var r of b(t))f.call(t,r)&&v(e,r,t[r]);return e};const g={unreleased:function({siteTitle:e,versionMetadata:t}){return n.createElement(i.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:e,versionLabel:n.createElement("b",null,t.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function({siteTitle:e,versionMetadata:t}){return n.createElement(i.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:e,versionLabel:n.createElement("b",null,t.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function E(e){const t=g[e.versionMetadata.banner];return n.createElement(t,h({},e))}function y({versionLabel:e,to:t,onClick:r}){return n.createElement(i.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:e,latestVersionLink:n.createElement("b",null,n.createElement(o.A,{to:t,onClick:r},n.createElement(i.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function O({className:e,versionMetadata:t}){const{siteConfig:{title:r}}=(0,l.A)(),{pluginId:o}=(0,c.vT)({failfast:!0}),{savePreferredVersionName:i}=(0,m.g1)(o),{latestDocSuggestion:u,latestVersionSuggestion:d}=(0,c.HW)(o),b=null!=u?u:(p=d).docs.find((e=>e.id===p.mainDocId));var p;return n.createElement("div",{className:(0,a.A)(e,s.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(E,{siteTitle:r,versionMetadata:t})),n.createElement("div",{className:"margin-top--md"},n.createElement(y,{versionLabel:d.label,to:b.path,onClick:()=>i(d.name)})))}function A({className:e}){const t=(0,u.r)();return t.banner?n.createElement(O,{className:e,versionMetadata:t}):null}}}]);