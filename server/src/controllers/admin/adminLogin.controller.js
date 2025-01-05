import {
    generateAccessToken,
    generateRefreshToken,
} from "../user.controller.js";
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
            404,
            false,
            "No any account with this email address",
        );

    if (password !== user.password)
        throw new ApiError(400, false, "Invalid credentials");

    if (user.role !== "admin")
        throw new ApiError(401, false, "User is not admin");

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .status(200)
        .json(
            new ApiResponse(200, true, true, "Login success", {
                email: user.email,
            }),
        );
});
