import { io } from "socket.io-client";
import { create } from "zustand";

export const useAuth = create((set, get) => ({
    isLoggedIn: false,
    socket: null,
    login: () => {
        set({ isLoggedIn: true });
    },

    logout: () => {
        set({ isLoggedIn: false });
    },
    connectSocket: () => {
        if (!get().socket) {
            const newSocket = io("ws://localhost:8000", {
                transports:["websocket"],
                reconnectionAttempts: 5,
                rejectUnauthorized: true,
            });
            set({ socket: newSocket });
            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
            });
            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        }
    },
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null });
            console.log("Socket disconnected");
        }
    },
}));
