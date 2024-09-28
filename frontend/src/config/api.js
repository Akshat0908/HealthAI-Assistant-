const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

   export const ENDPOINTS = {
     CHAT: `${API_BASE_URL}/chat/completions`,
   };