const CACHE_NAME = 'notinhas-pwa-v1';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/audios/acertou.mp3',
  '/audios/ahh-nao.mp3',
  '/audios/comemoracao.mp3',
  '/notinhas/bruxinho-esperando-1.png',
  '/notinhas/bruxinho-esperando-2.png',
  '/notinhas/bruxinho-esperando-3.png',
  '/notinhas/bruxinho-esperando-4.png',
  '/notinhas/bruxinho-esperando-5.png',
  '/notinhas/bruxinho-esperando-6.png',
  '/notinhas/bruxinho-gargalhando-1.png',
  '/notinhas/bruxinho-gargalhando-2.png',
  '/notinhas/bruxinho-gargalhando-3.png',
  '/notinhas/bruxinho-gargalhando-4.png',
  '/notinhas/bruxinho-gargalhando-5.png',
  '/notinhas/bruxinho-gargalhando-6.png',
  '/notinhas/bruxinho-raiva-pulando-1.png',
  '/notinhas/bruxinho-raiva-pulando-2.png',
  '/notinhas/bruxinho-raiva-pulando-3.png',
  '/notinhas/bruxinho-raiva-pulando-4.png',
  '/notinhas/bruxinho-raiva-pulando-5.png',
  '/notinhas/bruxinho-raiva-pulando-6.png',
  '/notinhas/do.png',
  '/notinhas/fa.png',
  '/notinhas/fa-agudo.png',
  '/notinhas/gabarito.png',
  '/notinhas/intro.png',
  '/notinhas/la.png',
  '/notinhas/mi.png',
  '/notinhas/mi-agudo.png',
  '/notinhas/parabens1.png',
  '/notinhas/parabens2.png',
  '/notinhas/parabens3.png',
  '/notinhas/parabens4.png',
  '/notinhas/parabens5.png',
  '/notinhas/parabens6.png',
  '/notinhas/parabens7.png',
  '/notinhas/parabens8.png',
  '/notinhas/parabens9.png',
  '/notinhas/parabens10.png',
  '/notinhas/re.png',
  '/notinhas/si.png',
  '/notinhas/sol.png',
  '/notinhas/sujas.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => (
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => (
      cachedResponse || fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
    ))
  );
});
