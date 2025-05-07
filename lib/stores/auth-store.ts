import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginFormData, User } from "../types";
import { apiService } from "../api";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      login: async (data: LoginFormData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.login(data);
          set({ 
            user: response.user, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (err) {
          set({ 
            error: (err as Error).message,
            isLoading: false 
          });
          throw err;
        }
      },

      logout: () => {
        apiService.clearToken();
        set({ 
          user: null, 
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: !!state.user }),
    }
  )
); 