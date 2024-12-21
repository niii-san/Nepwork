import { create } from "zustand";

export const useAuth = create((set) => ({
    isLoggedIn: false,
    login: () => set((state) => ({ isLoggedIn: true })),
    logout: () => set((state) => ({ isLoggedIn: false })),
}));
