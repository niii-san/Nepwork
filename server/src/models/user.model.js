import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            firstName: String,
            middleName: String,
            lastName: String,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["admin", "client", "freelancer"],
            default: "client",
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },
        kyc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Kyc",
        },

        kycVerified: {
            type: Boolean,
            default: false,
        },

        kycStatus: {
            type: String,
            enum: ["not_uploaded", "pending", "verified", "failed"],
            default: "not_uploaded",
        },
        password: {
            type: String,
            required: true,
        },

        refreshToken: String,
    },
    { timestamps: true },
);

// userSchema.pre("save",function(){
//   if(!this.isModified("password")) return next();

// })

export const User = mongoose.model("User", userSchema);
