import api from './api';
import { Service, CreateServicePayload, UpdateServicePayload } from '@/types/service';
import { ApiResponse, PaginatedResponse } from '@/types/common';

export const serviceService = {
  getAllServices: async (): Promise<ApiResponse<{ services: Service[] }>> => {
    const response = await api.get('/services');
    return response.data;
  },

  getServiceById: async (id: string): Promise<ApiResponse<{ service: Service }>> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (payload: CreateServicePayload): Promise<ApiResponse<{ service: Service }>> => {
    const response = await api.post('/services', payload);
    return response.data;
  },

  updateService: async (id: string, payload: UpdateServicePayload): Promise<ApiResponse<{ service: Service }>> => {
    const response = await api.put(`/services/${id}`, payload);
    return response.data;
  },

  deleteService: async (id: string): Promise<ApiResponse<unknown>> => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};
