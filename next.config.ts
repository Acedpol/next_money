// next.config.ts
import path from 'path';
import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Opciones experimentales válidas y seguras
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Configuración específica para Turbopack
  turbopack: {
    root: path.resolve(__dirname), // Evita el warning de "workspace root"
  },
}

// Exportar la configuración combinada con PWA
export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
