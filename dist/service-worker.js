if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,t)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}}))).then((e=>{const r=t(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-2fdebd44"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./index.html",revision:"9ea06975ea1f8d75dacc382cd590eb20"},{url:"main.css",revision:"c65e5a6a71f41a84dcb86c230818dbaa"},{url:"main.js",revision:"4e44d84a2e6da6ef474f248a65922b8f"},{url:"main.js.LICENSE.txt",revision:"c31439f42f606b85501d61ddd0660aeb"}],{})}));
