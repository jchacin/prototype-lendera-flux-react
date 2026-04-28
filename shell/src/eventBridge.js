/**
 * eventBridge.js — Shell
 *
 * Patrón: Event Bus sobre window.
 *
 * MF → Shell : window CustomEvent 'lendera:action'   { type, payload }
 * Shell → MF : window CustomEvent 'lendera:state'    { ...storeState }
 * MF → Shell : window CustomEvent 'lendera:requestState'  (sin payload)
 *
 * El shell traduce los eventos de acción al dispatcher Flux y
 * difunde el nuevo estado a todos los MFs cargados en el documento.
 */

import { lenderaStore } from './flux/lenderaStore.js';
import { lenderaActions } from './actions/lenderaActions.js';

export function initEventBridge() {
  // ── MF → Shell ──────────────────────────────────────────────
  window.addEventListener('lendera:action', (e) => {
    const { type, payload } = e.detail ?? {};
    switch (type) {
      case 'LOGIN_SUCCESS':
        lenderaActions.login(payload?.userName ?? 'Usuario');
        break;
      case 'SAVE_PERSONAL_DATA':
        lenderaActions.savePersonalData(payload);
        break;
      case 'START_KYC':
        lenderaActions.startKyc();
        break;
      case 'UPLOAD_DOCUMENT':
        lenderaActions.uploadDocument();
        break;
      case 'SUBMIT_FOR_REVIEW':
        lenderaActions.submitForReview();
        break;
      case 'GO_TO_STEP':
        lenderaActions.goToStep(payload?.step);
        break;
      case 'RESET_APPLICATION':
        lenderaActions.resetApplication();
        break;
      default:
        break;
    }
  });

  // ── MF pide estado al montar ─────────────────────────────────
  window.addEventListener('lendera:requestState', broadcastState);

  // ── Shell → MFs: difunde cada cambio del store ───────────────
  lenderaStore.subscribe(broadcastState);
}

function broadcastState() {
  window.dispatchEvent(
    new CustomEvent('lendera:state', { detail: lenderaStore.getState() })
  );
}
