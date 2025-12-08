import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
  queueRefresh,
} from "../lib/auth";

// Base URL for all API endpoints
const BASE_URL = import.meta.env.VITE_REST_API_URL || "https://api.gozy.online/api/v1";

// Always use the full URL, no proxy in development to avoid localhost issues
const API_URL = BASE_URL;
// rawApi for refresh calls to avoid recursion
export const rawApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// attach access token when present
api.interceptors.request.use((cfg) => {
  try {
    const token = getAccessToken();
    if (token) {
      cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` };
      console.log('🔐 Auth token attached to REST request:', cfg.url);
    } else {
      console.warn('⚠️ No auth token available for REST request:', cfg.url);
    }
  } catch (err) {
    console.error('❌ Error attaching auth token:', err);
  }
  return cfg;
});

// response interceptor: on 401 attempt refresh and retry original request
let isRefreshing = false;
let refreshQueue = [];
const processQueue = (err, token = null) => {
  refreshQueue.forEach((p) => {
    if (err) p.reject(err);
    else p.resolve(token);
  });
  refreshQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error?.config;
    if (!originalRequest) return Promise.reject(error);
    const status = error?.response?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${token}` };
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      return queueRefresh(() =>
        rawApi.post("/auth/refresh", null, { headers: { Authorization: `Bearer ${refreshToken}` } })
      )
        .then((resp) => {
          const token = resp?.data?.token;
          if (token) {
            setAccessToken(token);
            processQueue(null, token);
            originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${token}` };
            return api(originalRequest);
          }
          clearTokens();
          return Promise.reject(error);
        })
        .catch((err) => {
          processQueue(err, null);
          clearTokens();
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    return Promise.reject(error);
  }
);

export default api;

