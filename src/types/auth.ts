export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'content_manager' | 'taxi_manager' | 'cd_manager' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user?: User;
    token?: string;
  };
  message?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  password?: string;
}
