// next.config.ts
import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "next-pwa";
// import runtimeCaching from "./config/runtimeCaching";
const runtimeCaching = require('next-pwa/cache');
import type { PWAOptions } from "./types/pwa-options";

const isProd = process.env.NODE_ENV === "production";

const pwaConfig: PWAOptions = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd,
  runtimeCaching,
  buildExcludes: ["middleware-manifest.json"],
  fallbacks: {
    document: "/offline",
  },
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
};

const withPWA = withPWAInit(pwaConfig);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  webpack: (config, { isServer, dev }) => {
    // Agregamos extensiones TS/TSX para mejor soporte en imports
    config.resolve.extensions.push(".ts", ".tsx");

    if (isProd && !isServer && !dev) {
      console.log("🧱 Generando Service Worker con next-pwa...");
    }

    return config;
  },
  ...(isProd
    ? {}
    : {
        turbopack: {
          root: path.resolve(process.cwd()),
        },
      }),
};

console.log("🌍 Entorno:", process.env.NODE_ENV);
console.log("🧩 PWA habilitado:", isProd ? "✅ Sí (producción)" : "⚠️ No (modo desarrollo)");

export default withPWA(nextConfig);
