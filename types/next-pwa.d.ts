declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    interface PWAOptions {
      dest?: string;
      disable?: boolean;
      register?: boolean;
      skipWaiting?: boolean;
      buildExcludes?: string[];
    }
  
    function withPWA(options?: PWAOptions): (config: NextConfig) => NextConfig;
    export = withPWA;
  }
  