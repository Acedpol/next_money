'use client';
import { useEffect, useState } from 'react';

export default function ConnectionStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  if (online) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#f87171',
        color: 'white',
        textAlign: 'center',
        padding: '0.5rem',
      }}
    >
      🔌 Sin conexión — algunos datos pueden no estar disponibles
    </div>
  );
}
