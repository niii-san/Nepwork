import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: String,
    },
    { timestamps: true },
);

export const Admin = mongoose.model("Admin", adminSchema);
