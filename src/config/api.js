import axios from 'axios';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? '/api-sports' : 'https://v3.football.api-sports.io',
  headers: {
    'x-apisports-key': import.meta.env.VITE_API_KEY || '',
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
