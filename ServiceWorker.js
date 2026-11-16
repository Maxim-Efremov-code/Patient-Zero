const cacheName = "DefaultCompany-Patient Zero-0.1.0";
const contentToCache = [
    "Build/a2ff6054f1112dffe88c263b78fe8709.loader.js",
    "Build/ae0a56a7db938492edbcba0936e0fd92.framework.js.unityweb",
    "Build/a6de94b09128e6c939374ffbb342dd72.data.unityweb",
    "Build/943ce408b46584ade458993a63e803a3.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
