// sass.config.js
module.exports = {
  // No mostrar deprecations provenientes de dependencias (node_modules)
  quietDeps: true,

  // Silenciar categorías específicas de deprecations (requiere Dart Sass >= 1.69)
  // Las más comunes: uso de @import y funciones globales
  silenceDeprecations:
    process.env.NODE_ENV === "development"
      ? ["all"] // En desarrollo, silencia todas las deprecations
      : ["import", "global-builtin"], // En otros entornos, solo las típicas
};
