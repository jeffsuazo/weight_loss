// Suazo Family Plan — offline cache
const CACHE = 'suazo-plan-v9-10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './art/C1.webp',
  './art/C10.webp',
  './art/C11.webp',
  './art/C12.webp',
  './art/C13.webp',
  './art/C14.webp',
  './art/C15.webp',
  './art/C2.webp',
  './art/C3.webp',
  './art/C4.webp',
  './art/C5.webp',
  './art/C6.webp',
  './art/C7.webp',
  './art/C8.webp',
  './art/C9.webp',
  './art/E1.webp',
  './art/E10.webp',
  './art/E11.webp',
  './art/E12.webp',
  './art/E2.webp',
  './art/E3.webp',
  './art/E8.webp',
  './art/E9.webp',
  './art/K1.webp',
  './art/K10.webp',
  './art/K11.webp',
  './art/K12.webp',
  './art/K13.webp',
  './art/K14.webp',
  './art/K15.webp',
  './art/K16.webp',
  './art/K2.webp',
  './art/K3.webp',
  './art/K32.webp',
  './art/K34.webp',
  './art/K35.webp',
  './art/K39.webp',
  './art/K4.webp',
  './art/K40.webp',
  './art/K41.webp',
  './art/K5.webp',
  './art/K6.webp',
  './art/K7.webp',
  './art/K8.webp',
  './art/K9.webp',
  './art/N1.webp',
  './art/N10.webp',
  './art/N11.webp',
  './art/N12.webp',
  './art/N13.webp',
  './art/N14.webp',
  './art/N15.webp',
  './art/N16.webp',
  './art/N17.webp',
  './art/N18.webp',
  './art/N19.webp',
  './art/N2.webp',
  './art/N20.webp',
  './art/N21.webp',
  './art/N22.webp',
  './art/N23.webp',
  './art/N24.webp',
  './art/N25.webp',
  './art/N26.webp',
  './art/N27.webp',
  './art/N3.webp',
  './art/N4.webp',
  './art/N5.webp',
  './art/N6.webp',
  './art/N7.webp',
  './art/N8.webp',
  './art/N9.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first for our own assets, network fallback. Keeps the app usable offline at gym/kitchen.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => { try { c.put(e.request, copy); } catch (_) {} });
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
