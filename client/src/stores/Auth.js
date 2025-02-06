import { create } from "zustand";
import { io } from "socket.io-client";
import api from "../utils/api";

export const useAuth = create((set, get) => ({
    userData: null,
    isLoggedIn: false,
    socket: null,

    login: () => {
        set({ isLoggedIn: true });
    },

    logout: () => {
        set({ isLoggedIn: false });
    },

    setUserData: async () => {
        api.get("/user/current-user-info")
            .then((res) => {
                set({ userData: res.data.data });
            })
            .catch((err) => {
                console.error(
                    "Something went wrong while setting user data at store,  ",
                    err,
                );
            });
    },
    clearUserData: () => {
        set({ userData: null });
    },

    connectSocket: () => {
        const { userData } = get();
        if (!get().socket) {
            const newSocket = io("ws://localhost:8000", {
                transports: ["websocket"],
                reconnectionAttempts: 5,
                query: {
                    userId: userData?._id,
                },
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
