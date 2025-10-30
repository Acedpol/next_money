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
const offlinePath = path.join(root, "src", "app", "offline.tsx");
let allGood = true;

printHeader("Verificación de la página offline");

// 🧾 Plantilla por defecto
const defaultOfflinePage = `\
"use client";

import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-6">
      <WifiOff size={64} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Sin conexión</h1>
      <p className="text-gray-500 mb-4">
        Parece que no tienes conexión a internet.
        Algunas funciones pueden no estar disponibles.
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Reintentar
      </Button>
    </main>
  );
}
`;

// 🧠 Comprobación
if (fs.existsSync(offlinePath)) {
  logSuccess("Página offline encontrada en src/app/offline.tsx");
} else {
  logWarn("No se encontró la página offline. Creando una por defecto...");
  try {
    fs.mkdirSync(path.dirname(offlinePath), { recursive: true });
    fs.writeFileSync(offlinePath, defaultOfflinePage, "utf8");
    logSuccess("Página offline creada correctamente ✅");
  } catch (err) {
    logError("Error al crear la página offline:", err.message);
    allGood = false;
  }
}

printFooter(
  allGood,
  "Página offline verificada correctamente. Soporte offline activo.",
  "La verificación de la página offline falló. Revisa la ruta o permisos."
);
