import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConnectionStatus from "@/components/ConnectionStatus";
import React from "react"; // ✅ IMPORTANTE para JSX en algunas configs TS

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
  description: "Gestor financiero PWA construido con Next.js 16 + Turbopack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
        <ConnectionStatus /> {/* ✅ Mejor después del contenido para overlay limpio */}
      </body>
    </html>
  );
}
