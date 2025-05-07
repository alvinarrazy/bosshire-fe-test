import { LoginRequest, LoginResponse } from '@/types/auth';
import { ApiResponse } from '@/types/basic';
import api from './api';

export async function login(payload: LoginRequest | undefined) {
  return api().post<LoginResponse>('auth/login', payload ? payload : {});
}

export async function logout() {
  return api().post('auth/logout');
}

export async function register(payload: LoginRequest & { email: string }) {
  return api().post<ApiResponse>('auth/register', payload);
}
