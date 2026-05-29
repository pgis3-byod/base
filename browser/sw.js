importScripts("/browser/scram/scramjet.all.js")

const { ScramjetServiceWorker } = $scramjetLoadWorker()

const scramjet = new ScramjetServiceWorker()

async function handleRequest(event) {
    try {
        await scramjet.loadConfig()
    } catch (e) {
        return fetch(event.request)
    }

    if (scramjet.route(event)) {
        try {
            return await scramjet.fetch(event)
        } catch (e) {
            return fetch(event.request)
        }
    }

    return fetch(event.request)
}

self.addEventListener("fetch", event => {
    event.respondWith(handleRequest(event))
})
