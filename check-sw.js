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
const swPath = path.join(root, "public", "sw.js");
let allGood = true;

printHeader("Verificación del Service Worker");

if (fs.existsSync(swPath)) {
  const content = fs.readFileSync(swPath, "utf-8");
  logSuccess("Service Worker (sw.js) encontrado en /public.");

  if (/self\.addEventListener/.test(content)) {
    logSuccess("Service Worker contiene listeners de eventos (install, fetch, etc.).");
  } else {
    logWarn("Service Worker encontrado pero sin listeners de eventos registrados.");
    allGood = false;
  }

  if (/cache/i.test(content)) {
    logSuccess("Service Worker maneja caché (modo offline activo).");
  } else {
    logWarn("No se detecta manejo de caché en el Service Worker.");
  }

  printFooter(
    allGood,
    "Service Worker verificado correctamente. Todo listo para modo offline.",
    "El Service Worker presenta advertencias o configuraciones incompletas."
  );
  process.exit(allGood ? 0 : 1);
} else {
  logInfo("No se encontró el archivo /public/sw.js.");
  logInfo("Este archivo será generado automáticamente durante el build por next-pwa.");

  printFooter(
    true,
    "Check completado: Service Worker pendiente de generación automática.",
    ""
  );
  process.exit(0);
}
