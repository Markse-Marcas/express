(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const tt="modulepreload",nt=function(e){return"/"+e},Le={},L=function(t,n,r){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=nt(o),o in Le)return;Le[o]=!0;const l=o.endsWith(".css"),i=l?'[rel="stylesheet"]':"";if(!!r)for(let a=s.length-1;a>=0;a--){const f=s[a];if(f.href===o&&(!l||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${i}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":tt,l||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),l)return new Promise((a,f)=>{u.addEventListener("load",a),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())},_={context:void 0,registry:void 0};function J(e){_.context=e}const rt=(e,t)=>e===t,re=Symbol("solid-proxy"),se={equals:rt};let Ie=Me;const k=1,oe=2,ke={owned:null,cleanups:null,context:null,owner:null},pe={};var A=null;let ye=null,y=null,v=null,N=null,ce=0;function je(e,t){const n=y,r=A,s=e.length===0,o=s?ke:{owned:null,cleanups:null,context:null,owner:t===void 0?r:t},l=s?e:()=>e(()=>S(()=>ae(o)));A=o,y=null;try{return I(l,!0)}finally{y=n,A=r}}function R(e,t){t=t?Object.assign({},se,t):se;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),qe(n,s));return[Ue.bind(n),r]}function Oe(e,t,n){const r=ue(e,t,!0,k);X(r)}function U(e,t,n){const r=ue(e,t,!1,k);X(r)}function On(e,t,n){Ie=ft;const r=ue(e,t,!1,k);(!n||!n.render)&&(r.user=!0),N?N.push(r):X(r)}function E(e,t,n){n=n?Object.assign({},se,n):se;const r=ue(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,X(r),Ue.bind(r)}function st(e,t,n){let r,s,o;arguments.length===2&&typeof t=="object"||arguments.length===1?(r=!0,s=e,o=t||{}):(r=e,s=t,o=n||{});let l=null,i=pe,c=null,u=!1,a="initialValue"in o,f=typeof r=="function"&&E(r);const h=new Set,[b,P]=(o.storage||R)(o.initialValue),[w,T]=R(void 0),[j,F]=R(void 0,{equals:!1}),[q,D]=R(a?"ready":"unresolved");if(_.context){c=`${_.context.id}${_.context.count++}`;let d;o.ssrLoadFrom==="initial"?i=o.initialValue:_.load&&(d=_.load(c))&&(i=d[0])}function C(d,g,m,$){return l===d&&(l=null,a=!0,(d===i||g===i)&&o.onHydrated&&queueMicrotask(()=>o.onHydrated($,{value:g})),i=pe,Z(g,m)),g}function Z(d,g){I(()=>{g===void 0&&P(()=>d),D(g!==void 0?"errored":"ready"),T(g);for(const m of h.keys())m.decrement();h.clear()},!1)}function H(){const d=ct,g=b(),m=w();if(m!==void 0&&!l)throw m;return y&&!y.user&&d&&Oe(()=>{j(),l&&(d.resolved||h.has(d)||(d.increment(),h.add(d)))}),g}function z(d=!0){if(d!==!1&&u)return;u=!1;const g=f?f():r;if(g==null||g===!1){C(l,S(b));return}const m=i!==pe?i:S(()=>s(g,{value:b(),refetching:d}));return typeof m!="object"||!(m&&"then"in m)?(C(l,m,void 0,g),m):(l=m,u=!0,queueMicrotask(()=>u=!1),I(()=>{D(a?"refreshing":"pending"),F()},!1),m.then($=>C(m,$,void 0,g),$=>C(m,void 0,dt($),g)))}return Object.defineProperties(H,{state:{get:()=>q()},error:{get:()=>w()},loading:{get(){const d=q();return d==="pending"||d==="refreshing"}},latest:{get(){if(!a)return H();const d=w();if(d&&!l)throw d;return b()}}}),f?Oe(()=>z(!1)):z(!1),[H,{refetch:z,mutate:P}]}function S(e){if(y===null)return e();const t=y;y=null;try{return e()}finally{y=t}}function De(e,t,n){const r=Array.isArray(e);let s,o=n&&n.defer;return l=>{let i;if(r){i=Array(e.length);for(let u=0;u<e.length;u++)i[u]=e[u]()}else i=e();if(o){o=!1;return}const c=S(()=>t(i,s,l));return s=i,c}}function Be(e){return A===null||(A.cleanups===null?A.cleanups=[e]:A.cleanups.push(e)),e}function ot(){return A}function it(e,t){const n=A,r=y;A=e,y=null;try{return I(t,!0)}catch(s){Ce(s)}finally{A=n,y=r}}function lt(e){const t=y,n=A;return Promise.resolve().then(()=>{y=t,A=n;let r;return I(e,!1),y=A=null,r?r.done:void 0})}function Ve(e,t){const n=Symbol("context");return{id:n,Provider:ht(n),defaultValue:e}}function ve(e){let t;return(t=He(A,e.id))!==void 0?t:e.defaultValue}function Se(e){const t=E(e),n=E(()=>Ae(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let ct;function Ue(){if(this.sources&&this.state)if(this.state===k)X(this);else{const e=v;v=null,I(()=>le(this),!1),v=e}if(y){const e=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(e)):(y.sources=[this],y.sourceSlots=[e]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return this.value}function qe(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&I(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],l=ye&&ye.running;l&&ye.disposed.has(o),(l?!o.tState:!o.state)&&(o.pure?v.push(o):N.push(o),o.observers&&Fe(o)),l||(o.state=k)}if(v.length>1e6)throw v=[],new Error},!1)),t}function X(e){if(!e.fn)return;ae(e);const t=A,n=y,r=ce;y=A=e,ut(e,e.value,r),y=n,A=t}function ut(e,t,n){let r;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=k,e.owned&&e.owned.forEach(ae),e.owned=null),e.updatedAt=n+1,Ce(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?qe(e,r):e.value=r,e.updatedAt=n)}function ue(e,t,n,r=k,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:A,context:null,pure:n};return A===null||A!==ke&&(A.owned?A.owned.push(o):A.owned=[o]),o}function ie(e){if(e.state===0)return;if(e.state===oe)return le(e);if(e.suspense&&S(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ce);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===k)X(e);else if(e.state===oe){const r=v;v=null,I(()=>le(e,t[0]),!1),v=r}}function I(e,t){if(v)return e();let n=!1;t||(v=[]),N?n=!0:N=[],ce++;try{const r=e();return at(n),r}catch(r){n||(N=null),v=null,Ce(r)}}function at(e){if(v&&(Me(v),v=null),e)return;const t=N;N=null,t.length&&I(()=>Ie(t),!1)}function Me(e){for(let t=0;t<e.length;t++)ie(e[t])}function ft(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:ie(r)}for(_.context&&J(),t=0;t<n;t++)ie(e[t])}function le(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===k?r!==t&&(!r.updatedAt||r.updatedAt<ce)&&ie(r):s===oe&&le(r,t)}}}function Fe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=oe,n.pure?v.push(n):N.push(n),n.observers&&Fe(n))}}function ae(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),l=n.observerSlots.pop();r<s.length&&(o.sourceSlots[l]=r,s[r]=o,n.observerSlots[r]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ae(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function dt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ce(e){throw e}function He(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:He(e.owner,t):void 0}function Ae(e){if(typeof e=="function"&&!e.length)return Ae(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=Ae(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function ht(e,t){return function(r){let s;return U(()=>s=S(()=>(A.context={[e]:r.value},Se(()=>r.children))),void 0),s}}function p(e,t){return S(()=>e(t||{}))}function te(){return!0}const Pe={get(e,t,n){return t===re?n:e.get(t)},has(e,t){return t===re?!0:e.has(t)},set:te,deleteProperty:te,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:te,deleteProperty:te}},ownKeys(e){return e.keys()}};function we(e){return(e=typeof e=="function"?e():e)?e:{}}function Ee(...e){let t=!1;for(let r=0;r<e.length;r++){const s=e[r];t=t||!!s&&re in s,e[r]=typeof s=="function"?(t=!0,E(s)):s}if(t)return new Proxy({get(r){for(let s=e.length-1;s>=0;s--){const o=we(e[s])[r];if(o!==void 0)return o}},has(r){for(let s=e.length-1;s>=0;s--)if(r in we(e[s]))return!0;return!1},keys(){const r=[];for(let s=0;s<e.length;s++)r.push(...Object.keys(we(e[s])));return[...new Set(r)]}},Pe);const n={};for(let r=e.length-1;r>=0;r--)if(e[r]){const s=Object.getOwnPropertyDescriptors(e[r]);for(const o in s)o in n||Object.defineProperty(n,o,{enumerable:!0,get(){for(let l=e.length-1;l>=0;l--){const i=(e[l]||{})[o];if(i!==void 0)return i}}})}return n}function gt(e,...t){const n=new Set(t.flat());if(re in e){const s=t.map(o=>new Proxy({get(l){return o.includes(l)?e[l]:void 0},has(l){return o.includes(l)&&l in e},keys(){return o.filter(l=>l in e)}},Pe));return s.push(new Proxy({get(o){return n.has(o)?void 0:e[o]},has(o){return n.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!n.has(o))}},Pe)),s}const r=Object.getOwnPropertyDescriptors(e);return t.push(Object.keys(r).filter(s=>!n.has(s))),t.map(s=>{const o={};for(let l=0;l<s.length;l++){const i=s[l];i in e&&Object.defineProperty(o,i,r[i]?r[i]:{get(){return e[i]},set(){return!0},enumerable:!0})}return o})}function O(e){let t,n;const r=s=>{const o=_.context;if(o){const[i,c]=R();(n||(n=e())).then(u=>{J(o),c(()=>u.default),J()}),t=i}else if(!t){const[i]=st(()=>(n||(n=e())).then(c=>c.default));t=i}let l;return E(()=>(l=t())&&S(()=>{if(!o)return l(s);const i=_.context;J(o);const c=l(s);return J(i),c}))};return r.preload=()=>n||((n=e()).then(s=>t=()=>s.default),n),r}const mt=e=>`Stale read from <${e}>.`;function Ke(e){const t=e.keyed,n=E(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return E(()=>{const r=n();if(r){const s=e.children;return typeof s=="function"&&s.length>0?S(()=>s(t?r:()=>{if(!S(n))throw mt("Show");return e.when})):s}return e.fallback},void 0,void 0)}const pt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],yt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...pt]),wt=new Set(["innerHTML","textContent","innerText","children"]),bt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),At=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Pt(e,t){const n=At[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Et=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),xt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function _t(e,t,n){let r=n.length,s=t.length,o=r,l=0,i=0,c=t[s-1].nextSibling,u=null;for(;l<s||i<o;){if(t[l]===n[i]){l++,i++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===l){const a=o<r?i?n[i-1].nextSibling:n[o-i]:c;for(;i<o;)e.insertBefore(n[i++],a)}else if(o===i)for(;l<s;)(!u||!u.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[o-1]&&n[i]===t[s-1]){const a=t[--s].nextSibling;e.insertBefore(n[i++],t[l++].nextSibling),e.insertBefore(n[--o],a),t[s]=n[o]}else{if(!u){u=new Map;let f=i;for(;f<o;)u.set(n[f],f++)}const a=u.get(t[l]);if(a!=null)if(i<a&&a<o){let f=l,h=1,b;for(;++f<s&&f<o&&!((b=u.get(t[f]))==null||b!==a+h);)h++;if(h>a-i){const P=t[l];for(;i<a;)e.insertBefore(n[i++],P)}else e.replaceChild(n[i++],t[l++])}else l++;else t[l++].remove()}}}const $e="_$DX_DELEGATE";function vt(e,t,n,r={}){let s;return je(o=>{s=o,t===document?e():de(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function fe(e,t,n){let r;const s=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},o=t?()=>(r||(r=s())).cloneNode(!0):()=>S(()=>document.importNode(r||(r=s()),!0));return o.cloneNode=o,o}function We(e,t=window.document){const n=t[$e]||(t[$e]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,It))}}function xe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function St(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function Ct(e,t){t==null?e.removeAttribute("class"):e.className=t}function Lt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=o=>s.call(e,n[1],o))}else e.addEventListener(t,n)}function Ot(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let o,l;for(o=0,l=s.length;o<l;o++){const i=s[o];!i||i==="undefined"||t[i]||(Re(e,i,!1),delete n[i])}for(o=0,l=r.length;o<l;o++){const i=r[o],c=!!t[i];!i||i==="undefined"||n[i]===c||!c||(Re(e,i,!0),n[i]=c)}return n}function $t(e,t,n){if(!t)return n?xe(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,o;for(o in n)t[o]==null&&r.removeProperty(o),delete n[o];for(o in t)s=t[o],s!==n[o]&&(r.setProperty(o,s),n[o]=s);return n}function Rt(e,t={},n,r){const s={};return r||U(()=>s.children=W(e,t.children,s.children)),U(()=>t.ref&&t.ref(e)),U(()=>Tt(e,t,n,!0,s,!0)),s}function de(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return W(e,t,r,n);U(s=>W(e,t(),s,n),r)}function Tt(e,t,n,r,s={},o=!1){t||(t={});for(const l in s)if(!(l in t)){if(l==="children")continue;s[l]=Te(e,l,null,s[l],n,o)}for(const l in t){if(l==="children"){r||W(e,t.children);continue}const i=t[l];s[l]=Te(e,l,i,s[l],n,o)}}function Nt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Re(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,o=r.length;s<o;s++)e.classList.toggle(r[s],n)}function Te(e,t,n,r,s,o){let l,i,c,u,a;if(t==="style")return $t(e,n,r);if(t==="classList")return Ot(e,n,r);if(n===r)return r;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const f=t.slice(3);r&&e.removeEventListener(f,r),n&&e.addEventListener(f,n)}else if(t.slice(0,10)==="oncapture:"){const f=t.slice(10);r&&e.removeEventListener(f,r,!0),n&&e.addEventListener(f,n,!0)}else if(t.slice(0,2)==="on"){const f=t.slice(2).toLowerCase(),h=Et.has(f);if(!h&&r){const b=Array.isArray(r)?r[0]:r;e.removeEventListener(f,b)}(h||n)&&(Lt(e,f,n,h),h&&We([f]))}else if(t.slice(0,5)==="attr:")xe(e,t.slice(5),n);else if((a=t.slice(0,5)==="prop:")||(c=wt.has(t))||!s&&((u=Pt(t,e.tagName))||(i=yt.has(t)))||(l=e.nodeName.includes("-")))a&&(t=t.slice(5),i=!0),t==="class"||t==="className"?Ct(e,n):l&&!i&&!c?e[Nt(t)]=n:e[u||t]=n;else{const f=s&&t.indexOf(":")>-1&&xt[t.split(":")[0]];f?St(e,f,t,n):xe(e,bt[t]||t,n)}return n}function It(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),_.registry&&!_.done&&(_.done=_$HY.done=!0);n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function W(e,t,n,r,s){if(_.context){!n&&(n=[...e.childNodes]);let i=[];for(let c=0;c<n.length;c++){const u=n[c];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():i.push(u)}n=i}for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,l=r!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(_.context)return n;if(o==="number"&&(t=t.toString()),l){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=K(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(_.context)return n;n=K(e,n,r)}else{if(o==="function")return U(()=>{let i=t();for(;typeof i=="function";)i=i();n=W(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],c=n&&Array.isArray(n);if(_e(i,t,n,s))return U(()=>n=W(e,i,n,r,!0)),()=>n;if(_.context){if(!i.length)return n;for(let u=0;u<i.length;u++)if(i[u].parentNode)return n=i}if(i.length===0){if(n=K(e,n,r),l)return n}else c?n.length===0?Ne(e,i,r):_t(e,n,i):(n&&K(e),Ne(e,i));n=i}else if(t instanceof Node){if(_.context&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=K(e,n,r,t);K(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function _e(e,t,n,r){let s=!1;for(let o=0,l=t.length;o<l;o++){let i=t[o],c=n&&n[o];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))s=_e(e,i,c)||s;else if(typeof i=="function")if(r){for(;typeof i=="function";)i=i();s=_e(e,Array.isArray(i)?i:[i],Array.isArray(c)?c:[c])||s}else e.push(i),s=!0;else{const u=String(i);c&&c.nodeType===3?(c.data=u,e.push(c)):e.push(document.createTextNode(u))}}return s}function Ne(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function K(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let l=t.length-1;l>=0;l--){const i=t[l];if(s!==i){const c=i.parentNode===e;!o&&!l?c?e.replaceChild(s,i):e.insertBefore(s,n):c&&i.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}const kt=!1;function jt(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Dt([e,t],n,r){return[n?()=>n(e()):e,r?s=>t(r(s)):t]}function Bt(e){try{return document.querySelector(e)}catch{return null}}function Vt(e,t){const n=Bt(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}function Ut(e,t,n,r){let s=!1;const o=i=>typeof i=="string"?{value:i}:i,l=Dt(R(o(e()),{equals:(i,c)=>i.value===c.value}),void 0,i=>(!s&&t(i),i));return n&&Be(n((i=e())=>{s=!0,l[1](o(i)),s=!1})),{signal:l,utils:r}}function qt(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:R({value:""})};return e}function Mt(){return Ut(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:n,state:r})=>{t?window.history.replaceState(r,"",e):window.history.pushState(r,"",e),Vt(window.location.hash.slice(1),n)},e=>jt(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}function Ft(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,o){if(n)return!(n=!1);const l={to:s,options:o,defaultPrevented:!1,preventDefault:()=>l.defaultPrevented=!0};for(const i of e)i.listener({...l,from:i.location,retry:c=>{c&&(n=!0),i.navigate(s,o)}});return!l.defaultPrevented}return{subscribe:t,confirm:r}}const Ht=/^(?:[a-z0-9]+:)?\/\//i,Kt=/^\/+|(\/)\/+$/g;function M(e,t=!1){const n=e.replace(Kt,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function ne(e,t,n){if(Ht.test(t))return;const r=M(e),s=n&&M(n);let o="";return!s||t.startsWith("/")?o=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?o=r+s:o=s,(o||"/")+M(t,!o)}function Wt(e,t){if(e==null)throw new Error(t);return e}function Xe(e,t){return M(e).replace(/\/*(\*.*)?$/g,"")+M(t)}function Xt(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function zt(e,t,n){const[r,s]=e.split("/*",2),o=r.split("/").filter(Boolean),l=o.length;return i=>{const c=i.split("/").filter(Boolean),u=c.length-l;if(u<0||u>0&&s===void 0&&!t)return null;const a={path:l?"":"/",params:{}},f=h=>n===void 0?void 0:n[h];for(let h=0;h<l;h++){const b=o[h],P=c[h],w=b[0]===":",T=w?b.slice(1):b;if(w&&be(P,f(T)))a.params[T]=P;else if(w||!be(P,b))return null;a.path+=`/${P}`}if(s){const h=u?c.slice(-u).join("/"):"";if(be(h,f(s)))a.params[s]=h;else return null}return a}}function be(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function Yt(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,o)=>s+(o.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function ze(e){const t=new Map,n=ot();return new Proxy({},{get(r,s){return t.has(s)||it(n,()=>t.set(s,E(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function Ye(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return Ye(r).reduce((o,l)=>[...o,...s.map(i=>i+l)],[])}const Gt=100,Ge=Ve(),he=Ve(),ge=()=>Wt(ve(Ge),"Make sure your app is wrapped in a <Router />");let Q;const me=()=>Q||ve(he)||ge().base,Jt=e=>{const t=me();return E(()=>t.resolvePath(e()))},Qt=e=>{const t=ge();return E(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},Zt=()=>ge().location,$n=()=>me().params;function en(e,t="",n){const{component:r,data:s,children:o}=e,l=!o||Array.isArray(o)&&!o.length,i={key:e,element:r?()=>p(r,{}):()=>{const{element:c}=e;return c===void 0&&n?p(n,{}):c},preload:e.component?r.preload:e.preload,data:s};return Je(e.path).reduce((c,u)=>{for(const a of Ye(u)){const f=Xe(t,a),h=l?f:f.split("/*",1)[0];c.push({...i,originalPath:a,pattern:h,matcher:zt(h,!l,e.matchFilters)})}return c},[])}function tn(e,t=0){return{routes:e,score:Yt(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const o=e[s],l=o.matcher(n);if(!l)return null;r.unshift({...l,route:o})}return r}}}function Je(e){return Array.isArray(e)?e:[e]}function Qe(e,t="",n,r=[],s=[]){const o=Je(e);for(let l=0,i=o.length;l<i;l++){const c=o[l];if(c&&typeof c=="object"&&c.hasOwnProperty("path")){const u=en(c,t,n);for(const a of u){r.push(a);const f=Array.isArray(c.children)&&c.children.length===0;if(c.children&&!f)Qe(c.children,a.pattern,n,r,s);else{const h=tn([...r],s.length);s.push(h)}r.pop()}}}return r.length?s:s.sort((l,i)=>i.score-l.score)}function nn(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function rn(e,t){const n=new URL("http://sar"),r=E(c=>{const u=e();try{return new URL(u,n)}catch{return console.error(`Invalid path ${u}`),c}},n,{equals:(c,u)=>c.href===u.href}),s=E(()=>r().pathname),o=E(()=>r().search,!0),l=E(()=>r().hash),i=E(()=>"");return{get pathname(){return s()},get search(){return o()},get hash(){return l()},get state(){return t()},get key(){return i()},query:ze(De(o,()=>Xt(r())))}}function sn(e,t="",n,r){const{signal:[s,o],utils:l={}}=qt(e),i=l.parsePath||(d=>d),c=l.renderPath||(d=>d),u=l.beforeLeave||Ft(),a=ne("",t),f=void 0;if(a===void 0)throw new Error(`${a} is not a valid base path`);a&&!s().value&&o({value:a,replace:!0,scroll:!1});const[h,b]=R(!1),P=async d=>{b(!0);try{await lt(d)}finally{b(!1)}},[w,T]=R(s().value),[j,F]=R(s().state),q=rn(w,j),D=[],C={pattern:a,params:{},path:()=>a,outlet:()=>null,resolvePath(d){return ne(a,d)}};if(n)try{Q=C,C.data=n({data:void 0,params:{},location:q,navigate:H(C)})}finally{Q=void 0}function Z(d,g,m){S(()=>{if(typeof g=="number"){g&&(l.go?u.confirm(g,m)&&l.go(g):console.warn("Router integration does not support relative routing"));return}const{replace:$,resolve:ee,scroll:B,state:Y}={replace:!1,resolve:!0,scroll:!0,...m},V=ee?d.resolvePath(g):ne("",g);if(V===void 0)throw new Error(`Path '${g}' is not a routable path`);if(D.length>=Gt)throw new Error("Too many redirects");const G=w();if((V!==G||Y!==j())&&!kt){if(u.confirm(V,m)){const et=D.push({value:G,replace:$,scroll:B,state:j()});P(()=>{T(V),F(Y)}).then(()=>{D.length===et&&z({value:V,state:Y})})}}})}function H(d){return d=d||ve(he)||C,(g,m)=>Z(d,g,m)}function z(d){const g=D[0];g&&((d.value!==g.value||d.state!==g.state)&&o({...d,replace:g.replace,scroll:g.scroll}),D.length=0)}U(()=>{const{value:d,state:g}=s();S(()=>{d!==w()&&P(()=>{T(d),F(g)})})});{let d=function(g){if(g.defaultPrevented||g.button!==0||g.metaKey||g.altKey||g.ctrlKey||g.shiftKey)return;const m=g.composedPath().find(G=>G instanceof Node&&G.nodeName.toUpperCase()==="A");if(!m||!m.hasAttribute("link"))return;const $=m.href;if(m.target||!$&&!m.hasAttribute("state"))return;const ee=(m.getAttribute("rel")||"").split(/\s+/);if(m.hasAttribute("download")||ee&&ee.includes("external"))return;const B=new URL($);if(B.origin!==window.location.origin||a&&B.pathname&&!B.pathname.toLowerCase().startsWith(a.toLowerCase()))return;const Y=i(B.pathname+B.search+B.hash),V=m.getAttribute("state");g.preventDefault(),Z(C,Y,{resolve:!1,replace:m.hasAttribute("replace"),scroll:!m.hasAttribute("noscroll"),state:V&&JSON.parse(V)})};We(["click"]),document.addEventListener("click",d),Be(()=>document.removeEventListener("click",d))}return{base:C,out:f,location:q,isRouting:h,renderPath:c,parsePath:i,navigatorFactory:H,beforeLeave:u}}function on(e,t,n,r,s){const{base:o,location:l,navigatorFactory:i}=e,{pattern:c,element:u,preload:a,data:f}=r().route,h=E(()=>r().path);a&&a();const b={parent:t,pattern:c,get child(){return n()},path:h,params:s,data:t.data,outlet:u,resolvePath(P){return ne(o.path(),P,h())}};if(f)try{Q=b,b.data=f({data:t.data,params:s,location:l,navigate:i(b)})}finally{Q=void 0}return b}const ln=fe("<a link>"),cn=e=>{const{source:t,url:n,base:r,data:s,out:o}=e,l=t||Mt(),i=sn(l,r,s);return p(Ge.Provider,{value:i,get children(){return e.children}})},un=e=>{const t=ge(),n=me(),r=Se(()=>e.children),s=E(()=>Qe(r(),Xe(n.pattern,e.base||""),an)),o=E(()=>nn(s(),t.location.pathname)),l=ze(()=>{const a=o(),f={};for(let h=0;h<a.length;h++)Object.assign(f,a[h].params);return f});t.out&&t.out.matches.push(o().map(({route:a,path:f,params:h})=>({originalPath:a.originalPath,pattern:a.pattern,path:f,params:h})));const i=[];let c;const u=E(De(o,(a,f,h)=>{let b=f&&a.length===f.length;const P=[];for(let w=0,T=a.length;w<T;w++){const j=f&&f[w],F=a[w];h&&j&&F.route.key===j.route.key?P[w]=h[w]:(b=!1,i[w]&&i[w](),je(q=>{i[w]=q,P[w]=on(t,P[w-1]||n,()=>u()[w+1],()=>o()[w],l)}))}return i.splice(a.length).forEach(w=>w()),h&&b?h:(c=P[0],P)}));return p(Ke,{get when(){return u()&&c},keyed:!0,children:a=>p(he.Provider,{value:a,get children(){return a.outlet()}})})},x=e=>{const t=Se(()=>e.children);return Ee(e,{get children(){return t()}})},an=()=>{const e=me();return p(Ke,{get when(){return e.child},keyed:!0,children:t=>p(he.Provider,{value:t,get children(){return t.outlet()}})})};function Ze(e){e=Ee({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=gt(e,["href","state","class","activeClass","inactiveClass","end"]),n=Jt(()=>e.href),r=Qt(n),s=Zt(),o=E(()=>{const l=n();if(l===void 0)return!1;const i=M(l.split(/[?#]/,1)[0]).toLowerCase(),c=M(s.pathname).toLowerCase();return e.end?i===c:c.startsWith(i)});return(()=>{const l=ln();return Rt(l,Ee(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!o(),[e.activeClass]:o(),...t.classList}},get["aria-current"](){return o()?"page":void 0}}),!1,!1),l})()}const fn=fe('<ul class="menu menu-horizontal bg-base-100 rounded-box "><li>'),dn=()=>(()=>{const e=fn(),t=e.firstChild;return de(t,p(Ze,{href:"/pages/brands",children:"Marcas"})),e})(),hn=fe('<footer class="footer">'),gn=()=>(()=>{const e=hn();return de(e,()=>`${new Date().getFullYear()}`),e})(),mn=fe('<div class="hero min-h-screen"><div class="hero-overlay bg-opacity-60"></div><div class="hero-content text-center text-neutral-content"><div class="max-w-md"><h1 class="mb-5 text-5xl font-bold">Express</h1><p class="mb-5">Aqui você irá gerenciar suas marcas e processos.</p><div class=""><button class="btn btn-primary">'),pn=()=>[p(dn,{}),(()=>{const e=mn(),t=e.firstChild,n=t.nextSibling,r=n.firstChild,s=r.firstChild,o=s.nextSibling,l=o.nextSibling,i=l.firstChild;return l.style.setProperty("padding","50px 0 100px 0"),de(i,p(Ze,{href:"/profile",children:"Perfil"})),e})(),p(gn,{})],yn=O(()=>L(()=>import("./App-9a428f80.js"),["assets/App-9a428f80.js","assets/supabaseClient-fe222147.js"])),wn=O(()=>L(()=>import("./_id_-20686afe.js"),["assets/_id_-20686afe.js","assets/supabaseClient-fe222147.js","assets/App-9a428f80.js"])),bn=O(()=>L(()=>import("./index-7f6a4571.js"),["assets/index-7f6a4571.js","assets/supabaseClient-fe222147.js"])),An=O(()=>L(()=>import("./_id_-40e1a0f2.js"),["assets/_id_-40e1a0f2.js","assets/supabaseClient-fe222147.js","assets/v4-a960c1f4.js"])),Pn=O(()=>L(()=>import("./index-f7d79aff.js"),["assets/index-f7d79aff.js","assets/supabaseClient-fe222147.js"])),En=O(()=>L(()=>import("./_id_-dc23f20f.js"),[])),xn=O(()=>L(()=>import("./index-30e2d808.js"),[])),_n=O(()=>L(()=>import("./_id_-ae26835a.js"),["assets/_id_-ae26835a.js","assets/supabaseClient-fe222147.js","assets/v4-a960c1f4.js"])),vn=O(()=>L(()=>import("./index-7b7e89e1.js"),["assets/index-7b7e89e1.js","assets/supabaseClient-fe222147.js"])),Sn=O(()=>L(()=>import("./_id_-3b1c09fc.js"),["assets/_id_-3b1c09fc.js","assets/supabaseClient-fe222147.js","assets/v4-a960c1f4.js"])),Cn=O(()=>L(()=>import("./index-45d87d31.js"),["assets/index-45d87d31.js","assets/supabaseClient-fe222147.js"])),Ln=document.getElementById("root");vt(()=>p(cn,{get children(){return p(un,{get children(){return[p(x,{path:"/",component:pn}),p(x,{path:"/profile",component:yn}),p(x,{path:"/pages/brands",get children(){return[p(x,{path:"/",component:bn}),p(x,{path:"/:id?",component:wn})]}}),p(x,{path:"/pages/classes",get children(){return[p(x,{path:"/",component:Pn}),p(x,{path:"/:id?",component:An})]}}),p(x,{path:"/pages/companies",get children(){return[p(x,{path:"/",component:xn}),p(x,{path:"/:id?",component:En})]}}),p(x,{path:"/pages/phases",get children(){return[p(x,{path:"/",component:vn}),p(x,{path:"/:id?",component:_n})]}}),p(x,{path:"/pages/processes",get children(){return[p(x,{path:"/",component:Cn}),p(x,{path:"/:id?",component:Sn})]}})]}})}}),Ln);export{Ze as A,L as _,On as a,U as b,R as c,E as d,We as e,p as f,de as i,xe as s,fe as t,$n as u};
