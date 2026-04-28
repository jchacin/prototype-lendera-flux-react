/**
 * Entrada standalone de mf-auth.
 * Solo se usa en desarrollo independiente (vite dev / preview).
 * Cuando el shell consume este MF, solo importa LoginPanel.jsx
 * a través del remoteEntry.js generado por Module Federation.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPanel from './LoginPanel.jsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '520px', margin: '0 auto' }}>
      <div style={{ background: '#dbeafe', color: '#1d4ed8', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.85rem' }}>
        <strong>mf-auth</strong> — modo standalone · En integración, el shell proporciona el CSS y el event bus.
      </div>
      <LoginPanel />
    </div>
  </React.StrictMode>
);
