import { create } from "zustand";

export const useLoading = create((set) => ({
    loading: false,
    enableLoading: () => set((_) => ({ loading: true })),
    disableLoading: () => set((_) => ({ loading: false })),
}));
