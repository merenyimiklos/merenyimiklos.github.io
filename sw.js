const CACHE_NAME = 'mm-portfolio-v1';
const ASSETS = [
'/',
'/index.html',
'/css/style.css',
'/js/main.js',
'/img/profilkep.jpg'
];
self.addEventListener('install', e=>{
e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME && caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
e.respondWith(
caches.match(e.request).then(res=> res || fetch(e.request))
);
});