// Prefers-color-scheme + manuális témaváltás
(function(){
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const userPref = localStorage.getItem('theme');
const mql = window.matchMedia('(prefers-color-scheme: dark)');


function applyTheme(t){
if(t==='dark'){document.body.classList.add('theme-dark');icon.classList.remove('fa-sun');icon.classList.add('fa-moon');}
else{document.body.classList.remove('theme-dark');icon.classList.remove('fa-moon');icon.classList.add('fa-sun');}
}
function currentTheme(){return localStorage.getItem('theme')|| (mql.matches?'dark':'light');}
applyTheme(userPref|| (mql.matches?'dark':'light'));
mql.addEventListener('change', e=>{ if(!localStorage.getItem('theme')) applyTheme(e.matches?'dark':'light'); });
if(btn) btn.addEventListener('click', ()=>{ const t = currentTheme()==='dark'?'light':'dark'; localStorage.setItem('theme',t); applyTheme(t); });
})();


// Scroll progress bar
(function(){
const bar = document.getElementById('scrollProgress');
function onScroll(){
const h = document.documentElement;
const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
bar.style.width = scrolled + '%';
}
document.addEventListener('scroll', onScroll, {passive:true});
onScroll();
})();


// Parallax a hero háttérhez
(function(){
const hero = document.querySelector('.hero');
function onScroll(){ if(!hero) return; const y = window.scrollY; hero.style.setProperty('--parallax', (y * -0.03)+'px'); }
document.addEventListener('scroll', onScroll, {passive:true});
onScroll();
})();


// Section reveal
(function(){
const els = document.querySelectorAll('.section-reveal');
const io = new IntersectionObserver((entries)=>{
entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
},{threshold:.15});
els.forEach(el=>io.observe(el));
})();


// Typewriter
(function(){
const el = document.getElementById('typewriter');
if(!el) return;
const texts = ['Android fejlesztő','Oktató','Innovátor'];
let i=0, j=0, del=false;
function tick(){
const t = texts[i];
el.textContent = t.slice(0,j);
if(!del && j<t.length){ j++; setTimeout(tick, 90); }
else if(!del && j===t.length){ del=true; setTimeout(tick, 1200); }
else if(del && j>0){ j--; setTimeout(tick, 40); }
else{ del=false; i=(i+1)%texts.length; setTimeout(tick, 200); }
}
tick();
})();


// GitHub activity feed – publikus események
(async function(){
const feed = document.getElementById('ghFeed');
if(!feed) return;
try{
const res = await fetch('https://api.github.com/users/merenyimiklos/events/public');
const events = await res.json();
const items = [];
for(const ev of events){
if(ev.type==='PushEvent'){
const repo = ev.repo?.name || 'repo';
const date = new Date(ev.created_at).toLocaleString('hu-HU');
const commits = (ev.payload?.commits||[]).slice(0,3).map(c=>`• ${c.message}`).join('<br>');
items.push(`<a class="list-group-item list-group-item-action" target="_blank" href="https://github.com/${repo}">
<div class="d-flex w-100 justify-content-between"><h6 class="mb-1">${repo}</h6><small class="text-muted">${date}</small></div>
<small class="text-muted">PushEvent</small><div class="mt-1 small">${commits}</div>
</a>`);
}
if(items.length>=5) break;
}
feed.innerHTML = items.length? items.join('') : '<div class="text-muted">Nincs megjeleníthető aktivitás.</div>';
}catch(e){ feed.innerHTML = '<div class="text-muted">Hiba a GitHub feed betöltésekor.</div>'; }
})();


// Blog preview – minta adatok
(function(){
const blog = document.getElementById('blogList');
if(!blog) return;
const posts = [
{title:'Compose állapotkezelés röviden', excerpt:'State hoisting, remember, derivedStateOf, és mikor melyiket.', url:'#'},
{title:'HA dashboard: 5 gyors tipp', excerpt:'Mushroom kártyák, témák, és Cloudflare tunnel egyszerűsítése.', url:'#'},
{title:'Kotlin Coroutines: Flow alapok', excerpt:'Cold stream, collect, map, flatMapLatest gyakorlati példákkal.', url:'#'}
];
blog.innerHTML = posts.map(p=>`<div class="col-md-4"><div class="blog-card h-100"><h5 class="text-primary">${p.title}</h5><p>${p.excerpt}</p><a href="${p.url}" class="stretched-link">Olvasás</a></div></div>`).join('');
})();


// PWA regisztráció
if('serviceWorker' in navigator){
window.addEventListener('load', ()=>{ navigator.serviceWorker.register('/sw.js'); });
}