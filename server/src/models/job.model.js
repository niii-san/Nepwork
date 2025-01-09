import mongoose from "mongoose";

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

    appliedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    acceptedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    hourlyRate: {
      type: Number,
      required: true,
    },

    tags: [
      {
        type: String,
        enum: [
          "frontend",
          "javascript",
          "typescript",
          "react",
          "nextjs",
          "tailwindcss",
          "backend",
          "nodejs",
          "express",
          "nestjs",
          "django",
          "flask",
          "fullstack",
          "sql",
          "mysql",
          "postgresql",
          "mongodb",
        ],
      },
    ],
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "cancelled", "closed"],
      default: "open",
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
