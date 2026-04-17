import { dispatcher } from '../flux/dispatcher';

export const lenderaActions = {
  login(userName) {
    dispatcher.dispatch({ type: 'LOGIN_SUCCESS', payload: { userName } });
  },

  savePersonalData(data) {
    dispatcher.dispatch({ type: 'SAVE_PERSONAL_DATA', payload: data });
  },

  startKyc() {
    dispatcher.dispatch({ type: 'KYC_STARTED' });
    window.setTimeout(() => {
      const ok = Math.random() > 0.2;
      dispatcher.dispatch({ type: ok ? 'KYC_SUCCESS' : 'KYC_ERROR' });
    }, 1400);
  },

  uploadDocument() {
    dispatcher.dispatch({ type: 'DOCUMENT_UPLOAD_STARTED' });
    window.setTimeout(() => {
      const ok = Math.random() > 0.2;
      dispatcher.dispatch({ type: ok ? 'DOCUMENT_UPLOAD_SUCCESS' : 'DOCUMENT_UPLOAD_ERROR' });
    }, 1400);
  },

  submitForReview() {
    dispatcher.dispatch({ type: 'SUBMIT_FOR_REVIEW' });
    window.setTimeout(() => {
      const approved = Math.random() > 0.35;
      dispatcher.dispatch({ type: approved ? 'APPROVE_APPLICATION' : 'REJECT_APPLICATION' });
    }, 1600);
  },

  goToStep(step) {
    dispatcher.dispatch({ type: 'GO_TO_STEP', payload: { step } });
  },

  resetApplication() {
    dispatcher.dispatch({ type: 'RESET_APPLICATION' });
  },
};
