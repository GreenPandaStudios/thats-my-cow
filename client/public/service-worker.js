// This is the service worker for the That's My Cow game
// It enables offline functionality and allows the app to be installed

const CACHE_NAME = "thats-my-cow-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/manifest.json",
	"/logo512.png",
	"/Moony.png",
	"/Rules.md",
	"/background.png",
	"/header-background.png",
	"/static/css/",
	"/static/js/",
	// Use a regex pattern to catch all CSS files
	new RegExp("/static/css/.*\\.css"),
	// Use a regex pattern to catch all JS files
	new RegExp("/static/js/.*\\.js"),
];

// Install service worker and cache assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});

// Intercept fetch requests and serve from cache if available
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request).then((response) => {
				// Don't cache if response is not valid
				if (!response || response.status !== 200 || response.type !== "basic") {
					return response;
				}

				// Clone the response - one to return, one to cache
				const responseToCache = response.clone();

				caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		})
	);
});

// Update caches when a new service worker takes over
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
