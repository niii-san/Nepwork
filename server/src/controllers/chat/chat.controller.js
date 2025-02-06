import mongoose from "mongoose";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const createChat = asyncHandler(async (req, res) => {
    const senderId = req.user.id;
    const receiverId = (req.body.receiverId ?? "").trim();

    if (!receiverId) {
        throw new ApiError(400, true, "Receiver id is required");
    }

    if (!mongoose.isValidObjectId(receiverId)) {
        throw new ApiError(400, true, "Invalid receiver id");
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
        throw new ApiError(404, true, "Receiver not found");
    }

    const chatAlreadyExists = await Chat.findOne({
        $or: [
            { userOne: senderId, userTwo: receiver },
            { userOne: receiver, userTwo: senderId },
        ],
    });

    if (chatAlreadyExists) {
        throw new ApiError(400, true, "Chat already exists between them");
    }

    const chat = await Chat.create({
        userOne: senderId,
        userTwo: receiver._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, true, true, "Chat created", chat));
});
