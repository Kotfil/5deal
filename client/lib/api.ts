import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Base
  checkHealth: async () => {
    const response = await api.get('/');
    return response.data;
  },

  // Users
  createUser: async (data: any) => {
    const response = await api.post('/users', data);
    return response.data;
  },
  getUserProfile: async (id: string) => {
    const response = await api.get(`/users/${id}/profile`);
    return response.data;
  },
  updateUserProfile: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}/profile`, data);
    return response.data;
  },

  // Assets
  getAssets: async () => {
    const response = await api.get('/assets');
    return response.data;
  },
  getAssetById: async (id: string) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },
  createAsset: async (data: any) => {
    const response = await api.post('/assets', data);
    return response.data;
  },
  updateAsset: async (id: string, data: any) => {
    const response = await api.patch(`/assets/${id}`, data);
    return response.data;
  },
  deleteAsset: async (id: string) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  // Messages
  sendMessage: async (data: any) => {
    const response = await api.post('/messages', data);
    return response.data;
  },
  getMessagesForUser: async (userId: string) => {
    const response = await api.get(`/messages/user/${userId}`);
    return response.data;
  },
  markMessageAsRead: async (id: string) => {
    const response = await api.patch(`/messages/${id}/read`);
    return response.data;
  },
};

export default api;
