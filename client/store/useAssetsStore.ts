import { create } from 'zustand';
import { apiService } from '../lib/api';

interface AssetsState {
  assets: any[];
  currentAsset: any | null;
  isLoading: boolean;
  error: string | null;
  fetchAssets: () => Promise<void>;
  fetchAssetById: (id: string) => Promise<void>;
  createAsset: (data: any) => Promise<void>;
  updateAsset: (id: string, data: any) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
}

export const useAssetsStore = create<AssetsState>((set, get) => ({
  assets: [],
  currentAsset: null,
  isLoading: false,
  error: null,

  fetchAssets: async () => {
    set({ isLoading: true, error: null });
    try {
      const assets = await apiService.getAssets();
      set({ assets, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAssetById: async (id: string) => {
    set({ isLoading: true, error: null, currentAsset: null });
    try {
      const asset = await apiService.getAssetById(id);
      set({ currentAsset: asset, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createAsset: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      const newAsset = await apiService.createAsset(data);
      set((state) => ({ 
        assets: [newAsset, ...state.assets], 
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

  updateAsset: async (id: string, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const updatedAsset = await apiService.updateAsset(id, data);
      set((state) => ({
        assets: state.assets.map(a => a.id === id ? updatedAsset : a),
        currentAsset: state.currentAsset?.id === id ? updatedAsset : state.currentAsset,
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteAsset: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.deleteAsset(id);
      set((state) => ({
        assets: state.assets.filter(a => a.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  }
}));
