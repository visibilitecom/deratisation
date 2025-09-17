// Service Worker optimisé pour LCP
const CACHE_NAME = 'acces-services-v2';
const CRITICAL_ASSETS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

// Assets prioritaires pour LCP
const LCP_CRITICAL = [
  '/static/css/main.css',
  '/'
];

// Installation du Service Worker - LCP prioritaire
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache critique en premier pour LCP
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(LCP_CRITICAL)),
      // Puis le reste
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(CRITICAL_ASSETS))
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Stratégie de cache: Cache First pour les assets statiques
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'style' || 
      event.request.destination === 'script' ||
      event.request.destination === 'font') {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
  
  // Network First pour les pages HTML
  else if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone la réponse avant de la mettre en cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});