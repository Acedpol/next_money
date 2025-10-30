"use client";

import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function useBootstrap() {
  useEffect(() => {
    // Bootstrap se carga automáticamente al importar el bundle
    console.log("✅ Bootstrap JS inicializado");
  }, []);
}
