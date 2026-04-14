import api from './api';

export const serviceService = {
  getAllServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (payload) => {
    const response = await api.post('/services', payload);
    return response.data;
  },

  updateService: async (id, payload) => {
    const response = await api.put(`/services/${id}`, payload);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};