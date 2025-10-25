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

printHeader("Verificación del Service Worker");

const swPath = path.join(root, "public", "sw.js");

if (fs.existsSync(swPath)) {
  const content = fs.readFileSync(swPath, "utf-8");
  logSuccess("Service Worker (sw.js) encontrado.");

  if (/self\.addEventListener/.test(content)) {
    logSuccess("Service Worker contiene listeners de eventos (install, fetch, etc.).");
  } else {
    logWarn("Service Worker encontrado pero sin listeners de eventos.");
    allGood = false;
  }

  if (/cache/i.test(content)) {
    logSuccess("Service Worker maneja caché (modo offline activo).");
  } else {
    logWarn("No se detecta manejo de caché en el Service Worker.");
  }
} else {
  logError("No se encontró el archivo public/sw.js.");
  allGood = false;
}

printFooter(
  allGood,
  "Service Worker verificado correctamente. Todo listo para modo offline.",
  "El Service Worker presenta errores o no se encuentra. Revisa antes del build."
);
