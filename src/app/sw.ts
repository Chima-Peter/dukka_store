import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkFirst, NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      // Backend/API traffic is cross-origin or under /api — never serve from cache.
      matcher: ({ url, sameOrigin }) =>
        !sameOrigin || url.pathname.includes("/api/"),
      handler: new NetworkOnly(),
    },
    {
      matcher: ({ request, sameOrigin }) =>
        sameOrigin && request.destination === "document",
      handler: new NetworkFirst({
        cacheName: "dukka-pages",
        networkTimeoutSeconds: 8,
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
