importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
const pesanConsoleBerhasil = () => console.log(`Workbox berhasil dimuat`);
const pesanConsoleGagal = () => console.log(`Workbox gagal dimuat`);
workbox ? pesanConsoleBerhasil() : pesanConsoleGagal();

workbox.precaching.precacheAndRoute([

  { url:  './', revision: '1' },
  { url:  './manifest.json',  revision: '1' },
  { url:  './css/materialize.min.css',  revision: '1' },
  { url:  './css/style.css',  revision: '1' },
  { url:  './js/api.js', revision: '1' },
  { url:  './js/db.js', revision: '1' },
  { url:  './js/idb.js',  revision: '1' },
  { url:  './js/materialize.min.js', revision: '1' },
  { url:  './js/nav.js',  revision: '1' },
  { url:  './js/main.js', revision: '1' },
  { url:  './js/script.js', revision: '1' },
  { url:  './pages/pertandingan.html', revision: '1' },
  { url:  './pages/tersimpan.html', revision: '1' },
  { url:  './pages/klasemen.html', revision: '1' },
  { url:  './index.html', revision: '1' },
  { url:  './nav.html', revision: '1' },
  { url:  './images/icon-192x192.png', revision: '1' },
  { url:  './images/icon-512x512.png', revision: '1' },
  { url:  './images/logo.svg', revision: '1' },
  { url:  "./images/favicon/apple-icon-57x57.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-60x60.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-72x72.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-76x76.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-114x114.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-120x120.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-144x144.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-152x152.png", revision: '1' },
  { url:  "./images/favicon/apple-icon-180x180.png", revision: '1' },
  { url:  "./images/favicon/android-icon-192x192.png", revision: '1' },
  { url:  "./images/favicon/favicon-32x32.png", revision: '1' },
  { url:  "./images/favicon/favicon-96x96.png", revision: '1' },
  { url:  "./images/favicon/favicon-16x16.png", revision: '1' },
  { url:  "./images/favicon/favicon.ico", revision: '1' },
  { url:  'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url:  'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
  { url:  'https://code.jquery.com/jquery-2.1.1.min.js', revision: '1' },
    ])


    workbox.routing.registerRoute(
      new RegExp("./js/"),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "js",
      })
    );
    
    workbox.routing.registerRoute(
      new RegExp("./css/"),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "css",
      })
    );
    
    workbox.routing.registerRoute(
      new RegExp("./pages/"),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "pages",
      })
    );
    
    workbox.routing.registerRoute(
      new RegExp("./images/"),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "images",
      })
    );
    
    
    workbox.routing.registerRoute(
      new RegExp("./"),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "all",
      })
    );
    
    workbox.routing.registerRoute(
      /^https:\/\/api\.football-data\.org\/v2/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "https://api.football-data.org/",
      })
    );
    
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
        workbox.strategies.cacheFirst({
          cacheName: 'images',
          plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
          ]
        })
    );



self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: './images/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});