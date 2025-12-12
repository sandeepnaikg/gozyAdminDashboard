/**
 * Hasura GraphQL Client
 * Direct fetch-based client for Hasura GraphQL API
 */

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql';
const ADMIN_SECRET = import.meta.env.VITE_HASURA_ADMIN_SECRET;

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: {
      code?: string;
      path?: string;
    };
  }>;
}

interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
}

/**
 * Execute GraphQL query/mutation against Hasura
 */
export async function graphqlRequest<T = any>(
  request: GraphQLRequest
): Promise<GraphQLResponse<T>> {
  // Get user context directly from localStorage to avoid circular dependencies
  const getUserContext = () => {
    try {
      const context = localStorage.getItem('user_context');
      return context ? JSON.parse(context) : null;
    } catch {
      return null;
    }
  };
  
  const token = localStorage.getItem('access_token');
  const userContext = getUserContext();
  const role = userContext?.role || 'admin';
  const vendorId = userContext?.vendorId || userContext?.providerId;
  const userId = userContext?.userId;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // For development: Always use admin secret + role headers for row-level security
  // Hasura requires admin secret to accept x-hasura-* headers in dev mode
  // For production: Replace with JWT token
  if (ADMIN_SECRET) {
    headers['x-hasura-admin-secret'] = ADMIN_SECRET;
  } else if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Set Hasura custom claims for row-level security
  headers['x-hasura-role'] = role;
  if (userId) {
    headers['x-hasura-user-id'] = userId;
  }
  if (vendorId) {
    headers['x-hasura-vendor-id'] = vendorId;
  }

  // Debug logging
  console.log('🔐 Hasura Request:', { 
    role, 
    userId: userId ? 'set' : 'none', 
    vendorId: vendorId || 'none',
    usingAdminSecret: ADMIN_SECRET ? 'YES (dev mode)' : 'NO'
  });
  console.log('📋 Headers:', { role, hasAdminSecret: !!ADMIN_SECRET, hasVendorId: !!vendorId });

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    // Handle GraphQL errors
    if (result.errors) {
      console.error('[GraphQL Errors]:', result.errors);
      console.error('[Full Error Details]:', JSON.stringify(result.errors, null, 2));
      console.error('[Request]:', JSON.stringify(request).substring(0, 500));
      
      // Handle authentication errors
      if (result.errors.some(err => err.extensions?.code === 'UNAUTHENTICATED')) {
        clearAuth();
        window.location.href = '/login';
      }
    }

    return result;
  } catch (error) {
    console.error('[Network Error]:', error);
    throw error;
  }
}

/**
 * Subscribe to GraphQL subscription (WebSocket)
 */
export function graphqlSubscribe<T = any>(
  request: GraphQLRequest,
  onData: (data: T) => void,
  onError?: (error: Error) => void
): () => void {
  const wsEndpoint = GRAPHQL_ENDPOINT.replace('http', 'ws');
  const token = localStorage.getItem('authToken');
  
  const ws = new WebSocket(wsEndpoint, 'graphql-ws');
  
  ws.onopen = () => {
    // Send connection init
    ws.send(JSON.stringify({
      type: 'connection_init',
      payload: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'x-hasura-admin-secret': ADMIN_SECRET || '',
        },
      },
    }));

    // Start subscription
    ws.send(JSON.stringify({
      id: '1',
      type: 'start',
      payload: request,
    }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'data') {
      onData(message.payload.data);
    } else if (message.type === 'error') {
      onError?.(new Error(message.payload.message));
    }
  };

  ws.onerror = (error) => {
    console.error('[WebSocket Error]:', error);
    onError?.(new Error('WebSocket connection error'));
  };

  // Return cleanup function
  return () => {
    ws.send(JSON.stringify({ id: '1', type: 'stop' }));
    ws.close();
  };
}

// Helper functions for client-side operations
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const setUserRole = (role: 'admin' | 'vendor' | 'customer') => {
  localStorage.setItem('userRole', role);
};

export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('vendorAccountId');
};

export const getCurrentVendorId = (): string | null => {
  return localStorage.getItem('vendorAccountId');
};

export const setCurrentVendorId = (vendorId: string) => {
  localStorage.setItem('vendorAccountId', vendorId);
};
