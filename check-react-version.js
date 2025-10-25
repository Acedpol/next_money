#!/usr/bin/env node
import fs from "fs";
import { execSync } from "child_process";
import {
  printHeader,
  printFooter,
  logInfo,
  logSuccess,
  logWarn,
  logError,
} from "./utils/check-style.js";

let allGood = true;

printHeader("Verificación del entorno Next.js PWA");

try {
  logInfo("Verificando versiones de React y Next.js...");

  const reactVersion = execSync("npm list react --depth=0").toString();
  const nextVersion = execSync("npm list next --depth=0").toString();

  const reactMatch = reactVersion.match(/react@([\d.]+)/);
  const nextMatch = nextVersion.match(/next@([\d.]+)/);

  const reactVer = reactMatch ? reactMatch[1] : "desconocida";
  const nextVer = nextMatch ? nextMatch[1] : "desconocida";

  logSuccess(`React ${reactVer} y Next.js ${nextVer} detectados.`);

  logInfo("Verificando tipos de React y ReactDOM...");

  const hasTypesReact = fs.existsSync("node_modules/@types/react");
  const hasTypesDOM = fs.existsSync("node_modules/@types/react-dom");

  if (hasTypesReact && hasTypesDOM) {
    logSuccess("Tipos de React y ReactDOM detectados correctamente.");
  } else {
    logWarn("No se encontraron todos los tipos de React. Instala con: npm i -D @types/react @types/react-dom");
    allGood = false;
  }

  logInfo("Verificando configuración PWA...");
  if (fs.existsSync("next.config.ts")) {
    logSuccess("Archivo de configuración Next.js detectado correctamente.");
  } else {
    logWarn("No se encontró next.config.ts, puede afectar la integración PWA.");
    allGood = false;
  }

} catch (err) {
  logError(`Error al obtener versiones o dependencias: ${err.message}`);
  allGood = false;
}

printFooter(
  allGood,
  "Verificación del entorno Next.js y React completada correctamente. ¡Listo para compilar!",
  "Se detectaron problemas con las versiones o configuración de React/Next. Revisa antes del build."
);
