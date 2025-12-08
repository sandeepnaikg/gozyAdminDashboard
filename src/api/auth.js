import api, { rawApi } from "./restClient.js";
import { gqlClient } from "./graphqlClient.js";
import { REFRESH_TOKEN_MUTATION } from "../graphql/mutations";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from "../lib/auth";

// Auth token expires in 24 hours, refresh 15 minutes before
const REFRESH_BEFORE_MS = 15 * 60 * 1000; // 15 minutes
const AUTH_TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000; // 24 hours
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

let refreshTimeout = null;

export const registerUser = async (name, email, password) => {
  // Use rawApi for registration to avoid auth interceptors
  const { data } = await rawApi({
    method: 'POST',
    url: '/auth/register',
    data: { name, email, password }
  });
  
  // Store tokens with timestamp
  if (data.token && data.refresh_token) {
    setAccessToken(data.token);
    setRefreshToken(data.refresh_token);
    storeTokenTimestamp();
    scheduleTokenRefresh();
  }
  
  return data;
};

export const loginUser = async (email, password) => {
  // Use rawApi for login to avoid auth interceptors
  const { data } = await rawApi({
    method: 'POST',
    url: '/auth/login-email',
    data: { email, password }
  });
  
  // Store tokens with timestamp
  if (data.token && data.refresh_token) {
    setAccessToken(data.token);
    setRefreshToken(data.refresh_token);
    storeTokenTimestamp();
    scheduleTokenRefresh();
    
    // Store user data if available
    if (data.user) {
      try {
        localStorage.setItem('user_data', JSON.stringify(data.user));
      } catch (error) {
        console.error('Failed to store user data:', error);
      }
    }
  }
  
  return data;
};

// Store timestamp when tokens are issued
const storeTokenTimestamp = () => {
  try {
    localStorage.setItem('token_timestamp', Date.now().toString());
  } catch (error) {
    console.error('Failed to store token timestamp:', error);
  }
};

// Check if refresh token has expired (7 days)
const isRefreshTokenExpired = () => {
  try {
    const timestamp = localStorage.getItem('token_timestamp');
    if (!timestamp) return true;
    
    const elapsed = Date.now() - parseInt(timestamp, 10);
    return elapsed >= REFRESH_TOKEN_LIFETIME_MS;
  } catch (error) {
    return true;
  }
};

// Logout user by clearing all tokens
export const logoutUser = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
  clearTokens();
  try {
    localStorage.removeItem('token_timestamp');
    localStorage.removeItem('user_data');
  } catch (error) {
    console.error('Failed to clear token timestamp:', error);
  }
};

// Schedule refresh before token expires
export const scheduleTokenRefresh = () => {
  // Clear any existing refresh timeout
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  // Check if refresh token has expired
  if (isRefreshTokenExpired()) {
    console.log('Refresh token expired (7 days), logging out user');
    logoutUser();
    return;
  }

  // Schedule the refresh
  refreshTimeout = setTimeout(async () => {
    try {
      await refreshToken();
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // If refresh fails, logout the user
      logoutUser();
    }
  }, AUTH_TOKEN_LIFETIME_MS - REFRESH_BEFORE_MS);
};

// Use GraphQL client for token refresh
export const refreshToken = async () => {
  try {
    // Check if refresh token has expired
    if (isRefreshTokenExpired()) {
      throw new Error('Refresh token expired');
    }

    const refresh_token = getRefreshToken();
    if (!refresh_token) {
      throw new Error('No refresh token available');
    }

    // Use gqlClient with skipAuth true since we'll provide the refresh token
    const data = await gqlClient(
      REFRESH_TOKEN_MUTATION,
      {},
      true, // skipAuth
      { Authorization: `Bearer ${refresh_token}` } // custom headers
    );

    if (data?.refresh?.token) {
      setAccessToken(data.refresh.token);
      if (data.refresh.refresh_token) {
        setRefreshToken(data.refresh.refresh_token);
      }
      
      // Update timestamp and schedule next refresh
      storeTokenTimestamp();
      scheduleTokenRefresh();
      
      return data.refresh;
    }
    
    throw new Error('Invalid refresh response');
  } catch (error) {
    console.error('Token refresh failed:', error);
    // Logout user if refresh fails
    logoutUser();
    throw error;
  }
};

export const getCurrentUser = async () => {
  // Use the authenticated gqlClient - token will be added automatically
  const { data } = await gqlClient(`
    query GetCurrentUser {
      me {
        id
        email
        name
        phone
        created_at
        updated_at
      }
    }
  `);
  return data.me;
};

// Initialize auth on app startup
export const initAuth = () => {
  const refresh_token = getRefreshToken();
  const access_token = getAccessToken();
  
  // If no tokens, nothing to initialize
  if (!refresh_token || !access_token) {
    return;
  }
  
  // Check if refresh token has expired
  if (isRefreshTokenExpired()) {
    console.log('Refresh token expired on init, logging out user');
    logoutUser();
    return;
  }
  
  // Schedule token refresh
  scheduleTokenRefresh();
};
