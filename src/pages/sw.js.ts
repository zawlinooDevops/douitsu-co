import type { APIRoute } from 'astro';
import { siteData } from '../data/content';

export const GET: APIRoute = async () => {
  const version = siteData.meta.version;

  const swScript = `/**
 * DOUITSU LLC — Production PWA Service Worker
 * Version: ${version}
 * Auto-synced with siteData.meta.version & package.json
 */

const CACHE_NAME = 'douitsu-v${version}';

const PRECACHE_ASSETS = [
  '/',
  '/favicon.ico',
  '/site.webmanifest',
  '/images/landing/logo-mark.png',
  '/images/landing/hero-bg.webp',
  '/fonts/local-font-1.ttf',
  '/fonts/local-font-2.ttf',
  '/fonts/local-font-7.ttf'
];

// Install Event: Pre-cache critical application shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-caching warning:', err);
      });
    })
  );
});

// Activate Event: Purge legacy version caches automatically
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith('douitsu-')) {
            console.log('[SW] Deleting legacy cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Smart routing (Network-First for HTML, Stale-While-Revalidate for static assets)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests originating from our domain
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // 1. Navigation / Document requests: Network-First (Freshness Priority)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => cached || caches.match('/'));
        })
    );
    return;
  }

  // 2. Static Assets (Astro bundled chunks, fonts, images): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        // Network failure in background, ignore
      });

      return cachedResponse || fetchPromise;
    })
  );
});
`;

  return new Response(swScript, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
};
