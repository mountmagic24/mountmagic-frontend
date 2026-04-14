import api from './api';
import { Blog, CreateBlogPayload, UpdateBlogPayload } from '@/types/blog';
import { ApiResponse } from '@/types/common';

export const blogService = {
  getAllBlogs: async (): Promise<ApiResponse<{ blogs: Blog[] }>> => {
    const response = await api.get('/blogs');
    return response.data;
  },

  getBlogById: async (id: string): Promise<ApiResponse<{ blog: Blog }>> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  createBlog: async (payload: CreateBlogPayload): Promise<ApiResponse<{ blog: Blog }>> => {
    const response = await api.post('/blogs', payload);
    return response.data;
  },

  updateBlog: async (id: string, payload: UpdateBlogPayload): Promise<ApiResponse<{ blog: Blog }>> => {
    const response = await api.put(`/blogs/${id}`, payload);
    return response.data;
  },

  deleteBlog: async (id: string): Promise<ApiResponse<unknown>> => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};
