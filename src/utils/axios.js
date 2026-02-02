import axios from 'axios';
import configData from '../config.json';

// Behaviour:
// - If `VITE_API_URL` is provided at build time, use it as the baseURL.
// - Otherwise leave `baseURL` undefined so axios issues relative requests (same-origin).
//   Relative requests are required when the frontend is served behind a reverse-proxy
//   that forwards API paths to the backend (this avoids CORS).
const envApi = import.meta.env.VITE_API_URL || null;
const baseURL = envApi ? envApi : undefined;

// Optionally enable credentials if VITE_API_WITH_CREDENTIALS=true at build time
const withCredentials = import.meta.env.VITE_API_WITH_CREDENTIALS === 'true';

const axiosServices = axios.create({ baseURL, withCredentials });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error && error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
 