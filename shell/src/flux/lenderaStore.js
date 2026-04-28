import { dispatcher } from './dispatcher.js';

const initialState = {
  session: {
    isLoggedIn: false,
    userName: '',
  },
  application: {
    currentStep: 1,
    totalSteps: 4,
    personalData: {
      fullName: '',
      idNumber: '',
      income: '',
      amount: '',
    },
    kycStatus: 'idle',
    documentsStatus: 'idle',
    approvalStatus: 'draft',
    notifications: [],
  },
};

function calculateProgress(state) {
  const { currentStep, totalSteps } = state.application;
  return Math.round((currentStep / totalSteps) * 100);
}

class LenderaStore {
  constructor() {
    this.state = { ...initialState, progress: calculateProgress(initialState) };
    this.listeners = new Set();
    dispatcher.register(this.handleAction.bind(this));
  }

  getState() { return this.state; }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emitChange() {
    this.listeners.forEach((l) => l());
  }

  setState(nextState) {
    this.state = { ...nextState, progress: calculateProgress(nextState) };
    this.emitChange();
  }

  addNotification(message, tone = 'default') {
    const item = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      message,
      tone,
    };
    this.setState({
      ...this.state,
      application: {
        ...this.state.application,
        notifications: [item, ...this.state.application.notifications].slice(0, 5),
      },
    });
  }

  handleAction(action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        this.setState({ ...this.state, session: { isLoggedIn: true, userName: action.payload.userName } });
        this.addNotification(`Bienvenido, ${action.payload.userName}.`, 'success');
        break;
      case 'SAVE_PERSONAL_DATA':
        this.setState({ ...this.state, application: { ...this.state.application, personalData: { ...action.payload }, currentStep: 2 } });
        this.addNotification('Datos personales guardados correctamente.', 'success');
        break;
      case 'KYC_STARTED':
        this.setState({ ...this.state, application: { ...this.state.application, kycStatus: 'loading' } });
        this.addNotification('Validación de identidad en proceso.', 'default');
        break;
      case 'KYC_SUCCESS':
        this.setState({ ...this.state, application: { ...this.state.application, kycStatus: 'success', currentStep: 3 } });
        this.addNotification('Identidad validada correctamente.', 'success');
        break;
      case 'KYC_ERROR':
        this.setState({ ...this.state, application: { ...this.state.application, kycStatus: 'error' } });
        this.addNotification('No fue posible validar la identidad. Intenta de nuevo.', 'error');
        break;
      case 'DOCUMENT_UPLOAD_STARTED':
        this.setState({ ...this.state, application: { ...this.state.application, documentsStatus: 'loading' } });
        this.addNotification('Cargando documentos al sistema.', 'default');
        break;
      case 'DOCUMENT_UPLOAD_SUCCESS':
        this.setState({ ...this.state, application: { ...this.state.application, documentsStatus: 'success', currentStep: 4 } });
        this.addNotification('Documentos cargados y verificados.', 'success');
        break;
      case 'DOCUMENT_UPLOAD_ERROR':
        this.setState({ ...this.state, application: { ...this.state.application, documentsStatus: 'error' } });
        this.addNotification('Error al cargar documentos. Verifica el archivo y reintenta.', 'error');
        break;
      case 'SUBMIT_FOR_REVIEW':
        this.setState({ ...this.state, application: { ...this.state.application, approvalStatus: 'reviewing' } });
        this.addNotification('Tu solicitud fue enviada a evaluación.', 'default');
        break;
      case 'APPROVE_APPLICATION':
        this.setState({ ...this.state, application: { ...this.state.application, approvalStatus: 'approved' } });
        this.addNotification('Solicitud aprobada. Listo para desembolso.', 'success');
        break;
      case 'REJECT_APPLICATION':
        this.setState({ ...this.state, application: { ...this.state.application, approvalStatus: 'rejected' } });
        this.addNotification('Solicitud rechazada por validación interna.', 'error');
        break;
      case 'GO_TO_STEP':
        this.setState({ ...this.state, application: { ...this.state.application, currentStep: action.payload.step } });
        break;
      case 'RESET_APPLICATION':
        this.setState({ ...initialState, session: this.state.session });
        this.addNotification('Se reinició la solicitud para una nueva simulación.', 'default');
        break;
      default:
        break;
    }
  }
}

export const lenderaStore = new LenderaStore();
