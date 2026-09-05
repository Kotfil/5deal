import { create } from 'zustand';
import { apiService } from '../lib/api';

interface MessagesState {
  messages: any[];
  isLoading: boolean;
  error: string | null;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (data: any) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await apiService.getMessagesForUser(userId);
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  sendMessage: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      const newMessage = await apiService.sendMessage(data);
      set((state) => ({
        messages: [newMessage, ...state.messages],
        isLoading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  markAsRead: async (id: string) => {
    try {
      const updatedMsg = await apiService.markMessageAsRead(id);
      set((state) => ({
        messages: state.messages.map(m => m.id === id ? updatedMsg : m)
      }));
    } catch (error: any) {
      console.error('Failed to mark as read', error);
    }
  }
}));
