import React, { useState } from 'react';
import { useLenderaStore } from '../hooks/useLenderaStore';
import { lenderaActions } from '../actions/lenderaActions';

export function LoginPanel() {
  const state = useLenderaStore();
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
      <div className="card-header">
        <h2>Ingreso al prototipo</h2>
        <p>Simula el acceso del solicitante al flujo de microcrédito.</p>
      </div>
      <div className="card-body stack-sm">
        <input
          className="input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nombre del usuario"
        />
        <button className="button button-primary button-block" onClick={() => lenderaActions.login(userName || 'Usuario')}>
          Entrar al flujo
        </button>
      </div>
    </section>
  );
}
