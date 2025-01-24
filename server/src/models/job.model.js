import mongoose from "mongoose";
import { tags } from "../constants.js";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        appliedBy: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            default: [],
        },

        acceptedFreelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        hourlyRate: {
            type: Number,
            required: true,
        },

        tags: [
            {
                type: String,
                enum: tags,
            },
        ],
        status: {
            type: String,
            enum: ["open", "closed", "in_progress", "finished"],
            default: "open",
        },
    },
    { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
