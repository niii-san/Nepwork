import { create } from "zustand";
import api from "../utils/api";
import toast from "react-hot-toast";

export const useChat = create((set, get) => ({
    users: [],
    chats: [],
    selectedChat: null,
    setUsers: async () => { },
    setChats: async () => {
        try {
            const response = await api.get("/chats");
            console.log(response);
            set({ chats: response.data.data });
        } catch (error) {
            toast.error("Failed to load chats");
            console.error(error);
        }
    },
    setSelectedChat: (chat) => {
        set({ selectedChat: chat });
    },
}));
