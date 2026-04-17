import React, { useEffect, useState } from 'react';
import { useLenderaStore } from '../hooks/useLenderaStore';
import { lenderaActions } from '../actions/lenderaActions';

export function PersonalDataStep() {
  const state = useLenderaStore();
  const [form, setForm] = useState(() => state.application.personalData);

  useEffect(() => {
    setForm(state.application.personalData);
  }, [state.application.personalData]);

  const canContinue = Object.values(form).every(Boolean);

  return (
    <section className="card">
      <div className="card-header">
        <h2>Paso 1. Datos del solicitante</h2>
        <p>Estado local para inputs y validación inmediata de UI.</p>
      </div>
      <div className="card-body form-grid">
        <input className="input" placeholder="Nombre completo" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="input" placeholder="Número de identificación" value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
        <input className="input" placeholder="Ingreso mensual" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} />
        <input className="input" placeholder="Monto solicitado" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <div className="form-actions">
          <button className="button button-primary" disabled={!canContinue} onClick={() => lenderaActions.savePersonalData(form)}>
            Guardar y continuar
          </button>
          {!canContinue && <p className="muted">Completa todos los campos para continuar.</p>}
        </div>
      </div>
    </section>
  );
}
