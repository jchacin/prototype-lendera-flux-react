/**
 * LoginPanel — mf-auth
 *
 * Dominio: Seguridad / Identidad
 * Comunicación con el shell: window CustomEvents
 *   ← lendera:state  (recibe estado global)
 *   → lendera:action { type: 'LOGIN_SUCCESS', payload: { userName } }
 */

import React, { useState, useEffect } from 'react';

const DEFAULT_STATE = {
  session: { isLoggedIn: false, userName: '' },
};

function useRemoteState() {
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    const handler = (e) => setState(e.detail);
    window.addEventListener('lendera:state', handler);
    window.dispatchEvent(new CustomEvent('lendera:requestState'));
    return () => window.removeEventListener('lendera:state', handler);
  }, []);
  return state;
}

function emitAction(type, payload) {
  window.dispatchEvent(new CustomEvent('lendera:action', { detail: { type, payload } }));
}

export default function LoginPanel() {
  const state = useRemoteState();
  const [userName, setUserName] = useState('José');

  if (state.session.isLoggedIn) {
    return (
      <div className="success-banner">
        Sesión activa como <strong>{state.session.userName}</strong>.
      </div>
    );
  }

  return (
    <section className="card">
      <div style={{ background: '#2563eb', color: '#fff', padding: '6px 20px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
        <span>mf-auth</span>
        <span>:3001 · Seguridad / Identidad</span>
      </div>
      <div className="card-header">
        <h2>Ingreso · <code>mf-auth</code></h2>
        <p>Microfrontend de autenticación. Dominio: Seguridad e identidad. Puerto :3001</p>
      </div>
      <div className="card-body stack-sm">
        <input
          className="input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nombre del usuario"
        />
        <button
          className="button button-primary button-block"
          onClick={() => emitAction('LOGIN_SUCCESS', { userName: userName || 'Usuario' })}
        >
          Entrar al flujo
        </button>
      </div>
    </section>
  );
}
