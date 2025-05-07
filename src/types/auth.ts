export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserState {
  user: User | null;
  initialized: boolean;
}
