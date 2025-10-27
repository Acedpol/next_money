"use client";

import { WifiOff, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OfflinePage() {
  const router = useRouter();
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setReconnected(true);
      setTimeout(() => router.refresh(), 1500);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <WifiOff className="w-16 h-16 text-blue-600" />
        <h1 className="text-2xl font-semibold text-blue-600">
          Estás sin conexión
        </h1>
        <p className="text-gray-600">
          No tienes conexión a Internet. Algunas funciones o datos pueden no
          estar disponibles.
        </p>

        {reconnected ? (
          <p className="text-green-600 font-medium">
            🔄 Conexión restaurada — recargando...
          </p>
        ) : (
          <Button
            onClick={() => router.refresh()}
            className="mt-3 flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" /> Reintentar
          </Button>
        )}
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-400">
        Next Money — Modo Offline
      </footer>
    </main>
  );
}
