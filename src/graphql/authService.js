import api from "../api/restClient";
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from "./mutations";
import client from "./client";

export async function signup(email, password) {
  const { data } = await api.post("/auth/register", {
    email,
    password,
  });
  return data;
}

export async function login(email, password) {
  const { data } = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email, password },
  });
  return data.loginWithEmail;
}

export async function refreshToken(refreshToken) {
  const { data } = await client.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
    variables: { refreshToken },
  });
  return data.refreshToken;
}
