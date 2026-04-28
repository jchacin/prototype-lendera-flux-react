/**
 * PersonalDataStep — mf-onboarding
 *
 * Dominio: Experiencia cliente
 * Comunicación con el shell: window CustomEvents
 *   ← lendera:state  (recibe estado global)
 *   → lendera:action { type: 'SAVE_PERSONAL_DATA', payload: formData }
 */

import React, { useState, useEffect } from 'react';

const EMPTY_FORM = { fullName: '', idNumber: '', income: '', amount: '' };

const DEFAULT_STATE = {
  application: { personalData: EMPTY_FORM },
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

export default function PersonalDataStep() {
  const state = useRemoteState();
  const [form, setForm] = useState(() => state.application.personalData ?? EMPTY_FORM);

  useEffect(() => {
    setForm(state.application.personalData ?? EMPTY_FORM);
  }, [state.application.personalData]);

  const canContinue = Object.values(form).every(Boolean);

  return (
    <section className="card">
      <div style={{ background: '#059669', color: '#fff', padding: '6px 20px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
        <span>mf-onboarding</span>
        <span>:3002 · Experiencia cliente</span>
      </div>
      <div className="card-header">
        <h2>Paso 1. Datos del solicitante · <code>mf-onboarding</code></h2>
        <p>Microfrontend de incorporación. Dominio: Experiencia cliente. Puerto :3002</p>
      </div>
      <div className="card-body form-grid">
        <input className="input" placeholder="Nombre completo"
          value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="input" placeholder="Número de identificación"
          value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
        <input className="input" placeholder="Ingreso mensual"
          value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} />
        <input className="input" placeholder="Monto solicitado"
          value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <div className="form-actions">
          <button
            className="button button-primary"
            disabled={!canContinue}
            onClick={() => emitAction('SAVE_PERSONAL_DATA', form)}
          >
            Guardar y continuar
          </button>
          {!canContinue && <p className="muted">Completa todos los campos para continuar.</p>}
        </div>
      </div>
    </section>
  );
}
