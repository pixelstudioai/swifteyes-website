(function(){
"use strict";
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var nav = document.getElementById("nav");
if(nav){
  var onScroll = function(){ nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
}
/* smooth-scroll only for same-page anchors */
document.querySelectorAll("[data-go]").forEach(function(a){
  a.addEventListener("click", function(e){
    var el = document.getElementById(a.getAttribute("data-go"));
    if(!el) return; e.preventDefault();
    var m = document.getElementById("mnav"); if(m){ m.classList.remove("open"); }
    el.scrollIntoView({behavior: reduced ? "auto" : "smooth", block:"start"});
  });
});
var burger = document.getElementById("burger"), mnav = document.getElementById("mnav");
if(burger && mnav){
  var closeMenu = function(){ mnav.classList.remove("open"); mnav.setAttribute("aria-hidden","true"); burger.setAttribute("aria-expanded","false"); };
  burger.addEventListener("click", function(){
    var open = mnav.classList.toggle("open");
    mnav.setAttribute("aria-hidden", open ? "false" : "true");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  var mc = document.getElementById("mclose"); if(mc) mc.addEventListener("click", closeMenu);
  mnav.addEventListener("click", function(e){ if(e.target === mnav) closeMenu(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeMenu(); });
}
var rvs = document.querySelectorAll(".rv");
if(reduced){ rvs.forEach(function(el){ el.classList.add("in"); }); }
else{
  document.querySelectorAll('.fgrid,.etypes,.stage-grid,.qgrid,.faq-in,.sgrid,.statband,.vals').forEach(function(g){
    var i=0; Array.prototype.forEach.call(g.children,function(el){ if(el.classList&&el.classList.contains('rv')&&!el.style.getPropertyValue('--d')){ el.style.setProperty('--d',(i*0.07)+'s'); i++; } });
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  rvs.forEach(function(el){ io.observe(el); });
}
function countUp(el){
  var t = parseFloat(el.getAttribute("data-count"));
  if(reduced){ el.textContent = t; return; }
  var t0 = null, dur = 1300;
  function tick(ts){ if(!t0) t0 = ts; var p = Math.min((ts-t0)/dur,1);
    el.textContent = Math.round(t*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); }
  requestAnimationFrame(tick);
}
var cio = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ countUp(en.target); cio.unobserve(en.target); } }); }, {threshold:.6});
document.querySelectorAll("[data-count]").forEach(function(el){ cio.observe(el); });
document.querySelectorAll(".qa").forEach(function(qa){
  var btn = qa.querySelector(".qa-q"), body = qa.querySelector(".qa-a");
  if(!btn||!body) return;
  btn.addEventListener("click", function(){
    var open = qa.classList.contains("open");
    document.querySelectorAll(".qa.open").forEach(function(o){ o.classList.remove("open"); o.querySelector(".qa-a").style.maxHeight = null; o.querySelector(".qa-q").setAttribute("aria-expanded","false"); });
    if(!open){ qa.classList.add("open"); body.style.maxHeight = body.scrollHeight + "px"; btn.setAttribute("aria-expanded","true"); }
  });
});
var form = document.getElementById("demoForm");
if(form){
  var API = "https://swiftrisebackwindows-b4frcjhmb3cdbmbg.westeurope-01.azurewebsites.net/api/";
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var f = e.target, name = f.name.value.trim(), email = f.email.value.trim(),
        phone = f.phone ? f.phone.value.trim() : "", msg = f.message ? f.message.value.trim() : "";
    if(!name || !email){ (!name ? f.name : f.email).focus(); return; }
    var btn = f.querySelector('button[type="submit"]'), orig = btn.textContent;
    btn.textContent = "Sending…"; btn.disabled = true; btn.style.opacity = .75;
    var payload = JSON.stringify({fullName:name, email:email, phone:phone, message:msg || "Demo request from swiftrise.app", company:"Swiftrise"});
    fetch(API + "Lead", {method:"POST", headers:{"Content-Type":"application/json"}, body:payload})
      .then(function(r){ if(!r.ok) throw 0;
        fetch(API + "SwiftriseContactForm", {method:"POST", headers:{"Content-Type":"application/json"}, body:payload}).catch(function(){});
        return r; })
      .then(function(){ btn.textContent = "Sent — we’ll be in touch ✓"; btn.style.opacity = 1; f.reset();
        setTimeout(function(){ btn.textContent = orig; btn.disabled = false; }, 6000); })
      .catch(function(){
        btn.textContent = orig; btn.disabled = false; btn.style.opacity = 1;
        var body = "Hi SwiftRise team,%0D%0A%0D%0A" + encodeURIComponent(msg || "I'd like to book a demo.") +
          "%0D%0A%0D%0A—%0D%0A" + encodeURIComponent(name) +
          (phone ? "%0D%0APhone: " + encodeURIComponent(phone) : "") +
          "%0D%0AEmail: " + encodeURIComponent(email);
        window.location.href = "mailto:info@swiftrise.app?subject=" + encodeURIComponent("Demo request — " + name) + "&body=" + body;
      });
  });
}
var sw = document.getElementById("langSw");
if(sw){
  var pg = location.pathname.split("/").pop() || "index.html";
  if(pg.indexOf(".html") < 0) pg = "index.html";
  var isAr = /-ar\.html$/.test(pg);
  sw.textContent = isAr ? "English" : "العربية";
  sw.setAttribute("href", isAr ? pg.replace("-ar.html", ".html") : pg.replace(".html", "-ar.html"));
}
if(reduced){ document.querySelectorAll("video[autoplay]").forEach(function(v){ v.removeAttribute("autoplay"); v.pause(); v.controls = true; }); }
var filmBtn = document.getElementById("openFilm"), filmBox = document.getElementById("filmBox");
if(filmBtn && filmBox){
  var filmVid = document.getElementById("filmVideo");
  function openFilm(){ filmBox.classList.add("open"); filmBox.setAttribute("aria-hidden","false"); filmVid.play().catch(function(){}); }
  function closeFilm(){ filmBox.classList.remove("open"); filmBox.setAttribute("aria-hidden","true"); filmVid.pause(); }
  filmBtn.addEventListener("click", openFilm);
  document.getElementById("closeFilm").addEventListener("click", closeFilm);
  filmBox.addEventListener("click", function(e){ if(e.target === filmBox) closeFilm(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeFilm(); });
}
var fab = document.getElementById("fab");
if(fab){
  var hideZone = document.querySelector(".c-form, .bookgrid");
  var hidden = false;
  if(hideZone){ new IntersectionObserver(function(en){ hidden = en[0].isIntersecting; place(); }, {threshold:.1}).observe(hideZone); }
  function place(){ fab.classList.toggle("show", window.scrollY > 620 && !hidden); }
  window.addEventListener("scroll", place, {passive:true}); place();
}
})();
