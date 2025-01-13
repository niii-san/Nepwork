import { User } from "../../models/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";

export const switchToFreelancer = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                "Successfully switched to Freelancer",
                null,
            ),
        );
});

export const switchToClient = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                "Successfully switched to Client",
                null,
            ),
        );
});
