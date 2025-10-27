"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConnectionStatus() {
  const [online, setOnline] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detecta modo oscuro del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handleThemeChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleThemeChange);

    // Manejo de conexión/desconexión
    const handleOnline = () => {
      setOnline(true);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    };
    const handleOffline = () => {
      setOnline(false);
      setVisible(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const bgColor = online
    ? isDark
      ? "#22c55e" // verde brillante (modo oscuro)
      : "#16a34a" // verde más suave (modo claro)
    : isDark
    ? "#ef4444" // rojo claro (modo oscuro)
    : "#dc2626"; // rojo intenso (modo claro)

  const textColor = isDark ? "#f9fafb" : "#ffffff";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            background: bgColor,
            color: textColor,
            textAlign: "center",
            padding: "0.6rem 1rem",
            fontSize: "0.95rem",
            letterSpacing: "0.3px",
            zIndex: 1000,
            boxShadow: isDark
              ? "0 -2px 8px rgba(255,255,255,0.15)"
              : "0 -2px 8px rgba(0,0,0,0.15)",
            backdropFilter: "blur(6px)",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          {online
            ? "✅ Conectado — todos los datos disponibles"
            : "⚠️ Sin conexión — algunos datos pueden no estar disponibles"}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
