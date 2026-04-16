/**
 * Epix AI — Service Worker
 * Strategy: Cache-First for static assets, Network-First for navigation/API
 */

// Allow auto-update registration utility to force activation
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});


const CACHE_VERSION = "epix-ai-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;
const API_CACHE = `${CACHE_VERSION}-api`;

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
  "/favicon.ico",
];

// ── Install: precache static assets ─────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ───────────────────────────────────────────
self.addEventListener("activate", (event) => {
  const allowedCaches = [STATIC_CACHE, FONT_CACHE, API_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("epix-ai-") && !allowedCaches.includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: route-based caching strategies ───────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and chrome-extension requests
  if (request.method !== "GET" || url.protocol === "chrome-extension:") return;

  // Google Fonts → CacheFirst (long-lived)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(cacheFirst(request, FONT_CACHE, 365));
    return;
  }

  // Static assets (JS/CSS/images) → CacheFirst
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".css")
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, 30));
    return;
  }

  // Mock data / API → StaleWhileRevalidate
  if (url.pathname.startsWith("/mock-data/") || url.pathname.startsWith("/api/")) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE));
    return;
  }

  // Navigation (HTML) → NetworkFirst with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
});

// ── Strategies ───────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName, maxAgeDays = 7) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response("Offline", { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    return cached || cache.match("/") || new Response("Offline", { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });
  return cached || fetchPromise;
}
