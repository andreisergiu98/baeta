"use strict";(self.webpackChunk_baeta_website=self.webpackChunk_baeta_website||[]).push([[9048],{3782:(e,t,a)=>{a.r(t),a.d(t,{default:()=>ze});var n=a(7402),r=a(9679),o=a(7160),l=a(6257),i=a(1954),c=a(7903),s=a(290),d=a(9898),m=a(540);const u={backToTopButton:"backToTopButton_kzvB",backToTopButtonShow:"backToTopButtonShow_XjoH"};function b(){const{shown:e,scrollToTop:t}=function({threshold:e}){const[t,a]=(0,n.useState)(!1),r=(0,n.useRef)(!1),{startScroll:o,cancelScroll:l}=(0,d.gk)();return(0,d.Mq)((({scrollY:t},n)=>{const o=null==n?void 0:n.scrollY;o&&(r.current?r.current=!1:t>=o?(l(),a(!1)):t<e?a(!1):t+window.innerHeight<document.documentElement.scrollHeight&&a(!0))})),(0,m.$)((e=>{e.location.hash&&(r.current=!0,a(!1))})),{shown:t,scrollToTop:()=>o(0)}}({threshold:300});return n.createElement("button",{"aria-label":(0,s.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,r.A)("clean-btn",l.G.common.backToTopButton,u.backToTopButton,e&&u.backToTopButtonShow),type:"button",onClick:t})}var p=a(3463),f=a(2494),h=a(19),v=a(4888),E=a(7549),y=Object.defineProperty,g=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,k=(e,t,a)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,A=(e,t)=>{for(var a in t||(t={}))_.call(t,a)&&k(e,a,t[a]);if(g)for(var a of g(t))C.call(t,a)&&k(e,a,t[a]);return e};function S(e){return n.createElement("svg",A({width:"20",height:"20","aria-hidden":"true"},e),n.createElement("g",{fill:"#7a7a7a"},n.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),n.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}const O="collapseSidebarButton_hvDR",T="collapseSidebarButtonIcon_tE9T";function w({onClick:e}){return n.createElement("button",{type:"button",title:(0,s.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,s.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,r.A)("button button--secondary button--outline",O),onClick:e},n.createElement(S,{className:T}))}var x=a(6471),I=a(7466);const N=Symbol("EmptyContext"),P=n.createContext(N);function j({children:e}){const[t,a]=(0,n.useState)(null),r=(0,n.useMemo)((()=>({expandedItem:t,setExpandedItem:a})),[t]);return n.createElement(P.Provider,{value:r},e)}var B=a(4412),L=a(1615),H=a(3095),M=a(6222),G=Object.defineProperty,R=Object.getOwnPropertySymbols,W=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable,F=(e,t,a)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;function V({collapsed:e,categoryLabel:t,onClick:a}){return n.createElement("button",{"aria-label":e?(0,s.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:t}):(0,s.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:t}),"aria-expanded":!e,type:"button",className:"clean-btn menu__caret",onClick:a})}function U(e){var t=e,{item:a,onItemClick:o,activePath:c,level:s,index:d}=t,m=((e,t)=>{var a={};for(var n in e)W.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&R)for(var n of R(e))t.indexOf(n)<0&&D.call(e,n)&&(a[n]=e[n]);return a})(t,["item","onItemClick","activePath","level","index"]);const{items:u,label:b,collapsible:p,className:f,href:h}=a,{docs:{sidebar:{autoCollapseCategories:E}}}=(0,v.p)(),y=function(e){const t=(0,M.A)();return(0,n.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,i.Nr)(e):void 0),[e,t])}(a),g=(0,i.w8)(a,c),_=(0,L.ys)(h,c),{collapsed:C,setCollapsed:k}=(0,B.u)({initialState:()=>!!p&&(!g&&a.collapsed)}),{expandedItem:A,setExpandedItem:S}=function(){const e=(0,n.useContext)(P);if(e===N)throw new I.dV("DocSidebarItemsExpandedStateProvider");return e}(),O=(e=!C)=>{S(e?null:d),k(e)};return function({isActive:e,collapsed:t,updateCollapsed:a}){const r=(0,I.ZC)(e);(0,n.useEffect)((()=>{e&&!r&&t&&a(!1)}),[e,r,t,a])}({isActive:g,collapsed:C,updateCollapsed:O}),(0,n.useEffect)((()=>{p&&null!=A&&A!==d&&E&&k(!0)}),[p,A,d,k,E]),n.createElement("li",{className:(0,r.A)(l.G.docs.docSidebarItemCategory,l.G.docs.docSidebarItemCategoryLevel(s),"menu__list-item",{"menu__list-item--collapsed":C},f)},n.createElement("div",{className:(0,r.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":_})},n.createElement(H.A,((e,t)=>{for(var a in t||(t={}))W.call(t,a)&&F(e,a,t[a]);if(R)for(var a of R(t))D.call(t,a)&&F(e,a,t[a]);return e})({className:(0,r.A)("menu__link",{"menu__link--sublist":p,"menu__link--sublist-caret":!h&&p,"menu__link--active":g}),onClick:p?e=>{null==o||o(a),h?O(!1):(e.preventDefault(),O())}:()=>{null==o||o(a)},"aria-current":_?"page":void 0,role:p&&!h?"button":void 0,"aria-expanded":p&&!h?!C:void 0,href:p?null!=y?y:"#":y},m),b),h&&p&&n.createElement(V,{collapsed:C,categoryLabel:b,onClick:e=>{e.preventDefault(),O()}})),n.createElement(B.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:C},n.createElement(fe,{items:u,tabIndex:C?-1:0,onItemClick:o,activePath:c,level:s+1})))}var z=a(8981),Y=a(1941);const K="menuExternalLink_OxJ2";var X=Object.defineProperty,q=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,$=(e,t,a)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,Q=(e,t)=>{for(var a in t||(t={}))Z.call(t,a)&&$(e,a,t[a]);if(q)for(var a of q(t))J.call(t,a)&&$(e,a,t[a]);return e};function ee(e){var t=e,{item:a,onItemClick:o,activePath:c,level:s,index:d}=t,m=((e,t)=>{var a={};for(var n in e)Z.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&q)for(var n of q(e))t.indexOf(n)<0&&J.call(e,n)&&(a[n]=e[n]);return a})(t,["item","onItemClick","activePath","level","index"]);const{href:u,label:b,className:p,autoAddBaseUrl:f}=a,h=(0,i.w8)(a,c),v=(0,z.A)(u);return n.createElement("li",{className:(0,r.A)(l.G.docs.docSidebarItemLink,l.G.docs.docSidebarItemLinkLevel(s),"menu__list-item",p),key:b},n.createElement(H.A,Q(Q({className:(0,r.A)("menu__link",!v&&K,{"menu__link--active":h}),autoAddBaseUrl:f,"aria-current":h?"page":void 0,to:u},v&&{onClick:o?()=>o(a):void 0}),m),b,!v&&n.createElement(Y.A,null)))}const te="menuHtmlItem_WpY3";function ae({item:e,level:t,index:a}){const{value:o,defaultStyle:i,className:c}=e;return n.createElement("li",{className:(0,r.A)(l.G.docs.docSidebarItemLink,l.G.docs.docSidebarItemLinkLevel(t),i&&[te,"menu__list-item"],c),key:a,dangerouslySetInnerHTML:{__html:o}})}var ne=Object.defineProperty,re=Object.getOwnPropertySymbols,oe=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable,ie=(e,t,a)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,ce=(e,t)=>{for(var a in t||(t={}))oe.call(t,a)&&ie(e,a,t[a]);if(re)for(var a of re(t))le.call(t,a)&&ie(e,a,t[a]);return e};function se(e){var t=e,{item:a}=t,r=((e,t)=>{var a={};for(var n in e)oe.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&re)for(var n of re(e))t.indexOf(n)<0&&le.call(e,n)&&(a[n]=e[n]);return a})(t,["item"]);switch(a.type){case"category":return n.createElement(U,ce({item:a},r));case"html":return n.createElement(ae,ce({item:a},r));default:return n.createElement(ee,ce({item:a},r))}}var de=Object.defineProperty,me=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,pe=(e,t,a)=>t in e?de(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;const fe=(0,n.memo)((function(e){var t=e,{items:a}=t,r=((e,t)=>{var a={};for(var n in e)ue.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&me)for(var n of me(e))t.indexOf(n)<0&&be.call(e,n)&&(a[n]=e[n]);return a})(t,["items"]);const o=(0,i.Y)(a,r.activePath);return n.createElement(j,null,o.map(((e,t)=>n.createElement(se,((e,t)=>{for(var a in t||(t={}))ue.call(t,a)&&pe(e,a,t[a]);if(me)for(var a of me(t))be.call(t,a)&&pe(e,a,t[a]);return e})({key:t,item:e,index:t},r)))))})),he="menu_ba6f",ve="menuWithAnnouncementBar_Oaoj";function Ee({path:e,sidebar:t,className:a}){const o=function(){const{isActive:e}=(0,x.M)(),[t,a]=(0,n.useState)(e);return(0,d.Mq)((({scrollY:t})=>{e&&a(0===t)}),[e]),e&&t}();return n.createElement("nav",{"aria-label":(0,s.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,r.A)("menu thin-scrollbar",he,o&&ve,a)},n.createElement("ul",{className:(0,r.A)(l.G.docs.docSidebarMenu,"menu__list")},n.createElement(fe,{items:t,activePath:e,level:1})))}const ye="sidebar_Vidb",ge="sidebarWithHideableNavbar_COMO",_e="sidebarHidden_tGTy",Ce="sidebarLogo_bFip";const ke=n.memo((function({path:e,sidebar:t,onCollapse:a,isHidden:o}){const{navbar:{hideOnScroll:l},docs:{sidebar:{hideable:i}}}=(0,v.p)();return n.createElement("div",{className:(0,r.A)(ye,l&&ge,o&&_e)},l&&n.createElement(E.A,{tabIndex:-1,className:Ce}),n.createElement(Ee,{path:e,sidebar:t}),i&&n.createElement(w,{onClick:a}))}));var Ae=a(154),Se=a(308);const Oe=({sidebar:e,path:t})=>{const a=(0,Se.M)();return n.createElement("ul",{className:(0,r.A)(l.G.docs.docSidebarMenu,"menu__list")},n.createElement(fe,{items:e,activePath:t,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1}))};const Te=n.memo((function(e){return n.createElement(Ae.GX,{component:Oe,props:e})}));var we=Object.defineProperty,xe=Object.getOwnPropertySymbols,Ie=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,Pe=(e,t,a)=>t in e?we(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,je=(e,t)=>{for(var a in t||(t={}))Ie.call(t,a)&&Pe(e,a,t[a]);if(xe)for(var a of xe(t))Ne.call(t,a)&&Pe(e,a,t[a]);return e};function Be(e){const t=(0,h.l)(),a="desktop"===t||"ssr"===t,r="mobile"===t;return n.createElement(n.Fragment,null,a&&n.createElement(ke,je({},e)),r&&n.createElement(Te,je({},e)))}const Le={expandButton:"expandButton_lx6C",expandButtonIcon:"expandButtonIcon_KnuP"};function He({toggleSidebar:e}){return n.createElement("div",{className:Le.expandButton,title:(0,s.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,s.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:e,onClick:e},n.createElement(S,{className:Le.expandButtonIcon}))}const Me={docSidebarContainer:"docSidebarContainer_H1vR",docSidebarContainerHidden:"docSidebarContainerHidden_lUyc",sidebarViewport:"sidebarViewport_KlX3"};function Ge({children:e}){var t;const a=(0,c.t)();return n.createElement(n.Fragment,{key:null!=(t=null==a?void 0:a.name)?t:"noSidebar"},e)}function Re({sidebar:e,hiddenSidebarContainer:t,setHiddenSidebarContainer:a}){const{pathname:o}=(0,f.zy)(),[i,c]=(0,n.useState)(!1),s=(0,n.useCallback)((()=>{i&&c(!1),!i&&(0,p.O)()&&c(!0),a((e=>!e))}),[a,i]);return n.createElement("aside",{className:(0,r.A)(l.G.docs.docSidebarContainer,Me.docSidebarContainer,t&&Me.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(Me.docSidebarContainer)&&t&&c(!0)}},n.createElement(Ge,null,n.createElement("div",{className:(0,r.A)(Me.sidebarViewport,i&&Me.sidebarViewportHidden)},n.createElement(Be,{sidebar:e,path:o,onCollapse:s,isHidden:i}),i&&n.createElement(He,{toggleSidebar:s}))))}const We={docMainContainer:"docMainContainer_mCHA",docMainContainerEnhanced:"docMainContainerEnhanced_NCOT",docItemWrapperEnhanced:"docItemWrapperEnhanced_c0iF"};function De({hiddenSidebarContainer:e,children:t}){const a=(0,c.t)();return n.createElement("main",{className:(0,r.A)(We.docMainContainer,(e||!a)&&We.docMainContainerEnhanced)},n.createElement("div",{className:(0,r.A)("container padding-top--md padding-bottom--lg",We.docItemWrapper,e&&We.docItemWrapperEnhanced)},t))}const Fe={docRoot:"docRoot_POwh",docsWrapper:"docsWrapper_U_Zy"};function Ve({children:e}){const t=(0,c.t)(),[a,r]=(0,n.useState)(!1);return n.createElement("div",{className:Fe.docsWrapper},n.createElement(b,null),n.createElement("div",{className:Fe.docRoot},t&&n.createElement(Re,{sidebar:t.items,hiddenSidebarContainer:a,setHiddenSidebarContainer:r}),n.createElement(De,{hiddenSidebarContainer:a},e)))}var Ue=a(9967);function ze(e){const t=(0,i.B5)(e);if(!t)return n.createElement(Ue.A,null);const{docElement:a,sidebarName:s,sidebarItems:d}=t;return n.createElement(o.e3,{className:(0,r.A)(l.G.page.docsDocPage)},n.createElement(c.V,{name:s,items:d},n.createElement(Ve,null,a)))}},9967:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(7402),r=a(9679),o=a(290),l=a(9310);function i({className:e}){return n.createElement("main",{className:(0,r.A)("container margin-vert--xl",e)},n.createElement("div",{className:"row"},n.createElement("div",{className:"col col--6 col--offset-3"},n.createElement(l.A,{as:"h1",className:"hero__title"},n.createElement(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),n.createElement("p",null,n.createElement(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),n.createElement("p",null,n.createElement(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))))}}}]);