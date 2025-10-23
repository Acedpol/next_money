'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>❌ Ha ocurrido un error</h2>
      <p>{error.message}</p>
    </div>
  );
}
