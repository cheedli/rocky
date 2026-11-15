// Rocky's data cache. The terrain, imagery and models never change between visits, so after the first load they are
// served from the browser's own store without touching the network: scenes open faster and the site works offline.
// Registered only in production builds (see src/main.tsx). Bump CACHE when the data files are regenerated.
const CACHE = 'rocky-data-v1';
const HOLD = /\/(data|globe|terrain|notch|models|cesium|assets)\//;
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !HOLD.test(u.pathname) || e.request.headers.has('range')) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE), hit = await c.match(e.request);
    if (hit) return hit;
    const r = await fetch(e.request);
    if (r.status === 200) c.put(e.request, r.clone()).catch(() => undefined);   // a full store must not break the page
    return r;
  })());
});
