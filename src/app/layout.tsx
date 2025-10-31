import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// import "bootstrap/dist/css/bootstrap.min.css";            // Bootstrap core
// import "bootstrap/dist/js/bootstrap.bundle.min.js";       // Bootstrap JS Bundle
import "@/styles/bootstrap-custom.scss";                  // Boostrap customizado
import "animate.css/animate.min.css";                     // Animaciones
import "@fortawesome/fontawesome-free/css/all.min.css";   // Iconos FontAwesome
import "./globals.css";                                   // estilos propios

import ConnectionStatus from "@/components/ConnectionStatus";
import React from "react"; // IMPORTANTE para JSX en algunas configs TS
import BootstrapClient from "@/lib/BootstrapClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Money",
  description: "Next.js 16 + Turbopack + PWA + Bootstrap + Animate.css + FontAwesome + Geist Fonts + TypeScript + SCSS + Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BootstrapClient /> 
        {children}
        <ConnectionStatus /> {/* ✅ Mejor después del contenido para overlay limpio */}
      </body>
    </html>
  );
}
