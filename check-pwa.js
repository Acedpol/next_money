#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";

const root = process.cwd();

// Helper to check file existence
const checkFile = (filePath, desc) => {
  if (fs.existsSync(filePath)) {
    console.log(chalk.green(`✅ ${desc} encontrado: ${path.relative(root, filePath)}`));
    return true;
  } else {
    console.log(chalk.red(`❌ ${desc} no encontrado: ${path.relative(root, filePath)}`));
    return false;
  }
};

let allGood = true;

// 1️⃣ Validar manifest.json 
const manifestPath = path.join(root, "public", "manifest.json");
if (checkFile(manifestPath, "manifest.json")) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const requiredFields = [
      "name",
      "short_name",
      "start_url",
      "display",
      "background_color",
      "theme_color",
      "icons"
    ];

    const missing = requiredFields.filter((f) => !manifest[f]);
    if (missing.length > 0) {
      console.log(
        chalk.yellow(
          `⚠️  Faltan campos esenciales en manifest.json: ${missing.join(", ")}`
        )
      );
      allGood = false;
    } else {
      console.log(chalk.green("✅ manifest.json contiene todos los campos esenciales."));
    }

    // Validar iconos dentro del manifest
    const icons = manifest.icons || [];
    const validIcons = icons.filter((icon) => icon.src && icon.sizes && icon.type);
    if (validIcons.length === 0) {
      console.log(chalk.red("❌ No se encontraron iconos válidos en manifest.json (deben tener src, sizes y type)."));
      allGood = false;
    } else {
      console.log(chalk.green(`✅ Se encontraron ${validIcons.length} iconos válidos en manifest.json.`));
    }

  } catch (err) {
    console.log(chalk.red(`❌ El archivo manifest.json no es un JSON válido (${err.message}).`));
    allGood = false;
  }
} else {
  allGood = false;
}


// 2️⃣ Validar next.config.ts o next.config.js
const configTs = path.join(root, "next.config.ts");
const configJs = path.join(root, "next.config.js");

const configFile = fs.existsSync(configTs)
  ? configTs
  : fs.existsSync(configJs)
  ? configJs
  : null;

if (configFile) {
  const content = fs.readFileSync(configFile, "utf-8");

  // Verificar que use withPWA
  if (!content.includes("withPWA")) {
    console.log(chalk.red("❌ next.config.* existe pero no usa withPWA."));
    allGood = false;
  } else {
    console.log(chalk.green(`✅ Configuración PWA detectada en ${path.basename(configFile)}.`));

    // Verificar configuración PWA clave
    const missingSettings = [];
    if (!/dest:\s*['"`]public['"`]/.test(content)) missingSettings.push("dest: 'public'");
    if (!/register:\s*true/.test(content)) missingSettings.push("register: true");
    if (!/skipWaiting:\s*true/.test(content)) missingSettings.push("skipWaiting: true");

    if (missingSettings.length > 0) {
      console.log(
        chalk.yellow(
          `⚠️  Faltan opciones recomendadas en la configuración PWA: ${missingSettings.join(", ")}`
        )
      );
      allGood = false;
    } else {
      console.log(chalk.green("✅ Configuración PWA contiene las opciones esenciales (dest, register, skipWaiting)."));
    }

    // Verificar configuración de runtimeCaching
    if (!/runtimeCaching/i.test(content)) {
      console.log(chalk.yellow("ℹ️  No se encontró configuración de runtimeCaching (modo offline básico)."));
    } else {
      console.log(chalk.green("✅ runtimeCaching detectado (modo offline activo)."));
    }
  }
} else {
  console.log(chalk.red("❌ No se encontró next.config.ts ni next.config.js."));
  allGood = false;
}


// 3️⃣ Validar service worker
const swPath = path.join(root, "public", "sw.js");
if (!checkFile(swPath, "Service Worker (sw.js)")) {
  console.log(chalk.yellow("ℹ️  El Service Worker será generado automáticamente por next-pwa durante el build."));
}

// 4️⃣ Validar iconos
const iconDir = path.join(root, "public", "icons");
const iconPng = path.join(root, "public", "icon.png");
if (fs.existsSync(iconDir)) {
  const icons = fs.readdirSync(iconDir).filter((f) => /\.(png|jpg|jpeg|svg|webp)$/i.test(f));
  if (icons.length > 0) {
    console.log(chalk.green(`✅ ${icons.length} iconos encontrados en /public/icons.`));
  } else {
    console.log(chalk.yellow("⚠️  La carpeta /public/icons existe pero está vacía."));
    allGood = false;
  }
} else if (fs.existsSync(iconPng)) {
  console.log(chalk.green("✅ Icono PWA encontrado: public/icon.png"));
} else {
  console.log(chalk.red("❌ No se encontraron iconos en /public/icons ni public/icon.png."));
  allGood = false;
}

console.log("\n----------------------------------------");
if (allGood) {
  console.log(chalk.green.bold("✅ Verificación PWA completada correctamente. ¡Listo para build!"));
  process.exit(0);
} else {
  console.log(chalk.red.bold("🚫 Faltan archivos o configuraciones PWA. Corrige antes del build."));
  process.exit(1);
}
