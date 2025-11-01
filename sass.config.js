// sass.config.js
// Configuración centralizada de Sass para Webpack 5 y Turbopack.
// Next 15/16 lee estas opciones cuando existen, y además las inyectamos en sass-loader.
// Objetivo: silenciar deprecations por @import durante la migración a @use/@forward y
// unificar rutas/variables globales.

const path = require("path");

module.exports = {
  // Silencia warnings de dependencias y deprecations de @import
  quietDeps: true,
  silenceDeprecations: ["import"],
//   silenceDeprecations:
//     process.env.NODE_ENV === "development"
//       ? ["all"] // En desarrollo, silencia todas las deprecations
//       : ["import", "global-builtin", "issue"], // En otros entornos, solo las típicas

  // Rutas adicionales para @use y @forward (evita imports relativos frágiles)
  includePaths: [
    path.resolve(process.cwd(), "src/styles"),
    path.resolve(process.cwd(), "src/shared/styles"),
  ],

  // Opcional: define loadPaths alternativos si usas node-sass-magic-importer u otros
  // loadPaths: [],

  // Opcional: variables globales inyectadas en cada archivo (requiere sass-loader adicional)
  // Nota: next-sass no inyecta automáticamente; si quieres preprender data/global, hazlo en Webpack.
  // additionalData: `$env: ${process.env.NODE_ENV};`,

  // Funciones y módulos nativos modernos; evita legacy api
  // style: "expanded", // para debug; en prod Next minimiza con SWC/CSS Minifier
  // sourceMap: process.env.NODE_ENV !== "production", // se sobrepone en webpack dev
};
