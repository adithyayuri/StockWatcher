// A very simple service worker for caching
const CACHE_NAME = 'stock-dashboard-v1';
// Add all your core files here
const urlsToCache = [
  '.', // This caches the root (index.html)
  'index.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js',
  'icon-192.png',
  'icon-512.png'
  // Add your .yaml files if you want them cached
  'my_watchlist.yaml',
  'tech_giants.yaml'
];

// Install event: cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - go to network
        return fetch(event.request);
      }
    )
  );
});