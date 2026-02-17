const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? 'http://localhost:3000' : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'));
