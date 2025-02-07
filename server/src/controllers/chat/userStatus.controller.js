import { io } from "../../index.js";
import { User } from "../../models/index.js";

export const setUserOnline = async (userId, socketId) => {
    await User.findOneAndUpdate(
        { _id: userId },
        { online: true, socketId: socketId, lastSeen: null },
    );
};

export const setUserOffline = async (userId) => {
    const selectOptions = "name avatar online lastSeen socketId";

    const user = await User.findById(userId)
        .populate("following.userId", selectOptions)
        .populate("followers.userId", selectOptions);
    user.online = false;
    user.socketId = null;
    user.lastSeen = Date.now();

    await user.save();
    if (!user) return;

    const seenIds = new Set();
    const connectionList = [...user.following, ...user.followers].filter(
        ({ userId }) => {
            if (!userId || seenIds.has(userId._id.toString())) return false;
            seenIds.add(userId._id.toString());
            return userId.socketId;
        },
    );

    connectionList.forEach((item) => {
        io.to(item.userId.socketId).emit("userOffline", {
            userId: user._id,
            lastSeen: new Date(),
        });
    });
};
