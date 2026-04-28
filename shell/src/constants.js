export const steps = [
  { id: 1, title: 'Datos',      emoji: '👤' },
  { id: 2, title: 'KYC',        emoji: '🛡️' },
  { id: 3, title: 'Documentos', emoji: '📄' },
  { id: 4, title: 'Resultado',  emoji: '💳' },
];

export const MF_DOMAINS = [
  { name: 'mf-auth',        port: 3001, owner: 'Seguridad / Identidad',   desc: 'Autenticación' },
  { name: 'mf-onboarding',  port: 3002, owner: 'Experiencia cliente',      desc: 'Datos del solicitante' },
  { name: 'mf-kyc',         port: 3003, owner: 'Compliance',               desc: 'Validación KYC' },
  { name: 'mf-documents',   port: 3004, owner: 'Compliance',               desc: 'Carga documental' },
  { name: 'mf-credit',      port: 3005, owner: 'Crédito',                  desc: 'Evaluación crediticia' },
];
