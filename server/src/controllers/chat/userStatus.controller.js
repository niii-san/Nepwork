import { User } from "../../models/index.js";

export const setUserOnline = async (userId, socketId) => {
    await User.findOneAndUpdate(
        { _id: userId },
        { online: true, socketId: socketId, lastSeen: null },
    );
};

export const setUserOffline = async (userId) => {
    await User.findOneAndUpdate(
        { _id: userId },
        { online: false, socketId: null, lastSeen: Date.now() },
    );
};
