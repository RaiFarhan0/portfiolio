const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/initialFX-CKyeqSHj.js","assets/Navbar-BU_9Y0kt.js","assets/three-CZbp0FfZ.js","assets/gsap-CPOtuTUs.js","assets/ScrollTrigger-D1XJUMov.js","assets/Navbar-wB6fHtnG.css","assets/index-DJuG1PMM.js","assets/MainContainer-DDDgdbyW.js","assets/MainContainer-sfuPG631.css"])))=>i.map(i=>d[i]);
import{_ as I,j as n,c as J}from"./three-CZbp0FfZ.js";import{r as c}from"./gsap-CPOtuTUs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();var B={};function U(e){if(typeof window>"u")return;const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}Object.defineProperty(B,"__esModule",{value:!0});var o=c;function ee(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var v=ee(o);U(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const te=o.forwardRef(function({style:t={},className:s="",autoFill:a=!1,play:r=!0,pauseOnHover:i=!1,pauseOnClick:f=!1,direction:l="left",speed:w=50,delay:u=0,loop:m=0,gradient:j=!1,gradientColor:_="white",gradientWidth:x=200,onFinish:V,onCycleComplete:G,onMount:q,children:E},X){const[N,F]=o.useState(0),[S,Y]=o.useState(0),[M,C]=o.useState(1),[A,K]=o.useState(!1),Q=o.useRef(null),h=X||Q,b=o.useRef(null),p=o.useCallback(()=>{if(b.current&&h.current){const d=h.current.getBoundingClientRect(),L=b.current.getBoundingClientRect();let g=d.width,y=L.width;(l==="up"||l==="down")&&(g=d.height,y=L.height),C(a&&g&&y&&y<g?Math.ceil(g/y):1),F(g),Y(y)}},[a,h,l]);o.useEffect(()=>{if(A&&(p(),b.current&&h.current)){const d=new ResizeObserver(()=>p());return d.observe(h.current),d.observe(b.current),()=>{d&&d.disconnect()}}},[p,h,A]),o.useEffect(()=>{p()},[p,E]),o.useEffect(()=>{K(!0)},[]),o.useEffect(()=>{typeof q=="function"&&q()},[]);const $=o.useMemo(()=>a?S*M/w:S<N?N/w:S/w,[a,N,S,M,w]),Z=o.useMemo(()=>Object.assign(Object.assign({},t),{"--pause-on-hover":!r||i?"paused":"running","--pause-on-click":!r||i&&!f||f?"paused":"running","--width":l==="up"||l==="down"?"100vh":"100%","--transform":l==="up"?"rotate(-90deg)":l==="down"?"rotate(90deg)":"none"}),[t,r,i,f,l]),H=o.useMemo(()=>({"--gradient-color":_,"--gradient-width":typeof x=="number"?`${x}px`:x}),[_,x]),k=o.useMemo(()=>({"--play":r?"running":"paused","--direction":l==="left"?"normal":"reverse","--duration":`${$}s`,"--delay":`${u}s`,"--iteration-count":m?`${m}`:"infinite","--min-width":a?"auto":"100%"}),[r,l,$,u,m,a]),P=o.useMemo(()=>({"--transform":l==="up"?"rotate(90deg)":l==="down"?"rotate(-90deg)":"none"}),[l]),T=o.useCallback(d=>[...Array(Number.isFinite(d)&&d>=0?d:0)].map((L,g)=>v.default.createElement(o.Fragment,{key:g},o.Children.map(E,y=>v.default.createElement("div",{style:P,className:"rfm-child"},y)))),[P,E]);return A?v.default.createElement("div",{ref:h,style:Z,className:"rfm-marquee-container "+s},j&&v.default.createElement("div",{style:H,className:"rfm-overlay"}),v.default.createElement("div",{className:"rfm-marquee",style:k,onAnimationIteration:G,onAnimationEnd:V},v.default.createElement("div",{className:"rfm-initial-child-container",ref:b},o.Children.map(E,d=>v.default.createElement("div",{style:P,className:"rfm-child"},d))),T(M-1)),v.default.createElement("div",{className:"rfm-marquee",style:k},T(M))):null});var ne=B.default=te;const re=({percent:e})=>{const{setIsLoading:t}=ie(),[s,a]=c.useState(!1),[r,i]=c.useState(!1),[f,l]=c.useState(!1);e>=100&&setTimeout(()=>{a(!0),setTimeout(()=>{i(!0)},1e3)},600),c.useEffect(()=>{I(()=>import("./initialFX-CKyeqSHj.js"),__vite__mapDeps([0,1,2,3,4,5])).then(u=>{r&&(l(!0),setTimeout(()=>{u.initialFX&&u.initialFX(),t(!1)},900))})},[r]);function w(u){const{currentTarget:m}=u,j=m.getBoundingClientRect(),_=u.clientX-j.left,x=u.clientY-j.top;m.style.setProperty("--mouse-x",`${_}px`),m.style.setProperty("--mouse-y",`${x}px`)}return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"loading-header",children:[n.jsx("a",{href:"/#",className:"loader-title","data-cursor":"disable",children:"Rai Farhan"}),n.jsx("div",{className:`loaderGame ${f&&"loader-out"}`,children:n.jsxs("div",{className:"loaderGame-container",children:[n.jsx("div",{className:"loaderGame-in",children:[...Array(27)].map((u,m)=>n.jsx("div",{className:"loaderGame-line"},m))}),n.jsx("div",{className:"loaderGame-ball"})]})})]}),n.jsxs("div",{className:"loading-screen",children:[n.jsx("div",{className:"loading-marquee",children:n.jsxs(ne,{children:[n.jsx("span",{children:" An AI Developer"})," ",n.jsx("span",{children:"A Machine Learning Engineer"}),n.jsx("span",{children:" An AI Developer"})," ",n.jsx("span",{children:"A Machine Learning Engineer"})]})}),n.jsxs("div",{className:`loading-wrap ${f&&"loading-clicked"}`,onMouseMove:u=>w(u),children:[n.jsx("div",{className:"loading-hover"}),n.jsxs("div",{className:`loading-button ${s&&"loading-complete"}`,children:[n.jsxs("div",{className:"loading-container",children:[n.jsx("div",{className:"loading-content",children:n.jsxs("div",{className:"loading-content-in",children:["Loading ",n.jsxs("span",{children:[e,"%"]})]})}),n.jsx("div",{className:"loading-box"})]}),n.jsx("div",{className:"loading-content2",children:n.jsx("span",{children:"Welcome"})})]})]})]})]})},pe=e=>{let t=0,s=setInterval(()=>{if(t<=50){let i=Math.round(Math.random()*5);t=t+i,e(t)}else clearInterval(s),s=setInterval(()=>{t=t+Math.round(Math.random()),e(t),t>91&&clearInterval(s)},2e3)},100);function a(){clearInterval(s),e(100)}function r(){return new Promise(i=>{clearInterval(s),s=setInterval(()=>{t<100?(t++,e(t)):(i(t),clearInterval(s))},2)})}return{loaded:r,percent:t,clear:a}},D=c.createContext(null),ae=({children:e})=>{const[t,s]=c.useState(!0),[a,r]=c.useState(0),i={isLoading:t,setIsLoading:s,setLoading:r};return c.useEffect(()=>{},[a]),n.jsxs(D.Provider,{value:i,children:[t&&n.jsx(re,{percent:a}),n.jsx("main",{className:"main-body",children:e})]})},ie=()=>{const e=c.useContext(D);if(!e)throw new Error("useLoading must be used within a LoadingProvider");return e},se=c.lazy(()=>I(()=>import("./index-DJuG1PMM.js"),__vite__mapDeps([6,2,3,4]))),oe=c.lazy(()=>I(()=>import("./MainContainer-DDDgdbyW.js").then(e=>e.b),__vite__mapDeps([7,2,3,1,4,5,8]))),ce=()=>n.jsx(n.Fragment,{children:n.jsx(ae,{children:n.jsx(c.Suspense,{children:n.jsx(oe,{children:n.jsx(c.Suspense,{children:n.jsx(se,{})})})})})});var O={},le="@vercel/analytics",de="1.6.1",ue=()=>{window.va||(window.va=function(...t){(window.vaq=window.vaq||[]).push(t)})};function W(){return typeof window<"u"}function z(){try{const e="production"}catch{}return"production"}function fe(e="auto"){if(e==="auto"){window.vam=z();return}window.vam=e}function me(){return(W()?window.vam:z())||"production"}function R(){return me()==="development"}function ve(e){return e.scriptSrc?e.scriptSrc:R()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?`${e.basePath}/insights/script.js`:"/_vercel/insights/script.js"}function he(e={debug:!0}){var t;if(!W())return;fe(e.mode),ue(),e.beforeSend&&((t=window.va)==null||t.call(window,"beforeSend",e.beforeSend));const s=ve(e);if(document.head.querySelector(`script[src*="${s}"]`))return;const a=document.createElement("script");a.src=s,a.defer=!0,a.dataset.sdkn=le+(e.framework?`/${e.framework}`:""),a.dataset.sdkv=de,e.disableAutoTrack&&(a.dataset.disableAutoTrack="1"),e.endpoint?a.dataset.endpoint=e.endpoint:e.basePath&&(a.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(a.dataset.dsn=e.dsn),a.onerror=()=>{const r=R()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${s}. ${r}`)},R()&&e.debug===!1&&(a.dataset.debug="false"),document.head.appendChild(a)}function ge({route:e,path:t}){var s;(s=window.va)==null||s.call(window,"pageview",{route:e,path:t})}function ye(){if(!(typeof process>"u"||typeof O>"u"))return O.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}function we(e){return c.useEffect(()=>{var t;e.beforeSend&&((t=window.va)==null||t.call(window,"beforeSend",e.beforeSend))},[e.beforeSend]),c.useEffect(()=>{he({framework:e.framework||"react",basePath:e.basePath??ye(),...e.route!==void 0&&{disableAutoTrack:!0},...e})},[]),c.useEffect(()=>{e.route&&e.path&&ge({route:e.route,path:e.path})},[e.route,e.path]),null}J(document.getElementById("root")).render(n.jsxs(c.StrictMode,{children:[n.jsx(ce,{}),n.jsx(we,{})]}));export{pe as s,ie as u};
