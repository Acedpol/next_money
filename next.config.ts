// next.config.ts
import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "next-pwa";
const runtimeCaching = require("next-pwa/cache");
import type { PWAOptions } from "./types/pwa-options";
// Import CJS de forma compatible
import FilterWarningsPlugin from "webpack-filter-warnings-plugin";

const isProd = process.env.NODE_ENV === "production";
const isCI = Boolean(process.env.CI);

// Configuración PWA completa
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

// Patrones comunes de warnings por ámbito
const patterns = {
  // Warnings típicos de Webpack y loaders
  webpack: [
    /Failed to parse source map/i,
    /source-map-loader/i,
    /Critical dependency: the request of a dependency is an expression/i,
    /export '.*' \(imported as '.*'\) was not found in/i,
    /dependency is an expression/i,
    /require\.extensions is not supported by webpack/i,
  ],
  // CSS y orden de estilos (mini-css-extract-plugin)
  css: [
    /Conflicting order\. Following module has been added:/i,
    /chunk styles \[mini-css-extract-plugin\]/i,
  ],
  // Sass (deprecations por @import, funciones globales, etc.)
  sass: [
    /DEPRECATION WARNING/i,
    /Sass .* deprecation warning/i,
    /@import .* is deprecated/i,
    /Global built-in functions are deprecated/i,
  ],
  // Next/React server-client interop
  nextReact: [
    /You're importing a component that needs .* in a Server Component/i,
    /Unsupported .* API/i,
  ],
  // Node core en cliente (cuando librerías intentan usar fs/path/crypto/stream en browser)
  nodeCoreInClient: [
    /Module not found: Error: Can't resolve 'fs' in/i,
    /Module not found: Error: Can't resolve 'path' in/i,
    /Can't resolve 'fs' in/i,
    /Can't resolve 'path' in/i,
    /Can't resolve 'crypto' in/i,
    /Can't resolve 'stream' in/i,
  ],
};

// Helper: combinar patrones deseados
const commonExclude: RegExp[] = [
  ...patterns.webpack,
  ...patterns.css,
  ...patterns.sass,
  ...patterns.nextReact,
  ...patterns.nodeCoreInClient,
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Opcional: reducir ruido/errores en CI (descomenta si lo gestionas fuera)
  typescript: {
    // ignoreBuildErrors: isCI,
  },

  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
    // Puedes añadir más flags experimentales aquí si los necesitas
  },

  // Configuración de Webpack (aplica en build y en dev si usas Webpack en lugar de Turbopack)
  webpack: (config, { isServer, dev }) => {
    // Extensiones TS adicionales
    config.resolve.extensions = Array.from(
      new Set([...(config.resolve.extensions || []), ".ts", ".tsx"])
    );

    // 1) Silenciar deprecations de Sass en dependencias (p.ej., Bootstrap en node_modules)
    const patchSassLoaderOptions = (use: any[]) => {
      for (const u of use) {
        const isSassLoader =
          typeof u?.loader === "string" &&
          (u.loader.includes("sass-loader") || u.loader === "sass-loader");
        if (isSassLoader) {
          u.options = u.options || {};
          u.options.sassOptions = {
            ...(u.options.sassOptions || {}),
            // No mostrar deprecations de dependencias (node_modules)
            quietDeps: true,
            // Si tu Dart Sass >= 1.69 puedes plantear:
            // silenceDeprecations: ["import", "global-builtin"], // o ["all"]
          };
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

    // Localizar raíz de reglas (Next suele envolver en oneOf)
    const rulesRoot =
      (config.module?.rules as any[])?.find((r: any) => Array.isArray(r.oneOf))
        ?.oneOf || (config.module?.rules as any[]);

    if (Array.isArray(rulesRoot)) visitRules(rulesRoot);

    // 2) Plugin para filtrar warnings que Webpack sí emite por consola
    config.plugins = config.plugins || [];
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: commonExclude,
      })
    );

    // 3) Ejemplo opcional: silenciar todos los warnings en dev temporalmente
    // if (dev) config.plugins.push(new FilterWarningsPlugin({ exclude: [/./] }));

    // console.log("[next.config] Webpack isServer:", isServer, "dev:", dev);
    return config;
  },

  // Turbopack en desarrollo. Nota: los plugins de Webpack no aplican en Turbopack,
  // pero las opciones de sass-loader (quietDeps) siguen ayudando al reducir ruido del propio Sass.
  ...(isProd
    ? {}
    : {
        turbopack: {
          root: path.resolve(process.cwd()),
          // Si tu versión lo soporta, puedes ajustar niveles de logging:
          // experimental: { logLevel: "error" }, // "error" | "warn" | "info" | "debug"
        },
      }),
};

// Logs informativos
console.log("🌍 Entorno:", process.env.NODE_ENV);
console.log("🧩 PWA:", isProd ? "✅ ON (producción)" : "⚠️ OFF (desarrollo)");
if (isCI) console.log("🏗️ CI:", "activo");

// Export con PWA
export default withPWA(nextConfig);
