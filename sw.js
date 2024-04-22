const CACHE_NAME = "my-quiz-v1"
const URL_WAJIB = [
    "/",
    "/404.html",
    "/css/cssKu.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    "/js/jquery.min.js",
    "/js/read-excel-file.min.js",
    "/js/export-to-excel.js",
    "/js/main.js",
    "/img/logo.png",
    "/img/img-background.png",
    "/img/404.svg",
    "/img/answer.svg",
    "/img/ask.svg",
    "/img/avatar.svg",
    "/img/back.svg",
    "/img/betul.svg",
    "/img/gagal.svg",
    "/img/hapus.svg",
    "/img/left-arrow.svg",
    "/img/right-arrow.svg",
    "/img/menu.svg",
    "/img/menunggu.svg",
    "/img/menus-dot.svg",
    "/img/no-data.svg",
    "/img/quiz.svg",
    "/img/reload.svg",
    "/img/score.svg",
    "/img/settings.svg",
]

// self.addEventListener('install', function (event) {
//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME)
//         cache.addAll(URL_WAJIB)
//     })())
// })

// self.addEventListener('fetch', function (event) {
//     event.respondWith((async () => {
//         const cache = await caches.open(CACHE_NAME)
//         const resCache = await cache.match(event.request)
//         if (resCache) return resCache
//         try {
//             const res = await fetch(event.request)
//             cache.put(event.request, res.clone())
//             return res
//         } catch {}
//     })())
// })





// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(URL_WAJIB)
//         })
//     )
// })

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             if (response) {
//                 return response
//             }
//             return fetch(event.request)
//         })
//     )
// })


// self.addEventListener('activate', function (event) {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.filter(function (cacheName) {
//                     return cacheName != CACHE_NAME
//                 }).map(function (cacheName) {
//                     return caches.delete(cacheName)
//                 })
//             )
//         })
//     )
// })