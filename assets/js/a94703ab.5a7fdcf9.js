"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[48],{1071:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Ye});var n=a(7402),r=a(9679),o=a(4648),l=a(8713),c=a(9538),i=a(3711),s=a(9731),d=a(274),m=a(6116);const u={backToTopButton:"backToTopButton_EabX",backToTopButtonShow:"backToTopButtonShow_gjdw"};function b(){const{shown:e,scrollToTop:t}=function({threshold:e}){const[t,a]=(0,n.useState)(!1),r=(0,n.useRef)(!1),{startScroll:o,cancelScroll:l}=(0,d.gk)();return(0,d.Mq)((({scrollY:t},n)=>{const o=null==n?void 0:n.scrollY;o&&(r.current?r.current=!1:t>=o?(l(),a(!1)):t<e?a(!1):t+window.innerHeight<document.documentElement.scrollHeight&&a(!0))})),(0,m.$)((e=>{e.location.hash&&(r.current=!0,a(!1))})),{shown:t,scrollToTop:()=>o(0)}}({threshold:300});return n.createElement("button",{"aria-label":(0,s.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,r.A)("clean-btn",l.G.common.backToTopButton,u.backToTopButton,e&&u.backToTopButtonShow),type:"button",onClick:t})}var p=a(8095),f=a(4688),h=a(1451),v=a(1792),E=a(7525),y=Object.defineProperty,g=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,A=(e,t,a)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,k=(e,t)=>{for(var a in t||(t={}))_.call(t,a)&&A(e,a,t[a]);if(g)for(var a of g(t))C.call(t,a)&&A(e,a,t[a]);return e};function S(e){return n.createElement("svg",k({width:"20",height:"20","aria-hidden":"true"},e),n.createElement("g",{fill:"#7a7a7a"},n.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),n.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}const w="collapseSidebarButton_puk6",x="collapseSidebarButtonIcon_c8Ab";function I({onClick:e}){return n.createElement("button",{type:"button",title:(0,s.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,s.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,r.A)("button button--secondary button--outline",w),onClick:e},n.createElement(S,{className:x}))}var O=a(831),T=a(2370);const N=Symbol("EmptyContext"),P=n.createContext(N);function j({children:e}){const[t,a]=(0,n.useState)(null),r=(0,n.useMemo)((()=>({expandedItem:t,setExpandedItem:a})),[t]);return n.createElement(P.Provider,{value:r},e)}var B=a(9940),L=a(1287),M=a(5665),H=a(7831),G=Object.defineProperty,R=Object.getOwnPropertySymbols,W=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable,D=(e,t,a)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;function V({collapsed:e,categoryLabel:t,onClick:a}){return n.createElement("button",{"aria-label":e?(0,s.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:t}):(0,s.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:t}),"aria-expanded":!e,type:"button",className:"clean-btn menu__caret",onClick:a})}function U(e){var t=e,{item:a,onItemClick:o,activePath:i,level:s,index:d}=t,m=((e,t)=>{var a={};for(var n in e)W.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&R)for(var n of R(e))t.indexOf(n)<0&&F.call(e,n)&&(a[n]=e[n]);return a})(t,["item","onItemClick","activePath","level","index"]);const{items:u,label:b,collapsible:p,className:f,href:h}=a,{docs:{sidebar:{autoCollapseCategories:E}}}=(0,v.p)(),y=function(e){const t=(0,H.A)();return(0,n.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,c.Nr)(e):void 0),[e,t])}(a),g=(0,c.w8)(a,i),_=(0,L.ys)(h,i),{collapsed:C,setCollapsed:A}=(0,B.u)({initialState:()=>!!p&&(!g&&a.collapsed)}),{expandedItem:k,setExpandedItem:S}=function(){const e=(0,n.useContext)(P);if(e===N)throw new T.dV("DocSidebarItemsExpandedStateProvider");return e}(),w=(e=!C)=>{S(e?null:d),A(e)};return function({isActive:e,collapsed:t,updateCollapsed:a}){const r=(0,T.ZC)(e);(0,n.useEffect)((()=>{e&&!r&&t&&a(!1)}),[e,r,t,a])}({isActive:g,collapsed:C,updateCollapsed:w}),(0,n.useEffect)((()=>{p&&null!=k&&k!==d&&E&&A(!0)}),[p,k,d,A,E]),n.createElement("li",{className:(0,r.A)(l.G.docs.docSidebarItemCategory,l.G.docs.docSidebarItemCategoryLevel(s),"menu__list-item",{"menu__list-item--collapsed":C},f)},n.createElement("div",{className:(0,r.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":_})},n.createElement(M.A,((e,t)=>{for(var a in t||(t={}))W.call(t,a)&&D(e,a,t[a]);if(R)for(var a of R(t))F.call(t,a)&&D(e,a,t[a]);return e})({className:(0,r.A)("menu__link",{"menu__link--sublist":p,"menu__link--sublist-caret":!h&&p,"menu__link--active":g}),onClick:p?e=>{null==o||o(a),h?w(!1):(e.preventDefault(),w())}:()=>{null==o||o(a)},"aria-current":_?"page":void 0,role:p&&!h?"button":void 0,"aria-expanded":p&&!h?!C:void 0,href:p?null!=y?y:"#":y},m),b),h&&p&&n.createElement(V,{collapsed:C,categoryLabel:b,onClick:e=>{e.preventDefault(),w()}})),n.createElement(B.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:C},n.createElement(fe,{items:u,tabIndex:C?-1:0,onItemClick:o,activePath:i,level:s+1})))}var Y=a(9334),z=a(1612);const Z="menuExternalLink_EJ0K";var q=Object.defineProperty,J=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable,$=(e,t,a)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,Q=(e,t)=>{for(var a in t||(t={}))X.call(t,a)&&$(e,a,t[a]);if(J)for(var a of J(t))K.call(t,a)&&$(e,a,t[a]);return e};function ee(e){var t=e,{item:a,onItemClick:o,activePath:i,level:s,index:d}=t,m=((e,t)=>{var a={};for(var n in e)X.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&J)for(var n of J(e))t.indexOf(n)<0&&K.call(e,n)&&(a[n]=e[n]);return a})(t,["item","onItemClick","activePath","level","index"]);const{href:u,label:b,className:p,autoAddBaseUrl:f}=a,h=(0,c.w8)(a,i),v=(0,Y.A)(u);return n.createElement("li",{className:(0,r.A)(l.G.docs.docSidebarItemLink,l.G.docs.docSidebarItemLinkLevel(s),"menu__list-item",p),key:b},n.createElement(M.A,Q(Q({className:(0,r.A)("menu__link",!v&&Z,{"menu__link--active":h}),autoAddBaseUrl:f,"aria-current":h?"page":void 0,to:u},v&&{onClick:o?()=>o(a):void 0}),m),b,!v&&n.createElement(z.A,null)))}const te="menuHtmlItem_F9qo";function ae({item:e,level:t,index:a}){const{value:o,defaultStyle:c,className:i}=e;return n.createElement("li",{className:(0,r.A)(l.G.docs.docSidebarItemLink,l.G.docs.docSidebarItemLinkLevel(t),c&&[te,"menu__list-item"],i),key:a,dangerouslySetInnerHTML:{__html:o}})}var ne=Object.defineProperty,re=Object.getOwnPropertySymbols,oe=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable,ce=(e,t,a)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,ie=(e,t)=>{for(var a in t||(t={}))oe.call(t,a)&&ce(e,a,t[a]);if(re)for(var a of re(t))le.call(t,a)&&ce(e,a,t[a]);return e};function se(e){var t=e,{item:a}=t,r=((e,t)=>{var a={};for(var n in e)oe.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&re)for(var n of re(e))t.indexOf(n)<0&&le.call(e,n)&&(a[n]=e[n]);return a})(t,["item"]);switch(a.type){case"category":return n.createElement(U,ie({item:a},r));case"html":return n.createElement(ae,ie({item:a},r));default:return n.createElement(ee,ie({item:a},r))}}var de=Object.defineProperty,me=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,pe=(e,t,a)=>t in e?de(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;const fe=(0,n.memo)((function(e){var t=e,{items:a}=t,r=((e,t)=>{var a={};for(var n in e)ue.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&me)for(var n of me(e))t.indexOf(n)<0&&be.call(e,n)&&(a[n]=e[n]);return a})(t,["items"]);const o=(0,c.Y)(a,r.activePath);return n.createElement(j,null,o.map(((e,t)=>n.createElement(se,((e,t)=>{for(var a in t||(t={}))ue.call(t,a)&&pe(e,a,t[a]);if(me)for(var a of me(t))be.call(t,a)&&pe(e,a,t[a]);return e})({key:t,item:e,index:t},r)))))})),he="menu_bXMp",ve="menuWithAnnouncementBar_jHZo";function Ee({path:e,sidebar:t,className:a}){const o=function(){const{isActive:e}=(0,O.M)(),[t,a]=(0,n.useState)(e);return(0,d.Mq)((({scrollY:t})=>{e&&a(0===t)}),[e]),e&&t}();return n.createElement("nav",{"aria-label":(0,s.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,r.A)("menu thin-scrollbar",he,o&&ve,a)},n.createElement("ul",{className:(0,r.A)(l.G.docs.docSidebarMenu,"menu__list")},n.createElement(fe,{items:t,activePath:e,level:1})))}const ye="sidebar_T8o_",ge="sidebarWithHideableNavbar_lSFr",_e="sidebarHidden_EYbU",Ce="sidebarLogo_EVyR";const Ae=n.memo((function({path:e,sidebar:t,onCollapse:a,isHidden:o}){const{navbar:{hideOnScroll:l},docs:{sidebar:{hideable:c}}}=(0,v.p)();return n.createElement("div",{className:(0,r.A)(ye,l&&ge,o&&_e)},l&&n.createElement(E.A,{tabIndex:-1,className:Ce}),n.createElement(Ee,{path:e,sidebar:t}),c&&n.createElement(I,{onClick:a}))}));var ke=a(6674),Se=a(4415);const we=({sidebar:e,path:t})=>{const a=(0,Se.M)();return n.createElement("ul",{className:(0,r.A)(l.G.docs.docSidebarMenu,"menu__list")},n.createElement(fe,{items:e,activePath:t,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1}))};const xe=n.memo((function(e){return n.createElement(ke.GX,{component:we,props:e})}));var Ie=Object.defineProperty,Oe=Object.getOwnPropertySymbols,Te=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,Pe=(e,t,a)=>t in e?Ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,je=(e,t)=>{for(var a in t||(t={}))Te.call(t,a)&&Pe(e,a,t[a]);if(Oe)for(var a of Oe(t))Ne.call(t,a)&&Pe(e,a,t[a]);return e};function Be(e){const t=(0,h.l)(),a="desktop"===t||"ssr"===t,r="mobile"===t;return n.createElement(n.Fragment,null,a&&n.createElement(Ae,je({},e)),r&&n.createElement(xe,je({},e)))}const Le={expandButton:"expandButton__AHw",expandButtonIcon:"expandButtonIcon_JNwM"};function Me({toggleSidebar:e}){return n.createElement("div",{className:Le.expandButton,title:(0,s.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,s.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:e,onClick:e},n.createElement(S,{className:Le.expandButtonIcon}))}const He={docSidebarContainer:"docSidebarContainer_Voy2",docSidebarContainerHidden:"docSidebarContainerHidden_svdZ",sidebarViewport:"sidebarViewport_Zx22"};function Ge({children:e}){var t;const a=(0,i.t)();return n.createElement(n.Fragment,{key:null!=(t=null==a?void 0:a.name)?t:"noSidebar"},e)}function Re({sidebar:e,hiddenSidebarContainer:t,setHiddenSidebarContainer:a}){const{pathname:o}=(0,f.zy)(),[c,i]=(0,n.useState)(!1),s=(0,n.useCallback)((()=>{c&&i(!1),!c&&(0,p.O)()&&i(!0),a((e=>!e))}),[a,c]);return n.createElement("aside",{className:(0,r.A)(l.G.docs.docSidebarContainer,He.docSidebarContainer,t&&He.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(He.docSidebarContainer)&&t&&i(!0)}},n.createElement(Ge,null,n.createElement("div",{className:(0,r.A)(He.sidebarViewport,c&&He.sidebarViewportHidden)},n.createElement(Be,{sidebar:e,path:o,onCollapse:s,isHidden:c}),c&&n.createElement(Me,{toggleSidebar:s}))))}const We={docMainContainer:"docMainContainer_xLuc",docMainContainerEnhanced:"docMainContainerEnhanced_Cl1w",docItemWrapperEnhanced:"docItemWrapperEnhanced_cbGg"};function Fe({hiddenSidebarContainer:e,children:t}){const a=(0,i.t)();return n.createElement("main",{className:(0,r.A)(We.docMainContainer,(e||!a)&&We.docMainContainerEnhanced)},n.createElement("div",{className:(0,r.A)("container padding-top--md padding-bottom--lg",We.docItemWrapper,e&&We.docItemWrapperEnhanced)},t))}const De={docRoot:"docRoot_vRF2",docsWrapper:"docsWrapper_p2IJ"};function Ve({children:e}){const t=(0,i.t)(),[a,r]=(0,n.useState)(!1);return n.createElement("div",{className:De.docsWrapper},n.createElement(b,null),n.createElement("div",{className:De.docRoot},t&&n.createElement(Re,{sidebar:t.items,hiddenSidebarContainer:a,setHiddenSidebarContainer:r}),n.createElement(Fe,{hiddenSidebarContainer:a},e)))}var Ue=a(6215);function Ye(e){const t=(0,c.B5)(e);if(!t)return n.createElement(Ue.A,null);const{docElement:a,sidebarName:s,sidebarItems:d}=t;return n.createElement(o.e3,{className:(0,r.A)(l.G.page.docsDocPage)},n.createElement(i.V,{name:s,items:d},n.createElement(Ve,null,a)))}},6215:(e,t,a)=>{a.d(t,{A:()=>c});var n=a(7402),r=a(9679),o=a(9731),l=a(8961);function c({className:e}){return n.createElement("main",{className:(0,r.A)("container margin-vert--xl",e)},n.createElement("div",{className:"row"},n.createElement("div",{className:"col col--6 col--offset-3"},n.createElement(l.A,{as:"h1",className:"hero__title"},n.createElement(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),n.createElement("p",null,n.createElement(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),n.createElement("p",null,n.createElement(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))))}}}]);