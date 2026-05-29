self.addEventListener("install", () => {
    self.skipWaiting()
})

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim())
})

// Only handle Site A scope requests
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url)

    // If request is NOT Site A, just fetch normally
    if (url.origin !== location.origin) {
        event.respondWith(fetch(event.request))
        return
    }

    event.respondWith(fetch(event.request))
})
