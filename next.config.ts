// next.config.ts (opción B: sin dependencia extra, usando infrastructureLogging + stats para filtrar warnings)
// Usa esta variante si prefieres eliminar webpack-filter-warnings-plugin.
import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "next-pwa";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const runtimeCaching = require("next-pwa/cache");
import type { PWAOptions } from "./types/pwa-options";

let sassExternalConfig: Record<string, any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  sassExternalConfig = require(path.resolve(process.cwd(), "sass.config.js"));
  console.log("[sass] Config externa detectada");
} catch {
  console.log("[sass] No se encontró sass.config.js; usa defaults internos.");
}

const isProd = process.env.NODE_ENV === "production";

const pwaConfig: PWAOptions = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd,
  runtimeCaching,
  buildExcludes: ["middleware-manifest.json"],
  fallbacks: { document: "/offline" },
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
};

const withPWA = withPWAInit(pwaConfig);

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  webpack: (config, { dev, isServer }) => {
    config.resolve.extensions = Array.from(new Set([...(config.resolve.extensions || []), ".ts", ".tsx"]));
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(process.cwd(), "src"),
    };

    // Inyectar sass.config.js
    const patchSassLoaderOptions = (use: any[]) => {
      for (const u of use) {
        const isSassLoader =
          typeof u?.loader === "string" && (u.loader.includes("sass-loader") || u.loader === "sass-loader");
        if (isSassLoader) {
          u.options = u.options || {};
          u.options.sassOptions = {
            ...(u.options.sassOptions || {}),
            ...(sassExternalConfig || {}),
          };
          u.options.sourceMap = dev;
          if (sassExternalConfig?.additionalData && u.options.additionalData == null) {
            u.options.additionalData = sassExternalConfig.additionalData;
          }
        }
      }
    };
    const visitRules = (rulesArr: any[]) => {
      for (const rule of rulesArr) {
        if (!rule) continue;
        if (Array.isArray(rule.use)) patchSassLoaderOptions(rule.use);
        if (Array.isArray(rule.oneOf)) visitRules(rule.oneOf);
        if (Array.isArray(rule.rules)) visitRules(rule.rules);
      }
    };
    const rulesRoot =
      (config.module?.rules as any[])?.find((r: any) => Array.isArray(r.oneOf))?.oneOf ||
      (config.module?.rules as any[]);
    if (Array.isArray(rulesRoot)) visitRules(rulesRoot);

    // Filtro de warnings sin plugin:
    // - Reducimos ruido con stats.warningsFilter e infrastructureLogging.level
    config.infrastructureLogging = {
      ...(config.infrastructureLogging || {}),
      level: dev ? "warn" : "error",
    };
    config.stats = {
      ...(config.stats || {}),
      warningsFilter: [
        /Failed to parse source map/i,
        /source-map-loader/i,
        /Critical dependency: the request of a dependency is an expression/i,
        /export '.*' \(imported as '.*'\) was not found in/i,
        /dependency is an expression/i,
        /require\.extensions is not supported by webpack/i,
        /Conflicting order\. Following module has been added:/i,
        /chunk styles \[mini-css-extract-plugin\]/i,
        /DEPRECATION WARNING/i,
        /Sass .* deprecation warning/i,
        /@import .* is deprecated/i,
        /Global built-in functions are deprecated/i,
        /You're importing a component that needs .* in a Server Component/i,
        /Unsupported .* API/i,
        /Module not found: Error: Can't resolve 'fs' in/i,
        /Module not found: Error: Can't resolve 'path' in/i,
        /Can't resolve 'fs' in/i,
        /Can't resolve 'path' in/i,
        /Can't resolve 'crypto' in/i,
        /Can't resolve 'stream' in/i,
      ],
    };

    if (process.env.ANALYZE === "true" && !isServer) {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins = config.plugins || [];
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: dev ? "analyze/client-dev.html" : "analyze/client.html",
        })
      );
    }

    if (!dev && !isServer) {
      config.optimization = {
        ...(config.optimization || {}),
        splitChunks: {
          ...(config.optimization?.splitChunks || {}),
          chunks: "all",
        },
        runtimeChunk: "single",
      };
    }

    const { DefinePlugin } = require("webpack");
    config.plugins = config.plugins || [];
    config.plugins.push(
      new DefinePlugin({
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      })
    );

    return config;
  },
};

export default withPWA(nextConfig);
