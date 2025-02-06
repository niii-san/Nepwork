import { User } from "../../models/index.js";

export const setUserOnline = async (userId) => {
    await User.findOneAndUpdate({ _id: userId }, { online: true });
};

export const setUserOffline = async (userId) => {
    await User.findOneAndUpdate(
        { _id: userId },
        { online: false, lastSeen: Date.now() },
    );
};
