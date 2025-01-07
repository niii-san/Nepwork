import { create } from "zustand";

export const useUser = create((set) => ({
    data: null,
    setUserData: () => set((state) => ({})),
    clearUserData: () => set(() => ({})),
}));
