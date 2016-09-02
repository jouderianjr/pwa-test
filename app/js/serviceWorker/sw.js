this.addEventListener('install', function(event) {
  console.log('cacheouuu');
  event.waitUntil(
    caches.open('v4').then(function(cache) {
      return cache.addAll([
        '/lib/angular-material/angular-material.min.css',
        '/css/base.css',
        '/lib/angular/angular.min.js',
        '/lib/angular-animate/angular-animate.min.js',
        '/lib/angular-aria/angular-aria.min.js',
        '/lib/angular-messages/angular-messages.min.js',
        '/lib/angular-material/angular-material.min.js',
        '/js/app.module.js',
        '/js/app.controller.js',
        '/js/github/github.module.js',
        '/js/github/github.service.js',
        '/index.html'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  e.respondWith(  
    caches.match(e.request).then(function(response) {  
      return response || fetch(e.request);  
    })  
  );  
});

console.log('hey man!');