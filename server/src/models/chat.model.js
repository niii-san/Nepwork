import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        sender: {
            type: Number, // 0 means me, 1 means other
            required: true,
        },
    },
    { timestamps: { createdAt: "timestamp" } },
);

export const Message = mongoose.model("Message", messageSchema);

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        unread: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

export const Chat = mongoose.model("Chat", chatSchema);
