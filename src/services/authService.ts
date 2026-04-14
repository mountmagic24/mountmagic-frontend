import api from './api';
import { AuthResponse, LoginPayload, RegisterPayload, UpdateProfilePayload, User } from '@/types/auth';

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', payload);
    return response.data;
  },

  getProfile: async (): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await api.put('/users/profile', payload);
    return response.data;
  },
};
