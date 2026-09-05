import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiService } from '../lib/api';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  loginWithId: (id: string) => Promise<void>;
  registerUser: (data: any) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      
      loginWithId: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // Since there is no auth, we just fetch profile to "login"
          const user = await apiService.getUserProfile(id);
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Failed to fetch user', 
            isLoading: false 
          });
          throw error;
        }
      },

      registerUser: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
          const user = await apiService.createUser(data);
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Failed to register', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage', // saves to localStorage
    }
  )
);
