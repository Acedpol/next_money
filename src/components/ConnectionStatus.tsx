"use client";

import { useEffect, useState } from "react";

export default function ConnectionStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: online ? "#28a745" : "#f87171",
        color: "white",
        textAlign: "center",
        padding: "0.5rem",
      }}
    >
      {online
        ? "Conectado — todos los datos disponibles"
        : "Sin conexión — algunos datos pueden no estar disponibles"}
    </div>
  );
}
