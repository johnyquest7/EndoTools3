const CACHE_NAME = 'endocalc-pwa-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './css/styles.css',
  './js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((n) => (n === CACHE_NAME ? null : caches.delete(n)))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const responseClone = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
    return response;
  }).catch(() => caches.match('./offline.html'))));
});
