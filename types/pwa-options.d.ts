// types/pwa-options.d.ts

export interface PWAOptions {
  /** 📁 Directorio donde se genera el Service Worker */
  dest: string;

  /** ⚙️ Registra automáticamente el SW */
  register?: boolean;

  /** 🚀 Activa inmediatamente el nuevo SW al instalarse */
  skipWaiting?: boolean;

  /** 🔕 Desactiva PWA (útil en desarrollo) */
  disable?: boolean;

  /** 🔄 Estrategias Workbox para recursos dinámicos */
  runtimeCaching?: any[];

  /** 🚫 Archivos a excluir del build */
  buildExcludes?: string[];

  /** 🧩 Archivos fallback para contenido offline */
  fallbacks?: {
    document?: string;
    image?: string;
    audio?: string;
    video?: string;
  };

  /** 📍 Define el ámbito del SW */
  scope?: string;

  /** 🧾 Nombre del archivo del Service Worker */
  sw?: string;

  /** ✏️ Ruta al Service Worker personalizado */
  swSrc?: string;

  /** 🧭 Cachea la URL inicial `/` */
  cacheStartUrl?: boolean;

  /** 🌐 Recarga la app al volver a estar online */
  reloadOnOnline?: boolean;

  /** 💼 Forzar modo de compilación */
  mode?: "production" | "development";

  /** 📦 Tamaño máximo de archivo para cachear */
  maximumFileSizeToCacheInBytes?: number;
}
