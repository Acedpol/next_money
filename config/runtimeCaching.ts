// config/runtimeCaching.ts
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { registerRoute } from "workbox-routing";
import { ExpirationPlugin } from "workbox-expiration";

const runtimeCaching = [
  {
    // 🧭 API de tu backend o endpoints de datos
    urlPattern: /\/api\/.*$/i,
    handler: new NetworkFirst({
      cacheName: "api-cache",
      networkTimeoutSeconds: 10,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutos
        }),
      ],
    }),
  },
  {
    // 🖼️ Imágenes
    urlPattern: /\.(?:png|jpg|jpeg|svg|webp|ico)$/i,
    handler: new CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        }),
      ],
    }),
  },
  {
    // 🧩 Fuentes (Google Fonts)
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: new StaleWhileRevalidate({
      cacheName: "google-fonts",
    }),
  },
  {
    // ⚡ Archivos estáticos (JS, CSS, etc.)
    urlPattern: /\.(?:js|css)$/i,
    handler: new StaleWhileRevalidate({
      cacheName: "static-resources",
    }),
  },
];

export default runtimeCaching;
