import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        transactionCode: {
            type: String,
            required: true,
        },
        transactionUUID: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["not_created", "pending", "done"],
            default: "not_created",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        initiator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        amount: {
            type: Number,
            default: 0,
        },
        paidTime: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
