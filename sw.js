const VERSION = "v1"

self.addEventListener('install', event => {
    event.waitUntil(precache())
})

self.addEventListener('fetch', event => {
    const request = event.request;
    // get
    if(request.method !== "GET") {
      return;
    }

    // find on cache
    event.respondWith(cachedResponse(request))

    // update cache
    event.waitUntil(updateCache(request))
})

async function precache() {
    const cache = caches.open(VERSION)
    return (await cache).addAll([
    '/',
    '/index.html',
    '/assets/index.js',
    '/assets/MediaPlayer.js',
    '/assets/plugins/AutoPlay.js',
    '/assets/plugins/AutoPause.js',
    '/assets/index.css',
    '/assets/BigBuckBunny.mp4',
    ]);
}

async function cachedResponse(request) {
  const cache = await caches.open(VERSION)
  const response = await cache.match(request)
  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await caches.open(VERSION)
  const response = await fetch(request)
  return cache.put(request, response)
}