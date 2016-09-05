/* global self, console, caches */

'use strict';

var cacheName = 'pwa-test-v13';

//Register of what assets we need cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/lib/angular-material/angular-material.min.css',
        '/css/base.css',
        '/lib/angular/angular.min.js',
        '/lib/angular-animate/angular-animate.min.js',
        '/lib/angular-aria/angular-aria.min.js',
        '/lib/angular-messages/angular-messages.min.js',
        '/lib/angular-material/angular-material.min.js',
        '/lib/angular-local-storage/dist/angular-local-storage.min.js',
        '/js/app.module.js',
        '/js/app.controller.js',
        '/js/github/github.module.js',
        '/js/github/github.service.js'
      ]);
    })
  );
});

//Use cache when is available
self.addEventListener('fetch', function(e) {  
  e.respondWith(  
    caches.match(e.request).then(function(response) {  
      return response || fetch(e.request);  
    })
  );  
});
