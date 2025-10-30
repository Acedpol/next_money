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
