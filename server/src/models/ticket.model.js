import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "resolved"],
      default: "open",
    },
    replies: [
      {
        CreaterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true, // Tracks which user/admin replied
        },
        CreaterRole: {
          type: String,
          enum: ["admin", "client"],
          required: true, // Identifies if the reply is from an admin or a client
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
