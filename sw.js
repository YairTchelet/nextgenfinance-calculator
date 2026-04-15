const CACHE_NAME = 'ngf-cache-v1';

const PRECACHE_URLS = [
  '/',
  '/assets/css/course.css',
  '/investor-academy/assets/css/course.css'
];

// URLs or URL fragments that always get network-first treatment
function isNetworkFirst(url) {
  return (
    url.includes('supabase.co') ||
    url.includes('/api/') ||
    url.includes('cdn.jsdelivr.net') ||
    url.includes('/_vercel/') ||
    // HTML pages — keep content fresh
    /\.(html?)(\?|$)/.test(url) ||
    // Bare paths (likely serving index.html)
    (/^https?:\/\/[^/]+\/[^.]*\/?(\?|$)/.test(url) && !url.includes('/images/icons/'))
  );
}

// Static asset extensions that benefit from cache-first
function isStaticAsset(url) {
  return /\.(css|js|png|jpg|jpeg|webp|svg|gif|ico|woff|woff2|ttf|eot)(\?|$)/.test(url);
}

// ── Install: precache core assets ─────────────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ── Activate: remove old cache versions ───────────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) { return key !== CACHE_NAME; })
          .map(function(key) { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── Fetch: routing strategy ────────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  var url = event.request.url;

  // Network-first: API calls, Supabase, HTML pages
  if (isNetworkFirst(url)) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Cache-first: CSS, JS, images, fonts
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Default: network-first for anything else
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
