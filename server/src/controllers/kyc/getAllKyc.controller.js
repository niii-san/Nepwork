import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllKyc = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, true, true, "test passed", null));
});
