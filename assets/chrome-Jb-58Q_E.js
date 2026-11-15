import{m as v,a as m,N as d,i as M}from"./marsclock-1VQlD_cr.js";import{current as u,sceneName as y,goto as b,prev as g,next as x}from"./main-Bm8u8zRP.js";const t=l=>`<svg viewBox="0 0 24 24">${l}</svg>`,$={Plan:t('<path d="M4 18 9 6l5 9 2-4 4 7"/><circle cx="9" cy="6" r="1.6"/>'),Autopilot:t('<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'),Storm:t('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),Walk:t('<circle cx="13" cy="4.5" r="2"/><path d="m9 21 2.5-6.5L14 17v4M8 11l3-3.5 3 1.5 2 3M11.5 14.5 11 8"/>'),Atlas:t('<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c-3 3.2-3 14.8 0 18M12 3c3 3.2 3 14.8 0 18"/>'),Weather:t('<path d="M7 17h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 10.1 3.5 3.5 0 0 0 7 17z"/>'),Evidence:t('<path d="M4 20V4M4 20h16"/><circle cx="9" cy="14" r="1.3"/><circle cx="12" cy="11" r="1.3"/><circle cx="16" cy="8" r="1.3"/>'),Rescue:t('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="m6 6 3.5 3.5M14.5 14.5 18 18M18 6l-3.5 3.5M9.5 14.5 6 18"/>'),Base:t('<path d="M3 19h18M5 19a7 7 0 0 1 14 0M10 19v-4h4v4"/><path d="M12 5V3"/>')};function N(l,s,p={}){var n;const a=document.getElementById("app"),c=v(),i=m(),r=(n=d.find(e=>e.id===i))==null?void 0:n.alt;return a.innerHTML=`
    <header class="top">
      <div class="brand" id="home" style="cursor:pointer" title="Back to the Mars globe"><b>Rocky</b><span>Curiosity's boxwork, Mount Sharp, Gale crater</span></div>
      <div class="grow"></div>
      <div class="read"><span>Curiosity sol</span><b>${c.sol.toLocaleString("en-US")}</b></div>
      <div class="read"><span>Gale local time</span><b>${c.lmst}</b></div>
      <div class="read"><span>Earth UTC</span><b>${c.utc}</b></div>
      <div class="pager"><button id="pgPrev" aria-label="Previous scene">‹</button><span>${u()} / 7 · ${y()}</span><button id="pgNext" aria-label="Next scene">›</button></div>
      <div class="pill ${s.tone??""}" id="pill"><i></i><span>${s.text}</span></div>
      ${r?`<div class="switch">${r.map(e=>`<a class="${M(e.hash)?"on":""}" href="${e.hash}">${e.label}</a>`).join("")}</div>`:""}
      <button class="tbtn" id="tbAr" title="The plan as a model on your table">View in AR</button>
    </header>
    <nav class="rail">
      ${d.map(e=>`${e.gapBefore?'<div class="gap"></div>':""}<a class="${e.id===i?"on":""}" href="${e.hash}" title="${e.title}">${$[e.label]}${e.label}</a>`).join("")}
      <div style="height:14px"></div>
    </nav>
    <main class="stage" id="stage"></main>`,p.rail===!1&&(a.querySelector(".rail").remove(),a.querySelector(".stage").style.left="0"),document.getElementById("home").onclick=()=>{location.hash="1"},document.getElementById("tbAr").onclick=()=>b(7),document.getElementById("pgPrev").onclick=g,document.getElementById("pgNext").onclick=x,{stage:document.getElementById("stage"),setPill(e,h=""){const o=document.getElementById("pill");o.className=`pill ${h}`,o.querySelector("span").textContent=e}}}export{N as c};
