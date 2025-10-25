#!/usr/bin/env node
import { execSync } from "child_process";
import semver from "semver";
import {
  printHeader,
  printFooter,
  logInfo,
  logSuccess,
  logWarn,
  logError,
} from "./utils/check-style.js";

let allGood = true;

printHeader("Verificación del entorno Node.js");

try {
  const nodeVersion = execSync("node -v").toString().trim();
  const npmVersion = execSync("npm -v").toString().trim();

  logInfo(`Versión de Node.js detectada: ${nodeVersion}`);
  logInfo(`Versión de npm detectada: ${npmVersion}`);

  if (semver.gte(nodeVersion, "18.18.0")) {
    logSuccess("Node.js cumple con la versión mínima recomendada (>= 18.18.0).");
  } else {
    logError("Node.js no cumple con la versión mínima requerida (>= 18.18.0).");
    allGood = false;
  }

  if (semver.gte(npmVersion, "9.0.0")) {
    logSuccess("npm cumple con la versión mínima recomendada (>= 9.0.0).");
  } else {
    logWarn("npm está por debajo de la versión recomendada (>= 9.0.0). Se recomienda actualizar.");
  }
} catch (err) {
  logError(`Error al verificar versiones: ${err.message}`);
  allGood = false;
}

printFooter(
  allGood,
  "Verificación del entorno Node.js completada correctamente. ¡Listo para continuar!",
  "Se detectaron errores en el entorno Node.js. Revisa los puntos anteriores."
);
