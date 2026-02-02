import axios from 'axios';
import configData from '../config.json';

// Use the configured SERVER_URL in production builds. In development leave baseURL undefined
// so Vite dev-server proxy rules in `vite.config.js` can apply.
const baseURL = import.meta.env.PROD ? configData.SERVER_URL : undefined;

const axiosServices = axios.create({ baseURL });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error && error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
 