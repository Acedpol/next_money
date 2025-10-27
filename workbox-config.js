module.exports = {
  globDirectory: 'out/',
  globPatterns: ['**/*.{html,js,css,svg,png}'],
  swSrc: 'src/service-worker.js',
  swDest: 'out/sw.js',
  runtimeCaching: [
    {
      // Caché de páginas navegadas
      urlPattern: /^https:\/\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
        },
        cacheableResponse: {
          statuses: [0, 200], // Solo cachea respuestas exitosas
        },
      },
    },
    {
      // Caché de imágenes
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      // Caché de google fonts
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { 
            maxEntries: 4, 
            maxAgeSeconds: 365 * 24 * 60 * 60 
        },
      },
    },
    {
      // Caché de archivos estáticos (JS, CSS)
      urlPattern: /\.(?:js|css|woff2?|json)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
      },
    },
  ],
};
