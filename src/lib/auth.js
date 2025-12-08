// Minimal token helpers for localStorage and a small refresh-queue helper
const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export function getAccessToken() {
  try {
    return localStorage.getItem(ACCESS_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(t) {
  try {
    if (t === null || t === undefined) localStorage.removeItem(ACCESS_KEY);
    else localStorage.setItem(ACCESS_KEY, t);
  } catch {}
}

export function getRefreshToken() {
  try {
    return localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}

export function setRefreshToken(t) {
  try {
    if (t === null || t === undefined) localStorage.removeItem(REFRESH_KEY);
    else localStorage.setItem(REFRESH_KEY, t);
  } catch {}
}

export function clearTokens() {
  try {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {}
}

// queueRefresh: ensures only one refresh is in-flight. callers pass a function returning a promise
let _refreshPromise = null;
export function queueRefresh(fn) {
  if (_refreshPromise) return _refreshPromise;
  _refreshPromise = (async () => {
    try {
      const r = await fn();
      return r;
    } finally {
      _refreshPromise = null;
    }
  })();
  return _refreshPromise;
}

export default {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
  queueRefresh,
};
