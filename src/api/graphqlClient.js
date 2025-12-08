import { request, gql } from "graphql-request";
import { getAccessToken } from "../lib/auth";

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_API_URL || "https://db.gozy.online/v1/graphql";

console.log('🌐 GraphQL URL configured as:', GRAPHQL_URL);

export const gqlClient = async (query, variables = {}, skipAuth = false, customHeaders = {}) => {
  console.log('🚀 gqlClient called with:', { 
    url: GRAPHQL_URL, 
    queryPreview: query.substring(0, 100) + '...',
    variables 
  });

  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (!skipAuth && !customHeaders.Authorization) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Auth token attached to GraphQL request');
    } else {
      console.warn('⚠️ No auth token available for GraphQL request');
    }
  } else if (skipAuth) {
    console.log('🔓 Skipping auth for this GraphQL request');
  }

  console.log('📤 Making fetch request to:', GRAPHQL_URL);

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  console.log('📥 Response received:', { status: response.status, ok: response.ok });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  console.log('📦 Response data:', result);

  // If there are errors but also data, log the errors but return the data
  if (result.errors) {
    console.warn('GraphQL warnings/errors:', result.errors);
    
    // Only throw if there's no data
    if (!result.data) {
      const error = new Error(result.errors[0].message);
      error.graphQLErrors = result.errors;
      throw error;
    }
  }

  return result;
};
