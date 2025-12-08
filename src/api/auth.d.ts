// Type declarations for auth.js module

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    created_at: string;
    updated_at: string;
  };
}

export interface RegisterResponse extends LoginResponse {}

export function initAuth(): void;
export function logoutUser(): void;
export function loginUser(email: string, password: string): Promise<LoginResponse>;
export function registerUser(name: string, email: string, password: string): Promise<RegisterResponse>;
export function getCurrentUser(): Promise<any>;
export function refreshToken(): Promise<any>;
export function scheduleTokenRefresh(): void;
