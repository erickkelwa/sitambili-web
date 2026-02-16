const isDevelopment = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '5173';

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? 'http://localhost:3000' : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'));
