import mongoose from "mongoose";
import { tags } from "../constants.js";

const jobApplicationSchema = new mongoose.Schema(
    {
        appliedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        appliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            type: String,
        },
    },
    { timestamps: true },
);

export const JobApplication = mongoose.model(
    "JobApplication",
    jobApplicationSchema,
);

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

        payment: {
            done: {
                type: Boolean,
                default: false,
            },
        },

        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobApplication",
            },
        ],
        acceptedFreelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        acceptedApplication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobApplication",
            default: null,
        },

        startTime: {
            type: Date,
            default: null,
        },
        endTime: {
            type: Date,
            default: null,
        },
        hasFinished: {
            type: Boolean,
            default: false,
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
