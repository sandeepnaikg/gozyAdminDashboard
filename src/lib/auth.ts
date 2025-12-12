// Token management utilities + refresh queue helper

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_CONTEXT_KEY = 'user_context';

// ------------------------
// Token Getters / Setters
// ------------------------

export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAccessToken = (token: string | null | undefined): void => {
  try {
    if (token === null || token === undefined) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } else {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  } catch {}
};

export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setRefreshToken = (token: string | null | undefined): void => {
  try {
    if (token === null || token === undefined) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } else {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  } catch {}
};

export const clearTokens = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_CONTEXT_KEY);
  } catch {}
};

// ------------------------
// User Context (Vendor/User Info)
// ------------------------

export interface UserContext {
  userId: string;
  role: 'admin' | 'vendor' | 'user';
  vendorId?: string; // Only for vendor role
  providerId?: string; // Provider ID for vendors
  email?: string;
  name?: string;
}

export const getUserContext = (): UserContext | null => {
  try {
    const context = localStorage.getItem(USER_CONTEXT_KEY);
    return context ? JSON.parse(context) : null;
  } catch {
    return null;
  }
};

export const setUserContext = (context: UserContext | null): void => {
  try {
    if (context === null) {
      localStorage.removeItem(USER_CONTEXT_KEY);
    } else {
      localStorage.setItem(USER_CONTEXT_KEY, JSON.stringify(context));
    }
  } catch {}
};

export const getVendorId = (): string | null => {
  const context = getUserContext();
  return context?.vendorId || context?.providerId || null;
};

export const getUserRole = (): string => {
  const context = getUserContext();
  return context?.role || 'user';
};

// ------------------------
// Refresh Queue
// Ensures only one refresh request runs at a time
// ------------------------

let _refreshPromise: Promise<any> | null = null;

export function queueRefresh<T>(fn: () => Promise<T>): Promise<T> {
  if (_refreshPromise) return _refreshPromise as Promise<T>;

  _refreshPromise = (async () => {
    try {
      const result = await fn();
      return result;
    } finally {
      _refreshPromise = null;
    }
  })();

  return _refreshPromise;
}

// ------------------------
// Default Export
// ------------------------

export default {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
  queueRefresh,
  getUserContext,
  setUserContext,
  getVendorId,
  getUserRole,
};
