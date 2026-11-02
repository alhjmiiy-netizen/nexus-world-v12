/* Nexus World v5 service worker: cache-first, versioned. VERSION changes whenever index.html changes. */
const VERSION = 'nexusworldv5-7cc80facc2';
const FILES = ["./", "index.html", "manifest.webmanifest", "favicon.ico", "favicon-32.png", "favicon-16.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-192.png", "icon-maskable-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('nexusworldv5-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== self.location.origin) return;
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true }); if (hit) return hit;
    if (req.mode === 'navigate') { const shell = await c.match('index.html'); if (shell) return shell; }
    try { const res = await fetch(req); if (res && res.ok && res.type === 'basic') c.put(req, res.clone()); return res; }
    catch (err) { const shell = req.mode === 'navigate' && await c.match('index.html'); if (shell) return shell; throw err; }
  }));
});
