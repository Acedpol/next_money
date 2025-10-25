#!/usr/bin/env node
import fs from "fs";
import path from "path";
import {
  printHeader,
  printFooter,
  logInfo,
  logSuccess,
  logWarn,
  logError,
} from "./utils/check-style.js";

const root = process.cwd();
let allGood = true;

printHeader("Verificación del entorno PWA");

const checkFile = (filePath, desc) => {
  if (fs.existsSync(filePath)) {
    logSuccess(`${desc} encontrado: ${path.relative(root, filePath)}`);
    return true;
  } else {
    logError(`${desc} no encontrado: ${path.relative(root, filePath)}`);
    return false;
  }
};

// 1️⃣ manifest.json
const manifestPath = path.join(root, "public", "manifest.json");
if (checkFile(manifestPath, "manifest.json")) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const requiredFields = ["name", "short_name", "start_url", "display", "background_color", "theme_color", "icons"];
    const missing = requiredFields.filter((f) => !manifest[f]);

    if (missing.length > 0) {
      logWarn(`Faltan campos esenciales en manifest.json: ${missing.join(", ")}`);
      allGood = false;
    } else {
      logSuccess("manifest.json contiene todos los campos esenciales.");
    }

    const icons = manifest.icons || [];
    const validIcons = icons.filter((icon) => icon.src && icon.sizes && icon.type);
    if (validIcons.length === 0) {
      logError("No se encontraron iconos válidos en manifest.json.");
      allGood = false;
    } else {
      logSuccess(`Se encontraron ${validIcons.length} iconos válidos en manifest.json.`);
    }

  } catch (err) {
    logError(`El archivo manifest.json no es válido: ${err.message}`);
    allGood = false;
  }
} else {
  allGood = false;
}

// 2️⃣ next.config
const configTs = path.join(root, "next.config.ts");
const configJs = path.join(root, "next.config.js");

const configFile = fs.existsSync(configTs)
  ? configTs
  : fs.existsSync(configJs)
  ? configJs
  : null;

if (configFile) {
  const content = fs.readFileSync(configFile, "utf-8");

  if (!content.includes("withPWA")) {
    logError("next.config.* existe pero no usa withPWA.");
    allGood = false;
  } else {
    logSuccess(`Configuración PWA detectada en ${path.basename(configFile)}.`);

    const missingSettings = [];
    if (!/dest:\s*['"`]public['"`]/.test(content)) missingSettings.push("dest: 'public'");
    if (!/register:\s*true/.test(content)) missingSettings.push("register: true");
    if (!/skipWaiting:\s*true/.test(content)) missingSettings.push("skipWaiting: true");

    if (missingSettings.length > 0) {
      logWarn(`Faltan opciones recomendadas: ${missingSettings.join(", ")}`);
      allGood = false;
    } else {
      logSuccess("Configuración PWA contiene las opciones esenciales.");
    }

    if (!/runtimeCaching/i.test(content)) {
      logWarn("No se encontró configuración de runtimeCaching.");
    } else {
      logSuccess("runtimeCaching detectado (modo offline activo).");
    }
  }
} else {
  logError("No se encontró next.config.ts ni next.config.js.");
  allGood = false;
}

// 3️⃣ service worker
const swPath = path.join(root, "public", "sw.js");
if (!checkFile(swPath, "Service Worker (sw.js)")) {
  logWarn("El Service Worker será generado automáticamente por next-pwa durante el build.");
}

// 4️⃣ iconos
const iconDir = path.join(root, "public", "icons");
if (fs.existsSync(iconDir)) {
  const icons = fs.readdirSync(iconDir).filter((f) => /\.(png|jpg|jpeg|svg|webp)$/i.test(f));
  if (icons.length > 0) {
    logSuccess(`${icons.length} iconos encontrados en /public/icons.`);
  } else {
    logWarn("La carpeta /public/icons existe pero está vacía.");
    allGood = false;
  }
} else {
  logError("No se encontraron iconos en /public/icons.");
  allGood = false;
}

printFooter(
  allGood,
  "Verificación PWA completada correctamente. ¡Listo para build!",
  "Faltan archivos o configuraciones PWA. Corrige antes del build."
);
