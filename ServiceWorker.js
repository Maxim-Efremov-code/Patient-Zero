const cacheName = "DefaultCompany-Patient Zero-0.1.0";
const contentToCache = [
    "Build/8483cba6a5b80ce38e722f3454ebe6e7.loader.js",
    "Build/ae0a56a7db938492edbcba0936e0fd92.framework.js.unityweb",
    "Build/e0680fa052a07a51050aa007c70e23f1.data.unityweb",
    "Build/6ce1b2bae1de00c26ece082c8bbf0761.wasm.unityweb",
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
