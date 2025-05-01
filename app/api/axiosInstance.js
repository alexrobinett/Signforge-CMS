import axios from 'axios';

// These will be injected from React Context
let getToken = () => null;
let setAuth = () => {};

export function injectAuthHelpers({ getToken: getTokenFn, setAuth: setAuthFn }) {
  getToken = getTokenFn;
  setAuth = setAuthFn;
}

const axiosInstance = axios.create({
  baseURL: 'https://signage-api-production.up.railway.app',
  withCredentials: true,
});

// Request interceptor to add Authorization header from React Context
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh using setAuth from React Context
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.get('/auth/refresh');
        if (refreshResponse.data) {
          setAuth((prev) => ({ ...prev, ...refreshResponse.data }));
          // Retry original request with new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Optionally handle forced logout here
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Usage:
 * In your root App, call injectAuthHelpers({ getToken, setAuth })
 * where getToken returns the current token from context, and setAuth updates context.
 */

export default axiosInstance;
