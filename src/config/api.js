import axios from 'axios';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const apiClient = axios.create({
  baseURL: '/api-football',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  },
  timeout: 10000,
});

let quotaCallback = null;
export function setQuotaCallback(fn) {
  quotaCallback = fn;
}

apiClient.interceptors.response.use(
  (response) => {
    const remaining = response.headers['x-ratelimit-requests-remaining'];
    if (remaining !== undefined && quotaCallback) {
      quotaCallback(parseInt(remaining, 10));
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
