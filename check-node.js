#!/usr/bin/env node

// const semver = require("semver");

let semver;
try {
  semver = require("semver");
} catch {
  console.error("⚠️  Falta el paquete 'semver'. Ejecuta: npm install --save-dev semver");
  process.exit(1);
}

const { engines } = require("./package.json");

// Versión mínima recomendada para Next.js 16
const requiredVersion = engines?.node || ">=18.18.0";

if (!semver.satisfies(process.version, requiredVersion)) {
  console.error(
    `\x1b[31m⚠️  Node.js ${process.version} no cumple con la versión mínima requerida (${requiredVersion}).\x1b[0m`
  );
  console.error("➡️  Actualiza Node.js antes de continuar.\n");
  process.exit(1);
} else {
  console.log(`✅ Node.js ${process.version} es compatible (${requiredVersion}).`);
}
