var CACHE_NAME = 'pwa-task-manager';

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
          '/',
        ]
        );
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

  
// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open('video-store').then(function(cache) {
//       return cache.addAll([
//         '/'
//       ]);
//     })
//   );
//  });
 
//  self.addEventListener('fetch', function(e) {
//    console.log(e.request.url);
//    e.respondWith(
//      caches.match(e.request).then(function(response) {
//        return response || fetch(e.request);
//      })
//    );
//  });