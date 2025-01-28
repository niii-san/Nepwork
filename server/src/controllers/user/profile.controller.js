import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

export const getProfileData = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) throw new ApiError(400, false, "userId is required");

    if (!mongoose.isValidObjectId(userId))
        throw new ApiError(400, false, "Invalid userId");

    const userProfileData = await User.findById(userId).select(
        "-password -refreshToken -lastRoleChange -kyc -kycStatus",
    );

    if (!userProfileData) throw new ApiError(404, false, "User not found");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                false,
                `${userProfileData.name.firstName} profile data fetched`,
                userProfileData,
            ),
        );
});
