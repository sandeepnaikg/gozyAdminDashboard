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
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole') || 'admin';
  const vendorId = localStorage.getItem('vendorAccountId');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // For development: Use admin secret
  // For production: Use JWT token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (ADMIN_SECRET) {
    headers['x-hasura-admin-secret'] = ADMIN_SECRET;
  }

  // Set Hasura role headers
  headers['x-hasura-role'] = role;
  if (vendorId) {
    headers['x-hasura-vendor-id'] = vendorId;
  }

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
