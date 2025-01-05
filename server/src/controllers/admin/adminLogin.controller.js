import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const adminLogin = asyncHandler(async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = (req.body.password || "").trim().toLowerCase();

    if (!email) throw new ApiError(400, false, "Email not provided");
    if (!password) throw new ApiError(400, false, "Password not provided");

    const user = await User.findOne({ email });

    if (!user)
        throw new ApiError(
            400,
            false,
            "No any account with this email address",
        );




});
