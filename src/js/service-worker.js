/* eslint-disable */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.setConfig({
  debug: false,
});

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
}

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
      }),
    ],
  }),
);

self.addEventListener('message', (e) => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
  case 'skipWaiting':
    self.skipWaiting();
    break;
  default:
    // NOOP
    break;
  }
});
