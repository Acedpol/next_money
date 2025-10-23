#!/usr/bin/env node

/**
 * check-sw.js
 * Comprueba que el Service Worker se haya generado correctamente tras el build.
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const swPath = path.join(__dirname, "public", "sw.js");

console.log(chalk.cyan("\n🔍 Verificando Service Worker (sw.js)...\n"));

if (!fs.existsSync(swPath)) {
  console.error(chalk.red("❌ No se encontró public/sw.js después del build."));
  console.error(
    chalk.yellow("ℹ️  Asegúrate de que next-pwa esté configurado con dest: 'public' y build terminado correctamente.")
  );
  process.exit(1);
}

const stats = fs.statSync(swPath);
if (stats.size < 1000) {
  console.error(
    chalk.red(`❌ El archivo sw.js parece vacío o incompleto (${stats.size} bytes).`)
  );
  console.error(
    chalk.yellow("ℹ️  Es posible que next-pwa no haya podido generar el Service Worker.")
  );
  process.exit(1);
}

console.log(chalk.green(`✅ Service Worker verificado correctamente (${(stats.size / 1024).toFixed(1)} KB).`));
console.log(chalk.green("✅ PWA lista para modo offline y despliegue.\n"));
