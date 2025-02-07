import { create } from "zustand";
import api from "../utils/api";
import toast from "react-hot-toast";

export const useChat = create((set, get) => ({
    connections: [],
    connectionsLoading: true,
    chats: [],
    chatsLoading: true,
    selectedChat: null,

    setConnections: async () => {
        set({ connectionsLoading: true });
        try {
            const response = await api.get("/chats/get-connections");
            set({ connections: response.data.data, connectionsLoading: false });
        } catch (error) {
            toast.error("Failed to load connections");
            console.error(error);
        }
    },
    setChats: async () => {
        set({ chatsLoading: true });
        try {
            const response = await api.get("/chats");
            set({ chats: response.data.data, chatsLoading: false });
        } catch (error) {
            toast.error("Failed to load chats");
            console.error(error);
        }
    },
    setSelectedChat: (chat) => {
        set({ selectedChat: chat });
    },
}));
