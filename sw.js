const CACHE='bcs100-pro-v1.2.0';
const ASSETS=[
  './','./index.html','./manifest.json','./css/styles.css','./assets/icon.svg',
  './js/data.js','./js/syllabus-update.js',
  './js/questions-extra-1.js','./js/questions-extra-2.js','./js/questions-extra-3.js',
  './js/questions-extra-4.js','./js/questions-extra-5.js','./js/questions-extra-6.js',
  './js/questions-extra-7.js','./js/app.js'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  if(request.mode==='navigate'){
    event.respondWith(fetch(request).catch(()=>caches.match('./index.html')));
    return;
  }

  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(request,copy));
    }
    return response;
  })));
});
