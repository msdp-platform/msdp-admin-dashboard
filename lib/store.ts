import { create } from 'zustand';

interface AuthState {
  user: { id: string; name: string; role: string } | null;
  login: (user: { id: string; name: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));