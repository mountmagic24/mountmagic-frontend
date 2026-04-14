import api from './api';

export const blogService = {
  getAllBlogs: async () => {
    const response = await api.get('/blogs');
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  createBlog: async (payload) => {
    const response = await api.post('/blogs', payload);
    return response.data;
  },

  updateBlog: async (id, payload) => {
    const response = await api.put(`/blogs/${id}`, payload);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};